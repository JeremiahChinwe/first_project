import React, { useState } from 'react'
import { Outlet } from 'react-router-dom'
import Header from './Header'
import { ThemeContext } from "../ThemeContext"
import { auth } from "../firebase"
import { useAuthState } from "react-firebase-hooks/auth"
import Footer from "../ParentComponents/Footer"



export default function Layout() {
  const [user] = useAuthState(auth)
  const [isDarkMode, setIsDarkMode] = useState(false)
  

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode)
  }
  

  return (
    <div>
      <ThemeContext.Provider value={{ isDarkMode, toggleTheme, user }}>
        <Header />
        <main 
        className={`${ isDarkMode ? "bg-[#010116] text-white" 
        : "bg-white text-black"} main-el`}>
            <Outlet />
          </main>
        <Footer />
      </ThemeContext.Provider>
    </div>
  )
}
