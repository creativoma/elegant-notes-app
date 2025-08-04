'use client'

import { Home } from 'lucide-react'
import { motion } from 'motion/react'
import { useRouter } from 'next/navigation'
import React from 'react'

import { GridContainer } from '@/src/components/grid-container'
import { Footer } from '@/src/components/layout/footer'
import { Header } from '@/src/components/layout/header'
import { LinesPattern } from '@/src/components/lines-pattern'
import { SquarePattern } from '@/src/components/square-pattern'

const NotFound = () => {
  const router = useRouter()

  return (
    <motion.div
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="flex min-h-screen flex-col overflow-x-hidden bg-white text-gray-900"
    >
      <GridContainer
        offsets={{ top: 50, bottom: 0, left: 50, right: 50 }}
        color="blue"
        className="px-4 py-3 sm:px-8 lg:px-12"
      >
        <Header />
      </GridContainer>
      <GridContainer
        className="border-t border-blue-200 bg-white/50 p-3"
        offsets={{ top: 0, bottom: 0, left: 50, right: 50 }}
      >
        <LinesPattern />
      </GridContainer>

      <GridContainer
        offsets={{ top: 0, bottom: 0, left: 50, right: 50 }}
        className="px-2 md:px-12 md:pb-4"
      >
        <SquarePattern />
        <main className="relative z-10 flex flex-1 flex-col items-center">
          <section className="max-w-5xl p-10 text-center">
            <h1 className="my-8 font-serif text-4xl font-bold tracking-tight text-balance md:text-6xl">
              Page not found
            </h1>

            <p className="mx-auto mb-20 max-w-3xl font-serif text-xl text-balance text-gray-600">
              It seems like the page you are trying to access is not available.
              Please check the URL or return to the homepage.
            </p>

            <button
              onClick={() => router.push('/')}
              className="border-accent bg-accent inline-flex cursor-pointer items-center gap-2 border px-4 py-2 text-base font-medium text-blue-50"
            >
              Go to home
              <Home size={16} />
            </button>
          </section>
        </main>
      </GridContainer>
      <GridContainer
        className="border-t border-blue-200 bg-white/50 p-6 sm:p-8 lg:p-10"
        offsets={{ top: 0, bottom: 0, left: 50, right: 50 }}
      >
        <LinesPattern />
      </GridContainer>

      <GridContainer
        className="bg-accent p-4 text-white sm:p-12 lg:p-20"
        offsets={{ top: 0, bottom: 50, left: 50, right: 50 }}
      >
        <Footer />
      </GridContainer>
    </motion.div>
  )
}

export default NotFound
