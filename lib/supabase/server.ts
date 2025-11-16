import { createServerClient, type CookieOptions } from '@supabase/ssr'
import { cookies } from 'next/headers'

export async function createClient() {
  const cookieStore = await cookies()

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value
        },
        set(name: string, value: string, options: CookieOptions) {
          try {
            cookieStore.set({ name, value, ...options })
          } catch (error) {
            // Handle cookie setting in Server Components
          }
        },
        remove(name: string, options: CookieOptions) {
          try {
            cookieStore.set({ name, value: '', ...options })
          } catch (error) {
            // Handle cookie removal in Server Components
          }
        },
      },
    }
  )
}

// Database Types
export interface Store {
  id: string
  name: string
  location: string
  contact_email: string
  contact_phone: string
  status: 'active' | 'inactive'
  created_at: string
  updated_at: string
}

export interface Order {
  id: string
  store_id: string
  order_number: string
  table_number?: string
  total_amount: number
  status: 'pending' | 'preparing' | 'ready' | 'completed' | 'cancelled'
  created_at: string
  updated_at: string
}

export interface OrderItem {
  id: string
  order_id: string
  item_name: string
  quantity: number
  price: number
  notes?: string
  created_at: string
}

export interface User {
  id: string
  email: string
  full_name: string
  role: 'admin' | 'store_manager' | 'staff'
  store_id?: string
  created_at: string
}

// Database Operations
export class SupabaseService {
  private supabase: Awaited<ReturnType<typeof createClient>>

  constructor(supabase: Awaited<ReturnType<typeof createClient>>) {
    this.supabase = supabase
  }

  // Authentication
  async signIn(email: string, password: string) {
    const { data, error } = await this.supabase.auth.signInWithPassword({
      email,
      password,
    })
    if (error) throw error
    return data
  }

  async signOut() {
    const { error } = await this.supabase.auth.signOut()
    if (error) throw error
  }

  async getCurrentUser() {
    const { data: { user }, error } = await this.supabase.auth.getUser()
    if (error) throw error
    return user
  }

  // Store Operations
  async getAllStores() {
    const { data, error } = await this.supabase
      .from('stores')
      .select('*')
      .order('created_at', { ascending: false })
    
    if (error) throw error
    return data as Store[]
  }

  async getStoreById(id: string) {
    const { data, error } = await this.supabase
      .from('stores')
      .select('*')
      .eq('id', id)
      .single()
    
    if (error) throw error
    return data as Store
  }

  async createStore(store: Omit<Store, 'id' | 'created_at' | 'updated_at'>) {
    const { data, error } = await this.supabase
      .from('stores')
      .insert(store)
      .select()
      .single()
    
    if (error) throw error
    return data as Store
  }

  async updateStore(id: string, updates: Partial<Store>) {
    const { data, error } = await this.supabase
      .from('stores')
      .update({ ...updates, updated_at: new Date().toISOString() })
      .eq('id', id)
      .select()
      .single()
    
    if (error) throw error
    return data as Store
  }

  async deleteStore(id: string) {
    const { error } = await this.supabase
      .from('stores')
      .delete()
      .eq('id', id)
    
    if (error) throw error
  }

  // Order Operations
  async getOrdersByStore(storeId: string, limit = 50) {
    const { data, error } = await this.supabase
      .from('orders')
      .select('*, order_items(*)')
      .eq('store_id', storeId)
      .order('created_at', { ascending: false })
      .limit(limit)
    
    if (error) throw error
    return data
  }

  async getOrderById(id: string) {
    const { data, error } = await this.supabase
      .from('orders')
      .select('*, order_items(*), stores(*)')
      .eq('id', id)
      .single()
    
    if (error) throw error
    return data
  }

  async createOrder(order: Omit<Order, 'id' | 'created_at' | 'updated_at'>) {
    const { data, error } = await this.supabase
      .from('orders')
      .insert(order)
      .select()
      .single()
    
    if (error) throw error
    return data as Order
  }

