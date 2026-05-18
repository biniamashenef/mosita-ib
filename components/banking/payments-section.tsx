"use client"

import { useState } from "react"
import { 
  Zap, Home, Smartphone, Wifi, Droplets, ShieldCheck, CreditCard, Plus,
  Clock, CheckCircle, Search, Building2, Calendar
} from "lucide-react"
import { cn } from "@/lib/utils"

const billCategories = [
  { id: "utilities", label: "Utilities", icon: Zap },
  { id: "internet", label: "Internet & TV", icon: Wifi },
  { id: "phone", label: "Phone", icon: Smartphone },
  { id: "insurance", label: "Insurance", icon: ShieldCheck },
  { id: "rent", label: "Rent & Housing", icon: Home },
  { id: "other", label: "Other", icon: CreditCard },
]

const savedBillers = [
  { id: 1, name: "Ethiopian Electric Utility", category: "utilities", icon: Zap, accountNumber: "****4521", lastPayment: 1567.80, dueDate: "Tahsas 25", autoPay: true },
  { id: 2, name: "Ethio Telecom Mobile", category: "phone", icon: Smartphone, accountNumber: "****8934", lastPayment: 899.90, dueDate: "Tahsas 28", autoPay: true },
  { id: 3, name: "Websprix Internet", category: "internet", icon: Wifi, accountNumber: "****2847", lastPayment: 1799.99, dueDate: "Tir 2", autoPay: false },
  { id: 4, name: "Nyala Insurance", category: "insurance", icon: ShieldCheck, accountNumber: "****1092", lastPayment: 2500.00, dueDate: "Tir 5", autoPay: true },
  { id: 5, name: "Addis Ababa Water", category: "utilities", icon: Droplets, accountNumber: "****7283", lastPayment: 453.00, dueDate: "Tir 10", autoPay: false },
]

const paymentHistory = [
  { id: 1, biller: "Ethiopian Electric Utility", amount: 1567.80, date: "Hidar 25", status: "paid" },
  { id: 2, biller: "Ethio Telecom Mobile", amount: 899.90, date: "Hidar 28", status: "paid" },
  { id: 3, biller: "Websprix Internet", amount: 1799.99, date: "Tahsas 2", status: "paid" },
  { id: 4, biller: "Nyala Insurance", amount: 2500.00, date: "Tahsas 5", status: "scheduled" },
]

