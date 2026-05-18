"use client"

import { useState } from "react"
import { Eye, EyeOff, ArrowUpRight, ArrowDownLeft, Copy, Plus, Wallet, PiggyBank, TrendingUp, Sparkles } from "lucide-react"
import { cn } from "@/lib/utils"

const accounts = [
  { 
    id: 1, 
    name: "Premium Checking", 
    number: "**** 4829", 
    balance: 1245895.50, 
    currency: "ETB",
    type: "checking",
    icon: Wallet,
    gradient: "from-primary to-accent"
  },
  { 
    id: 2, 
    name: "Savings Account", 
    number: "**** 7391", 
    balance: 892342.25, 
    currency: "ETB",
    type: "savings",
    icon: PiggyBank,
    gradient: "from-accent to-primary/80"
  },
  { 
    id: 3, 
    name: "Investment Portfolio", 
    number: "**** 2847", 
    balance: 4567890.00, 
    currency: "ETB",
    type: "investment",
    icon: TrendingUp,
    gradient: "from-primary/80 to-accent"
  },
]

export function AccountsOverview() {
  const [showBalances, setShowBalances] = useState(true)
  const [copiedId, setCopiedId] = useState<number | null>(null)

  const totalBalance = accounts.reduce((sum, acc) => sum + acc.balance, 0)

  const formatCurrency = (amount: number) => {
    return `ETB ${new Intl.NumberFormat('en-ET', {
      minimumFractionDigits: 2,
    }).format(amount)}`
  }

  const copyAccountNumber = (id: number, number: string) => {
    navigator.clipboard.writeText(number.replace(/\*/g, '1234'))
    setCopiedId(id)
    setTimeout(() => setCopiedId(null), 2000)
  }

  return (
    <div className="space-y-6">
      {/* Total Balance Card */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-primary/20 via-card to-accent/10 border border-primary/20 p-6 lg:p-8">
        <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-accent/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />
        
        <div className="relative">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-primary" />
              <span className="text-sm font-medium text-muted-foreground">Total Portfolio Value</span>
            </div>
            <button 
              onClick={() => setShowBalances(!showBalances)}
              className="p-2 hover:bg-secondary/50 rounded-lg transition-colors"
            >
              {showBalances ? (
                <Eye className="w-5 h-5 text-muted-foreground" />
              ) : (
                <EyeOff className="w-5 h-5 text-muted-foreground" />
              )}
            </button>
          </div>
          
          <div className="mb-6">
            <h2 className="text-3xl lg:text-5xl font-bold text-foreground tracking-tight">
              {showBalances ? formatCurrency(totalBalance) : '••••••••'}
            </h2>
            <div className="flex items-center gap-2 mt-2">
              <span className="inline-flex items-center gap-1 text-sm text-success bg-success/10 px-2 py-1 rounded-full">
                <ArrowUpRight className="w-3 h-3" />
                +12.5%
              </span>
              <span className="text-sm text-muted-foreground">from last month</span>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="flex flex-wrap gap-3">
            <button className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-xl font-medium text-sm hover:bg-primary/90 transition-colors">
              <ArrowUpRight className="w-4 h-4" />
              Send
            </button>
            <button className="flex items-center gap-2 px-4 py-2 bg-secondary text-secondary-foreground rounded-xl font-medium text-sm hover:bg-secondary/80 transition-colors">
              <ArrowDownLeft className="w-4 h-4" />
              Request
            </button>
            <button className="flex items-center gap-2 px-4 py-2 bg-secondary text-secondary-foreground rounded-xl font-medium text-sm hover:bg-secondary/80 transition-colors">
              <Plus className="w-4 h-4" />
              Add Account
            </button>
          </div>
        </div>
      </div>

      {/* Individual Accounts */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {accounts.map((account) => (
          <div 
            key={account.id}
            className="group relative overflow-hidden rounded-xl bg-card border border-border p-5 hover:border-primary/30 transition-all duration-300"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            
            <div className="relative">
              <div className="flex items-start justify-between mb-4">
                <div className={cn(
                  "w-10 h-10 rounded-xl bg-gradient-to-br flex items-center justify-center",
                  account.gradient
                )}>
                  <account.icon className="w-5 h-5 text-primary-foreground" />
                </div>
                <button 
                  onClick={() => copyAccountNumber(account.id, account.number)}
                  className="p-2 hover:bg-secondary rounded-lg transition-colors"
                >
                  {copiedId === account.id ? (
                    <span className="text-xs text-primary">Copied!</span>
                  ) : (
                    <Copy className="w-4 h-4 text-muted-foreground" />
                  )}
                </button>
              </div>

              <p className="text-sm text-muted-foreground">{account.name}</p>
              <p className="text-xs text-muted-foreground/70 mb-3">{account.number}</p>
              
              <p className="text-xl font-bold text-foreground">
                {showBalances ? formatCurrency(account.balance) : '••••••'}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
