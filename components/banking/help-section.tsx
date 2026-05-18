"use client"

import { useState } from "react"
import { 
  HelpCircle, MessageCircle, Phone, Mail, FileText, ChevronRight,
  ChevronDown, Search, ExternalLink, Clock, CheckCircle
} from "lucide-react"
import { cn } from "@/lib/utils"

const faqs = [
  {
    id: 1,
    question: "How do I transfer money to another account?",
    answer: "To transfer money, go to the Transfers section, select 'Send Money', enter the recipient details and amount, then confirm the transfer. You can also save beneficiaries for faster future transfers."
  },
  {
    id: 2,
    question: "How can I freeze my card?",
    answer: "Navigate to the Cards section, select the card you want to freeze, and click the 'Freeze' button. You can unfreeze it at any time using the same process."
  },
  {
    id: 3,
    question: "What are the transaction limits?",
    answer: "Daily transfer limits are $10,000 for standard accounts and $50,000 for Premium accounts. ATM withdrawals are limited to $1,000 per day. Contact support to request higher limits."
  },
  {
    id: 4,
    question: "How do I enable two-factor authentication?",
    answer: "Go to Settings > Security Settings and toggle on 'Two-Factor Authentication'. You'll be guided through setting up either SMS verification or an authenticator app."
  },
  {
    id: 5,
    question: "How can I dispute a transaction?",
    answer: "Click on the transaction in your history, then select 'Report Issue'. Fill out the dispute form with details about the issue. Our team will investigate within 3-5 business days."
  },
]

const supportOptions = [
  {
    icon: MessageCircle,
    title: "Live Chat",
    description: "Chat with our support team",
    availability: "24/7 Available",
    action: "Start Chat"
  },
  {
    icon: Phone,
    title: "Phone Support",
    description: "Speak to a representative",
    availability: "Mon-Fri, 9AM-6PM EST",
    action: "Call Now"
  },
  {
    icon: Mail,
    title: "Email Support",
    description: "Send us a detailed message",
    availability: "Response within 24 hours",
    action: "Send Email"
  },
  {
    icon: FileText,
    title: "Documentation",
    description: "Browse our help articles",
    availability: "Self-service guides",
    action: "Browse Docs"
  },
]

const recentTickets = [
  { id: "TK-2847", subject: "Card replacement request", status: "resolved", date: "Dec 10" },
  { id: "TK-2831", subject: "Wire transfer inquiry", status: "in-progress", date: "Dec 8" },
]

export function HelpSection() {
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null)
  const [searchQuery, setSearchQuery] = useState("")

  const filteredFaqs = faqs.filter(faq =>
    faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
    faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div className="max-w-4xl space-y-6">
      {/* Search */}
      <div className="bg-gradient-to-br from-primary/20 via-card to-accent/10 border border-primary/20 rounded-2xl p-8 text-center">
        <h2 className="text-2xl font-bold text-foreground mb-2">How can we help you?</h2>
        <p className="text-muted-foreground mb-6">Search our knowledge base or contact support</p>
        
        <div className="relative max-w-xl mx-auto">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search for help..."
            className="w-full pl-12 pr-4 py-4 bg-card rounded-xl border border-border outline-none text-foreground placeholder:text-muted-foreground"
          />
        </div>
      </div>

      {/* Support Options */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {supportOptions.map((option, index) => (
          <div
            key={index}
            className="bg-card border border-border rounded-xl p-5 hover:border-primary/30 transition-all group cursor-pointer"
          >
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                <option.icon className="w-6 h-6 text-primary" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-foreground mb-1">{option.title}</h3>
                <p className="text-sm text-muted-foreground mb-2">{option.description}</p>
                <p className="text-xs text-primary">{option.availability}</p>
              </div>
              <ChevronRight className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
            </div>
          </div>
        ))}
      </div>

      {/* FAQs */}
      <div className="bg-card border border-border rounded-2xl p-6">
        <h3 className="font-semibold text-foreground mb-6 flex items-center gap-2">
          <HelpCircle className="w-5 h-5 text-primary" />
          Frequently Asked Questions
        </h3>

        <div className="space-y-3">
          {filteredFaqs.map((faq) => (
            <div
              key={faq.id}
              className="border border-border rounded-xl overflow-hidden"
            >
              <button
                onClick={() => setExpandedFaq(expandedFaq === faq.id ? null : faq.id)}
                className="w-full flex items-center justify-between p-4 text-left hover:bg-secondary/50 transition-colors"
              >
                <span className="font-medium text-foreground pr-4">{faq.question}</span>
                <ChevronDown className={cn(
                  "w-5 h-5 text-muted-foreground transition-transform shrink-0",
                  expandedFaq === faq.id && "rotate-180"
                )} />
              </button>
              
              {expandedFaq === faq.id && (
                <div className="px-4 pb-4">
                  <p className="text-sm text-muted-foreground leading-relaxed">{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>

        {filteredFaqs.length === 0 && (
          <div className="text-center py-8">
            <p className="text-muted-foreground">No results found for &quot;{searchQuery}&quot;</p>
            <button 
              onClick={() => setSearchQuery("")}
              className="text-primary font-medium mt-2 hover:underline"
            >
              Clear search
            </button>
          </div>
        )}
      </div>

      {/* Recent Support Tickets */}
      <div className="bg-card border border-border rounded-2xl p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="font-semibold text-foreground flex items-center gap-2">
            <FileText className="w-5 h-5 text-primary" />
            Your Support Tickets
          </h3>
          <button className="text-sm text-primary font-medium hover:underline">
            View All
          </button>
        </div>

        {recentTickets.length > 0 ? (
          <div className="space-y-3">
            {recentTickets.map((ticket) => (
              <div
                key={ticket.id}
                className="flex items-center justify-between p-4 bg-secondary/50 rounded-xl hover:bg-secondary transition-colors cursor-pointer"
              >
                <div className="flex items-center gap-4">
                  <div className={cn(
                    "w-10 h-10 rounded-xl flex items-center justify-center",
                    ticket.status === "resolved" ? "bg-success/20" : "bg-warning/20"
                  )}>
                    {ticket.status === "resolved" ? (
                      <CheckCircle className="w-5 h-5 text-success" />
                    ) : (
                      <Clock className="w-5 h-5 text-warning" />
                    )}
                  </div>
                  <div>
                    <p className="font-medium text-foreground">{ticket.subject}</p>
                    <p className="text-sm text-muted-foreground">{ticket.id} • {ticket.date}</p>
                  </div>
                </div>
                <span className={cn(
                  "text-xs font-medium px-3 py-1 rounded-full",
                  ticket.status === "resolved" 
                    ? "bg-success/10 text-success" 
                    : "bg-warning/10 text-warning"
                )}>
                  {ticket.status === "resolved" ? "Resolved" : "In Progress"}
                </span>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8">
            <p className="text-muted-foreground">No support tickets yet</p>
          </div>
        )}

        <button className="w-full mt-4 py-3 border border-primary text-primary rounded-xl font-medium hover:bg-primary/10 transition-colors">
          Create New Ticket
        </button>
      </div>

      {/* Contact Info */}
      <div className="bg-secondary/50 rounded-2xl p-6 text-center">
        <p className="text-muted-foreground mb-2">Need immediate assistance?</p>
        <p className="text-foreground font-semibold text-lg mb-1">1-800-AURUM-BANK</p>
        <p className="text-sm text-muted-foreground">Available 24/7 for Premium members</p>
      </div>
    </div>
  )
}
