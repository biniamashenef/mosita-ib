"use client"

import { useState } from "react"
import { Sidebar } from "@/components/banking/sidebar"
import { Header } from "@/components/banking/header"
import { AccountsOverview } from "@/components/banking/accounts-overview"
import { RecentTransactions } from "@/components/banking/recent-transactions"
import { QuickStats } from "@/components/banking/quick-stats"
import { CardsManagement } from "@/components/banking/cards-management"
import { TransfersSection } from "@/components/banking/transfers-section"
import { PaymentsSection } from "@/components/banking/payments-section"
import { InvestmentsSection } from "@/components/banking/investments-section"
import { AnalyticsSection } from "@/components/banking/analytics-section"
import { SettingsSection } from "@/components/banking/settings-section"
import { HelpSection } from "@/components/banking/help-section"

const pageTitles: Record<string, string> = {
  dashboard: "Dashboard",
  transfers: "Transfers",
  cards: "Cards Management",
  payments: "Bill Payments",
  investments: "Investments",
  analytics: "Analytics",
  settings: "Settings",
  help: "Help & Support",
}

export default function BankingApp() {
  const [activeTab, setActiveTab] = useState("dashboard")
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const renderContent = () => {
    switch (activeTab) {
      case "dashboard":
        return (
          <div className="space-y-6">
            <AccountsOverview />
            <QuickStats />
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
              <RecentTransactions />
              <div className="bg-card border border-border rounded-2xl p-6">
                <h3 className="font-semibold text-foreground mb-4">Quick Actions</h3>
                <div className="grid grid-cols-2 gap-3">
                  <button 
                    onClick={() => setActiveTab("transfers")}
                    className="p-4 bg-primary/10 rounded-xl text-center hover:bg-primary/20 transition-colors"
                  >
                    <span className="text-sm font-medium text-primary">Send Money</span>
                  </button>
                  <button 
                    onClick={() => setActiveTab("payments")}
                    className="p-4 bg-secondary rounded-xl text-center hover:bg-secondary/80 transition-colors"
                  >
                    <span className="text-sm font-medium text-foreground">Pay Bills</span>
                  </button>
                  <button 
                    onClick={() => setActiveTab("cards")}
                    className="p-4 bg-secondary rounded-xl text-center hover:bg-secondary/80 transition-colors"
                  >
                    <span className="text-sm font-medium text-foreground">Manage Cards</span>
                  </button>
                  <button 
                    onClick={() => setActiveTab("investments")}
                    className="p-4 bg-secondary rounded-xl text-center hover:bg-secondary/80 transition-colors"
                  >
                    <span className="text-sm font-medium text-foreground">Investments</span>
                  </button>
                </div>
                
                {/* Upcoming Bills */}
                <div className="mt-6 pt-6 border-t border-border">
                  <h4 className="text-sm font-medium text-foreground mb-4">Upcoming Bills</h4>
                  <div className="space-y-3">
                    {[
                      { name: "Electric Bill", amount: "$156.78", due: "Dec 25" },
                      { name: "Internet", amount: "$79.99", due: "Jan 2" },
                      { name: "Insurance", amount: "$250.00", due: "Jan 5" },
                    ].map((bill, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-secondary/50 rounded-lg">
                        <div>
                          <p className="text-sm font-medium text-foreground">{bill.name}</p>
                          <p className="text-xs text-muted-foreground">Due {bill.due}</p>
                        </div>
                        <span className="text-sm font-semibold text-foreground">{bill.amount}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )
      case "transfers":
        return <TransfersSection />
      case "cards":
        return <CardsManagement />
      case "payments":
        return <PaymentsSection />
      case "investments":
        return <InvestmentsSection />
      case "analytics":
        return <AnalyticsSection />
      case "settings":
        return <SettingsSection setActiveTab={setActiveTab} />
      case "help":
        return <HelpSection />
      default:
        return <AccountsOverview />
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <Sidebar 
        activeTab={activeTab} 
        setActiveTab={setActiveTab}
        isMobileOpen={isMobileMenuOpen}
        setIsMobileOpen={setIsMobileMenuOpen}
      />
      
      <div className="lg:ml-72">
        <Header 
          onMenuClick={() => setIsMobileMenuOpen(true)}
          title={pageTitles[activeTab] || "Dashboard"}
        />
        
        <main className="p-4 lg:p-8">
          {renderContent()}
        </main>
      </div>
    </div>
  )
}
