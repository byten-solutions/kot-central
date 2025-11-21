"use client";

import { Avatar } from "@heroui/avatar";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  DropdownSection,
} from "@heroui/dropdown";
import { useRouter } from "next/navigation";
import { User } from "@heroui/user";

interface AccountMenuProps {
  user: {
    name: string;
    email: string;
  } | null;
}

export function AccountMenu({ user }: AccountMenuProps) {
  const router = useRouter();

  const handleLogout = () => {
    document.cookie = "auth-token=; path=/; max-age=0";
    router.push("/login");
    router.refresh();
  };

  return (
    <Dropdown placement="bottom-end">
      <DropdownTrigger>
        <Avatar
          as="button"
          className="transition-transform cursor-pointer"
          size="sm"
          name={user?.name || "User"}
          showFallback
        />
      </DropdownTrigger>
      <DropdownMenu aria-label="Profile Actions" variant="flat">
        <DropdownSection showDivider>
          <DropdownItem key="profile" isReadOnly className="h-14 gap-2 opacity-100">
            <User
              name={user?.name}
              description={user?.email}
              classNames={{
                name: "text-default-600 font-semibold",
                description: "text-default-500 text-xs",
              }}
              avatarProps={{
                size: "sm",
                name: user?.name,
              }}
            />
          </DropdownItem>
        </DropdownSection>
        <DropdownItem
          key="settings"
          onPress={() => router.push("/dashboard/settings")}
        >
          Settings
        </DropdownItem>
        <DropdownItem
          key="help"
          onPress={() => router.push("/dashboard/support")}
        >
          Help & Support
        </DropdownItem>
        <DropdownItem
          key="logout"
          color="danger"
          className="text-danger"
          onPress={handleLogout}
        >
          Logout
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
}
