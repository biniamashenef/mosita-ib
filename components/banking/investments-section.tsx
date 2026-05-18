"use client"

import { useState } from "react"
import { 
  TrendingUp, TrendingDown, Briefcase, BarChart3, PieChart, 
  DollarSign, ArrowUpRight, ArrowDownLeft, Plus, ChevronRight,
  Zap, Globe, Building2, Coins
} from "lucide-react"
import { PieChart as RechartsPieChart, Pie, Cell, ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, Area, AreaChart } from "recharts"
import { cn } from "@/lib/utils"

const portfolioData = [
  { name: "Ethiopian Bonds", value: 45, color: "oklch(0.75 0.15 85)", amount: 2053540.50 },
  { name: "Safaricom ETF", value: 25, color: "oklch(0.65 0.12 85)", amount: 1140862.50 },
  { name: "Real Estate", value: 15, color: "oklch(0.55 0.10 85)", amount: 684517.50 },
  { name: "Gold Investment", value: 10, color: "oklch(0.70 0.08 160)", amount: 456345.00 },
  { name: "Cash", value: 5, color: "oklch(0.45 0.05 85)", amount: 228172.50 },
]

const performanceData = [
  { month: "Meskerem", value: 3800000 },
  { month: "Tikimit", value: 3950000 },
  { month: "Hidar", value: 3850000 },
  { month: "Tahsas", value: 4200000 },
  { month: "Tir", value: 4350000 },
  { month: "Yekatit", value: 4450000 },
  { month: "Megabit", value: 4300000 },
  { month: "Miyazia", value: 4550000 },
  { month: "Ginbot", value: 4700000 },
  { month: "Sene", value: 4650000 },
  { month: "Hamle", value: 4800000 },
  { month: "Nehase", value: 4563438 },
]

const holdings = [
  { symbol: "EABL", name: "East African Breweries", shares: 150, price: 18984, change: 234, changePercent: 1.25 },
  { symbol: "SAFCOM", name: "Safaricom PLC", shares: 50, price: 13969, change: -123, changePercent: -0.87 },
  { symbol: "ETHTEL", name: "Ethio Telecom Shares", shares: 100, price: 37451, change: 456, changePercent: 1.23 },
  { symbol: "ETAIR", name: "Ethiopian Airlines", shares: 75, price: 15342, change: 289, changePercent: 1.92 },
  { symbol: "AWASH", name: "Awash Bank", shares: 40, price: 49522, change: 1234, changePercent: 2.56 },
]

