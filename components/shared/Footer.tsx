import Link from "next/link"
import { Clock, Mail, MapPin, Phone, ShieldCheck } from "lucide-react"

import { Logo } from "@/components/shared/Logo"

const EXPLORE_LINKS = [
  { label: "Home", href: "/" },
  { label: "Browse Tuitions", href: "/tuitions" },
  { label: "Pricing", href: "/pricing" },
  { label: "How It Works", href: "/about" },
] as const

const RESOURCE_LINKS = [
  { label: "Find a Tutor", href: "/tuitions" },
  { label: "Become a Tutor", href: "/signup?role=tutor" },
  { label: "Student Dashboard", href: "/dashboard" },
  { label: "Help Center", href: "/help" },
] as const

type SocialName = "x" | "facebook" | "instagram" | "linkedin" | "youtube"

const SOCIALS: Array<{
  name: SocialName
  label: string
  href: string
  hoverClassName: string
  path: string
}> = [
  {
    name: "x",
    label: "MentorLagbe on X",
    href: "https://x.com/mentorlagbe",
    hoverClassName:
      "hover:border-transparent hover:bg-white hover:text-slate-950",
    path: "M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z",
  },
  {
    name: "facebook",
    label: "MentorLagbe on Facebook",
    href: "https://facebook.com/mentorlagbe",
    hoverClassName:
      "hover:border-transparent hover:bg-[#1877F2] hover:text-white",
    path: "M22 12.06C22 6.5 17.52 2 12 2S2 6.5 2 12.06c0 5.02 3.66 9.18 8.44 9.94v-7.03H7.9v-2.91h2.54V9.85c0-2.51 1.49-3.9 3.77-3.9 1.09 0 2.23.2 2.23.2v2.46h-1.26c-1.24 0-1.63.78-1.63 1.57v1.88h2.78l-.44 2.91h-2.34V22c4.78-.76 8.45-4.92 8.45-9.94z",
  },
  {
    name: "instagram",
    label: "MentorLagbe on Instagram",
    href: "https://instagram.com/mentorlagbe",
    hoverClassName:
      "hover:border-transparent hover:bg-linear-to-tr hover:from-[#F58529] hover:via-[#DD2A7B] hover:to-[#8134AF] hover:text-white",
    path: "M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163C8.741 0 8.332.014 7.052.072 2.695.272.273 2.69.073 7.052.014 8.332 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.332 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.668-.072-4.948-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z",
  },
  {
    name: "linkedin",
    label: "MentorLagbe on LinkedIn",
    href: "https://linkedin.com/company/mentorlagbe",
    hoverClassName:
      "hover:border-transparent hover:bg-[#0A66C2] hover:text-white",
    path: "M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.225 0z",
  },
  {
    name: "youtube",
    label: "MentorLagbe on YouTube",
    href: "https://youtube.com/@mentorlagbe",
    hoverClassName:
      "hover:border-transparent hover:bg-[#FF0000] hover:text-white",
    path: "M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z",
  },
]

function SocialIcon({ name }: { name: SocialName }) {
  const social = SOCIALS.find((item) => item.name === name)

  if (!social) return null

  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      focusable="false"
      className="size-4 fill-current"
    >
      <path d={social.path} />
    </svg>
  )
}

