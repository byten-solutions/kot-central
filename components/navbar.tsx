import {
  Navbar as HeroUINavbar,
  NavbarContent,
  NavbarMenu,
  NavbarBrand,
  NavbarItem,
  NavbarMenuItem,
} from "@heroui/navbar";
import { Link } from "@heroui/link";
import { Input } from "@heroui/input";
import { Button } from "@heroui/button";
import { Badge } from "@heroui/badge";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from "@heroui/dropdown";
import { Avatar } from "@heroui/avatar";
import NextLink from "next/link";

import { siteConfig } from "@/config/site";
import { PRODUCT } from "@/config/constants";
import { ThemeSwitch } from "@/components/theme-switch";
import { SearchIcon, Logo } from "@/components/icons";
import { isAuthenticated, getUser } from "@/lib/auth/utils";
import LogoutButton from "@/components/auth/logout-button";
import { AccountMenu } from "@/components/navbar/account-menu";

export const Navbar = async () => {
  const authenticated = await isAuthenticated();
  const user = authenticated ? await getUser() : null;

  // Mock data - replace with actual data from your API
  const notificationCount = 5;
  const orgCount = 3;

  const searchInput = (
    <Input
      aria-label="Search"
      classNames={{
        inputWrapper: "bg-default-100",
        input: "text-sm",
      }}
      labelPlacement="outside"
      placeholder="Search..."
      startContent={
        <SearchIcon className="text-base text-default-400 pointer-events-none flex-shrink-0" />
      }
      type="search"
    />
  );

  return (
    <HeroUINavbar maxWidth="full" position="sticky" className="z-50">
      <NavbarContent className="basis-1/5 sm:basis-full" justify="start">
        <NavbarBrand as="li" className="gap-3 max-w-fit">
          <NextLink className="flex justify-start items-center gap-1" href="/">
            <Logo />
            <p className="font-bold text-inherit">{PRODUCT.name}</p>
          </NextLink>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent
        className="hidden sm:flex basis-1/5 sm:basis-full"
        justify="end"
      >
        <NavbarItem className="hidden lg:flex">
          {authenticated && searchInput}
        </NavbarItem>

        {authenticated && (
          <>
            {/* Organization Count */}
            <NavbarItem className="hidden md:flex">
              <Button
                as={NextLink}
                href="/dashboard/organizations"
                variant="flat"
                size="sm"
                startContent={
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                    />
                  </svg>
                }
              >
                {orgCount} Stores
              </Button>
            </NavbarItem>

            {/* Notifications */}
            <NavbarItem>
              <Badge
                content={notificationCount}
                color="danger"
                shape="circle"
                size="sm"
              >
                <Button
                  isIconOnly
                  variant="light"
                  as={NextLink}
                  href="/dashboard/notifications"
                  aria-label="Notifications"
                >
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                    />
                  </svg>
                </Button>
              </Badge>
            </NavbarItem>

            <NavbarItem className="hidden sm:flex gap-2">
              <ThemeSwitch />
            </NavbarItem>
            
            {/* User Account Menu */}
            <NavbarItem>
              <AccountMenu user={user} />
            </NavbarItem>
          </>
        )}

        {!authenticated && (
          <NavbarItem>
            <Button as={NextLink} color="primary" href="/login" variant="flat">
              Login
            </Button>
          </NavbarItem>
        )}
      </NavbarContent>

      <NavbarMenu>
        {authenticated && (
          <>
            {searchInput}
            <div className="mx-4 mt-2 flex flex-col gap-2">
              {siteConfig.navMenuItems.map((item, index) => (
                <NavbarMenuItem key={`${item}-${index}`}>
                  <Link color="danger" href={item.href} size="lg">
                    {item.label}
                  </Link>
                </NavbarMenuItem>
              ))}
            </div>
          </>
        )}
        {!authenticated && (
          <div className="mx-4 mt-2">
            <NavbarMenuItem>
              <Link color="primary" href="/login" size="lg">
                Login
              </Link>
            </NavbarMenuItem>
          </div>
        )}
      </NavbarMenu>
    </HeroUINavbar>
  );
};
