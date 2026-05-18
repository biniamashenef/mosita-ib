"use client"

import { useState } from "react"
import { 
  TrendingUp, TrendingDown, ArrowUpRight, ArrowDownLeft, 
  DollarSign, CreditCard, ShoppingBag, Coffee, Zap, Building2,
  Calendar, PieChart, BarChart3
} from "lucide-react"
import { PieChart as RechartsPieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Legend, LineChart, Line, CartesianGrid } from "recharts"
import { cn } from "@/lib/utils"

const monthlyData = [
  { month: "Hamle", income: 85000, expenses: 42000 },
  { month: "Nehase", income: 85000, expenses: 51000 },
  { month: "Meskerem", income: 92000, expenses: 48000 },
  { month: "Tikimit", income: 85000, expenses: 46000 },
  { month: "Hidar", income: 85000, expenses: 55000 },
  { month: "Tahsas", income: 102000, expenses: 68000 },
]

const spendingByCategory = [
  { name: "Housing", value: 25000, color: "oklch(0.75 0.15 85)", icon: Building2 },
  { name: "Shopping", value: 12000, color: "oklch(0.65 0.12 85)", icon: ShoppingBag },
  { name: "Food & Dining", value: 8500, color: "oklch(0.55 0.10 85)", icon: Coffee },
  { name: "Utilities", value: 4500, color: "oklch(0.70 0.08 160)", icon: Zap },
  { name: "Transportation", value: 3800, color: "oklch(0.45 0.05 85)", icon: CreditCard },
  { name: "Entertainment", value: 3200, color: "oklch(0.60 0.15 25)", icon: TrendingUp },
]

const weeklySpending = [
  { day: "Mon", amount: 1250 },
  { day: "Tue", amount: 890 },
  { day: "Wed", amount: 2450 },
  { day: "Thu", amount: 1560 },
  { day: "Fri", amount: 3120 },
  { day: "Sat", amount: 4780 },
  { day: "Sun", amount: 1950 },
]

