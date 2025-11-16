"use client";

import { Button } from "@heroui/button";
import { useRouter } from "next/navigation";

export default function LogoutButton() {
  const router = useRouter();

  const handleLogout = async () => {
    // Clear mock auth cookie
    document.cookie = "auth-token=; path=/; max-age=0";

    router.push("/login");
    router.refresh();
  };

  return (
    <Button color="danger" variant="flat" onPress={handleLogout}>
      Logout
    </Button>
  );
}
