"use client"

import { useState } from "react"
import {
  Home,
  ArrowLeftRight,
  CreditCard,
  Receipt,
  TrendingUp,
  Settings,
  Bell,
  Search,
  Menu,
  X,
  ChevronRight,
  Send,
  Download,
  Plus,
  Eye,
  EyeOff,
  Wallet,
  PiggyBank,
  Building2,
  Smartphone,
  Shield,
  HelpCircle,
  LogOut,
  User,
  Globe,
  Zap,
  Target,
  BarChart3,
  ArrowUpRight,
  ArrowDownLeft,
  Copy,
  QrCode,
  Sparkles,
} from "lucide-react"
import { cn } from "@/lib/utils"

interface SidebarProps {
  activeTab: string
  setActiveTab: (tab: string) => void
  isMobileOpen: boolean
  setIsMobileOpen: (open: boolean) => void
}

const menuItems = [
  { id: "dashboard", label: "Dashboard", icon: Home },
  { id: "transfers", label: "Transfers", icon: ArrowLeftRight },
  { id: "cards", label: "Cards", icon: CreditCard },
  { id: "payments", label: "Payments", icon: Receipt },
  { id: "investments", label: "Investments", icon: TrendingUp },
  { id: "analytics", label: "Analytics", icon: BarChart3 },
]

const secondaryItems = [
  { id: "settings", label: "Settings", icon: Settings },
  { id: "help", label: "Help & Support", icon: HelpCircle },
]

export function Sidebar({ activeTab, setActiveTab, isMobileOpen, setIsMobileOpen }: SidebarProps) {
  return (
    <>
      {/* Mobile Overlay */}
      {isMobileOpen && (
        <div 
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setIsMobileOpen(false)}
        />
      )}
      
      {/* Sidebar */}
      <aside className={cn(
        "fixed left-0 top-0 h-full w-72 bg-sidebar border-r border-sidebar-border z-50 transition-transform duration-300 ease-out",
        "lg:translate-x-0",
        isMobileOpen ? "translate-x-0" : "-translate-x-full"
      )}>
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="p-6 border-b border-sidebar-border">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                  <Sparkles className="w-5 h-5 text-primary-foreground" />
                </div>
                <div>
                  <h1 className="text-xl font-bold text-foreground tracking-tight">Mosita IB</h1>
                  <p className="text-xs text-muted-foreground">Internet Banking</p>
                </div>
              </div>
              <button 
                className="lg:hidden p-2 hover:bg-sidebar-accent rounded-lg transition-colors"
                onClick={() => setIsMobileOpen(false)}
              >
                <X className="w-5 h-5 text-muted-foreground" />
              </button>
            </div>
          </div>

          {/* Main Menu */}
          <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
            <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider px-3 mb-3">Main Menu</p>
            {menuItems.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  setActiveTab(item.id)
                  setIsMobileOpen(false)
                }}
                className={cn(
                  "w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200",
                  activeTab === item.id
                    ? "bg-gradient-to-r from-primary/20 to-primary/5 text-primary border border-primary/20"
                    : "text-muted-foreground hover:text-foreground hover:bg-sidebar-accent"
                )}
              >
                <item.icon className={cn(
                  "w-5 h-5 transition-colors",
                  activeTab === item.id ? "text-primary" : ""
                )} />
                {item.label}
                {activeTab === item.id && (
                  <ChevronRight className="w-4 h-4 ml-auto text-primary" />
                )}
              </button>
            ))}

            <div className="pt-6">
              <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider px-3 mb-3">Support</p>
              {secondaryItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveTab(item.id)
                    setIsMobileOpen(false)
                  }}
                  className={cn(
                    "w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200",
                    activeTab === item.id
                      ? "bg-gradient-to-r from-primary/20 to-primary/5 text-primary border border-primary/20"
                      : "text-muted-foreground hover:text-foreground hover:bg-sidebar-accent"
                  )}
                >
                  <item.icon className="w-5 h-5" />
                  {item.label}
                </button>
              ))}
            </div>
          </nav>

          {/* User Profile */}
          <div className="p-4 border-t border-sidebar-border">
            <div className="flex items-center gap-3 p-3 rounded-xl bg-sidebar-accent/50">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                <User className="w-5 h-5 text-primary-foreground" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-foreground truncate">Abebe Kebede</p>
                <p className="text-xs text-muted-foreground">Premium Member</p>
              </div>
              <button className="p-2 hover:bg-sidebar-accent rounded-lg transition-colors">
                <LogOut className="w-4 h-4 text-muted-foreground" />
              </button>
            </div>
          </div>
        </div>
      </aside>
    </>
  )
}

export { menuItems, secondaryItems }
