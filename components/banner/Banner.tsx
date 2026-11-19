import Link from "next/link"
import {
  ArrowRight,
  BadgeCheck,
  BookOpen,
  MapPin,
  Search,
  Sparkles,
  Star,
  TrendingUp,
  Users,
} from "lucide-react"

import { BannerSlider } from "@/components/banner/BannerSlider"

const POPULAR_SEARCHES = [
  { label: "Higher Math", href: "/tuitions?q=higher+math" },
  { label: "English", href: "/tuitions?q=english" },
  { label: "Physics", href: "/tuitions?q=physics" },
  { label: "Admission", href: "/tuitions?q=admission" },
  { label: "ICT", href: "/tuitions?q=ict" },
]

const STATS = [
  {
    value: "10K+",
    label: "Happy students",
    icon: Users,
    iconClassName:
      "bg-indigo-50 text-indigo-600 dark:bg-indigo-400/10 dark:text-indigo-300",
  },
  {
    value: "2.5K+",
    label: "Verified tutors",
    icon: BadgeCheck,
    iconClassName:
      "bg-emerald-50 text-emerald-600 dark:bg-emerald-400/10 dark:text-emerald-300",
  },
  {
    value: "4.9/5",
    label: "Average rating",
    icon: Star,
    iconClassName:
      "bg-amber-50 text-amber-600 dark:bg-amber-400/10 dark:text-amber-300",
  },
  {
    value: "98%",
    label: "Satisfaction rate",
    icon: TrendingUp,
    iconClassName:
      "bg-sky-50 text-sky-600 dark:bg-sky-400/10 dark:text-sky-300",
  },
]