export function PaymentsSection() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedBiller, setSelectedBiller] = useState<number | null>(null)
  const [amount, setAmount] = useState("")

  const filteredBillers = savedBillers.filter(b => {
    const matchesCategory = !selectedCategory || b.category === selectedCategory
    const matchesSearch = b.name.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCategory && matchesSearch
  })

  const formatCurrency = (amount: number) => {
    return `ETB ${new Intl.NumberFormat('en-ET', {
      minimumFractionDigits: 2,
    }).format(amount)}`
  }

  const upcomingTotal = savedBillers.reduce((sum, b) => sum + b.lastPayment, 0)

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-card border border-border rounded-xl p-5">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center">
              <Calendar className="w-5 h-5 text-primary" />
            </div>
            <span className="text-sm text-muted-foreground">Due This Month</span>
          </div>
          <p className="text-2xl font-bold text-foreground">{formatCurrency(upcomingTotal)}</p>
        </div>
        
        <div className="bg-card border border-border rounded-xl p-5">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-xl bg-success/20 flex items-center justify-center">
              <CheckCircle className="w-5 h-5 text-success" />
            </div>
            <span className="text-sm text-muted-foreground">Auto-Pay Active</span>
          </div>
          <p className="text-2xl font-bold text-foreground">{savedBillers.filter(b => b.autoPay).length}</p>
        </div>
        
        <div className="bg-card border border-border rounded-xl p-5">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-xl bg-warning/20 flex items-center justify-center">
              <Clock className="w-5 h-5 text-warning" />
            </div>
            <span className="text-sm text-muted-foreground">Pending</span>
          </div>
          <p className="text-2xl font-bold text-foreground">2</p>
        </div>
        
        <div className="bg-card border border-border rounded-xl p-5">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-xl bg-accent/20 flex items-center justify-center">
              <Building2 className="w-5 h-5 text-accent" />
            </div>
            <span className="text-sm text-muted-foreground">Saved Billers</span>
          </div>
          <p className="text-2xl font-bold text-foreground">{savedBillers.length}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Bill Categories & Billers */}
        <div className="lg:col-span-2 space-y-6">
          {/* Categories */}
          <div className="bg-card border border-border rounded-2xl p-6">
            <h3 className="font-semibold text-foreground mb-4">Bill Categories</h3>
            <div className="grid grid-cols-3 sm:grid-cols-6 gap-3">
              {billCategories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(selectedCategory === category.id ? null : category.id)}
                  className={cn(
                    "flex flex-col items-center gap-2 p-4 rounded-xl transition-all",
                    selectedCategory === category.id
                      ? "bg-primary text-primary-foreground"
                      : "bg-secondary hover:bg-secondary/80 text-muted-foreground hover:text-foreground"
                  )}
                >
                  <category.icon className="w-6 h-6" />
                  <span className="text-xs font-medium text-center">{category.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Saved Billers */}
          <div className="bg-card border border-border rounded-2xl p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-foreground">Saved Billers</h3>
              <button className="flex items-center gap-2 text-sm text-primary font-medium hover:underline">
                <Plus className="w-4 h-4" />
                Add Biller
              </button>
            </div>

            {/* Search */}
            <div className="relative mb-4">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search billers..."
                className="w-full pl-10 pr-4 py-3 bg-secondary rounded-xl border-none outline-none text-foreground placeholder:text-muted-foreground text-sm"
              />
            </div>

            {/* Billers List */}
            <div className="space-y-3 max-h-80 overflow-y-auto">
              {filteredBillers.map((biller) => (
                <button
                  key={biller.id}
                  onClick={() => {
                    setSelectedBiller(biller.id)
                    setAmount(biller.lastPayment.toString())
                  }}
                  className={cn(
                    "w-full flex items-center gap-4 p-4 rounded-xl transition-all text-left",
                    selectedBiller === biller.id
                      ? "bg-primary/10 border border-primary"
                      : "bg-secondary/50 hover:bg-secondary"
                  )}
                >
                  <div className={cn(
                    "w-10 h-10 rounded-xl flex items-center justify-center",
                    selectedBiller === biller.id ? "bg-primary/20" : "bg-muted"
                  )}>
                    <biller.icon className={cn(
                      "w-5 h-5",
                      selectedBiller === biller.id ? "text-primary" : "text-muted-foreground"
                    )} />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <p className="text-sm font-medium text-foreground">{biller.name}</p>
                      {biller.autoPay && (
                        <span className="text-xs bg-success/20 text-success px-2 py-0.5 rounded-full">Auto</span>
                      )}
                    </div>
                    <p className="text-xs text-muted-foreground">Due: {biller.dueDate} • {biller.accountNumber}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-semibold text-foreground">{formatCurrency(biller.lastPayment)}</p>
                    <p className="text-xs text-muted-foreground">Last payment</p>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Payment Form */}
          {selectedBiller && (
            <div className="bg-card border border-primary/30 rounded-2xl p-6">
              <h3 className="font-semibold text-foreground mb-4">Pay Bill</h3>
              
              <div className="space-y-4">
                <div>
                  <label className="text-sm text-muted-foreground mb-2 block">Amount</label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-lg font-bold text-muted-foreground">ETB</span>
                    <input
                      type="text"
                      value={amount}
                      onChange={(e) => setAmount(e.target.value.replace(/[^0-9.]/g, ''))}
                      className="w-full pl-14 pr-4 py-3 text-lg font-bold bg-secondary rounded-xl border-none outline-none text-foreground"
                    />
                  </div>
                </div>

                <button className="w-full py-4 rounded-xl bg-primary text-primary-foreground font-semibold hover:bg-primary/90 transition-colors">
                  Pay Now
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Payment History */}
        <div className="bg-card border border-border rounded-2xl p-6 h-fit">
          <h3 className="font-semibold text-foreground mb-4">Payment History</h3>
          
          <div className="space-y-3">
            {paymentHistory.map((payment) => (
              <div 
                key={payment.id}
                className="flex items-center gap-3 p-3 bg-secondary/50 rounded-xl"
              >
                <div className={cn(
                  "w-8 h-8 rounded-full flex items-center justify-center",
                  payment.status === "paid" ? "bg-success/20" : "bg-warning/20"
                )}>
                  {payment.status === "paid" ? (
                    <CheckCircle className="w-4 h-4 text-success" />
                  ) : (
                    <Clock className="w-4 h-4 text-warning" />
                  )}
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-foreground">{payment.biller}</p>
                  <p className="text-xs text-muted-foreground">{payment.date}</p>
                </div>
                <span className="text-sm font-semibold text-foreground">
                  {formatCurrency(payment.amount)}
                </span>
              </div>
            ))}
          </div>

          <button className="w-full mt-4 py-3 text-sm text-primary font-medium hover:underline">
            View All History
          </button>
        </div>
      </div>
    </div>
  )
}
