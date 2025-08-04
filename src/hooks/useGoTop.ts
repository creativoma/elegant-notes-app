import { useCallback, useEffect } from 'react'

export const useGoTop = (autoScroll: boolean = false) => {
  const goTop = useCallback(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  }, [])

  useEffect(() => {
    if (autoScroll) {
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      })
    }
  }, [autoScroll])

  return goTop
}