export function Banner() {
  return (
    <section
      aria-labelledby="banner-heading"
      className="relative isolate overflow-hidden bg-slate-50 dark:bg-slate-950"
    >
      {/* Decorative background */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10"
      >
        <div className="absolute inset-0 bg-linear-to-b from-indigo-50/90 via-white to-white dark:from-indigo-950/30 dark:via-slate-950 dark:to-slate-950" />
        <div
          className="absolute inset-0 opacity-50 dark:opacity-[0.07]"
          style={{
            backgroundImage:
              "linear-gradient(to right, rgb(203 213 225 / 0.55) 1px, transparent 1px), linear-gradient(to bottom, rgb(203 213 225 / 0.55) 1px, transparent 1px)",
            backgroundSize: "64px 64px",
            maskImage:
              "radial-gradient(ellipse 75% 65% at 50% 0%, black, transparent)",
            WebkitMaskImage:
              "radial-gradient(ellipse 75% 65% at 50% 0%, black, transparent)",
          }}
        />
        <div className="absolute -top-32 -left-32 size-96 rounded-full bg-indigo-400/20 blur-3xl dark:bg-indigo-600/10" />
        <div className="absolute top-0 right-0 size-96 rounded-full bg-sky-400/20 blur-3xl dark:bg-sky-600/10" />
        <div className="absolute bottom-20 left-1/3 size-64 rounded-full bg-amber-300/20 blur-3xl dark:bg-amber-500/5" />
      </div>

      <div className="mx-auto w-full max-w-7xl px-4 pt-12 pb-16 sm:px-6 sm:pt-16 lg:px-8 lg:pt-20 lg:pb-24">
        <div className="grid items-center gap-14 lg:grid-cols-2 lg:gap-12 xl:gap-20">
          {/* Copy + search */}
          <div className="max-w-2xl">
            <span className="inline-flex items-center gap-2 rounded-full border border-indigo-200/80 bg-white/80 px-3.5 py-1.5 text-xs font-semibold text-indigo-700 shadow-sm backdrop-blur dark:border-indigo-400/20 dark:bg-indigo-400/10 dark:text-indigo-300">
              <Sparkles className="size-3.5 text-amber-500" />
              Bangladesh&apos;s trusted tutoring marketplace
            </span>

            <h1
              id="banner-heading"
              className="mt-5 text-4xl font-bold tracking-tight text-balance text-slate-900 sm:text-5xl lg:text-[3.4rem] lg:leading-[1.08] dark:text-white"
            >
              Find your perfect tutor.{" "}
              <span className="block bg-linear-to-r from-indigo-600 via-violet-600 to-sky-500 bg-clip-text text-transparent dark:from-indigo-400 dark:via-violet-400 dark:to-sky-400">
                Learn with confidence.
              </span>
            </h1>

            <p className="mt-5 max-w-xl text-base leading-7 text-pretty text-slate-600 sm:text-lg dark:text-slate-300">
              Connect with verified mentors for school, admission and university
              subjects. Compare profiles, book a free trial class, and learn at
              your own pace — online or in person.
            </p>

            <form
              action="/tuitions"
              role="search"
              className="mt-8 rounded-2xl border border-slate-200/80 bg-white/90 p-2 shadow-xl shadow-slate-900/5 backdrop-blur dark:border-slate-800 dark:bg-slate-900/80 dark:shadow-black/20"
            >
              <div className="flex flex-col gap-1.5 sm:flex-row sm:items-center">
                <div className="flex flex-1 items-center gap-2.5 rounded-xl px-3 py-2.5 transition-colors focus-within:bg-slate-50 dark:focus-within:bg-slate-800/60">
                  <Search className="size-4.5 shrink-0 text-indigo-500" />
                  <label htmlFor="banner-subject" className="sr-only">
                    Subject, class or exam
                  </label>
                  <input
                    id="banner-subject"
                    name="q"
                    type="search"
                    placeholder="Subject, class or exam..."
                    className="w-full min-w-0 bg-transparent text-sm font-medium text-slate-900 outline-none placeholder:font-normal placeholder:text-slate-400 dark:text-white dark:placeholder:text-slate-500"
                  />
                </div>

                <span
                  aria-hidden="true"
                  className="hidden h-7 w-px bg-slate-200 sm:block dark:bg-slate-700"
                />

                <div className="flex items-center gap-2.5 rounded-xl px-3 py-2.5 transition-colors focus-within:bg-slate-50 sm:w-44 dark:focus-within:bg-slate-800/60">
                  <MapPin className="size-4.5 shrink-0 text-indigo-500" />
                  <label htmlFor="banner-location" className="sr-only">
                    Preferred location
                  </label>
                  <input
                    id="banner-location"
                    name="location"
                    type="text"
                    placeholder="Location"
                    className="w-full min-w-0 bg-transparent text-sm font-medium text-slate-900 outline-none placeholder:font-normal placeholder:text-slate-400 dark:text-white dark:placeholder:text-slate-500"
                  />
                </div>

                <button
                  type="submit"
                  className="inline-flex h-11 shrink-0 items-center justify-center gap-1.5 rounded-xl bg-slate-900 px-5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-slate-800 focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 focus-visible:outline-none dark:bg-white dark:text-slate-900 dark:hover:bg-slate-100 dark:focus-visible:ring-offset-slate-950"
                >
                  <Search className="size-4 sm:hidden" />
                  Search
                </button>
              </div>
            </form>

            <div className="mt-4 flex flex-wrap items-center gap-2 text-xs">
              <span className="font-medium text-slate-500 dark:text-slate-400">
                Popular:
              </span>
              {POPULAR_SEARCHES.map((search) => (
                <Link
                  key={search.label}
                  href={search.href}
                  className="rounded-full border border-slate-200 bg-white/70 px-3 py-1 font-medium text-slate-600 transition-colors hover:border-indigo-300 hover:bg-indigo-50 hover:text-indigo-700 dark:border-slate-800 dark:bg-slate-900/60 dark:text-slate-300 dark:hover:border-indigo-400/30 dark:hover:bg-indigo-400/10 dark:hover:text-indigo-300"
                >
                  {search.label}
                </Link>
              ))}
            </div>

            <div className="mt-7 flex flex-wrap items-center gap-3">
              <Link
                href="/signup"
                className="group inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-indigo-600 px-5 text-sm font-semibold text-white shadow-lg shadow-indigo-600/25 transition-all hover:bg-indigo-700 hover:shadow-indigo-600/30 focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 focus-visible:outline-none active:translate-y-px dark:focus-visible:ring-offset-slate-950"
              >
                Get started free
                <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
              </Link>
              <Link
                href="/tuitions"
                className="inline-flex h-11 items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white/80 px-5 text-sm font-semibold text-slate-700 shadow-sm backdrop-blur transition-colors hover:border-slate-300 hover:bg-white focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 focus-visible:outline-none dark:border-slate-800 dark:bg-slate-900/70 dark:text-slate-200 dark:hover:border-slate-700 dark:hover:bg-slate-800 dark:focus-visible:ring-offset-slate-950"
              >
                <BookOpen className="size-4 text-indigo-500" />
                Browse Tuitions
              </Link>
            </div>
          </div>

          <BannerSlider />
        </div>
      </div>

      {/* Trust strip */}
      <div className="relative border-t border-slate-200/70 bg-white/60 backdrop-blur dark:border-slate-800/70 dark:bg-slate-900/40">
        <dl className="mx-auto grid w-full max-w-7xl grid-cols-2 gap-x-4 gap-y-6 px-4 py-6 sm:grid-cols-4 sm:px-6 lg:px-8">
          {STATS.map((stat) => {
            const Icon = stat.icon

            return (
              <div key={stat.label} className="flex items-center gap-3">
                <span
                  className={`grid size-10 shrink-0 place-items-center rounded-xl ${stat.iconClassName}`}
                >
                  <Icon className="size-5" />
                </span>
                <div>
                  <dd className="text-lg font-bold text-slate-900 dark:text-white">
                    {stat.value}
                  </dd>
                  <dt className="text-xs font-medium text-slate-500 dark:text-slate-400">
                    {stat.label}
                  </dt>
                </div>
              </div>
            )
          })}
        </dl>
      </div>
    </section>
  )
}

export default Banner
