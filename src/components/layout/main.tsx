import { BookOpen, Cloud, LayoutGrid, Search, Star, Zap } from 'lucide-react'
import React from 'react'

import { NotesVizualizer } from '@/src/components/note-visualizer'
import { TypingAnimation } from '@/src/components/typing-animation'

const features = [
  {
    icon: BookOpen,
    title: 'Distraction-free writing',
    description:
      'Immerse yourself in your ideas with a zen mode that eliminates everything superfluous, leaving only your text and your creativity.',
  },
  {
    icon: Star,
    title: 'Intuitive organization',
    description:
      'Mark your favorite notes, search quickly and keep your workspace always organized and accessible.',
  },
  {
    icon: Cloud,
    title: 'Local persistence',
    description:
      'Your notes are automatically saved in your browser, always available where you left them, without needing internet.',
  },
  {
    icon: LayoutGrid,
    title: 'Responsive design',
    description:
      'Enjoy a smooth experience on any device, from your desktop to your mobile.',
  },
  {
    icon: Zap,
    title: 'Optimized performance',
    description:
      'A lightweight and fast application, designed so your workflow never stops.',
  },
  {
    icon: Search,
    title: 'Smart search',
    description:
      'Find any note instantly with our powerful integrated search function.',
  },
]

export const Main = () => {
  return (
    <main className="relative z-10 flex flex-1 flex-col items-center">
      <section className="px- max-w-5xl py-4 text-center md:pt-10 md:pb-32">
        <div className="mb-6 md:mb-8">
          <div className="text-accent border-accent/20 mb-4 inline-flex items-center gap-2 border bg-blue-50 px-3 py-2 text-xs font-medium md:mb-6 md:px-4 md:text-sm">
            <Zap size={14} className="md:size-4" />
            <span className="hidden sm:inline">
              New: Zen mode for distraction-free writing
            </span>
            <span className="sm:hidden">New: Zen mode</span>
          </div>
        </div>

        <h2 className="mb-6 font-serif text-4xl leading-tight font-bold tracking-tight sm:text-5xl md:mb-8 md:text-6xl lg:text-7xl">
          Your space to{' '}
          <span>
            <TypingAnimation className="from-accent to-accent-hover/30 inline! bg-linear-to-r bg-clip-text font-serif text-4xl text-transparent italic sm:text-5xl md:text-6xl lg:text-7xl!">
              think.
            </TypingAnimation>
          </span>
          <br />
          Your notes to{' '}
          <span>
            <TypingAnimation
              delay={1000}
              className="from-accent/30 to-accent-hover inline! bg-linear-to-r bg-clip-text font-serif text-5xl text-transparent italic sm:text-6xl md:text-7xl lg:text-8xl!"
            >
              create.
            </TypingAnimation>
          </span>
        </h2>

        <p className="mx-auto mb-12 max-w-3xl px-4 font-serif text-lg text-balance text-gray-600 md:mb-20 md:px-0 md:text-xl">
          A minimalist and elegant notes application, designed for focus and
          productivity. Organize your ideas, write without distractions and keep
          everything synchronized.
        </p>

        <NotesVizualizer className="hidden md:block" />
      </section>
      <section className="w-full max-w-5xl px-4 pb-16 md:pb-20">
        <div className="mb-12 text-center md:mb-16">
          <h3 className="mb-3 font-serif text-3xl font-bold md:mb-4 md:text-4xl">
            Features you&apos;ll love
          </h3>
          <p className="mx-auto max-w-2xl px-4 font-serif text-lg text-balance text-gray-600 md:px-0 md:text-xl">
            Designed for writers, thinkers and creators who seek the perfect
            tool for their ideas.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:gap-8 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => {
            const IconComponent = feature.icon
            return (
              <div
                key={index}
                className="group border border-gray-200 bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl md:p-8"
              >
                <div className="group-hover:border-accent group-hover:bg-accent/10 mb-4 flex h-10 w-10 items-center justify-center border border-gray-200 p-2 transition-all md:mb-6 md:h-12 md:w-12 md:p-3">
                  <IconComponent size={20} className="text-accent md:size-6" />
                </div>
                <h4 className="mb-2 font-serif text-lg font-semibold md:mb-3 md:text-xl">
                  {feature.title}
                </h4>
                <p className="text-sm leading-relaxed text-gray-600 md:text-base">
                  {feature.description}
                </p>
              </div>
            )
          })}
        </div>
      </section>
    </main>
  )
}
