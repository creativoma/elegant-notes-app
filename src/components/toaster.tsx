'use client'

import { useTheme } from 'next-themes'
import React from 'react'
import { Toaster } from 'sonner'

export const NoteToaster = () => {
  const { theme } = useTheme()
  return (
    <Toaster
      position="bottom-center"
      theme={theme === 'dark' ? 'dark' : 'light'}
      toastOptions={{
        style: {
          borderRadius: '0px',
          border: 'none',
        },
        className:
          theme === 'dark'
            ? '!bg-accent/20 !text-white'
            : '!bg-gray-100 !text-accent',
      }}
    />
  )
}
