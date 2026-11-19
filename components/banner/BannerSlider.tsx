"use client"

import Image from "next/image"
import { useCallback, useEffect, useRef, useState } from "react"
import { ArrowLeft, ArrowRight, ShieldCheck, Star } from "lucide-react"

import { cn } from "@/lib/utils"

const SLIDES = [
  {
    src: "/banner/slide-1.jpg",
    alt: "Students collaborating with a mentor around a table with laptops",
    eyebrow: "Guided study sessions",
    title: "Learning that feels personal",
    description:
      "Friendly mentors make every session clear, focused, and easy to follow.",
  },
  {
    src: "/banner/slide-2.jpg",
    alt: "A group of students studying together around a table",
    eyebrow: "Small-group learning",
    title: "Learn together, grow faster",
    description:
      "Collaborative sessions that keep every learner engaged and supported.",
  },
  {
    src: "/banner/slide-3.jpg",
    alt: "Students learning in a bright, focused classroom",
    eyebrow: "Verified mentorship",
    title: "Real classrooms, real progress",
    description:
      "Verified mentors help students build confidence before every exam.",
  },
] as const

const AUTOPLAY_MS = 5500

export function BannerSlider() {
  const [index, setIndex] = useState(0)
  const [paused, setPaused] = useState(false)
  const [reducedMotion, setReducedMotion] = useState(false)
  const sliderRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)")
    const update = () => setReducedMotion(query.matches)

    update()
    query.addEventListener("change", update)

    return () => query.removeEventListener("change", update)
  }, [])

  useEffect(() => {
    const handleVisibility = () => setPaused(document.hidden)

    handleVisibility()
    document.addEventListener("visibilitychange", handleVisibility)

    return () =>
      document.removeEventListener("visibilitychange", handleVisibility)
  }, [])

  const goTo = useCallback((nextIndex: number) => {
    setIndex((nextIndex + SLIDES.length) % SLIDES.length)
  }, [])

  const goNext = useCallback(() => {
    setIndex((current) => (current + 1) % SLIDES.length)
  }, [])

  const goPrevious = useCallback(() => {
    setIndex((current) => (current - 1 + SLIDES.length) % SLIDES.length)
  }, [])

  useEffect(() => {
    if (paused || reducedMotion) return

    const timer = window.setInterval(goNext, AUTOPLAY_MS)

    return () => window.clearInterval(timer)
  }, [goNext, paused, reducedMotion])

  const activeSlide = SLIDES[index]

  return (
    <div className="relative mx-auto w-full max-w-md lg:max-w-lg">
      <div
        aria-hidden="true"
        className="absolute -inset-6 -z-10 rounded-[3rem] bg-linear-to-tr from-indigo-500/15 via-sky-400/10 to-amber-300/20 blur-2xl"
      />

      <div
        ref={sliderRef}
        role="region"
        aria-roledescription="carousel"
        aria-label="Learning moments with MentorLagbe tutors"
        tabIndex={0}
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        onFocusCapture={() => setPaused(true)}
        onBlurCapture={(event) => {
          if (!event.currentTarget.contains(event.relatedTarget as Node)) {
            setPaused(false)
          }
        }}
        onKeyDown={(event) => {
          if (event.key === "ArrowLeft") {
            event.preventDefault()
            goPrevious()
          }

          if (event.key === "ArrowRight") {
            event.preventDefault()
            goNext()
          }
        }}
        className="group relative aspect-[4/5] overflow-hidden rounded-[2rem] border border-white/70 bg-slate-900 shadow-2xl ring-1 shadow-indigo-950/15 ring-slate-900/5 outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 sm:aspect-[5/6] dark:border-slate-800 dark:shadow-black/40 dark:ring-white/5 dark:focus-visible:ring-offset-slate-950"
      >
        {SLIDES.map((slide, slideIndex) => (
          <div
            key={slide.src}
            role="group"
            aria-roledescription="slide"
            aria-label={`${slideIndex + 1} of ${SLIDES.length}`}
            aria-hidden={slideIndex !== index}
            className={cn(
              "absolute inset-0 transition-opacity duration-700 ease-out",
              slideIndex === index
                ? "opacity-100"
                : "pointer-events-none opacity-0"
            )}
          >
            <Image
              src={slide.src}
              alt={slide.alt}
              fill
              preload={slideIndex === 0}
              sizes="(min-width: 1024px) 480px, 90vw"
              className={cn(
                "object-cover transition-transform duration-[6000ms] ease-out",
                slideIndex === index ? "scale-105" : "scale-100"
              )}
            />
          </div>
        ))}

        <div
          aria-hidden="true"
          className="absolute inset-0 bg-linear-to-t from-slate-950 via-slate-950/45 to-slate-950/5"
        />

        <div className="absolute inset-x-0 top-0 flex items-center justify-between gap-3 p-5">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-white/90 px-3 py-1.5 text-[11px] font-semibold text-slate-800 shadow-sm backdrop-blur">
            <ShieldCheck className="size-3.5 text-emerald-600" />
            Verified tutors
          </span>
          <span className="inline-flex items-center gap-1.5 rounded-full bg-slate-950/35 px-3 py-1.5 text-[11px] font-semibold text-white ring-1 ring-white/20 backdrop-blur">
            <span className="relative flex size-1.5">
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex size-1.5 rounded-full bg-emerald-400" />
            </span>
            Learning now
          </span>
        </div>

        <div className="absolute inset-x-0 bottom-0 px-5 pb-14 text-white sm:px-6 sm:pb-16">
          <p className="text-[10px] font-semibold tracking-[0.2em] text-amber-300 uppercase">
            {activeSlide.eyebrow}
          </p>
          <h2 className="mt-2 text-xl font-bold tracking-tight text-balance sm:text-2xl">
            {activeSlide.title}
          </h2>
          <p className="mt-1.5 max-w-sm text-sm leading-6 text-white/75">
            {activeSlide.description}
          </p>
        </div>

        <button
          type="button"
          onClick={goPrevious}
          aria-label="Previous slide"
          className="absolute top-1/2 left-3 inline-flex size-9 -translate-y-1/2 items-center justify-center rounded-full bg-slate-950/35 text-white ring-1 ring-white/20 backdrop-blur transition-all hover:bg-slate-950/60 focus-visible:ring-2 focus-visible:ring-white focus-visible:outline-none sm:opacity-0 sm:group-focus-within:opacity-100 sm:group-hover:opacity-100"
        >
          <ArrowLeft className="size-4" />
        </button>
        <button
          type="button"
          onClick={goNext}
          aria-label="Next slide"
          className="absolute top-1/2 right-3 inline-flex size-9 -translate-y-1/2 items-center justify-center rounded-full bg-slate-950/35 text-white ring-1 ring-white/20 backdrop-blur transition-all hover:bg-slate-950/60 focus-visible:ring-2 focus-visible:ring-white focus-visible:outline-none sm:opacity-0 sm:group-focus-within:opacity-100 sm:group-hover:opacity-100"
        >
          <ArrowRight className="size-4" />
        </button>

        <div className="absolute inset-x-0 bottom-5 flex items-center justify-center gap-2">
          {SLIDES.map((slide, slideIndex) => (
            <button
              key={slide.src}
              type="button"
              onClick={() => goTo(slideIndex)}
              aria-label={`Go to slide ${slideIndex + 1}`}
              aria-current={slideIndex === index ? "true" : undefined}
              className={cn(
                "h-1.5 rounded-full transition-all duration-300 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950 focus-visible:outline-none",
                slideIndex === index
                  ? "w-7 bg-white"
                  : "w-1.5 bg-white/40 hover:bg-white/70"
              )}
            />
          ))}
        </div>
      </div>

      <div className="absolute -right-2 -bottom-14 hidden items-center gap-2.5 rounded-2xl border border-slate-200/80 bg-white px-3.5 py-2.5 shadow-xl shadow-slate-900/10 sm:flex dark:border-slate-800 dark:bg-slate-900 dark:shadow-black/30">
        <span className="grid size-9 place-items-center rounded-full bg-amber-50 text-amber-500 dark:bg-amber-400/10">
          <Star className="size-4.5 fill-current" />
        </span>
        <div>
          <p className="text-xs font-semibold text-slate-900 dark:text-white">
            4.9 average rating
          </p>
          <p className="text-[11px] text-slate-500 dark:text-slate-400">
            from 2,300+ learners
          </p>
        </div>
      </div>

      <div
        aria-hidden="true"
        className="absolute -top-8 -right-8 -z-10 size-24 rounded-full border border-dashed border-indigo-300/60 dark:border-indigo-400/20"
      />
    </div>
  )
}

export default BannerSlider
