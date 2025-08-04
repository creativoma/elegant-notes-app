'use client'

import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'

export function useClientTheme() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  return {
    theme: mounted ? theme : 'light',
    setTheme,
    mounted,
  }
}