export function AnalyticsSection() {
  const [selectedPeriod, setSelectedPeriod] = useState("This Month")
  const periods = ["This Week", "This Month", "This Quarter", "This Year"]

  const totalIncome = monthlyData[monthlyData.length - 1].income
  const totalExpenses = monthlyData[monthlyData.length - 1].expenses
  const netSavings = totalIncome - totalExpenses
  const savingsRate = ((netSavings / totalIncome) * 100).toFixed(1)

  const formatCurrency = (amount: number) => {
    return `ETB ${new Intl.NumberFormat('en-ET', {
      minimumFractionDigits: 0,
    }).format(amount)}`
  }

  return (
    <div className="space-y-6">
      {/* Summary Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-card border border-border rounded-xl p-5">
          <div className="flex items-center justify-between mb-4">
            <div className="w-10 h-10 rounded-xl bg-success/20 flex items-center justify-center">
              <ArrowDownLeft className="w-5 h-5 text-success" />
            </div>
            <span className="text-xs text-success bg-success/10 px-2 py-1 rounded-full">+8.2%</span>
          </div>
          <p className="text-sm text-muted-foreground mb-1">Total Income</p>
          <p className="text-2xl font-bold text-foreground">{formatCurrency(totalIncome)}</p>
        </div>
        
        <div className="bg-card border border-border rounded-xl p-5">
          <div className="flex items-center justify-between mb-4">
            <div className="w-10 h-10 rounded-xl bg-destructive/20 flex items-center justify-center">
              <ArrowUpRight className="w-5 h-5 text-destructive" />
            </div>
            <span className="text-xs text-destructive bg-destructive/10 px-2 py-1 rounded-full">+23.6%</span>
          </div>
          <p className="text-sm text-muted-foreground mb-1">Total Expenses</p>
          <p className="text-2xl font-bold text-foreground">{formatCurrency(totalExpenses)}</p>
        </div>
        
        <div className="bg-card border border-border rounded-xl p-5">
          <div className="flex items-center justify-between mb-4">
            <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center">
              <DollarSign className="w-5 h-5 text-primary" />
            </div>
            <span className="text-xs text-primary bg-primary/10 px-2 py-1 rounded-full">{savingsRate}%</span>
          </div>
          <p className="text-sm text-muted-foreground mb-1">Net Savings</p>
          <p className="text-2xl font-bold text-foreground">{formatCurrency(netSavings)}</p>
        </div>
        
        <div className="bg-card border border-border rounded-xl p-5">
          <div className="flex items-center justify-between mb-4">
            <div className="w-10 h-10 rounded-xl bg-accent/20 flex items-center justify-center">
              <CreditCard className="w-5 h-5 text-accent" />
            </div>
          </div>
          <p className="text-sm text-muted-foreground mb-1">Transactions</p>
          <p className="text-2xl font-bold text-foreground">156</p>
        </div>
      </div>

      {/* Period Selector */}
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-foreground">Financial Overview</h2>
        <div className="flex gap-1 bg-secondary rounded-lg p-1">
          {periods.map((period) => (
            <button
              key={period}
              onClick={() => setSelectedPeriod(period)}
              className={cn(
                "px-3 py-1.5 text-xs font-medium rounded-md transition-colors",
                selectedPeriod === period
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              {period}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Income vs Expenses Chart */}
        <div className="lg:col-span-2 bg-card border border-border rounded-2xl p-6">
          <h3 className="font-semibold text-foreground mb-4">Income vs Expenses</h3>
          
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={monthlyData} barGap={8}>
                <CartesianGrid strokeDasharray="3 3" stroke="oklch(0.28 0.03 70)" />
                <XAxis 
                  dataKey="month" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: 'oklch(0.65 0.04 85)', fontSize: 12 }}
                />
                <YAxis 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: 'oklch(0.65 0.04 85)', fontSize: 12 }}
                  tickFormatter={(value) => `${(value / 1000)}k`}
                />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'oklch(0.16 0.015 70)', 
                    border: '1px solid oklch(0.28 0.03 70)',
                    borderRadius: '8px',
                    color: 'oklch(0.95 0.02 85)'
                  }}
                  formatter={(value: number) => [formatCurrency(value)]}
                />
                <Bar dataKey="income" fill="oklch(0.70 0.15 145)" radius={[4, 4, 0, 0]} name="Income" />
                <Bar dataKey="expenses" fill="oklch(0.75 0.15 85)" radius={[4, 4, 0, 0]} name="Expenses" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="flex justify-center gap-6 mt-4">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full" style={{ backgroundColor: "oklch(0.70 0.15 145)" }} />
              <span className="text-sm text-muted-foreground">Income</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full" style={{ backgroundColor: "oklch(0.75 0.15 85)" }} />
              <span className="text-sm text-muted-foreground">Expenses</span>
            </div>
          </div>
        </div>

        {/* Spending by Category */}
        <div className="bg-card border border-border rounded-2xl p-6">
          <h3 className="font-semibold text-foreground mb-4">Spending by Category</h3>
          
          <div className="h-48 mb-4">
            <ResponsiveContainer width="100%" height="100%">
              <RechartsPieChart>
                <Pie
                  data={spendingByCategory}
                  cx="50%"
                  cy="50%"
                  innerRadius={40}
                  outerRadius={70}
                  paddingAngle={2}
                  dataKey="value"
                >
                  {spendingByCategory.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
              </RechartsPieChart>
            </ResponsiveContainer>
          </div>

          <div className="space-y-3">
            {spendingByCategory.slice(0, 4).map((item, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div 
                    className="w-8 h-8 rounded-lg flex items-center justify-center"
                    style={{ backgroundColor: `${item.color}20` }}
                  >
                    <item.icon className="w-4 h-4" style={{ color: item.color }} />
                  </div>
                  <span className="text-sm text-muted-foreground">{item.name}</span>
                </div>
                <span className="text-sm font-medium text-foreground">{formatCurrency(item.value)}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Weekly Spending Trend */}
      <div className="bg-card border border-border rounded-2xl p-6">
        <h3 className="font-semibold text-foreground mb-4">Weekly Spending Trend</h3>
        
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={weeklySpending}>
              <CartesianGrid strokeDasharray="3 3" stroke="oklch(0.28 0.03 70)" />
              <XAxis 
                dataKey="day" 
                axisLine={false} 
                tickLine={false} 
                tick={{ fill: 'oklch(0.65 0.04 85)', fontSize: 12 }}
              />
              <YAxis 
                axisLine={false} 
                tickLine={false} 
                tick={{ fill: 'oklch(0.65 0.04 85)', fontSize: 12 }}
                tickFormatter={(value) => `${value}`}
              />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'oklch(0.16 0.015 70)', 
                  border: '1px solid oklch(0.28 0.03 70)',
                  borderRadius: '8px',
                  color: 'oklch(0.95 0.02 85)'
                }}
                formatter={(value: number) => [formatCurrency(value), "Spent"]}
              />
              <Line 
                type="monotone" 
                dataKey="amount" 
                stroke="oklch(0.75 0.15 85)" 
                strokeWidth={3}
                dot={{ fill: "oklch(0.75 0.15 85)", strokeWidth: 2, r: 4 }}
                activeDot={{ r: 6, fill: "oklch(0.85 0.12 85)" }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="grid grid-cols-3 gap-4 mt-4 pt-4 border-t border-border">
          <div className="text-center">
            <p className="text-sm text-muted-foreground">Daily Average</p>
            <p className="text-lg font-semibold text-foreground">ETB 2,286</p>
          </div>
          <div className="text-center">
            <p className="text-sm text-muted-foreground">Highest Day</p>
            <p className="text-lg font-semibold text-foreground">Saturday</p>
          </div>
          <div className="text-center">
            <p className="text-sm text-muted-foreground">Lowest Day</p>
            <p className="text-lg font-semibold text-foreground">Tuesday</p>
          </div>
        </div>
      </div>
    </div>
  )
}
