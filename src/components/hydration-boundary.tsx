'use client'

import { useEffect, useState } from 'react'

interface HydrationBoundaryProps {
  children: React.ReactNode
  fallback?: React.ReactNode
}

export function HydrationBoundary({
  children,
  fallback,
}: HydrationBoundaryProps) {
  const [isHydrated, setIsHydrated] = useState(false)

  useEffect(() => {
    // Safe pattern: This effect runs once on mount to set hydration state.
    // This prevents server/client mismatch by ensuring client-only rendering.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsHydrated(true)
  }, [])

  if (!isHydrated) {
    return fallback || null
  }

  return <>{children}</>
}
