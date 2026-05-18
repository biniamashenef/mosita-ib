"use client"

import { Bell, Search, Menu, ChevronDown, Settings, Moon, Sun } from "lucide-react"
import { useState } from "react"

interface HeaderProps {
  onMenuClick: () => void
  title: string
}

export function Header({ onMenuClick, title }: HeaderProps) {
  const [searchOpen, setSearchOpen] = useState(false)
  const [notificationsOpen, setNotificationsOpen] = useState(false)

  const notifications = [
    { id: 1, title: "Transfer Completed", message: "Your transfer of ETB 25,000 was successful", time: "2 min ago", unread: true },
    { id: 2, title: "New Card Activated", message: "Your Platinum card is now active", time: "1 hour ago", unread: true },
    { id: 3, title: "Security Alert", message: "New login from Chrome on Windows", time: "3 hours ago", unread: false },
  ]

  return (
    <header className="sticky top-0 z-30 bg-background/80 backdrop-blur-xl border-b border-border">
      <div className="flex items-center justify-between h-16 px-4 lg:px-8">
        <div className="flex items-center gap-4">
          <button 
            onClick={onMenuClick}
            className="lg:hidden p-2 hover:bg-secondary rounded-xl transition-colors"
          >
            <Menu className="w-5 h-5 text-foreground" />
          </button>
          
          <div>
            <h1 className="text-xl lg:text-2xl font-bold text-foreground">{title}</h1>
            <p className="text-sm text-muted-foreground hidden sm:block">
              {new Date().toLocaleDateString('en-ET', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 lg:gap-4">
          {/* Search */}
          <div className={`${searchOpen ? 'flex' : 'hidden lg:flex'} items-center bg-secondary rounded-xl transition-all`}>
            <div className="flex items-center px-4 py-2 gap-2">
              <Search className="w-4 h-4 text-muted-foreground" />
              <input 
                type="text"
                placeholder="Search transactions..."
                className="bg-transparent border-none outline-none text-sm text-foreground placeholder:text-muted-foreground w-40 lg:w-64"
              />
            </div>
          </div>
          
          <button 
            onClick={() => setSearchOpen(!searchOpen)}
            className="lg:hidden p-2 hover:bg-secondary rounded-xl transition-colors"
          >
            <Search className="w-5 h-5 text-foreground" />
          </button>

          {/* Notifications */}
          <div className="relative">
            <button 
              onClick={() => setNotificationsOpen(!notificationsOpen)}
              className="relative p-2 hover:bg-secondary rounded-xl transition-colors"
            >
              <Bell className="w-5 h-5 text-foreground" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-primary rounded-full" />
            </button>

            {notificationsOpen && (
              <>
                <div 
                  className="fixed inset-0 z-40"
                  onClick={() => setNotificationsOpen(false)}
                />
                <div className="absolute right-0 top-full mt-2 w-80 bg-card border border-border rounded-xl shadow-2xl z-50 overflow-hidden">
                  <div className="p-4 border-b border-border">
                    <h3 className="font-semibold text-foreground">Notifications</h3>
                    <p className="text-sm text-muted-foreground">You have {notifications.filter(n => n.unread).length} unread messages</p>
                  </div>
                  <div className="max-h-64 overflow-y-auto">
                    {notifications.map((notification) => (
                      <div 
                        key={notification.id}
                        className={`p-4 border-b border-border/50 hover:bg-secondary/50 transition-colors cursor-pointer ${notification.unread ? 'bg-primary/5' : ''}`}
                      >
                        <div className="flex items-start gap-3">
                          {notification.unread && (
                            <span className="w-2 h-2 bg-primary rounded-full mt-2 shrink-0" />
                          )}
                          <div className={notification.unread ? '' : 'ml-5'}>
                            <p className="text-sm font-medium text-foreground">{notification.title}</p>
                            <p className="text-xs text-muted-foreground">{notification.message}</p>
                            <p className="text-xs text-primary mt-1">{notification.time}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="p-3 border-t border-border">
                    <button className="w-full text-sm text-primary font-medium hover:underline">
                      View all notifications
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>

          {/* Profile Quick Access */}
          <button className="hidden sm:flex items-center gap-2 p-2 pr-3 hover:bg-secondary rounded-xl transition-colors">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center">
              <span className="text-xs font-bold text-primary-foreground">AK</span>
            </div>
            <ChevronDown className="w-4 h-4 text-muted-foreground" />
          </button>
        </div>
      </div>
    </header>
  )
}
