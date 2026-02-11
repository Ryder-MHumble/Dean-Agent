"use client"

import { useState } from "react"
import {
  LayoutDashboard,
  Radar,
  Building2,
  Users,
  Calendar,
  Search,
  Bell,
  HelpCircle,
  ChevronDown,
  Settings,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"

const navItems = [
  { id: "dashboard", label: "决策总览", icon: LayoutDashboard },
  { id: "intelligence", label: "情报库", icon: Radar },
  { id: "operations", label: "院内事务", icon: Building2 },
  { id: "policy", label: "政策与人才", icon: Users },
  { id: "schedule", label: "智能日程", icon: Calendar },
]

export default function AppShell({
  activePage,
  onNavigate,
}: {
  activePage: string
  onNavigate: (page: string) => void
}) {
  const [searchFocused, setSearchFocused] = useState(false)

  return (
    <aside className="fixed left-0 top-0 z-40 flex h-screen w-[220px] flex-col border-r border-border bg-white">
      {/* Logo */}
      <div className="flex items-center gap-2.5 px-5 py-5">
        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-500 text-sm font-bold text-white">
          {"智"}
        </div>
        <div>
          <div className="flex items-center gap-1.5">
            <span className="text-[15px] font-semibold text-foreground">
              {"智策"}
              <span className="text-blue-500">{"云端"}</span>
            </span>
          </div>
          <p className="text-[11px] text-muted-foreground">{"院长决策系统"}</p>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 pt-2">
        <div className="space-y-1">
          {navItems.map((item) => {
            const isActive = activePage === item.id
            return (
              <button
                type="button"
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className={cn(
                  "flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                  isActive
                    ? "bg-blue-50 text-blue-600"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                )}
              >
                <item.icon className="h-[18px] w-[18px]" />
                <span>{item.label}</span>
                {item.id === "intelligence" && (
                  <Badge
                    variant="secondary"
                    className="ml-auto h-5 min-w-5 bg-blue-100 px-1.5 text-[10px] text-blue-600"
                  >
                    3
                  </Badge>
                )}
              </button>
            )
          })}
        </div>
      </nav>

      {/* Bottom section */}
      <div className="border-t border-border px-3 py-3">
        <button
          type="button"
          className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
        >
          <Settings className="h-4 w-4" />
          <span>{"系统设置"}</span>
        </button>
      </div>

      {/* Status */}
      <div className="border-t border-border px-4 py-3">
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <div className="h-2 w-2 rounded-full bg-green-500" />
          <span>{"系统状态正常"}</span>
        </div>
        <p className="mt-1 text-[10px] text-muted-foreground/60">
          {"上次同步: 10:42 AM"}
        </p>
      </div>

      {/* User Profile */}
      <div className="border-t border-border px-4 py-3">
        <div className="flex items-center gap-2.5">
          <Avatar className="h-8 w-8">
            <AvatarFallback className="bg-blue-100 text-xs text-blue-700">
              {"陈"}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-foreground truncate">
              {"陈建国 博士"}
            </p>
            <p className="text-[11px] text-muted-foreground">{"执行院长"}</p>
          </div>
          <ChevronDown className="h-4 w-4 text-muted-foreground" />
        </div>
      </div>
    </aside>
  )
}

export function TopBar({ title, subtitle }: { title: string; subtitle?: string }) {
  return (
    <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-border bg-white/80 px-6 backdrop-blur-sm">
      <div>
        <h1 className="text-lg font-semibold text-foreground">{title}</h1>
        {subtitle && (
          <p className="text-xs text-muted-foreground">{subtitle}</p>
        )}
      </div>

      <div className="flex items-center gap-3">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="全局搜索：政策、报告、联系人..."
            className="h-9 w-72 rounded-lg border-border bg-muted/50 pl-9 text-sm"
          />
        </div>

        <button type="button" className="relative rounded-lg p-2 text-muted-foreground hover:bg-muted">
          <Bell className="h-5 w-5" />
          <span className="absolute right-1 top-1 h-2 w-2 rounded-full bg-red-500" />
        </button>

        <button type="button" className="rounded-lg p-2 text-muted-foreground hover:bg-muted">
          <HelpCircle className="h-5 w-5" />
        </button>
      </div>
    </header>
  )
}
