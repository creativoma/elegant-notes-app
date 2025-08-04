import { ArrowRight } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

import { Logo } from '@/src/components/logo'

export const Header = () => {
  return (
    <header className="relative z-10 flex w-full max-w-5xl flex-col items-center justify-between gap-3 md:flex-row">
      <div className="flex items-center gap-3">
        <Logo />
      </div>
      <Link
        href="/notes"
        className="border-accent bg-accent inline-flex items-center gap-2 border px-4 py-2 text-base font-medium text-blue-50"
      >
        Go to notes
        <ArrowRight size={16} />
      </Link>
    </header>
  )
}
