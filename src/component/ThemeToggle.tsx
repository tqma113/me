import React from 'react'
import { useTheme } from '@src/hook'

export const ThemeToggle = () => {
  const [mode, toggle] = useTheme()
  return (
    <button className="theme-toggle" onClick={toggle} aria-label="Theme Toggle">
      <div className={mode}></div>
    </button>
  )
}
