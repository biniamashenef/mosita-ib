"use client"

import { useState } from "react"
import { ArrowUpRight, ArrowDownLeft, Building2, User, Clock, CheckCircle, QrCode, Star, Plus, Search } from "lucide-react"
import { cn } from "@/lib/utils"

const beneficiaries = [
  { id: 1, name: "Tigist Haile", bank: "Commercial Bank of Ethiopia", account: "****4521", avatar: "TH", favorite: true },
  { id: 2, name: "Dawit Mengistu", bank: "Awash Bank", account: "****8934", avatar: "DM", favorite: true },
  { id: 3, name: "Hanna Tesfaye", bank: "Dashen Bank", account: "****2847", avatar: "HT", favorite: false },
  { id: 4, name: "Yonas Bekele", bank: "Bank of Abyssinia", account: "****1092", avatar: "YB", favorite: false },
]

const recentTransfers = [
  { id: 1, to: "Tigist Haile", amount: 50000, date: "Today", status: "completed" },
  { id: 2, to: "Dawit Mengistu", amount: 120000, date: "Yesterday", status: "completed" },
  { id: 3, to: "Ethiopian Electric Utility", amount: 15000, date: "Tahsas 15", status: "pending" },
]

type TransferType = "send" | "request" | "schedule"

export function TransfersSection() {
  const [transferType, setTransferType] = useState<TransferType>("send")
  const [amount, setAmount] = useState("")
  const [selectedBeneficiary, setSelectedBeneficiary] = useState<number | null>(null)
  const [searchQuery, setSearchQuery] = useState("")

  const quickAmounts = [1000, 5000, 10000, 25000, 50000, 100000]

  const filteredBeneficiaries = beneficiaries.filter(b => 
    b.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    b.bank.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div className="space-y-6">
      {/* Transfer Type Tabs */}
      <div className="bg-card border border-border rounded-2xl p-2 flex gap-2">
        {[
          { id: "send", label: "Send Money", icon: ArrowUpRight },
          { id: "request", label: "Request Money", icon: ArrowDownLeft },
          { id: "schedule", label: "Schedule", icon: Clock },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setTransferType(tab.id as TransferType)}
            className={cn(
              "flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-sm font-medium transition-all",
              transferType === tab.id
                ? "bg-primary text-primary-foreground"
                : "text-muted-foreground hover:text-foreground hover:bg-secondary"
            )}
          >
            <tab.icon className="w-4 h-4" />
            <span className="hidden sm:inline">{tab.label}</span>
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Transfer Form */}
        <div className="lg:col-span-2 space-y-6">
          {/* Amount Input */}
          <div className="bg-card border border-border rounded-2xl p-6">
            <h3 className="font-semibold text-foreground mb-4">Enter Amount</h3>
            
            <div className="relative mb-6">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-2xl font-bold text-muted-foreground">ETB</span>
              <input
                type="text"
                value={amount}
                onChange={(e) => setAmount(e.target.value.replace(/[^0-9.]/g, ''))}
                placeholder="0.00"
                className="w-full pl-16 pr-4 py-4 text-3xl font-bold bg-secondary rounded-xl border-none outline-none text-foreground placeholder:text-muted-foreground"
              />
            </div>

            <div className="flex flex-wrap gap-2">
              {quickAmounts.map((qa) => (
                <button
                  key={qa}
                  onClick={() => setAmount(qa.toString())}
                  className={cn(
                    "px-4 py-2 rounded-lg text-sm font-medium transition-colors",
                    amount === qa.toString()
                      ? "bg-primary text-primary-foreground"
                      : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
                  )}
                >
                  ETB {qa.toLocaleString()}
                </button>
              ))}
            </div>
          </div>

          {/* Beneficiary Selection */}
          <div className="bg-card border border-border rounded-2xl p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-foreground">Select Recipient</h3>
              <button className="flex items-center gap-2 text-sm text-primary font-medium hover:underline">
                <Plus className="w-4 h-4" />
                Add New
              </button>
            </div>

            {/* Search */}
            <div className="relative mb-4">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search recipients..."
                className="w-full pl-10 pr-4 py-3 bg-secondary rounded-xl border-none outline-none text-foreground placeholder:text-muted-foreground text-sm"
              />
            </div>

            {/* Favorites */}
            <div className="mb-4">
              <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-3">Favorites</p>
              <div className="flex gap-3 overflow-x-auto pb-2">
                {beneficiaries.filter(b => b.favorite).map((beneficiary) => (
                  <button
                    key={beneficiary.id}
                    onClick={() => setSelectedBeneficiary(beneficiary.id)}
                    className={cn(
                      "flex flex-col items-center gap-2 p-3 rounded-xl min-w-[80px] transition-all",
                      selectedBeneficiary === beneficiary.id
                        ? "bg-primary/10 border border-primary"
                        : "bg-secondary hover:bg-secondary/80"
                    )}
                  >
                    <div className={cn(
                      "w-12 h-12 rounded-full flex items-center justify-center text-sm font-bold",
                      selectedBeneficiary === beneficiary.id
                        ? "bg-primary text-primary-foreground"
                        : "bg-accent text-accent-foreground"
                    )}>
                      {beneficiary.avatar}
                    </div>
                    <span className="text-xs text-foreground truncate max-w-[70px]">
                      {beneficiary.name.split(' ')[0]}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* All Beneficiaries */}
            <div className="space-y-2 max-h-48 overflow-y-auto">
              {filteredBeneficiaries.map((beneficiary) => (
                <button
                  key={beneficiary.id}
                  onClick={() => setSelectedBeneficiary(beneficiary.id)}
                  className={cn(
                    "w-full flex items-center gap-4 p-4 rounded-xl transition-all",
                    selectedBeneficiary === beneficiary.id
                      ? "bg-primary/10 border border-primary"
                      : "bg-secondary/50 hover:bg-secondary"
                  )}
                >
                  <div className={cn(
                    "w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold",
                    selectedBeneficiary === beneficiary.id
                      ? "bg-primary text-primary-foreground"
                      : "bg-accent text-accent-foreground"
                  )}>
                    {beneficiary.avatar}
                  </div>
                  <div className="flex-1 text-left">
                    <p className="text-sm font-medium text-foreground">{beneficiary.name}</p>
                    <p className="text-xs text-muted-foreground">{beneficiary.bank} • {beneficiary.account}</p>
                  </div>
                  {beneficiary.favorite && (
                    <Star className="w-4 h-4 text-primary fill-primary" />
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Transfer Button */}
          <button 
            disabled={!amount || !selectedBeneficiary}
            className={cn(
              "w-full py-4 rounded-xl font-semibold text-lg transition-all",
              amount && selectedBeneficiary
                ? "bg-primary text-primary-foreground hover:bg-primary/90"
                : "bg-muted text-muted-foreground cursor-not-allowed"
            )}
          >
            {transferType === "send" ? "Send Money" : transferType === "request" ? "Request Money" : "Schedule Transfer"}
          </button>
        </div>

        {/* Recent Transfers */}
        <div className="bg-card border border-border rounded-2xl p-6 h-fit">
          <h3 className="font-semibold text-foreground mb-4">Recent Transfers</h3>
          
          <div className="space-y-4">
            {recentTransfers.map((transfer) => (
              <div 
                key={transfer.id}
                className="flex items-center gap-4 p-3 bg-secondary/50 rounded-xl"
              >
                <div className={cn(
                  "w-10 h-10 rounded-full flex items-center justify-center",
                  transfer.status === "completed" ? "bg-success/20" : "bg-warning/20"
                )}>
                  {transfer.status === "completed" ? (
                    <CheckCircle className="w-5 h-5 text-success" />
                  ) : (
                    <Clock className="w-5 h-5 text-warning" />
                  )}
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-foreground">{transfer.to}</p>
                  <p className="text-xs text-muted-foreground">{transfer.date}</p>
                </div>
                <span className="text-sm font-semibold text-foreground">
                  -ETB {transfer.amount.toLocaleString()}
                </span>
              </div>
            ))}
          </div>

          <button className="w-full mt-4 py-3 text-sm text-primary font-medium hover:underline">
            View All Transfers
          </button>
        </div>
      </div>
    </div>
  )
}
