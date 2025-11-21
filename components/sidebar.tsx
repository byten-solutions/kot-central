"use client";

import NextLink from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";
import { Button } from "@heroui/button";
import { SIDEBAR_NAV, PRODUCT } from "@/config/constants";
import { useSidebarStore } from "@/stores/sidebar-store";
import {
  Logo,
  DashboardIcon,
  BusinessIcon,
  ProductsIcon,
  MaterialsIcon,
  TemplatesIcon,
  UsersIcon,
  RolesIcon,
  ReportsIcon,
  AnalyticsIcon,
  ApprovalsIcon,
  TransferIcon,
  SyncIcon,
  SupportIcon,
  SettingsIcon,
} from "@/components/icons";

const iconMap: Record<string, JSX.Element> = {
  dashboard: <DashboardIcon />,
  business: <BusinessIcon />,
  products: <ProductsIcon />,
  materials: <MaterialsIcon />,
  templates: <TemplatesIcon />,
  users: <UsersIcon />,
  roles: <RolesIcon />,
  reports: <ReportsIcon />,
  analytics: <AnalyticsIcon />,
  approvals: <ApprovalsIcon />,
  transfer: <TransferIcon />,
  sync: <SyncIcon />,
  support: <SupportIcon />,
  settings: <SettingsIcon />,
};

export const Sidebar = () => {
  const isOpen = useSidebarStore((state) => state.isOpen);
  const isCollapsed = useSidebarStore((state) => state.isCollapsed);
  const setIsOpen = useSidebarStore((state) => state.setIsOpen);
  const toggleCollapsed = useSidebarStore((state) => state.toggleCollapsed);
  const pathname = usePathname();

  const navItems = Object.values(SIDEBAR_NAV);

  return (
    <>
      {/* Mobile Hamburger Button */}
      <Button
        isIconOnly
        className="fixed top-20 left-4 z-50 lg:hidden"
        variant="flat"
        onPress={() => setIsOpen(!isOpen)}
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          {isOpen ? (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          ) : (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          )}
        </svg>
      </Button>

      {/* Desktop Collapse Button */}
      <Button
        isIconOnly
        className={clsx(
          "hidden lg:flex fixed top-1/2 -translate-y-1/2 -translate-x-1/2 z-50 transition-all duration-300",
          "bg-background border border-divider shadow-lg hover:shadow-xl",
          "hover:border-primary/50 hover:bg-default-100",
          isCollapsed ? "left-20" : "left-64"
        )}
        variant="light"
        size="sm"
        radius="full"
        onPress={toggleCollapsed}
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          {isCollapsed ? (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
          ) : (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
          )}
        </svg>
      </Button>

      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={clsx(
          "fixed top-16 left-0 h-[calc(100vh-4rem)] bg-background border-r border-divider z-40 transition-all duration-300 overflow-hidden",
          "lg:translate-x-0",
          isOpen ? "translate-x-0" : "-translate-x-full",
          isCollapsed ? "lg:w-20" : "lg:w-64",
          "w-64"
        )}
      >
        <div className="flex flex-col h-full overflow-y-auto">
          {/* Sidebar Header */}
          <div className={clsx(
            "p-4 border-b border-divider transition-opacity duration-300",
            isCollapsed ? "lg:opacity-0 lg:pointer-events-none" : "opacity-100",
            "lg:hidden"
          )}>
            <div className="flex items-center gap-2">
              <Logo size={24} />
              <span className="font-semibold text-sm">{PRODUCT.name}</span>
            </div>
          </div>

          {/* Navigation Items */}
          <nav className="flex-1 p-4">
            <ul className="space-y-2">
              {navItems.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <li key={item.href}>
                    <NextLink
                      href={item.href}
                      onClick={() => setIsOpen(false)}
                      className={clsx(
                        "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all overflow-hidden",
                        "hover:scale-105",
                        isActive
                          ? "bg-primary text-primary-foreground"
                          : "text-default-700 hover:bg-default-100"
                      )}
                      title={isCollapsed ? item.label : undefined}
                    >
                      <span className="flex-shrink-0 w-5">{iconMap[item.icon]}</span>
                      <span className={clsx(
                        "whitespace-nowrap transition-opacity duration-300",
                        isCollapsed ? "lg:opacity-0 lg:w-0" : "opacity-100"
                      )}>
                        {item.label}
                      </span>
                    </NextLink>
                  </li>
                );
              })}
            </ul>
          </nav>
        </div>
      </aside>

      {/* Sidebar Spacer for Desktop */}
      <div className={clsx(
        "hidden lg:block flex-shrink-0 transition-all duration-300",
        isCollapsed ? "w-20" : "w-64"
      )} />
    </>
  );
};
