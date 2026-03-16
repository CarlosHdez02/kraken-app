"use client"
import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  PanelLeftClose,
  PanelLeftOpen,
  UserCircle2,
} from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar"

import { sidebarItems } from "@/utils/sidebar-items"
import { cn } from "@/lib/utils"
import Image from "next/image"

export const AppSidebar = () => {
  const pathname = usePathname()

  const { open, toggleSidebar } = useSidebar()

  const userName = "Manuel Focil"

  return (
    <Sidebar
      collapsible="icon"
      variant="sidebar"
      side="left"
      className="border-r border-white/10 bg-neutral-950 text-neutral-100"
    >
      <SidebarHeader className="border-b border-white/10 px-3 py-4">
        <div className="flex items-center justify-between gap-2">
          <div
            className={cn(
              "flex min-w-0 items-center gap-3 transition-all duration-200",
              !open && "justify-center"
            )}
          >
            <div className="relative flex size-11 items-center justify-center overflow-hidden rounded-2xl border border-amber-300/25 bg-white/5 shadow-[0_10px_30px_rgba(0,0,0,0.65)] ring-1 ring-amber-200/10">
              <Image
                src="/kraken.png"
                alt="Kraken's Bay Studio"
                width={44}
                height={44}
                className="object-contain drop-shadow-[0_8px_18px_rgba(0,0,0,0.7)]"
                priority
              />
            </div>

            {open && (
              <div className="min-w-0">
                <p className="truncate text-xs font-semibold tracking-[0.14em] text-amber-200/90 uppercase">
                  Kraken's Bay Studio
                </p>
                <p className="truncate text-[11px] text-neutral-400">
                  Brazilian Jiu-Jiutsu
                </p>
              </div>
            )}
          </div>

          <button
            type="button"
            onClick={toggleSidebar}
            className="inline-flex size-9 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-neutral-300 transition hover:border-amber-300/30 hover:bg-white/10 hover:text-amber-200"
            aria-label={open ? "Contraer sidebar" : "Expandir sidebar"}
          >
            {open ? (
              <PanelLeftClose className="size-4" />
            ) : (
              <PanelLeftOpen className="size-4" />
            )}
          </button>
        </div>
      </SidebarHeader>

      <SidebarContent className="px-3 py-4">
        <SidebarGroup>
          <SidebarMenu className="space-y-2">
            {sidebarItems.map((item) => {
              const isActive = pathname === item.path

              return (
                <SidebarMenuItem key={item.id}>
                  <SidebarMenuButton asChild tooltip={item.label}>
                    <Link
                      href={item.path}
                      className={cn(
                        "group flex items-center gap-3 rounded-2xl px-3 py-3 text-sm font-medium transition-all duration-200",
                        "border border-transparent text-neutral-300 hover:border-white/10 hover:bg-white/5 hover:text-white",
                        isActive &&
                          "border-amber-300/20 bg-linear-to-r from-amber-300/15 via-amber-200/10 to-transparent text-amber-100 shadow-[0_0_24px_rgba(251,191,36,0.08)]"
                      )}
                    >
                      <item.icon
                        className={cn(
                          "size-4 shrink-0 transition-colors",
                          isActive
                            ? "text-amber-300"
                            : "text-neutral-400 group-hover:text-amber-200"
                        )}
                      />
                      <span className="truncate">{item.label}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              )
            })}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="border-t border-white/10 p-3">
        <div
          className={cn(
            "flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-3 py-3",
            !open && "justify-center px-2"
          )}
        >
          <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-linear-to-br from-amber-300/20 to-white/10 ring-1 ring-amber-200/20">
            <UserCircle2 className="size-5 text-amber-200" />
          </div>

          {open && (
            <div className="min-w-0">
              <p className="truncate text-sm font-medium text-neutral-100">
                {userName}
              </p>
              <p className="truncate text-xs text-neutral-400">
                Administrador
              </p>
            </div>
          )}
        </div>
      </SidebarFooter>
    </Sidebar>
  )
}
