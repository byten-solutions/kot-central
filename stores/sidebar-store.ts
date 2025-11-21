import { create } from "zustand";

interface SidebarStore {
  isCollapsed: boolean;
  isOpen: boolean;
  setIsCollapsed: (collapsed: boolean) => void;
  setIsOpen: (open: boolean) => void;
  toggleCollapsed: () => void;
  toggleOpen: () => void;
}

export const useSidebarStore = create<SidebarStore>((set) => ({
  isCollapsed: false,
  isOpen: false,
  setIsCollapsed: (collapsed) => set({ isCollapsed: collapsed }),
  setIsOpen: (open) => set({ isOpen: open }),
  toggleCollapsed: () => set((state) => ({ isCollapsed: !state.isCollapsed })),
  toggleOpen: () => set((state) => ({ isOpen: !state.isOpen })),
}));
