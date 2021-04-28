import { useState, useEffect } from 'react'

export enum ThemeMode {
  Dark = 'dark',
  Light = 'light',
}

export const useTheme = () => {
  const [mode, setMode] = useState(ThemeMode.Light)
  const [isFirst, setIsFirst] = useState(true)

  useEffect(() => {
    setMode(getThemeMode())
    setIsFirst(false)
  }, [])

  useEffect(() => {
    if (!isFirst && mode !== getThemeMode()) {
      window.__setTheme(mode)
    }
  }, [mode])

  const toggle = () => {
    if (mode === ThemeMode.Light) {
      setMode(ThemeMode.Dark)
    } else {
      setMode(ThemeMode.Light)
    }
  }

  return [mode, toggle] as const
}

const getThemeMode = (): ThemeMode => {
  return localStorage.getItem(window.__theme_key__) === 'dark'
    ? ThemeMode.Dark
    : ThemeMode.Light
}
