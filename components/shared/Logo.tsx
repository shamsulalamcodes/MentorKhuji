import Image from "next/image"
import Link from "next/link"

import { cn } from "@/lib/utils"

type LogoProps = {
  className?: string
  imageClassName?: string
  href?: string | null
  preload?: boolean
}

/**
 * The MentorLagbe brand mark. Kept in one place so the Navbar, Footer and any
 * page headings always render the logo at the same size and style.
 */
export function Logo({
  className,
  imageClassName,
  href = "/",
  preload = false,
}: LogoProps) {
  const image = (
    <Image
      src="/mentorlagbe-logo.png"
      alt="MentorLagbe — Find your perfect tutor"
      width={1320}
      height={400}
      preload={preload}
      className={cn("h-11 w-auto select-none", imageClassName)}
    />
  )

  if (href === null) {
    return (
      <span className={cn("inline-flex items-center", className)}>{image}</span>
    )
  }

  return (
    <Link
      href={href}
      aria-label="MentorLagbe home"
      className={cn(
        "inline-flex items-center rounded-xl transition-opacity outline-none hover:opacity-90 focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-offset-slate-950",
        className
      )}
    >
      {image}
    </Link>
  )
}

export default Logo
