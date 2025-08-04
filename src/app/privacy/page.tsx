'use client'

import { motion } from 'motion/react'
import React from 'react'

import { GridContainer } from '@/src/components/grid-container'
import { Footer } from '@/src/components/layout/footer'
import { Header } from '@/src/components/layout/header'
import { LinesPattern } from '@/src/components/lines-pattern'
import { SquarePattern } from '@/src/components/square-pattern'

const Page = () => {
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
        className="px-4 pb-4 sm:px-8 lg:px-12"
      >
        <SquarePattern />
        <main className="relative z-10 flex flex-1 flex-col items-center">
          <section className="w-full max-w-5xl p-4 text-center sm:p-6 lg:p-10">
            <h1 className="my-4 font-serif text-3xl font-bold tracking-tight text-balance sm:my-6 sm:text-4xl md:my-8 md:text-5xl lg:text-6xl">
              Privacy Policy
            </h1>
            <div className="mx-auto mb-12 max-w-4xl space-y-6 text-left font-serif text-base text-gray-700 sm:mb-16 sm:space-y-8 sm:text-lg lg:mb-20">
              <div className="mb-6 text-center sm:mb-8">
                <p className="text-lg text-gray-600 sm:text-xl">
                  Your privacy is our priority. This application is designed to
                  keep all your information completely private and secure.
                </p>
              </div>

              <div className="space-y-4 sm:space-y-6">
                <section>
                  <h2 className="mb-3 text-xl font-bold text-gray-900 sm:mb-4 sm:text-2xl">
                    Local Storage Only
                  </h2>
                  <p>
                    All your notes and data are stored exclusively on your
                    device through browser local storage. We do not send,
                    transmit, or store any of your information on our servers or
                    third-party services.
                  </p>
                </section>

                <section>
                  <h2 className="mb-3 text-xl font-bold text-gray-900 sm:mb-4 sm:text-2xl">
                    No Data Collection
                  </h2>
                  <p>
                    We do not collect, process, or store any type of personal or
                    sensitive information. This includes:
                  </p>
                  <ul className="mt-2 list-disc space-y-1 pl-5 sm:mt-3 sm:space-y-2 sm:pl-6">
                    <li>Content of your notes</li>
                    <li>Personally identifiable information</li>
                    <li>Usage or behavioral data</li>
                    <li>IP addresses or device information</li>
                    <li>Tracking cookies</li>
                  </ul>
                </section>

                <section>
                  <h2 className="mb-3 text-xl font-bold text-gray-900 sm:mb-4 sm:text-2xl">
                    No Analytics or Tracking
                  </h2>
                  <p>
                    This application does not use web analytics tools, tracking
                    pixels, or any other mechanism to track your activity or
                    interactions. Your use of the application is completely
                    private and anonymous.
                  </p>
                </section>

                <section>
                  <h2 className="mb-3 text-xl font-bold text-gray-900 sm:mb-4 sm:text-2xl">
                    No Subscriptions or Accounts
                  </h2>
                  <p>
                    The application does not require registration, account
                    creation, subscriptions, or any type of authentication. You
                    can use all features completely free and without providing
                    any personal information.
                  </p>
                </section>

                <section>
                  <h2 className="mb-3 text-xl font-bold text-gray-900 sm:mb-4 sm:text-2xl">
                    Offline Functionality
                  </h2>
                  <p>
                    The application works completely in your browser without
                    needing an internet connection once loaded. Your data never
                    leaves your device, ensuring total privacy.
                  </p>
                </section>

                <section>
                  <h2 className="mb-3 text-xl font-bold text-gray-900 sm:mb-4 sm:text-2xl">
                    Complete Control of Your Data
                  </h2>
                  <p>
                    You have complete control over your data at all times. You
                    can delete all stored information simply by clearing your
                    browser data or using the application options to delete your
                    notes.
                  </p>
                </section>

                <section>
                  <h2 className="mb-3 text-xl font-bold text-gray-900 sm:mb-4 sm:text-2xl">
                    Open Source & Transparency
                  </h2>
                  <p>
                    We believe in complete transparency. This application is
                    open source under the MIT License, which means you can
                    review exactly how it works and verify that we fulfill our
                    privacy promises. The source code is available for
                    inspection and contribution.
                  </p>
                </section>

                <section>
                  <h2 className="mb-3 text-xl font-bold text-gray-900 sm:mb-4 sm:text-2xl">
                    User Responsibility
                  </h2>
                  <p>
                    The use of this application is at the user's own
                    responsibility. While we implement security best practices
                    for local storage, users are responsible for maintaining the
                    security of their devices and backing up their data as
                    needed.
                  </p>
                </section>

                <div className="mt-8 rounded-lg bg-blue-50 p-4 sm:mt-12 sm:p-6">
                  <p className="text-center font-medium text-balance text-blue-900">
                    In summary: Your information is yours and yours alone. We
                    don't see it, we don't store it, we don't analyze it.
                  </p>
                </div>

                <div className="mt-6 space-y-2 text-center text-sm text-gray-500 sm:mt-8">
                  <p>This application is released under the MIT License</p>
                  <p>Last updated: August 3rd, 2025</p>
                </div>
              </div>
            </div>
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

export default Page
