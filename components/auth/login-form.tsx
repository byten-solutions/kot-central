"use client";

import { useState } from "react";
import { Input } from "@heroui/input";
import { Button } from "@heroui/button";
import { useRouter } from "next/navigation";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Mock authentication - always succeed
    await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulate API call

    // Set a mock auth cookie
    document.cookie = `auth-token=mock-token-${Date.now()}; path=/; max-age=${60 * 60 * 24 * 7}`;

    router.push("/dashboard");
    router.refresh();
  };

  return (
    <form onSubmit={handleLogin} className="flex flex-col gap-4">
      <Input
        label="Email"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        isRequired
        autoComplete="email"
        placeholder="Enter any email"
      />
      <Input
        label="Password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
        isRequired
        autoComplete="current-password"
        placeholder="Enter any password"
      />
      <Button
        color="primary"
        type="submit"
        isLoading={loading}
        className="w-full"
      >
        Login
      </Button>
    </form>
  );
}
