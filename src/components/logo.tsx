import Link from 'next/link'
import React from 'react'
import type { FC } from 'react'

import { cn } from '@/src/lib/utils'

/**
 * Logo component that renders a link to the home page with a title.
 * It accepts a color prop to customize the text color.
 * @param {Object} props - The component props.
 * @param {string} [props.color='text-accent'] - The text color for the logo.
 * @returns {JSX.Element} The rendered logo component.
 * @example
 * <Logo color="text-red-500" />
 * <Logo color="text-blue-600" />
 * <Logo /> // defaults to text-accent
 */
interface LogoProps {
  color?: string
  className?: string
}

export const Logo: FC<LogoProps> = ({ color, className }) => {
  return (
    <Link
      href="/"
      scroll={true}
      className={cn(
        'mb-0 inline-block font-serif text-xl font-semibold tracking-tight md:text-2xl',
        (color && ` ${color}`) || 'text-accent',
        className,
      )}
    >
      Elegant Notes App
    </Link>
  )
}
