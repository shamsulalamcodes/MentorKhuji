"use client"

import Image from "next/image"
import { useCallback, useRef, useState } from "react"
import { ArrowLeft, ArrowRight, Star } from "lucide-react"

import { cn } from "@/lib/utils"

type Review = {
  id: string
  tutor: string
  role: string
  avatar: string
  quote: string
  reviewer: string
  rating: number
  cardClassName: string
}

const REVIEWS: Review[] = [
  {
    id: "adith",
    tutor: "Adith",
    role: "Computer Programming Tutor",
    avatar: "/reviews/review-1.jpg",
    quote:
      "Wonderful tutor — flexible with scheduling and always willing to work through difficult material with the student. Highly recommend.",
    reviewer: "Shelly",
    rating: 5,
    cardClassName: "bg-[#F8DF8B]",
  },
  {
    id: "seth",
    tutor: "Seth",
    role: "Tennis Coach",
    avatar: "/reviews/review-3.jpg",
    quote:
      "He is an excellent coach who helped me improve my tennis technique and confidence. I highly recommend him to anyone looking to improve their game.",
    reviewer: "Jun",
    rating: 5,
    cardClassName: "bg-[#DFF2E4]",
  },
  {
    id: "ayesha",
    tutor: "Ayesha",
    role: "English Tutor",
    avatar: "/reviews/review-2.jpg",
    quote:
      "She made every lesson feel simple and practical. My writing improved so much in just a few weeks, and I actually look forward to studying now.",
    reviewer: "Rafi",
    rating: 5,
    cardClassName: "bg-[#FBD9C9]",
  },
  {
    id: "farhana",
    tutor: "Farhana",
    role: "Higher Math Tutor",
    avatar: "/reviews/review-4.jpg",
    quote:
      "Clear explanations, patient teaching, and plenty of practice. I finally feel confident solving higher math problems on my own.",
    reviewer: "Mim",
    rating: 5,
    cardClassName: "bg-[#E6E0FA]",
  },
]

function Stars({ className }: { className?: string }) {
  return (
    <span className={cn("inline-flex items-center gap-0.5", className)}>
      {Array.from({ length: 5 }).map((_, index) => (
        <Star key={index} className="size-4 fill-current" aria-hidden="true" />
      ))}
    </span>
  )
}

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

    const cardOffsets = cards.map((card) => {
      const rect = card.getBoundingClientRect()

      return rect.left - trackLeft + track.scrollLeft
    })

    const targetOffset =
      direction === 1
        ? cardOffsets.find((offset) => offset > track.scrollLeft + 8)
        : [...cardOffsets]
            .reverse()
            .find((offset) => offset < track.scrollLeft - 8)

    if (targetOffset === undefined) return

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches

    track.scrollTo({
      left: targetOffset,
      behavior: reduceMotion ? "auto" : "smooth",
    })
  }, [])

  return (
    <section
      aria-labelledby="reviews-heading"
      className="relative overflow-hidden border-t border-slate-100 bg-white py-16 sm:py-20 lg:py-28 dark:border-slate-800 dark:bg-slate-950"
    >
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.25fr)] lg:gap-10 xl:gap-16">
          <div className="max-w-md">
            <div
              role="img"
              aria-label="Rated 5 out of 5 stars"
              className="flex items-center gap-1 text-amber-400"
            >
              {Array.from({ length: 5 }).map((_, index) => (
                <Star
                  key={index}
                  aria-hidden="true"
                  className="size-6 fill-current sm:size-7"
                />
              ))}
            </div>

            <h2
              id="reviews-heading"
              className="mt-4 text-4xl font-extrabold tracking-tight text-slate-950 sm:text-5xl lg:text-[2.6rem] lg:leading-[1.05] dark:text-white"
            >
              The Perfect Match
            </h2>

            <p className="mt-4 text-sm leading-6 text-slate-600 sm:text-base dark:text-slate-300">
              More than one million students gave a{" "}
              <strong className="font-semibold text-slate-900 dark:text-white">
                5 star review
              </strong>{" "}
              to their tutor.
            </p>

            <div className="mt-8 flex items-center gap-3">
              <button
                type="button"
                onClick={() => scrollToCard(-1)}
                disabled={!canGoPrevious}
                aria-label="Show previous review"
                className="inline-flex size-12 items-center justify-center rounded-full bg-slate-100 text-slate-900 transition-colors hover:bg-slate-200 focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-40 dark:bg-slate-800 dark:text-white dark:hover:bg-slate-700 dark:focus-visible:ring-offset-slate-950"
              >
                <ArrowLeft className="size-5" />
              </button>
              <button
                type="button"
                onClick={() => scrollToCard(1)}
                disabled={!canGoNext}
                aria-label="Show next review"
                className="inline-flex size-12 items-center justify-center rounded-full bg-slate-100 text-slate-900 transition-colors hover:bg-slate-200 focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-40 dark:bg-slate-800 dark:text-white dark:hover:bg-slate-700 dark:focus-visible:ring-offset-slate-950"
              >
                <ArrowRight className="size-5" />
              </button>
            </div>
          </div>

          <div className="-mr-4 min-w-0 sm:-mr-6 lg:-mr-8">
            <div
              ref={trackRef}
              role="region"
              aria-roledescription="carousel"
              aria-label="Student reviews about their tutors"
              tabIndex={0}
              onScroll={updateControls}
              onKeyDown={(event) => {
                if (event.key === "ArrowLeft") {
                  event.preventDefault()
                  scrollToCard(-1)
                }

                if (event.key === "ArrowRight") {
                  event.preventDefault()
                  scrollToCard(1)
                }
              }}
              className="no-scrollbar flex snap-x snap-mandatory gap-4 overflow-x-auto pb-2 outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-4 sm:gap-5 dark:focus-visible:ring-offset-slate-950"
            >
              {REVIEWS.map((review) => (
                <article
                  key={review.id}
                  data-review-card
                  className={cn(
                    "flex min-h-[27rem] w-[86%] shrink-0 snap-start flex-col justify-between rounded-[2.25rem] p-6 shadow-sm sm:min-h-[30rem] sm:w-[64%] sm:p-8 lg:w-[73%] lg:rounded-[2.75rem] lg:p-9 xl:w-[71%]",
                    review.cardClassName
                  )}
                >
                  <div>
                    <div className="flex items-center gap-4">
                      <Image
                        src={review.avatar}
                        alt={`${review.tutor}, ${review.role}`}
                        width={144}
                        height={144}
                        className="size-14 shrink-0 rounded-full object-cover ring-4 ring-white/40 sm:size-16"
                      />
                      <div className="min-w-0">
                        <h3 className="truncate text-lg font-extrabold tracking-wide text-slate-950 uppercase">
                          {review.tutor}
                        </h3>
                        <p className="mt-0.5 text-sm font-semibold text-slate-800">
                          {review.role}
                        </p>
                      </div>
                    </div>

                    <blockquote className="mt-7 text-xl leading-[1.32] font-bold tracking-tight text-balance text-slate-950 sm:text-2xl lg:text-[1.65rem]">
                      “{review.quote}”
                    </blockquote>
                  </div>

                  <div className="mt-8 inline-flex w-fit items-center gap-2 rounded-full bg-white px-4 py-2.5 shadow-sm">
                    <span className="text-sm font-semibold text-slate-900">
                      {review.reviewer}
                    </span>
                    <Stars className="text-amber-400" />
                    <span className="sr-only">
                      Rated {review.rating} out of 5 stars
                    </span>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Review
