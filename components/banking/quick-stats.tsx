"use client"

import { ArrowUpRight, TrendingUp, Target, Zap } from "lucide-react"

const quickStats = [
  { 
    label: "Monthly Spending", 
    value: "ETB 68,452", 
    change: "+12.5%", 
    trend: "up",
    icon: ArrowUpRight 
  },
  { 
    label: "Savings Goal", 
    value: "68%", 
    change: "ETB 136,000 / ETB 200,000", 
    trend: "up",
    icon: Target 
  },
  { 
    label: "Investment Returns", 
    value: "+ETB 123,450", 
    change: "+8.3% YTD", 
    trend: "up",
    icon: TrendingUp 
  },
  { 
    label: "Rewards Points", 
    value: "45,230", 
    change: "+2,340 this month", 
    trend: "up",
    icon: Zap 
  },
]

export function QuickStats() {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {quickStats.map((stat, index) => (
        <div 
          key={index}
          className="bg-card border border-border rounded-xl p-4 hover:border-primary/30 transition-colors"
        >
          <div className="flex items-center justify-between mb-3">
            <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
              <stat.icon className="w-4 h-4 text-primary" />
            </div>
          </div>
          <p className="text-xs text-muted-foreground mb-1">{stat.label}</p>
          <p className="text-xl font-bold text-foreground">{stat.value}</p>
          <p className="text-xs text-success mt-1">{stat.change}</p>
        </div>
      ))}
    </div>
  )
}
