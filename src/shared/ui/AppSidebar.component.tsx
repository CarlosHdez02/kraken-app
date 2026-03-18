"use client"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { UserCircle2 } from "lucide-react"

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
  const { open, setOpen, isMobile } = useSidebar()
  const userName = "Manuel Focil"

  return (
    <Sidebar
      collapsible="icon"
      variant="sidebar"
      side="left"
      className="border-r border-white/10 bg-neutral-950 text-neutral-100"
      onMouseEnter={() => {
        if (!isMobile) setOpen(true)
      }}
      onMouseLeave={() => {
        if (!isMobile) setOpen(false)
      }}
    >
      <SidebarHeader className="border-b border-white/10 px-3 py-3">
        <div
          className={cn(
            "flex w-full min-w-0 items-center gap-3 transition-all duration-300 ease-in-out",
            open ? "justify-start" : "justify-center"
          )}
        >
            {/*
              Logo badge — mirrors the actual circular logo:
              ① Soft amber glow behind everything
              ② Thin cyan/sky outer ring  (matches the blue edge on the real badge)
              ③ Gold gradient ring        (matches the amber band)
              ④ Circular image fill       (no rounded-2xl clipping distortion)
            */}
            <div className="relative shrink-0">
              {/* Ambient glow */}
              <div className="absolute -inset-1 rounded-full bg-amber-400/20 blur-md" />

              {/* Cyan outer edge — 3 px */}
              
              {/* Image — perfectly round, fill mode so the full circular logo shows */}
              <div className="relative size-11 overflow-hidden rounded-full shadow-[0_8px_24px_rgba(0,0,0,0.9),inset_0_1px_0_rgba(255,255,255,0.06)]">
                <Image
                  src="/kraken.png"
                  alt="Kraken's Bay Studio"
                  fill
                  sizes="44px"
                  className="object-cover"
                  priority
                />
              </div>
            </div>

            {open && (
              <div className="min-w-0">
                <p className="truncate text-xs font-semibold tracking-[0.14em] text-amber-200/90 uppercase">
                  Kraken's Bay Studio
                </p>
                <p className="truncate text-[11px] text-neutral-400">
                  Brazilian Jiu-Jitsu
                </p>
              </div>
            )}
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
                          "border-amber-300/20 bg-gradient-to-r from-amber-300/15 via-amber-200/10 to-transparent text-amber-100 shadow-[0_0_24px_rgba(251,191,36,0.08)]"
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
            "flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-3 py-3 transition-all duration-200",
            !open && "justify-center border-none bg-transparent p-0"
          )}
        >
          <div
            className={cn(
              "flex shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-amber-300/20 to-white/10 ring-1 ring-amber-200/20",
              open ? "size-10" : "size-9"
            )}
          >
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