import { CSSProperties, ReactNode } from 'react'

import { cn } from '@/src/lib/utils'

type HeightType = 'auto' | 'screen' | string
type ColorVariant =
  | 'blue'
  | 'red'
  | 'pink'
  | 'yellow'
  | 'green'
  | 'purple'
  | 'gray'
  | 'indigo'
  | 'black'

interface Offsets {
  top?: number
  bottom?: number
  left?: number
  right?: number
}

interface ContainerProps {
  children: ReactNode
  offsets?: Offsets
  className?: string
  height?: HeightType
  minHeight?: string
  showCorners?: boolean
  color?: ColorVariant
}

const DEFAULT_OFFSETS = {
  top: 60,
  bottom: 60,
  left: 100,
  right: 100,
}

const COLOR_VARIANTS = {
  blue: {
    border: 'border-blue-200',
    cornerBorder: 'border-blue-300',
    background: 'bg-blue-300/15',
    containerBg: 'bg-blue-300/15',
  },
  red: {
    border: 'border-red-200',
    cornerBorder: 'border-red-300',
    background: 'bg-red-300/5',
    containerBg: 'bg-red-300/15',
  },
  pink: {
    border: 'border-pink-200',
    cornerBorder: 'border-pink-300',
    background: 'bg-pink-300/5',
    containerBg: 'bg-pink-300/15',
  },
  yellow: {
    border: 'border-yellow-200',
    cornerBorder: 'border-yellow-300',
    background: 'bg-yellow-300/5',
    containerBg: 'bg-yellow-300/15',
  },
  green: {
    border: 'border-green-200',
    cornerBorder: 'border-green-300',
    background: 'bg-green-300/5',
    containerBg: 'bg-green-300/15',
  },
  purple: {
    border: 'border-purple-200',
    cornerBorder: 'border-purple-300',
    background: 'bg-purple-300/5',
    containerBg: 'bg-purple-300/15',
  },
  gray: {
    border: 'border-gray-200',
    cornerBorder: 'border-gray-300',
    background: 'bg-gray-300/5',
    containerBg: 'bg-gray-300/15',
  },
  indigo: {
    border: 'border-indigo-200',
    cornerBorder: 'border-indigo-300',
    background: 'bg-indigo-300/5',
    containerBg: 'bg-indigo-300/15',
  },
  black: {
    border: 'border-gray-700',
    cornerBorder: 'border-gray-800',
    background: 'bg-gray-800/5',
    containerBg: 'bg-gray-800/15',
  },
}

const getHeightClasses = (height: HeightType, minHeight: string): string => {
  switch (height) {
    case 'screen':
      return 'h-screen'
    case 'auto':
      return `min-h-[${minHeight}]`
    default:
      return ''
  }
}

const getHeightStyle = (height: HeightType): CSSProperties => {
  if (height !== 'screen' && height !== 'auto') {
    return { height }
  }
  return {}
}

const getGridStyle = (offsets: Required<Offsets>): CSSProperties => ({
  gridTemplateColumns: `${offsets.left}px 1fr ${offsets.right}px`,
  gridTemplateRows: `${offsets.top}px 1fr ${offsets.bottom}px`,
})

const Corner = ({
  position,
  colorVariant,
}: {
  position: 'tl' | 'tr' | 'bl' | 'br'
  colorVariant: ColorVariant
}) => {
  const positions = {
    tl: { bottom: '-4px', right: '-4px' },
    tr: { bottom: '-4px', left: '-4px' },
    bl: { top: '-4px', right: '-4px' },
    br: { top: '-4px', left: '-4px' },
  }

  const colors = COLOR_VARIANTS[colorVariant]

  return (
    <div
      className={`absolute z-999 size-1.75 rotate-45 rounded-[1px] border ${colors.cornerBorder} bg-white`}
      style={positions[position]}
    />
  )
}

const GridCell = ({
  borders,
  corner,
  children,
  colorVariant,
}: {
  borders: string
  corner?: 'tl' | 'tr' | 'bl' | 'br'
  children?: ReactNode
  colorVariant: ColorVariant
}) => {
  const colors = COLOR_VARIANTS[colorVariant]

  return (
    <div
      className={`${borders} ${colors.border} ${colors.background} relative`}
    >
      {corner && <Corner position={corner} colorVariant={colorVariant} />}
      {children}
    </div>
  )
}

export const GridContainer = ({
  children,
  offsets = {},
  className = '',
  height = 'auto',
  minHeight = '300px',
  showCorners = true,
  color = 'blue',
}: ContainerProps) => {
  const finalOffsets = { ...DEFAULT_OFFSETS, ...offsets }
  const heightClasses = getHeightClasses(height, minHeight)
  const heightStyle = getHeightStyle(height)
  const gridStyle = getGridStyle(finalOffsets)
  const colors = COLOR_VARIANTS[color]

  return (
    <div
      className={cn('w-full', colors.containerBg, heightClasses)}
      style={heightStyle}
    >
      <div
        className={`grid h-full w-full ${colors.containerBg} relative`}
        style={gridStyle}
      >
        <GridCell
          borders="border-r border-b"
          corner={showCorners ? 'tl' : undefined}
          colorVariant={color}
        />
        <GridCell borders="border-b" colorVariant={color} />
        <GridCell
          borders="border-b border-l"
          corner={showCorners ? 'tr' : undefined}
          colorVariant={color}
        />

        <GridCell borders="border-r" colorVariant={color} />
        <div
          className={cn('relative flex items-center justify-center', className)}
        >
          <div
            style={{ backgroundImage: 'url(/noise.png)' }}
            className={cn(
              'pointer-events-none absolute inset-0 bg-size-[180px] bg-repeat opacity-[0.025]',
              className,
            )}
          />
          {children}
        </div>
        <GridCell borders="border-l" colorVariant={color} />

        <GridCell
          borders="border-t border-r"
          corner={showCorners ? 'bl' : undefined}
          colorVariant={color}
        />
        <GridCell borders="border-t" colorVariant={color} />
        <GridCell
          borders="border-t border-l"
          corner={showCorners ? 'br' : undefined}
          colorVariant={color}
        />
      </div>
    </div>
  )
}

export const containerPresets = {
  fullScreen: { height: 'screen' as const },
  compact: { offsets: { top: 30, bottom: 30, left: 50, right: 50 } },
  wide: { offsets: { top: 80, bottom: 80, left: 150, right: 150 } },
  minimal: {
    showCorners: false,
    offsets: { top: 20, bottom: 20, left: 20, right: 20 },
  },

  redTheme: { color: 'red' as const },
  pinkTheme: { color: 'pink' as const },
  yellowTheme: { color: 'yellow' as const },
  greenTheme: { color: 'green' as const },
}
