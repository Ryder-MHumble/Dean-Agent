"use client"

import { useState } from "react"
import {
  LayoutDashboard,
  Radar,
  Building2,
  Users,
  Search,
  Bell,
  HelpCircle,
  Settings,
  ChevronLeft,
  ChevronRight,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"

const navItems = [
  { id: "home", label: "院长早报", icon: LayoutDashboard },
  { id: "radar", label: "战略雷达", icon: Radar, badge: 5 },
  { id: "internal", label: "院内事务", icon: Building2 },
  { id: "network", label: "政策与人脉", icon: Users },
]

export default function AppShell({
  activePage,
  onNavigate,
  collapsed: controlledCollapsed,
  onCollapsedChange,
}: {
  activePage: string
  onNavigate: (page: string) => void
  collapsed?: boolean
  onCollapsedChange?: (collapsed: boolean) => void
}) {
  const [internalCollapsed, setInternalCollapsed] = useState(false)
  const collapsed = controlledCollapsed !== undefined ? controlledCollapsed : internalCollapsed

  const handleToggle = () => {
    const newValue = !collapsed
    if (onCollapsedChange) {
      onCollapsedChange(newValue)
    } else {
      setInternalCollapsed(newValue)
    }
  }

  return (
    <aside className={cn(
      "fixed left-0 top-0 z-40 flex h-screen flex-col bg-gradient-to-b from-white to-slate-50/50 border-r border-border/40 transition-all duration-300",
      collapsed ? "w-[70px]" : "w-[220px]"
    )}>
      {/* Logo */}
      <div className="flex items-center gap-2.5 px-5 py-5 relative">
        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 text-sm font-bold text-white flex-shrink-0 shadow-glow-blue">
          {"智"}
        </div>
        {!collapsed && (
          <div className="flex-1">
            <div className="flex items-center gap-1.5">
              <span className="text-[15px] font-semibold text-foreground">
                {"智策"}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-indigo-500">{"云端"}</span>
              </span>
            </div>
            <p className="text-[11px] text-muted-foreground">{"院长决策系统"}</p>
          </div>
        )}
        {/* Collapse toggle */}
        <button
          onClick={handleToggle}
          className="absolute -right-3 top-1/2 -translate-y-1/2 h-6 w-6 rounded-full border border-border/60 bg-white shadow-card hover:shadow-card-hover hover:bg-blue-50 transition-all duration-200 flex items-center justify-center"
        >
          {collapsed ? (
            <ChevronRight className="h-3 w-3 text-muted-foreground" />
          ) : (
            <ChevronLeft className="h-3 w-3 text-muted-foreground" />
          )}
        </button>
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
                  "relative flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all duration-200",
                  collapsed ? "justify-center" : "",
                  isActive
                    ? "bg-blue-50/80 text-blue-600 shadow-sm"
                    : "text-muted-foreground hover:bg-muted/60 hover:text-foreground hover:translate-x-0.5"
                )}
                title={collapsed ? item.label : undefined}
              >
                {/* Active indicator bar */}
                {isActive && (
                  <span className="absolute left-0 top-1/2 -translate-y-1/2 h-6 w-[3px] rounded-full bg-gradient-to-b from-blue-500 to-indigo-500" />
                )}
                <item.icon className={cn("h-[18px] w-[18px] transition-colors", isActive && "text-blue-600")} />
                {!collapsed && (
                  <>
                    <span>{item.label}</span>
                    {item.badge && (
                      <Badge
                        variant="secondary"
                        className={cn(
                          "ml-auto h-5 min-w-5 px-1.5 text-[10px]",
                          isActive
                            ? "bg-blue-100 text-blue-600"
                            : "bg-muted text-muted-foreground"
                        )}
                      >
                        {item.badge}
                      </Badge>
                    )}
                  </>
                )}
                {collapsed && item.badge && (
                  <span className="absolute top-1.5 right-2 h-2 w-2 rounded-full bg-blue-500 animate-pulse-soft" />
                )}
              </button>
            )
          })}
        </div>
      </nav>

      {/* Bottom section */}
      <div className="border-t border-border/30 px-3 py-3">
        <button
          type="button"
          className={cn(
            "flex w-full items-center gap-2 rounded-xl px-3 py-2 text-sm text-muted-foreground transition-all duration-200 hover:bg-muted/60 hover:text-foreground",
            collapsed ? "justify-center" : ""
          )}
          title={collapsed ? "系统设置" : undefined}
        >
          <Settings className="h-4 w-4" />
          {!collapsed && <span>{"系统设置"}</span>}
        </button>
      </div>
    </aside>
  )
}

export function TopBar({ title, subtitle }: { title: string; subtitle?: string }) {
  return (
    <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-border/40 bg-white/70 px-6 backdrop-blur-md shadow-sm">
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
            className="h-9 w-72 rounded-xl border-border/50 bg-muted/30 pl-9 text-sm transition-all duration-200 focus:bg-white focus:shadow-sm focus:border-blue-200"
          />
        </div>

        <button type="button" className="relative rounded-xl p-2 text-muted-foreground hover:bg-muted/60 transition-colors">
          <Bell className="h-5 w-5" />
          <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-red-500" />
          <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-red-500 animate-ping opacity-75" />
        </button>

        <button type="button" className="rounded-xl p-2 text-muted-foreground hover:bg-muted/60 transition-colors">
          <HelpCircle className="h-5 w-5" />
        </button>
      </div>
    </header>
  )
}
