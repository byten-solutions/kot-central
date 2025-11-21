"use client";

import { Button } from "@heroui/button";
import { useRouter } from "next/navigation";

interface LogoutButtonProps {
  variant?: "solid" | "flat" | "text";
}

export default function LogoutButton({ variant = "flat" }: LogoutButtonProps) {
  const router = useRouter();

  const handleLogout = async () => {
    // Clear mock auth cookie
    document.cookie = "auth-token=; path=/; max-age=0";

    router.push("/login");
    router.refresh();
  };

  if (variant === "text") {
    return (
      <span onClick={handleLogout} className="cursor-pointer w-full">
        Logout
      </span>
    );
  }

  return (
    <Button color="danger" variant={variant} onPress={handleLogout}>
      Logout
    </Button>
  );
}
