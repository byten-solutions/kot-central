export const COMPANY = {
  name: "byten",
  fullName: "byten Technologies",
  tagline: "Restaurant Management Platform",
  year: new Date().getFullYear(),
} as const;

export const PRODUCT = {
  name: "bytePOS",
  fullName: "bytePOS Central Management System",
  shortDescription: "Centralized management system for all stores",
} as const;

export const ROUTES = {
  home: "/",
  login: "/login",
  dashboard: "/dashboard",
  stores: "/dashboard/stores",
  analytics: "/dashboard/analytics",
  settings: "/dashboard/settings",
} as const;

export const STATS = {
  uptime: "99.9%",
  restaurants: "500+",
  dailyOrders: "50K+",
} as const;

export const FEATURES = {
  realTimeMonitoring: {
    title: "Real-Time Monitoring",
    description: "Track all store operations and orders in real-time",
  },
  multiStore: {
    title: "Multi-Store Control",
    description: "Manage all locations from a single dashboard",
  },
  analytics: {
    title: "Analytics & Reports",
    description: "Comprehensive insights and performance reports",
  },
} as const;

export const SOCIAL = {
  email: "contact@byten.com",
  phone: "+1 (555) 123-4567",
  twitter: "https://twitter.com/byten",
  linkedin: "https://linkedin.com/company/byten",
} as const;
