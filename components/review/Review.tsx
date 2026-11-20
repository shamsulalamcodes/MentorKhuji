"use client"

import { useCallback, useRef, useState } from "react"
import { ArrowLeft, ArrowRight, BadgeCheck, Quote, Star } from "lucide-react"

import { cn } from "@/lib/utils"

type Review = {
  id: string
  name: string
  role: string
  subject: string
  quote: string
  rating: number
}

// Replace with real reviews from your database when you have them.
const REVIEWS: Review[] = [
  {
    id: "farhan",
    name: "Farhan Islam",
    role: "HSC student",
    subject: "Physics",
    quote:
      "Mechanics finally makes sense. The tutor explains every concept step by step and the weekly MCQ practice kept me on track.",
    rating: 5,
  },
  {
    id: "ayesha",
    name: "Ayesha Siddika",
    role: "SSC student",
    subject: "Spoken English",
    quote:
      "I used to feel shy speaking English. After a few weeks of conversation practice, I now speak with real confidence.",
    rating: 5,
  },
  {
    id: "sabbir",
    name: "Sabbir Khan",
    role: "Class 9 student",
    subject: "Programming",
    quote:
      "I started as a complete beginner. The lessons are simple and hands-on, and I wrote my first C program in week two.",
    rating: 5,
  },
  {
    id: "mim",
    name: "Mim Akter",
    role: "Class 8 student",
    subject: "Mathematics",
    quote:
      "Patient teaching and lots of practice problems. Math is no longer scary, and my exam marks have improved a lot.",
    rating: 5,
  },
]

const initials = (name: string) =>
  name
    .split(" ")
    .map((n) => n[0])
    .slice(0, 2)
    .join("")
    .toUpperCase()

const arrowClass =
  "inline-flex size-11 items-center justify-center rounded-full bg-white text-slate-700 ring-1 ring-slate-200 transition-colors hover:bg-slate-100 focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-40"

export function Review() {
  const trackRef = useRef<HTMLDivElement>(null)
  const [canGoPrevious, setCanGoPrevious] = useState(false)
  const [canGoNext, setCanGoNext] = useState(true)

  const updateControls = useCallback(() => {
    const track = trackRef.current
    if (!track) return
    const maxScrollLeft = track.scrollWidth - track.clientWidth
    setCanGoPrevious(track.scrollLeft > 4)
    setCanGoNext(track.scrollLeft < maxScrollLeft - 4)
  }, [])

  const scrollToCard = useCallback((direction: -1 | 1) => {
    const track = trackRef.current
    if (!track) return

    const cards = Array.from(
      track.querySelectorAll<HTMLElement>("[data-review-card]")
    )
    const trackLeft = track.getBoundingClientRect().left
    const offsets = cards.map(
      (card) => card.getBoundingClientRect().left - trackLeft + track.scrollLeft
    )

    const target =
      direction === 1
        ? offsets.find((o) => o > track.scrollLeft + 8)
        : [...offsets].reverse().find((o) => o < track.scrollLeft - 8)

    if (target === undefined) return

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches
    track.scrollTo({ left: target, behavior: reduceMotion ? "auto" : "smooth" })
  }, [])

  return (
    <section
      id="reviews"
      aria-labelledby="reviews-heading"
      className="bg-white py-16 sm:py-24"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        {/* Heading, same pattern as the other sections */}
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold uppercase tracking-wider text-indigo-600">
            Student reviews
          </p>
          <h2
            id="reviews-heading"
            className="mt-3 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl"
          >
            Loved by students across Bangladesh
          </h2>
          <p className="mt-4 text-base text-slate-600 sm:text-lg">
            Real stories from students who found the right tutor on
            MentorLagbe.
          </p>
          <div className="mt-5 inline-flex items-center gap-2 rounded-full bg-slate-50 px-4 py-2 ring-1 ring-slate-200">
            <span className="flex" role="img" aria-label="Rated 4.8 out of 5">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  aria-hidden="true"
                  className="size-4 fill-amber-400 text-amber-400"
                />
              ))}
            </span>
            <span className="text-sm font-semibold text-slate-900">4.8/5</span>
            <span className="text-sm text-slate-500">average rating</span>
          </div>
        </div>

        {/* Carousel */}
        <div className="mt-12">
          <div
            ref={trackRef}
            role="region"
            aria-roledescription="carousel"
            aria-label="Student reviews"
            tabIndex={0}
            onScroll={updateControls}
            onKeyDown={(e) => {
              if (e.key === "ArrowLeft") {
                e.preventDefault()
                scrollToCard(-1)
              }
              if (e.key === "ArrowRight") {
                e.preventDefault()
                scrollToCard(1)
              }
            }}
            className="no-scrollbar -mx-4 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-4 outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 sm:-mx-6 sm:gap-6 sm:px-6 lg:mx-0 lg:px-0"
          >
            {REVIEWS.map((r) => (
              <article
                key={r.id}
                data-review-card
                className={cn(
                  "flex w-[85%] shrink-0 snap-start flex-col rounded-3xl bg-slate-50 p-6 ring-1 ring-slate-200 transition hover:shadow-lg hover:shadow-indigo-100 sm:w-[46%] sm:p-8 lg:w-[calc((100%-3rem)/3)]"
                )}
              >
                <div className="flex items-center justify-between">
                  <Quote
                    className="size-8 text-indigo-200"
                    aria-hidden="true"
                  />
                  <span className="rounded-full bg-indigo-50 px-3 py-1 text-xs font-semibold text-indigo-700">
                    {r.subject}
                  </span>
                </div>

                <div
                  className="mt-4 flex"
                  role="img"
                  aria-label={`Rated ${r.rating} out of 5 stars`}
                >
                  {Array.from({ length: r.rating }).map((_, i) => (
                    <Star
                      key={i}
                      aria-hidden="true"
                      className="size-4 fill-amber-400 text-amber-400"
                    />
                  ))}
                </div>

                <blockquote className="mt-4 flex-1 text-base leading-relaxed text-slate-700">
                  “{r.quote}”
                </blockquote>

                <div className="mt-6 flex items-center gap-3 border-t border-slate-200 pt-5">
                  <span className="flex size-11 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-indigo-600 to-sky-500 text-sm font-bold text-white">
                    {initials(r.name)}
                  </span>
                  <div className="min-w-0">
                    <p className="flex items-center gap-1.5 text-sm font-semibold text-slate-900">
                      <span className="truncate">{r.name}</span>
                      <BadgeCheck
                        className="size-4 shrink-0 text-indigo-500"
                        aria-label="Verified student"
                      />
                    </p>
                    <p className="truncate text-sm text-slate-500">{r.role}</p>
                  </div>
                </div>
              </article>
            ))}
          </div>

          {/* Controls */}
          <div className="mt-6 flex justify-center gap-3">
            <button
              type="button"
              onClick={() => scrollToCard(-1)}
              disabled={!canGoPrevious}
              aria-label="Show previous review"
              className={arrowClass}
            >
              <ArrowLeft className="size-5" />
            </button>
            <button
              type="button"
              onClick={() => scrollToCard(1)}
              disabled={!canGoNext}
              aria-label="Show next review"
              className={arrowClass}
            >
              <ArrowRight className="size-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Review
