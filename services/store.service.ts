export interface Store {
  id: string;
  name: string;
  location: string;
  status: "active" | "inactive";
  ordersToday: number;
  totalOrders: number;
  createdAt: string;
}

export interface DashboardStats {
  totalStores: number;
  activeStores: number;
  totalOrders: number;
  todayOrders: number;
}

class StoreService {
  private baseUrl = "/api/stores";

  async getAllStores(): Promise<Store[]> {
    const response = await fetch(this.baseUrl);

    if (!response.ok) {
      throw new Error("Failed to fetch stores");
    }

    return response.json();
  }

  async getStoreById(id: string): Promise<Store> {
    const response = await fetch(`${this.baseUrl}/${id}`);

    if (!response.ok) {
      throw new Error("Failed to fetch store");
    }

    return response.json();
  }

  async getDashboardStats(): Promise<DashboardStats> {
    const response = await fetch(`${this.baseUrl}/stats`);

    if (!response.ok) {
      throw new Error("Failed to fetch stats");
    }

    return response.json();
  }

  async createStore(data: Partial<Store>): Promise<Store> {
    const response = await fetch(this.baseUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error("Failed to create store");
    }

    return response.json();
  }

  async updateStore(id: string, data: Partial<Store>): Promise<Store> {
    const response = await fetch(`${this.baseUrl}/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error("Failed to update store");
    }

    return response.json();
  }

  async deleteStore(id: string): Promise<void> {
    const response = await fetch(`${this.baseUrl}/${id}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      throw new Error("Failed to delete store");
    }
  }
}

export const storeService = new StoreService();
