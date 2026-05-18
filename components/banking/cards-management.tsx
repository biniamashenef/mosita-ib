"use client"

import { useState } from "react"
import { Wifi, CreditCard, Lock, Unlock, Snowflake, Settings, Plus, MoreHorizontal, Copy, Eye, EyeOff } from "lucide-react"
import { cn } from "@/lib/utils"

const cards = [
  {
    id: 1,
    name: "Mosita Platinum",
    number: "4829 **** **** 3847",
    expiry: "12/28",
    balance: 452300.00,
    limit: 1000000,
    type: "platinum",
    frozen: false,
    gradient: "from-primary via-accent to-primary/80"
  },
  {
    id: 2,
    name: "Mosita Gold",
    number: "5291 **** **** 1923",
    expiry: "08/27",
    balance: 124500.00,
    limit: 500000,
    type: "gold",
    frozen: false,
    gradient: "from-accent via-primary/80 to-accent"
  },
  {
    id: 3,
    name: "Business Elite",
    number: "3782 **** **** 0012",
    expiry: "03/26",
    balance: 789000.00,
    limit: 2000000,
    type: "business",
    frozen: true,
    gradient: "from-muted via-border to-muted"
  },
]

export function CardsManagement() {
  const [selectedCard, setSelectedCard] = useState(cards[0])
  const [showCardNumber, setShowCardNumber] = useState(false)

  const formatCurrency = (amount: number) => {
    return `ETB ${new Intl.NumberFormat('en-ET', {
      minimumFractionDigits: 2,
    }).format(amount)}`
  }

  const usagePercentage = (selectedCard.balance / selectedCard.limit) * 100

  return (
    <div className="space-y-6">
      {/* Cards Carousel */}
      <div className="flex gap-4 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-hide">
        {cards.map((card) => (
          <button
            key={card.id}
            onClick={() => setSelectedCard(card)}
            className={cn(
              "relative flex-shrink-0 w-80 h-48 rounded-2xl p-6 transition-all duration-300 snap-center",
              "bg-gradient-to-br",
              card.gradient,
              selectedCard.id === card.id 
                ? "ring-2 ring-primary ring-offset-2 ring-offset-background scale-[1.02]" 
                : "opacity-80 hover:opacity-100",
              card.frozen && "grayscale"
            )}
          >
            {card.frozen && (
              <div className="absolute inset-0 bg-black/40 rounded-2xl flex items-center justify-center">
                <div className="flex items-center gap-2 text-white">
                  <Snowflake className="w-5 h-5" />
                  <span className="font-medium">Card Frozen</span>
                </div>
              </div>
            )}
            
            <div className="h-full flex flex-col justify-between text-primary-foreground">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm opacity-80">Mosita IB</p>
                  <p className="font-semibold">{card.name}</p>
                </div>
                <Wifi className="w-6 h-6 rotate-90 opacity-80" />
              </div>
              
              <div>
                <p className="text-lg font-mono tracking-widest mb-2">
                  {showCardNumber && selectedCard.id === card.id 
                    ? card.number.replace(/\*/g, '5') 
                    : card.number
                  }
                </p>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs opacity-60">Valid Thru</p>
                    <p className="font-medium">{card.expiry}</p>
                  </div>
                  <div className="w-10 h-8 bg-gradient-to-br from-amber-300/80 to-amber-500/80 rounded-md" />
                </div>
              </div>
            </div>
          </button>
        ))}
        
        {/* Add Card Button */}
        <button className="flex-shrink-0 w-80 h-48 rounded-2xl border-2 border-dashed border-border flex flex-col items-center justify-center gap-3 text-muted-foreground hover:border-primary hover:text-primary transition-colors snap-center">
          <Plus className="w-8 h-8" />
          <span className="font-medium">Add New Card</span>
        </button>
      </div>

      {/* Card Details */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Card Info */}
        <div className="bg-card border border-border rounded-2xl p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-semibold text-foreground">{selectedCard.name} Details</h3>
            <button className="p-2 hover:bg-secondary rounded-lg transition-colors">
              <MoreHorizontal className="w-5 h-5 text-muted-foreground" />
            </button>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-secondary/50 rounded-xl">
              <span className="text-sm text-muted-foreground">Card Number</span>
              <div className="flex items-center gap-2">
                <span className="font-mono text-foreground">
                  {showCardNumber ? selectedCard.number.replace(/\*/g, '5') : selectedCard.number}
                </span>
                <button 
                  onClick={() => setShowCardNumber(!showCardNumber)}
                  className="p-1 hover:bg-secondary rounded"
                >
                  {showCardNumber ? (
                    <EyeOff className="w-4 h-4 text-muted-foreground" />
                  ) : (
                    <Eye className="w-4 h-4 text-muted-foreground" />
                  )}
                </button>
                <button className="p-1 hover:bg-secondary rounded">
                  <Copy className="w-4 h-4 text-muted-foreground" />
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between p-4 bg-secondary/50 rounded-xl">
              <span className="text-sm text-muted-foreground">Expiry Date</span>
              <span className="font-medium text-foreground">{selectedCard.expiry}</span>
            </div>

            <div className="flex items-center justify-between p-4 bg-secondary/50 rounded-xl">
              <span className="text-sm text-muted-foreground">Credit Limit</span>
              <span className="font-medium text-foreground">{formatCurrency(selectedCard.limit)}</span>
            </div>

            <div className="flex items-center justify-between p-4 bg-secondary/50 rounded-xl">
              <span className="text-sm text-muted-foreground">Available Balance</span>
              <span className="font-medium text-foreground">{formatCurrency(selectedCard.balance)}</span>
            </div>
          </div>
        </div>

        {/* Card Controls */}
        <div className="bg-card border border-border rounded-2xl p-6">
          <h3 className="font-semibold text-foreground mb-6">Card Controls</h3>

          {/* Usage Progress */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-muted-foreground">Credit Usage</span>
              <span className="text-sm font-medium text-foreground">{usagePercentage.toFixed(1)}%</span>
            </div>
            <div className="h-2 bg-secondary rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-primary to-accent rounded-full transition-all duration-500"
                style={{ width: `${usagePercentage}%` }}
              />
            </div>
            <p className="text-xs text-muted-foreground mt-2">
              {formatCurrency(selectedCard.balance)} of {formatCurrency(selectedCard.limit)} used
            </p>
          </div>

          {/* Quick Actions */}
          <div className="grid grid-cols-2 gap-3">
            <button className={cn(
              "flex items-center gap-3 p-4 rounded-xl transition-colors",
              selectedCard.frozen 
                ? "bg-success/10 text-success hover:bg-success/20" 
                : "bg-destructive/10 text-destructive hover:bg-destructive/20"
            )}>
              {selectedCard.frozen ? (
                <>
                  <Unlock className="w-5 h-5" />
                  <span className="font-medium">Unfreeze</span>
                </>
              ) : (
                <>
                  <Snowflake className="w-5 h-5" />
                  <span className="font-medium">Freeze</span>
                </>
              )}
            </button>
            
            <button className="flex items-center gap-3 p-4 bg-secondary rounded-xl hover:bg-secondary/80 transition-colors">
              <Lock className="w-5 h-5 text-foreground" />
              <span className="font-medium text-foreground">Set PIN</span>
            </button>
            
            <button className="flex items-center gap-3 p-4 bg-secondary rounded-xl hover:bg-secondary/80 transition-colors">
              <Settings className="w-5 h-5 text-foreground" />
              <span className="font-medium text-foreground">Limits</span>
            </button>
            
            <button className="flex items-center gap-3 p-4 bg-secondary rounded-xl hover:bg-secondary/80 transition-colors">
              <CreditCard className="w-5 h-5 text-foreground" />
              <span className="font-medium text-foreground">Replace</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
