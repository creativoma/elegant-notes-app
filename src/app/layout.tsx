import type { Metadata } from 'next'
import { Inter, Lora } from 'next/font/google'
import { ThemeProvider } from 'next-themes'
import type React from 'react'

import './globals.css'

import { ErrorBoundary } from '@/src/components/error-boundary'
import { NoteToaster } from '@/src/components/toaster'

const lora = Lora({
  subsets: ['latin'],
  variable: '--font-lora',
  display: 'swap',
})

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

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
      className={`${lora.variable} ${inter.variable} `}
      suppressHydrationWarning
    >
      <body>
        <ErrorBoundary>
          <ThemeProvider
            enableSystem={true}
            attribute="class"
            storageKey="theme"
            defaultTheme="system"
          >
            {children}
            <NoteToaster />
          </ThemeProvider>
        </ErrorBoundary>
      </body>
    </html>
  )
}
