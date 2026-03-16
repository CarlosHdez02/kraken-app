"use client";

import { SidebarProvider } from "@/components/ui/sidebar";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster } from "sonner";

export const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <SidebarProvider>
    <TooltipProvider delayDuration={200}>
      {children}
      <Toaster position="top-right" richColors theme="dark" />
    </TooltipProvider>
  </SidebarProvider>
  );
};
