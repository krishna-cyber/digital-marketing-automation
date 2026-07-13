"use client"

import { MoonStarIcon } from "@/components/tiptap-icons/moon-star-icon"
import { SunIcon } from "@/components/tiptap-icons/sun-icon"
import { Button } from "@/components/tiptap-ui-primitive/button"
import { useEffect, useState } from "react"

const THEME_KEY = "tiptap-theme"

export function ThemeToggle() {
  const [isDarkMode, setIsDarkMode] = useState(false)

  // Initialize theme
  useEffect(() => {
    const savedTheme = localStorage.getItem(THEME_KEY)

    // Default to light if no preference has been saved
    const dark = savedTheme === "dark"

    setIsDarkMode(dark)
    document.documentElement.classList.toggle("dark", dark)
  }, [])

  // Apply theme and persist preference
  useEffect(() => {
    document.documentElement.classList.toggle("dark", isDarkMode)
    localStorage.setItem(THEME_KEY, isDarkMode ? "dark" : "light")
  }, [isDarkMode])

  return (
    <Button
      onClick={() => setIsDarkMode((prev) => !prev)}
      aria-label={`Switch to ${isDarkMode ? "light" : "dark"} mode`}
      variant="ghost"
    >
      {isDarkMode ? (
        <MoonStarIcon className="tiptap-button-icon" />
      ) : (
        <SunIcon className="tiptap-button-icon" />
      )}
    </Button>
  )
}
