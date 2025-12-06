'use client'

import { Github, Scale, ShieldCheck } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

import { Logo } from '@/src/components/logo'

export const Footer = () => {
  return (
    <footer className="max-w-5xl">
      <div className="mx-auto px-4 text-center sm:px-6">
        <div className="mb-6 sm:mb-8">
          <Logo color="text-white" className="mb-2" />
          <p className="mx-auto max-w-md font-serif text-sm text-blue-100 sm:text-base">
            A minimalist and elegant notes application designed for focus,
            creativity, and productivity. Your ideas deserve the perfect space
            to flourish.
          </p>
        </div>

        <div className="mb-6 flex flex-col justify-center gap-4 text-sm sm:mb-8 sm:flex-row sm:gap-8">
          <Link
            href="https://github.com/creativoma/elegant-notes-app"
            className="flex items-center justify-center gap-2 text-blue-100 transition-colors hover:text-white hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Github className="h-4 w-4" />
            GitHub
          </Link>
          <Link
            href="https://github.com/creativoma/elegant-notes-app?tab=MIT-1-ov-file"
            className="flex items-center justify-center gap-2 text-blue-100 transition-colors hover:text-white hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Scale className="h-4 w-4" />
            MIT License
          </Link>
          <Link
            href="/privacy"
            className="flex items-center justify-center gap-2 text-blue-100 transition-colors hover:text-white hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            <ShieldCheck className="h-4 w-4" />
            Privacy
          </Link>
        </div>

        <div className="border-t border-blue-400/30 pt-4 sm:pt-6">
          <p className="text-xs text-blue-100 sm:text-sm">
            © {new Date().getFullYear()} Elegant Notes App. Crafted for creative
            minds by{' '}
            <Link
              href="https://marianoalvarez.dev"
              className="text-blue-100 underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              Mariano Alvarez
            </Link>
            .
          </p>
        </div>
      </div>
    </footer>
  )
}
