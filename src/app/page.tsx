

'use client';

import { Cpu, Zap } from 'lucide-react'
import { Settings2, Sparkles } from 'lucide-react'
import type { ReactNode } from 'react'
import { Card, CardHeader, CardContent } from '@/components/ui/card'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import GetStartedButton from '@/components/GetStartedButton'

export default function Home() {
  return (
    <>
      <section className="py-16 md:py-32">
        <div className="mx-auto max-w-5xl space-y-8 px-6 md:space-y-16">
          <h2 className="relative z-10 max-w-xl text-4xl font-medium lg:text-5xl">Taskle – Your Ultimate Task Management Companion</h2>

          <div className="grid gap-6 sm:grid-cols-2 md:gap-12 lg:gap-24">
            <div className="relative space-y-4">
              <p className="text-muted-foreground">
                Taskle is a <span className="text-accent-foreground font-bold">powerful, full-stack task management web app</span> designed to help you stay on top of your projects with ease.
              </p>
              <p className="text-muted-foreground">
                Whether you're managing work tasks, personal projects, or anything in between, Taskle organizes your life and boosts productivity with smart features like task categorization, completion tracking, and insightful data visualizations.
              </p>
            </div>
            <div className="relative mt-6 sm:mt-0">
              <div className="bg-linear-to-b aspect-67/34 relative rounded-2xl from-zinc-300 to-transparent p-px dark:from-zinc-700">
                <Image src="https://i.pinimg.com/736x/d1/81/b5/d181b57ed0404f6fd1ef32a61f0a06e8.jpg" className="hidden rounded-[15px] dark:block" alt="payments illustration dark" width={1206} height={612} />
                <Image src="https://i.pinimg.com/736x/d1/81/b5/d181b57ed0404f6fd1ef32a61f0a06e8.jpg" className="rounded-[15px] shadow dark:hidden" alt="payments illustration light" width={1206} height={612} />
              </div>
            </div>
          </div>
        </div>
      </section>
      
      <section className="bg-zinc-50 py-16 md:py-32 dark:bg-transparent">
        <div className="@container mx-auto max-w-5xl px-6">
          <div className="text-center">
            <h2 className="text-balance text-4xl font-semibold lg:text-5xl">Key Features</h2>
            <p className="mt-4">Powerful tools to help you organize, track, and complete your tasks efficiently.</p>
          </div>
          <div className="@min-4xl:max-w-full @min-4xl:grid-cols-3 mx-auto mt-8 grid max-w-sm gap-6 *:text-center md:mt-16">
            <Card className="group shadow-zinc-950/5">
              <CardHeader className="pb-3">
                <CardDecorator>
                  <Zap className="size-6" aria-hidden />
                </CardDecorator>
                <h3 className="mt-6 font-medium">Seamless Organization</h3>
              </CardHeader>
              <CardContent>
                <p className="text-sm">Effortless task organization with customizable categories like Work, Personal, and Projects.</p>
              </CardContent>
            </Card>

            <Card className="group shadow-zinc-950/5">
              <CardHeader className="pb-3">
                <CardDecorator>
                  <Settings2 className="size-6" aria-hidden />
                </CardDecorator>
                <h3 className="mt-6 font-medium">Real-time Tracking</h3>
              </CardHeader>
              <CardContent>
                <p className="mt-3 text-sm">Track your progress with completion vs. remaining charts and intuitive calendar UI for managing due dates.</p>
              </CardContent>
            </Card>

            <Card className="group shadow-zinc-950/5">
              <CardHeader className="pb-3">
                <CardDecorator>
                  <Sparkles className="size-6" aria-hidden />
                </CardDecorator>
                <h3 className="mt-6 font-medium">Data Analytics</h3>
              </CardHeader>
              <CardContent>
                <p className="mt-3 text-sm">Interactive bar charts and visualizations give you deep insights into your task management habits.</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </>
  )
}

const CardDecorator = ({ children }: { children: ReactNode }) => (
  <div className="relative mx-auto size-36 duration-200 [--color-border:color-mix(in_oklab,var(--color-zinc-950)10%,transparent)] group-hover:[--color-border:color-mix(in_oklab,var(--color-zinc-950)20%,transparent)] dark:[--color-border:color-mix(in_oklab,var(--color-white)15%,transparent)] dark:group-hover:bg-white/5 dark:group-hover:[--color-border:color-mix(in_oklab,var(--color-white)20%,transparent)]">
    <div aria-hidden className="absolute inset-0 bg-[linear-gradient(to_right,var(--color-border)_1px,transparent_1px),linear-gradient(to_bottom,var(--color-border)_1px,transparent_1px)] bg-[size:24px_24px]" />
    <div aria-hidden className="bg-radial to-background absolute inset-0 from-transparent to-75%" />
    <div className="bg-background absolute inset-0 m-auto flex size-12 items-center justify-center border-l border-t">{children}</div>
  </div>
)