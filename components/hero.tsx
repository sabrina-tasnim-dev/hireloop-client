"use client"

import { useRouter } from "next/navigation"
import { useRef, useState, type FormEvent } from "react"
import { Briefcase, MapPin, Search } from "lucide-react"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

const trendingPositions = [
  "Product Designer",
  "AI Engineering",
  "Dev-ops Engineer",
] as const

const stars = [
  { top: "30%", left: "10%", size: 2, opacity: 0.3 },
  { top: "25%", left: "90%", size: 1.5, opacity: 0.3 },
  { top: "40%", left: "84%", size: 1.5, opacity: 0.25 },
  { top: "45%", left: "18%", size: 1.5, opacity: 0.25 },
  { top: "50%", left: "70%", size: 2, opacity: 0.35 },
  { top: "55%", left: "30%", size: 1.5, opacity: 0.3 },
  { top: "58%", left: "6%", size: 2, opacity: 0.45 },
  { top: "60%", left: "50%", size: 1, opacity: 0.2 },
  { top: "62%", left: "93%", size: 2, opacity: 0.45 },
  { top: "66%", left: "14%", size: 1.5, opacity: 0.3 },
  { top: "68%", left: "45%", size: 1, opacity: 0.25 },
  { top: "70%", left: "86%", size: 1.5, opacity: 0.3 },
  { top: "72%", left: "3%", size: 2.5, opacity: 0.5 },
  { top: "74%", left: "58%", size: 1.5, opacity: 0.3 },
  { top: "76%", left: "95%", size: 2.5, opacity: 0.5 },
  { top: "78%", left: "30%", size: 1.5, opacity: 0.3 },
  { top: "80%", left: "10%", size: 1.5, opacity: 0.35 },
  { top: "82%", left: "70%", size: 1.5, opacity: 0.3 },
  { top: "84%", left: "90%", size: 1.5, opacity: 0.35 },
  { top: "86%", left: "20%", size: 2, opacity: 0.4 },
  { top: "88%", left: "50%", size: 1.5, opacity: 0.25 },
  { top: "90%", left: "78%", size: 2, opacity: 0.4 },
  { top: "91%", left: "32%", size: 2, opacity: 0.4 },
  { top: "92%", left: "7%", size: 1.5, opacity: 0.3 },
  { top: "94%", left: "88%", size: 1.5, opacity: 0.3 },
  { top: "96%", left: "24%", size: 1.5, opacity: 0.3 },
  { top: "97%", left: "60%", size: 2, opacity: 0.4 },
  { top: "95%", left: "40%", size: 1.5, opacity: 0.35 },
]

const inputClassName =
  "w-full min-w-0 bg-transparent text-sm text-foreground outline-none placeholder:text-muted-foreground sm:text-base"

