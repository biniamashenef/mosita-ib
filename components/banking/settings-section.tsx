"use client"

import { useState } from "react"
import { 
  User, Lock, Bell, Shield, CreditCard, Globe, Moon, Sun,
  ChevronRight, Check, Smartphone, Mail, Eye, EyeOff, LogOut,
  Key, AlertTriangle, HelpCircle
} from "lucide-react"
import { cn } from "@/lib/utils"

interface SettingsSectionProps {
  setActiveTab: (tab: string) => void
}

const securityOptions = [
  { id: "2fa", label: "Two-Factor Authentication", description: "Add extra security to your account", enabled: true },
  { id: "biometric", label: "Biometric Login", description: "Use fingerprint or face recognition", enabled: true },
  { id: "alerts", label: "Transaction Alerts", description: "Get notified for all transactions", enabled: true },
  { id: "location", label: "Location-Based Security", description: "Block transactions from unusual locations", enabled: false },
]

const notificationOptions = [
  { id: "email", label: "Email Notifications", enabled: true },
  { id: "push", label: "Push Notifications", enabled: true },
  { id: "sms", label: "SMS Alerts", enabled: false },
  { id: "marketing", label: "Marketing Communications", enabled: false },
]

export function SettingsSection({ setActiveTab }: SettingsSectionProps) {
  const [security, setSecurity] = useState(securityOptions)
  const [notifications, setNotifications] = useState(notificationOptions)
  const [showCurrentPassword, setShowCurrentPassword] = useState(false)
  const [showNewPassword, setShowNewPassword] = useState(false)

  const toggleSecurity = (id: string) => {
    setSecurity(prev => prev.map(item => 
      item.id === id ? { ...item, enabled: !item.enabled } : item
    ))
  }

  const toggleNotification = (id: string) => {
    setNotifications(prev => prev.map(item => 
      item.id === id ? { ...item, enabled: !item.enabled } : item
    ))
  }

  return (
    <div className="max-w-4xl space-y-6">
      {/* Profile Section */}
      <div className="bg-card border border-border rounded-2xl p-6">
        <h3 className="font-semibold text-foreground mb-6 flex items-center gap-2">
          <User className="w-5 h-5 text-primary" />
          Profile Information
        </h3>

        <div className="flex flex-col sm:flex-row gap-6 mb-6">
          <div className="flex flex-col items-center">
            <div className="w-24 h-24 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center mb-3">
              <span className="text-2xl font-bold text-primary-foreground">AK</span>
            </div>
            <button className="text-sm text-primary font-medium hover:underline">
              Change Photo
            </button>
          </div>

          <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-sm text-muted-foreground mb-2 block">First Name</label>
              <input 
                type="text" 
                defaultValue="Abebe"
                className="w-full px-4 py-3 bg-secondary rounded-xl border-none outline-none text-foreground"
              />
            </div>
            <div>
              <label className="text-sm text-muted-foreground mb-2 block">Last Name</label>
              <input 
                type="text" 
                defaultValue="Kebede"
                className="w-full px-4 py-3 bg-secondary rounded-xl border-none outline-none text-foreground"
              />
            </div>
            <div>
              <label className="text-sm text-muted-foreground mb-2 block">Email</label>
              <input 
                type="email" 
                defaultValue="abebe.kebede@mosita.et"
                className="w-full px-4 py-3 bg-secondary rounded-xl border-none outline-none text-foreground"
              />
            </div>
            <div>
              <label className="text-sm text-muted-foreground mb-2 block">Phone</label>
              <input 
                type="tel" 
                defaultValue="+251 91 234 5678"
                className="w-full px-4 py-3 bg-secondary rounded-xl border-none outline-none text-foreground"
              />
            </div>
          </div>
        </div>

        <button className="px-6 py-3 bg-primary text-primary-foreground rounded-xl font-medium hover:bg-primary/90 transition-colors">
          Save Changes
        </button>
      </div>

      {/* Security Section */}
      <div className="bg-card border border-border rounded-2xl p-6">
        <h3 className="font-semibold text-foreground mb-6 flex items-center gap-2">
          <Shield className="w-5 h-5 text-primary" />
          Security Settings
        </h3>

        <div className="space-y-4 mb-6">
          {security.map((option) => (
            <div 
              key={option.id}
              className="flex items-center justify-between p-4 bg-secondary/50 rounded-xl"
            >
              <div>
                <p className="font-medium text-foreground">{option.label}</p>
                <p className="text-sm text-muted-foreground">{option.description}</p>
              </div>
              <button
                onClick={() => toggleSecurity(option.id)}
                className={cn(
                  "w-12 h-6 rounded-full transition-colors relative",
                  option.enabled ? "bg-primary" : "bg-muted"
                )}
              >
                <span 
                  className={cn(
                    "absolute top-1 w-4 h-4 bg-white rounded-full transition-transform",
                    option.enabled ? "translate-x-7" : "translate-x-1"
                  )}
                />
              </button>
            </div>
          ))}
        </div>

        {/* Change Password */}
        <div className="border-t border-border pt-6">
          <h4 className="font-medium text-foreground mb-4 flex items-center gap-2">
            <Key className="w-4 h-4 text-muted-foreground" />
            Change Password
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="relative">
              <label className="text-sm text-muted-foreground mb-2 block">Current Password</label>
              <input 
                type={showCurrentPassword ? "text" : "password"}
                placeholder="••••••••"
                className="w-full px-4 py-3 pr-10 bg-secondary rounded-xl border-none outline-none text-foreground"
              />
              <button 
                onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                className="absolute right-3 top-10 text-muted-foreground"
              >
                {showCurrentPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
            <div className="relative">
              <label className="text-sm text-muted-foreground mb-2 block">New Password</label>
              <input 
                type={showNewPassword ? "text" : "password"}
                placeholder="••••••••"
                className="w-full px-4 py-3 pr-10 bg-secondary rounded-xl border-none outline-none text-foreground"
              />
              <button 
                onClick={() => setShowNewPassword(!showNewPassword)}
                className="absolute right-3 top-10 text-muted-foreground"
              >
                {showNewPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>
          <button className="mt-4 px-6 py-3 bg-secondary text-foreground rounded-xl font-medium hover:bg-secondary/80 transition-colors">
            Update Password
          </button>
        </div>
      </div>

      {/* Notifications Section */}
      <div className="bg-card border border-border rounded-2xl p-6">
        <h3 className="font-semibold text-foreground mb-6 flex items-center gap-2">
          <Bell className="w-5 h-5 text-primary" />
          Notification Preferences
        </h3>

        <div className="space-y-4">
          {notifications.map((option) => (
            <div 
              key={option.id}
              className="flex items-center justify-between p-4 bg-secondary/50 rounded-xl"
            >
              <p className="font-medium text-foreground">{option.label}</p>
              <button
                onClick={() => toggleNotification(option.id)}
                className={cn(
                  "w-12 h-6 rounded-full transition-colors relative",
                  option.enabled ? "bg-primary" : "bg-muted"
                )}
              >
                <span 
                  className={cn(
                    "absolute top-1 w-4 h-4 bg-white rounded-full transition-transform",
                    option.enabled ? "translate-x-7" : "translate-x-1"
                  )}
                />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Links */}
      <div className="bg-card border border-border rounded-2xl overflow-hidden">
        <h3 className="font-semibold text-foreground p-6 pb-0 flex items-center gap-2">
          <Globe className="w-5 h-5 text-primary" />
          More Options
        </h3>

        <div className="divide-y divide-border mt-4">
          {[
            { label: "Language & Region", description: "Amharic (Ethiopia)", icon: Globe },
            { label: "Linked Accounts", description: "3 external accounts", icon: CreditCard },
            { label: "Statement Preferences", description: "Digital only", icon: Mail },
            { label: "Help & Support", description: "FAQs, Contact us", icon: HelpCircle, action: () => setActiveTab("help") },
          ].map((item, index) => (
            <button
              key={index}
              onClick={item.action}
              className="w-full flex items-center justify-between p-4 hover:bg-secondary/50 transition-colors text-left"
            >
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-secondary flex items-center justify-center">
                  <item.icon className="w-5 h-5 text-muted-foreground" />
                </div>
                <div>
                  <p className="font-medium text-foreground">{item.label}</p>
                  <p className="text-sm text-muted-foreground">{item.description}</p>
                </div>
              </div>
              <ChevronRight className="w-5 h-5 text-muted-foreground" />
            </button>
          ))}
        </div>
      </div>

      {/* Danger Zone */}
      <div className="bg-destructive/10 border border-destructive/20 rounded-2xl p-6">
        <h3 className="font-semibold text-destructive mb-4 flex items-center gap-2">
          <AlertTriangle className="w-5 h-5" />
          Danger Zone
        </h3>
        <p className="text-sm text-muted-foreground mb-4">
          These actions are irreversible. Please proceed with caution.
        </p>
        <div className="flex flex-wrap gap-3">
          <button className="px-4 py-2 border border-destructive/30 text-destructive rounded-xl font-medium hover:bg-destructive/10 transition-colors">
            Deactivate Account
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-destructive text-destructive-foreground rounded-xl font-medium hover:bg-destructive/90 transition-colors">
            <LogOut className="w-4 h-4" />
            Sign Out All Devices
          </button>
        </div>
      </div>
    </div>
  )
}
