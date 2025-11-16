import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function getUser() {
  try {
    const cookieStore = await cookies();
    const authToken = cookieStore.get("auth-token");
    
    if (!authToken) return null;
    
    // Mock user object
    return {
      id: "mock-user-id",
      email: "admin@bytepos.com",
      name: "Admin User",
      role: "admin",
    };
  } catch {
    return null;
  }
}

export async function requireAuth() {
  const user = await getUser();
  
  if (!user) {
    redirect("/login");
  }
  
  return user;
}

export async function requireGuest() {
  const user = await getUser();
  
  if (user) {
    redirect("/dashboard");
  }
}

export async function isAuthenticated(): Promise<boolean> {
  const user = await getUser();
  return !!user;
}

// Check if user has specific role
export async function hasRole(role: string): Promise<boolean> {
  const user = await getUser();
  if (!user) return false;
  
  return user.role === role;
}

export async function isAdmin(): Promise<boolean> {
  return hasRole("admin");
}