export function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="relative overflow-hidden bg-slate-950 text-slate-400">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="absolute -top-48 left-1/4 size-96 rounded-full bg-indigo-600/20 blur-3xl" />
        <div className="absolute -right-32 -bottom-32 size-96 rounded-full bg-sky-500/10 blur-3xl" />
        <div className="absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-white/20 to-transparent" />
      </div>

      <div className="relative mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-10 py-14 lg:grid-cols-12 lg:gap-8 lg:py-16">
          <div className="lg:col-span-4">
            <div className="inline-flex rounded-2xl bg-white p-3 shadow-lg shadow-black/20">
              <Logo href="/" />
            </div>

            <p className="mt-5 max-w-sm text-sm leading-6 text-slate-400">
              Bangladesh&apos;s trusted tutoring marketplace — connecting
              ambitious students with verified mentors who make learning click.
            </p>

            <div className="mt-5 inline-flex items-center gap-2 rounded-full border border-emerald-400/15 bg-emerald-400/5 px-3 py-1.5 text-xs font-medium text-emerald-300">
              <ShieldCheck className="size-3.5" />
              100% verified tutors
            </div>

            <div className="mt-6 flex flex-wrap items-center gap-2">
              {SOCIALS.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noreferrer noopener"
                  aria-label={social.label}
                  className={`inline-flex size-9 items-center justify-center rounded-full border border-white/10 bg-white/5 text-slate-300 transition-all duration-200 hover:-translate-y-0.5 ${social.hoverClassName}`}
                >
                  <SocialIcon name={social.name} />
                </a>
              ))}
            </div>
          </div>

          <div className="sm:grid sm:grid-cols-2 sm:gap-8 lg:col-span-5 lg:grid-cols-2 lg:pl-6">
            <div>
              <h2 className="text-xs font-semibold tracking-[0.18em] text-white uppercase">
                Explore
              </h2>
              <ul className="mt-4 space-y-3">
                {EXPLORE_LINKS.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="inline-flex text-sm text-slate-400 transition-colors hover:text-white"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-8 sm:mt-0">
              <h2 className="text-xs font-semibold tracking-[0.18em] text-white uppercase">
                For You
              </h2>
              <ul className="mt-4 space-y-3">
                {RESOURCE_LINKS.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="inline-flex text-sm text-slate-400 transition-colors hover:text-white"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="lg:col-span-3">
            <h2 className="text-xs font-semibold tracking-[0.18em] text-white uppercase">
              Get in touch
            </h2>
            <ul className="mt-4 space-y-3.5 text-sm">
              <li>
                <a
                  href="mailto:support@mentorlagbe.com"
                  className="group flex items-start gap-3 transition-colors hover:text-white"
                >
                  <span className="mt-0.5 inline-flex size-8 shrink-0 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-slate-300 transition-colors group-hover:border-indigo-400/30 group-hover:bg-indigo-500/10 group-hover:text-indigo-300">
                    <Mail className="size-4" />
                  </span>
                  <span>
                    <span className="block text-xs text-slate-500">Email</span>
                    support@mentorlagbe.com
                  </span>
                </a>
              </li>
              <li>
                <a
                  href="tel:+8801712345678"
                  className="group flex items-start gap-3 transition-colors hover:text-white"
                >
                  <span className="mt-0.5 inline-flex size-8 shrink-0 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-slate-300 transition-colors group-hover:border-indigo-400/30 group-hover:bg-indigo-500/10 group-hover:text-indigo-300">
                    <Phone className="size-4" />
                  </span>
                  <span>
                    <span className="block text-xs text-slate-500">Phone</span>
                    +880 1712-345678
                  </span>
                </a>
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-0.5 inline-flex size-8 shrink-0 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-slate-300">
                  <MapPin className="size-4" />
                </span>
                <span>
                  <span className="block text-xs text-slate-500">Location</span>
                  Dhaka, Bangladesh
                </span>
              </li>
              <li className="flex items-center gap-2 pt-1 text-xs text-slate-500">
                <Clock className="size-3.5" />
                Support available 9am – 9pm (BST)
              </li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col gap-4 border-t border-white/10 py-6 text-xs sm:flex-row sm:items-center sm:justify-between">
          <p className="text-slate-500">
            © {year} MentorLagbe. All rights reserved.
          </p>

          <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
            <Link
              href="/privacy"
              className="text-slate-500 transition-colors hover:text-white"
            >
              Privacy Policy
            </Link>
            <Link
              href="/terms"
              className="text-slate-500 transition-colors hover:text-white"
            >
              Terms of Service
            </Link>
            <Link
              href="/contact"
              className="text-slate-500 transition-colors hover:text-white"
            >
              Contact
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
