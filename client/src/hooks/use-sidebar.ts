import { useContext } from "react";
import { SidebarContext } from "../providers/sidebar-provider";

export const useSidebar = () => {
  const ctx = useContext(SidebarContext);

  if (!ctx) {
    throw new Error("useSidebar must be used within a SidebarProvider");
  }

  return ctx;
};
