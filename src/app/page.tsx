'use client'

import { motion } from 'motion/react'

import { GridContainer } from '@/src/components/grid-container'
import { Footer } from '@/src/components/layout/footer'
import { Header } from '@/src/components/layout/header'
import { Main } from '@/src/components/layout/main'
import { LinesPattern } from '@/src/components/lines-pattern'
import { SquarePattern } from '@/src/components/square-pattern'
import { useGoTop } from '@/src/hooks/useGoTop'

const Page = () => {
  useGoTop(true)

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
        className="p-4 md:px-12 md:pb-4"
      >
        <SquarePattern />
        <Main />
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

export default Page
