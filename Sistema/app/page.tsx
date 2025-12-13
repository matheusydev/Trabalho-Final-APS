"use client"

import { useState } from "react"
import { LoginScreen } from "@/components/login-screen"
import { OrderScreen } from "@/components/order-screen"

export default function Home() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [currentUser, setCurrentUser] = useState("")

  const handleLogin = (username: string) => {
    setIsLoggedIn(true)
    setCurrentUser(username)
  }

  const handleLogout = () => {
    setIsLoggedIn(false)
    setCurrentUser("")
  }

  return (
    <main className="min-h-screen">
      {!isLoggedIn ? (
        <LoginScreen onLogin={handleLogin} />
      ) : (
        <OrderScreen currentUser={currentUser} onLogout={handleLogout} />
      )}
    </main>
  )
}
