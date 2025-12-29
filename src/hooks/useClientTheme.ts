'use client'

import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'

export function useClientTheme() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    // Safe pattern: This effect runs once on mount to set mounted state.
    // This prevents server/client mismatch for theme rendering.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true)
  }, [])

  return {
    theme: mounted ? theme : 'light',
    setTheme,
    mounted,
  }
}
