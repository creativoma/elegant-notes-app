import React from 'react'

export const SquarePattern = () => {
  return (
    <svg
      aria-hidden="true"
      className="fill-accent/50 stroke-accent/50 pointer-events-none absolute inset-0 z-0 size-full mask-[linear-gradient(to_top,#ffffffad,transparent)] opacity-[.40]"
    >
      <defs>
        <pattern
          id=":R1oafknq6ja:"
          width="50"
          height="50"
          patternUnits="userSpaceOnUse"
          x="-1"
          y="-1"
        >
          <path d="M.5 50V.5H50" fill="none" strokeDasharray="0"></path>
        </pattern>
      </defs>
      <rect
        width="100%"
        height="100%"
        strokeWidth="0"
        fill="url(#:R1oafknq6ja:)"
      ></rect>
    </svg>
  )
}