export function InvestmentsSection() {
  const [selectedPeriod, setSelectedPeriod] = useState("1Y")
  const periods = ["1W", "1M", "3M", "6M", "1Y", "ALL"]

  const totalPortfolio = portfolioData.reduce((sum, item) => sum + item.amount, 0)
  const totalChange = 123456.70
  const totalChangePercent = 2.78

  const formatCurrency = (amount: number) => {
    return `ETB ${new Intl.NumberFormat('en-ET', {
      minimumFractionDigits: 2,
    }).format(amount)}`
  }

  return (
    <div className="space-y-6">
      {/* Portfolio Summary */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Total Portfolio Value */}
        <div className="lg:col-span-2 bg-card border border-border rounded-2xl p-6">
          <div className="flex items-start justify-between mb-6">
            <div>
              <p className="text-sm text-muted-foreground mb-1">Total Portfolio Value</p>
              <h2 className="text-3xl font-bold text-foreground">{formatCurrency(totalPortfolio)}</h2>
              <div className="flex items-center gap-2 mt-1">
                <span className={cn(
                  "inline-flex items-center gap-1 text-sm px-2 py-0.5 rounded-full",
                  totalChange > 0 ? "text-success bg-success/10" : "text-destructive bg-destructive/10"
                )}>
                  {totalChange > 0 ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                  {totalChange > 0 ? "+" : ""}{formatCurrency(totalChange)} ({totalChangePercent}%)
                </span>
                <span className="text-sm text-muted-foreground">Today</span>
              </div>
            </div>

            {/* Period Selector */}
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

          {/* Performance Chart */}
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={performanceData}>
                <defs>
                  <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="oklch(0.75 0.15 85)" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="oklch(0.75 0.15 85)" stopOpacity={0}/>
                  </linearGradient>
                </defs>
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
                  tickFormatter={(value) => `${(value / 1000000).toFixed(1)}M`}
                />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'oklch(0.16 0.015 70)', 
                    border: '1px solid oklch(0.28 0.03 70)',
                    borderRadius: '8px',
                    color: 'oklch(0.95 0.02 85)'
                  }}
                  formatter={(value: number) => [formatCurrency(value), "Value"]}
                />
                <Area 
                  type="monotone" 
                  dataKey="value" 
                  stroke="oklch(0.75 0.15 85)" 
                  strokeWidth={2}
                  fill="url(#colorValue)" 
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Asset Allocation */}
        <div className="bg-card border border-border rounded-2xl p-6">
          <h3 className="font-semibold text-foreground mb-4">Asset Allocation</h3>
          
          <div className="h-48 mb-4">
            <ResponsiveContainer width="100%" height="100%">
              <RechartsPieChart>
                <Pie
                  data={portfolioData}
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={80}
                  paddingAngle={2}
                  dataKey="value"
                >
                  {portfolioData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
              </RechartsPieChart>
            </ResponsiveContainer>
          </div>

          <div className="space-y-2">
            {portfolioData.map((item, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div 
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: item.color }}
                  />
                  <span className="text-sm text-muted-foreground">{item.name}</span>
                </div>
                <span className="text-sm font-medium text-foreground">{item.value}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[
          { label: "Buy Assets", icon: ArrowUpRight, color: "bg-success/20 text-success" },
          { label: "Sell Assets", icon: ArrowDownLeft, color: "bg-destructive/20 text-destructive" },
          { label: "Transfer", icon: Briefcase, color: "bg-primary/20 text-primary" },
          { label: "Auto-Invest", icon: Zap, color: "bg-accent/20 text-accent" },
        ].map((action, index) => (
          <button
            key={index}
            className="flex items-center gap-3 p-4 bg-card border border-border rounded-xl hover:border-primary/30 transition-colors"
          >
            <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center", action.color)}>
              <action.icon className="w-5 h-5" />
            </div>
            <span className="font-medium text-foreground">{action.label}</span>
          </button>
        ))}
      </div>

      {/* Holdings */}
      <div className="bg-card border border-border rounded-2xl overflow-hidden">
        <div className="p-5 border-b border-border flex items-center justify-between">
          <div>
            <h3 className="font-semibold text-foreground">Your Holdings</h3>
            <p className="text-sm text-muted-foreground">Manage your investment portfolio</p>
          </div>
          <button className="flex items-center gap-2 text-sm text-primary font-medium hover:underline">
            <Plus className="w-4 h-4" />
            Add Position
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left p-4 text-xs font-medium text-muted-foreground uppercase tracking-wider">Asset</th>
                <th className="text-right p-4 text-xs font-medium text-muted-foreground uppercase tracking-wider">Price</th>
                <th className="text-right p-4 text-xs font-medium text-muted-foreground uppercase tracking-wider">Change</th>
                <th className="text-right p-4 text-xs font-medium text-muted-foreground uppercase tracking-wider">Shares</th>
                <th className="text-right p-4 text-xs font-medium text-muted-foreground uppercase tracking-wider">Value</th>
                <th className="p-4"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {holdings.map((holding) => (
                <tr key={holding.symbol} className="hover:bg-secondary/30 transition-colors">
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                        <span className="text-xs font-bold text-primary">{holding.symbol.slice(0, 2)}</span>
                      </div>
                      <div>
                        <p className="font-medium text-foreground">{holding.symbol}</p>
                        <p className="text-xs text-muted-foreground">{holding.name}</p>
                      </div>
                    </div>
                  </td>
                  <td className="p-4 text-right">
                    <span className="font-medium text-foreground">{formatCurrency(holding.price)}</span>
                  </td>
                  <td className="p-4 text-right">
                    <span className={cn(
                      "inline-flex items-center gap-1",
                      holding.change > 0 ? "text-success" : "text-destructive"
                    )}>
                      {holding.change > 0 ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                      {holding.change > 0 ? "+" : ""}{holding.changePercent}%
                    </span>
                  </td>
                  <td className="p-4 text-right">
                    <span className="text-foreground">{holding.shares}</span>
                  </td>
                  <td className="p-4 text-right">
                    <span className="font-semibold text-foreground">{formatCurrency(holding.price * holding.shares)}</span>
                  </td>
                  <td className="p-4">
                    <button className="p-2 hover:bg-secondary rounded-lg transition-colors">
                      <ChevronRight className="w-4 h-4 text-muted-foreground" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
