import { PRODUCT, ROUTES } from "./constants";

export type SiteConfig = typeof siteConfig;

export const siteConfig = {
  name: PRODUCT.fullName,
  description: PRODUCT.shortDescription,
  navItems: [],
  navMenuItems: [
    {
      label: "Logout",
      href: "/api/auth/logout",
    },
  ],
  links: {
    login: ROUTES.login,
  },
};
