"use client"

import { ArrowUpRight, ArrowDownLeft, ShoppingBag, Coffee, Zap, Building2, MoreHorizontal } from "lucide-react"
import { cn } from "@/lib/utils"

const transactions = [
  {
    id: 1,
    title: "DSTV Subscription",
    category: "Entertainment",
    amount: -1599,
    date: "Today, 2:34 PM",
    icon: Zap,
    iconBg: "bg-red-500/20",
    iconColor: "text-red-400"
  },
  {
    id: 2,
    title: "Salary from Ethio Telecom",
    category: "Income",
    amount: 85000,
    date: "Today, 9:00 AM",
    icon: Building2,
    iconBg: "bg-success/20",
    iconColor: "text-success"
  },
  {
    id: 3,
    title: "Sheger Shopping Center",
    category: "Shopping",
    amount: -23450,
    date: "Yesterday, 6:12 PM",
    icon: ShoppingBag,
    iconBg: "bg-orange-500/20",
    iconColor: "text-orange-400"
  },
  {
    id: 4,
    title: "Tomoca Coffee",
    category: "Food & Drink",
    amount: -845,
    date: "Yesterday, 8:30 AM",
    icon: Coffee,
    iconBg: "bg-amber-500/20",
    iconColor: "text-amber-400"
  },
  {
    id: 5,
    title: "Transfer from Tigist Haile",
    category: "Transfer",
    amount: 50000,
    date: "Tahsas 15, 3:45 PM",
    icon: ArrowDownLeft,
    iconBg: "bg-primary/20",
    iconColor: "text-primary"
  },
  {
    id: 6,
    title: "Ethiopian Electric Utility",
    category: "Utilities",
    amount: -1250,
    date: "Tahsas 14, 11:20 AM",
    icon: Zap,
    iconBg: "bg-blue-500/20",
    iconColor: "text-blue-400"
  },
]

export function RecentTransactions() {
  const formatCurrency = (amount: number) => {
    const formatted = new Intl.NumberFormat('en-ET', {
      minimumFractionDigits: 2,
    }).format(Math.abs(amount))
    
    return amount < 0 ? `-ETB ${formatted}` : `+ETB ${formatted}`
  }

  return (
    <div className="bg-card border border-border rounded-2xl overflow-hidden">
      <div className="p-5 border-b border-border flex items-center justify-between">
        <div>
          <h3 className="font-semibold text-foreground">Recent Transactions</h3>
          <p className="text-sm text-muted-foreground">Your latest financial activity</p>
        </div>
        <button className="text-sm text-primary font-medium hover:underline">
          View All
        </button>
      </div>

      <div className="divide-y divide-border">
        {transactions.map((transaction) => (
          <div 
            key={transaction.id}
            className="flex items-center justify-between p-4 hover:bg-secondary/30 transition-colors cursor-pointer"
          >
            <div className="flex items-center gap-4">
              <div className={cn(
                "w-10 h-10 rounded-xl flex items-center justify-center",
                transaction.iconBg
              )}>
                <transaction.icon className={cn("w-5 h-5", transaction.iconColor)} />
              </div>
              <div>
                <p className="text-sm font-medium text-foreground">{transaction.title}</p>
                <p className="text-xs text-muted-foreground">{transaction.category} • {transaction.date}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <span className={cn(
                "text-sm font-semibold",
                transaction.amount > 0 ? "text-success" : "text-foreground"
              )}>
                {formatCurrency(transaction.amount)}
              </span>
              <button className="p-1 hover:bg-secondary rounded-lg transition-colors">
                <MoreHorizontal className="w-4 h-4 text-muted-foreground" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