  async updateOrderStatus(id: string, status: Order['status']) {
    const { data, error } = await this.supabase
      .from('orders')
      .update({ status, updated_at: new Date().toISOString() })
      .eq('id', id)
      .select()
      .single()
    
    if (error) throw error
    return data as Order
  }

  // Dashboard Statistics
  async getDashboardStats() {
    // Get total stores
    const { count: totalStores, error: storesError } = await this.supabase
      .from('stores')
      .select('*', { count: 'exact', head: true })
    
    if (storesError) throw storesError

    // Get active stores
    const { count: activeStores, error: activeError } = await this.supabase
      .from('stores')
      .select('*', { count: 'exact', head: true })
      .eq('status', 'active')
    
    if (activeError) throw activeError

    // Get total orders
    const { count: totalOrders, error: ordersError } = await this.supabase
      .from('orders')
      .select('*', { count: 'exact', head: true })
    
    if (ordersError) throw ordersError

    // Get today's orders
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    
    const { count: todayOrders, error: todayError } = await this.supabase
      .from('orders')
      .select('*', { count: 'exact', head: true })
      .gte('created_at', today.toISOString())
    
    if (todayError) throw todayError

    return {
      totalStores: totalStores || 0,
      activeStores: activeStores || 0,
      totalOrders: totalOrders || 0,
      todayOrders: todayOrders || 0,
    }
  }

  async getStoreStats(storeId: string) {
    // Get orders today for specific store
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    
    const { count: ordersToday, error: todayError } = await this.supabase
      .from('orders')
      .select('*', { count: 'exact', head: true })
      .eq('store_id', storeId)
      .gte('created_at', today.toISOString())
    
    if (todayError) throw todayError

    // Get total orders for specific store
    const { count: totalOrders, error: totalError } = await this.supabase
      .from('orders')
      .select('*', { count: 'exact', head: true })
      .eq('store_id', storeId)
    
    if (totalError) throw totalError

    return {
      ordersToday: ordersToday || 0,
      totalOrders: totalOrders || 0,
    }
  }

  // Real-time subscriptions
  subscribeToStoreOrders(storeId: string, callback: (payload: any) => void) {
    return this.supabase
      .channel(`store-${storeId}-orders`)
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'orders',
          filter: `store_id=eq.${storeId}`,
        },
        callback
      )
      .subscribe()
  }

  subscribeToAllOrders(callback: (payload: any) => void) {
    return this.supabase
      .channel('all-orders')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'orders',
        },
        callback
      )
      .subscribe()
  }

  // Analytics
  async getOrderAnalytics(startDate: string, endDate: string) {
    const { data, error } = await this.supabase
      .from('orders')
      .select('created_at, total_amount, status, store_id')
      .gte('created_at', startDate)
      .lte('created_at', endDate)
    
    if (error) throw error
    return data
  }

  async getTopSellingItems(storeId?: string, limit = 10) {
    let query = this.supabase
      .from('order_items')
      .select('item_name, quantity, order_id, orders!inner(store_id)')
    
    if (storeId) {
      query = query.eq('orders.store_id', storeId)
    }
    
    const { data, error } = await query.limit(limit)
    
    if (error) throw error
    return data
  }

  // User Management
  async getUserProfile(userId: string) {
    const { data, error } = await this.supabase
      .from('users')
      .select('*')
      .eq('id', userId)
      .single()
    
    if (error) throw error
    return data as User
  }

  async updateUserProfile(userId: string, updates: Partial<User>) {
    const { data, error } = await this.supabase
      .from('users')
      .update(updates)
      .eq('id', userId)
      .select()
      .single()
    
    if (error) throw error
    return data as User
  }
}

// Helper function to get initialized service
export async function getSupabaseService() {
  const supabase = await createClient()
  return new SupabaseService(supabase)
}
