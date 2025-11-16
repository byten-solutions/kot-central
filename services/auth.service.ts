class AuthService {
  private baseUrl = "/api/auth";

  async login(email: string, password: string): Promise<void> {
    const response = await fetch(`${this.baseUrl}/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || "Login failed");
    }

    return response.json();
  }

  async logout(): Promise<void> {
    const response = await fetch(`${this.baseUrl}/logout`, {
      method: "POST",
    });

    if (!response.ok) {
      throw new Error("Logout failed");
    }
  }

  async getCurrentUser(): Promise<any> {
    const response = await fetch(`${this.baseUrl}/user`);

    if (!response.ok) {
      return null;
    }

    return response.json();
  }
}

export const authService = new AuthService();
