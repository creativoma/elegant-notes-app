import React from 'react'

export const LinesPattern = () => {
  return (
    <svg className="pointer-events-none absolute inset-0 size-full text-blue-200 select-none">
      <defs>
        <pattern
          id="lines"
          width="4"
          height="4"
          patternUnits="userSpaceOnUse"
          patternTransform="rotate(45)"
        >
          <line
            x1="0"
            y1="0"
            x2="0"
            y2="4"
            stroke="currentColor"
            strokeWidth="2"
          ></line>
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#lines)"></rect>
    </svg>
  )
}