export function Hero() {
  const router = useRouter()
  const titleRef = useRef<HTMLInputElement>(null)
  const [query, setQuery] = useState("")
  const [location, setLocation] = useState("")

  function handleSearch(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const params = new URLSearchParams()
    const trimmedQuery = query.trim()
    const trimmedLocation = location.trim()

    if (trimmedQuery) params.set("q", trimmedQuery)
    if (trimmedLocation) params.set("location", trimmedLocation)

    const search = params.toString()
    router.push(search ? `/jobs?${search}` : "/jobs")
  }

  function selectTrending(position: string) {
    setQuery(position)
    titleRef.current?.focus()
  }

  return (
    <section className="relative isolate overflow-hidden px-4 pt-12 pb-40 sm:pt-16">
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-56 left-1/2 h-[460px] w-[820px] max-w-none -translate-x-1/2 rounded-full bg-brand/25 blur-[110px] dark:bg-brand/30"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent to-background"
      />
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        {stars.map((star, index) => (
          <span
            key={index}
            className="absolute rounded-full bg-foreground"
            style={{
              top: star.top,
              left: star.left,
              width: star.size,
              height: star.size,
              opacity: star.opacity,
            }}
          />
        ))}
      </div>

      <div className="relative mx-auto flex w-full max-w-4xl flex-col items-center gap-6 text-center">
        <div className="flex w-full items-center justify-center gap-3">
          <span
            aria-hidden
            className="hidden h-px w-16 bg-gradient-to-r from-transparent to-border sm:block lg:w-32"
          />
          <div className="inline-flex max-w-full items-center gap-2.5 rounded-full border border-border/60 bg-card/70 px-4 py-2 shadow-xs backdrop-blur-md">
            <Briefcase className="size-4 shrink-0 text-orange-500" />
            <span className="text-sm font-bold tracking-tight text-foreground">
              50,000+
            </span>
            <span className="font-mono text-[11px] tracking-[0.16em] whitespace-nowrap text-muted-foreground uppercase">
              New jobs this month
            </span>
          </div>
          <span
            aria-hidden
            className="hidden h-px w-16 bg-gradient-to-l from-transparent to-border sm:block lg:w-32"
          />
        </div>

        <h1 className="text-4xl font-bold tracking-[-0.03em] text-balance sm:text-5xl lg:text-6xl">
          Find Your Dream Job Today
        </h1>

        <p className="max-w-2xl text-sm leading-relaxed text-pretty text-muted-foreground sm:text-base lg:text-lg">
          HireLoop connects top talent with world-class companies. Browse
          thousands of curated opportunities and land your next role — faster.
        </p>

        <form onSubmit={handleSearch} className="w-full max-w-3xl">
          <div className="flex flex-col gap-2 rounded-3xl border border-border/60 bg-card/70 p-2 shadow-[0_16px_48px_-16px_rgb(0_0_0/0.6)] backdrop-blur-md sm:flex-row sm:items-center sm:gap-0">
            <label className="flex min-w-0 flex-1 items-center gap-2.5 px-3 py-2.5 sm:px-4">
              <Search
                aria-hidden
                className="size-4.5 shrink-0 text-muted-foreground"
              />
              <span className="sr-only">Job title, skill or company</span>
              <input
                ref={titleRef}
                type="search"
                name="q"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Job title, skill or company"
                autoComplete="off"
                className={cn(
                  inputClassName,
                  "[&::-webkit-search-cancel-button]:hidden"
                )}
              />
            </label>

            <div aria-hidden className="hidden h-8 w-px bg-border sm:block" />

            <label className="flex min-w-0 flex-1 items-center gap-2.5 px-3 py-2.5 sm:px-4">
              <MapPin
                aria-hidden
                className="size-4.5 shrink-0 text-muted-foreground"
              />
              <span className="sr-only">Location or Remote</span>
              <input
                type="text"
                name="location"
                value={location}
                onChange={(event) => setLocation(event.target.value)}
                placeholder="Location or Remote"
                autoComplete="off"
                className={inputClassName}
              />
            </label>

            <Button
              type="submit"
              variant="brand"
              size="icon"
              aria-label="Search jobs"
              className="h-11 w-full shrink-0 rounded-xl sm:h-11 sm:w-11"
            >
              <Search className="size-5" />
            </Button>
          </div>
        </form>

        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-2.5">
          <span className="mr-1 text-sm text-muted-foreground">
            Trending Position
          </span>
          {trendingPositions.map((position) => (
            <button
              key={position}
              type="button"
              onClick={() => selectTrending(position)}
              aria-pressed={query === position}
              className={cn(
                "rounded-full border px-3.5 py-1.5 text-sm transition-colors outline-none focus-visible:ring-3 focus-visible:ring-ring/50",
                query === position
                  ? "border-brand/60 bg-brand/10 text-brand"
                  : "border-border/60 bg-card/70 text-foreground/80 hover:border-brand/40 hover:text-foreground"
              )}
            >
              {position}
            </button>
          ))}
        </div>
      </div>
    </section>
  )
}
