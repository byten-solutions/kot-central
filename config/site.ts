import { PRODUCT, ROUTES } from "./constants";

export type SiteConfig = typeof siteConfig;

export const siteConfig = {
  name: PRODUCT.fullName,
  description: PRODUCT.shortDescription,
  navItems: [
    {
      label: "Dashboard",
      href: ROUTES.dashboard,
    },
    {
      label: "Stores",
      href: ROUTES.stores,
    },
    {
      label: "Analytics",
      href: ROUTES.analytics,
    },
  ],
  navMenuItems: [
    {
      label: "Dashboard",
      href: ROUTES.dashboard,
    },
    {
      label: "Stores",
      href: ROUTES.stores,
    },
    {
      label: "Analytics",
      href: ROUTES.analytics,
    },
    {
      label: "Settings",
      href: ROUTES.settings,
    },
    {
      label: "Logout",
      href: "/api/auth/logout",
    },
  ],
  links: {
    login: ROUTES.login,
  },
};
