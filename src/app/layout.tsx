import type { Metadata } from 'next'
import './globals.css'
import { ThemeProvider } from 'next-themes'
import type React from 'react'

import { NoteToaster } from '@/src/components/toaster'

// Fallback to system fonts to ensure offline functionality
// and avoid network dependencies during build
const fontVariables = {
  lora: '--font-lora',
  inter: '--font-inter',
}

export const metadata: Metadata = {
  title: 'Elegant Notes App',
  description: 'A simple and elegant notes app built with Next.js',
  keywords: ['Next.js', 'Notes App', 'Elegant', 'React'],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      style={
        {
          [fontVariables.lora]: 'Georgia, Cambria, "Times New Roman", serif',
          [fontVariables.inter]:
            '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
        } as React.CSSProperties
      }
    >
      <body>
        <ThemeProvider
          enableSystem={true}
          attribute="class"
          storageKey="theme"
          defaultTheme="system"
        >
          {children}
          <NoteToaster />
        </ThemeProvider>
      </body>
    </html>
  )
}
