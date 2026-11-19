"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useEffect, useRef, useState } from "react"
import {
    ChevronDown,
    LayoutDashboard,
    LogOut,
    Menu,
    Sparkles,
    UserRound,
    X,
} from "lucide-react"

import { Logo } from "@/components/shared/Logo"
import { type AuthUser, type UserRole, useAuth } from "@/hooks/use-auth"
import { cn } from "@/lib/utils"

const NAV_LINKS = [
    { label: "Home", href: "/" },
    { label: "Browse Tuitions", href: "/tuitions" },
    { label: "Pricing", href: "/pricing" },
    { label: "How It Works", href: "/about" },
] as const

const ROLE_BADGES: Record<
    UserRole,
    { label: string; className: string; dotClassName: string }
> = {
    student: {
        label: "Student",
        className:
            "bg-sky-50 text-sky-700 ring-sky-600/20 dark:bg-sky-400/10 dark:text-sky-300 dark:ring-sky-400/20",
        dotClassName: "bg-sky-500",
    },
    tutor: {
        label: "Tutor",
        className:
            "bg-emerald-50 text-emerald-700 ring-emerald-600/20 dark:bg-emerald-400/10 dark:text-emerald-300 dark:ring-emerald-400/20",
        dotClassName: "bg-emerald-500",
    },
    admin: {
        label: "Admin",
        className:
            "bg-rose-50 text-rose-700 ring-rose-600/20 dark:bg-rose-400/10 dark:text-rose-300 dark:ring-rose-400/20",
        dotClassName: "bg-rose-500",
    },
}

export type NavbarProps = {
    /** Optional override for the session user. Falls back to `useAuth()`. */
    user?: AuthUser | null
    onSignOut?: () => void | Promise<void>
}

function isActivePath(pathname: string, href: string) {
    if (href === "/") return pathname === "/"

    return pathname === href || pathname.startsWith(`${href}/`)
}

function initialsFor(name: string) {
    const initials = name
        .trim()
        .split(/\s+/)
        .slice(0, 2)
        .map((part) => part[0]?.toUpperCase() ?? "")
        .join("")

    return initials || "U"
}

function RoleBadge({
    role,
    className,
}: {
    role: UserRole
    className?: string
}) {
    const badge = ROLE_BADGES[role]

    return (
        <span
            className={cn(
                "inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-semibold tracking-wide uppercase ring-1 ring-inset",
                badge.className,
                className
            )}
        >
            <span className={cn("size-1.5 rounded-full", badge.dotClassName)} />
            {badge.label}
        </span>
    )
}

function UserAvatar({
    user,
    className,
}: {
    user: AuthUser
    className?: string
}) {
    return (
        <span
            role="img"
            aria-label={`${user.name}'s avatar`}
            className={cn(
                "relative inline-flex size-9 shrink-0 items-center justify-center overflow-hidden rounded-full bg-linear-to-br from-indigo-500 via-indigo-500 to-sky-500 text-xs font-bold text-white shadow-sm ring-2 ring-white dark:ring-slate-900",
                className
            )}
            style={
                user.avatarUrl
                    ? {
                        backgroundImage: `url("${user.avatarUrl.replace(/"/g, "%22")}")`,
                        backgroundPosition: "center",
                        backgroundSize: "cover",
                    }
                    : undefined
            }
        >
            {user.avatarUrl ? null : initialsFor(user.name)}
        </span>
    )
}

function NavLink({
    href,
    label,
    active,
    onClick,
    className,
}: {
    href: string
    label: string
    active: boolean
    onClick?: () => void
    className?: string
}) {
    return (
        <Link
            href={href}
            onClick={onClick}
            aria-current={active ? "page" : undefined}
            className={cn(
                "relative rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                active
                    ? "bg-indigo-50 text-indigo-700 dark:bg-indigo-400/10 dark:text-indigo-300"
                    : "text-slate-600 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-white",
                className
            )}
        >
            {label}
        </Link>
    )
}

export function Navbar({ user: userProp, onSignOut }: NavbarProps) {
    const pathname = usePathname()
    const { user: sessionUser, signOut } = useAuth()
    const user = userProp === undefined ? sessionUser : userProp

    const [mobileOpen, setMobileOpen] = useState(false)
    const [menuOpen, setMenuOpen] = useState(false)
    const [scrolled, setScrolled] = useState(false)
    const menuRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 8)

        handleScroll()
        window.addEventListener("scroll", handleScroll, { passive: true })

        return () => window.removeEventListener("scroll", handleScroll)
    }, [])

    useEffect(() => {
        if (!menuOpen) return

        const handlePointerDown = (event: MouseEvent | TouchEvent) => {
            if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
                setMenuOpen(false)
            }
        }

        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === "Escape") setMenuOpen(false)
        }

        document.addEventListener("pointerdown", handlePointerDown)
        document.addEventListener("keydown", handleKeyDown)

        return () => {
            document.removeEventListener("pointerdown", handlePointerDown)
            document.removeEventListener("keydown", handleKeyDown)
        }
    }, [menuOpen])

    useEffect(() => {
        if (!mobileOpen) return

        const previousOverflow = document.body.style.overflow

        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === "Escape") setMobileOpen(false)
        }

        document.body.style.overflow = "hidden"
        document.addEventListener("keydown", handleKeyDown)

        return () => {
            document.body.style.overflow = previousOverflow
            document.removeEventListener("keydown", handleKeyDown)
        }
    }, [mobileOpen])

    const closeMobileMenu = () => setMobileOpen(false)

    const handleSignOut = async () => {
        closeMobileMenu()
        setMenuOpen(false)

        if (onSignOut) {
            await onSignOut()
            return
        }

        await signOut()
    }

    return (
        <header
            className={cn(
                "sticky top-0 z-50 w-full border-b border-slate-200/80 bg-white/85 backdrop-blur-xl transition-shadow duration-300 dark:border-slate-800/80 dark:bg-slate-950/85",
                scrolled &&
                "shadow-[0_10px_35px_-18px_rgba(15,23,42,0.35)] dark:shadow-black/50"
            )}
        >
            <div className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:h-20 lg:px-8">
                <Logo preload className="shrink-0" />

                <nav aria-label="Primary" className="hidden items-center gap-1 lg:flex">
                    {NAV_LINKS.map((link) => (
                        <NavLink
                            key={link.href}
                            href={link.href}
                            label={link.label}
                            active={isActivePath(pathname, link.href)}
                        />
                    ))}
                </nav>

                <div className="hidden items-center gap-2 lg:flex">
                    {user ? (
                        <>
                            <Link
                                href="/dashboard"
                                className="inline-flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-medium text-slate-600 transition-colors hover:bg-slate-100 hover:text-slate-900 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-white"
                            >
                                <LayoutDashboard className="size-4" />
                                Dashboard
                            </Link>

                            <span
                                aria-hidden="true"
                                className="mx-1 h-6 w-px bg-slate-200 dark:bg-slate-800"
                            />

                            <div ref={menuRef} className="relative">
                                <button
                                    type="button"
                                    onClick={() => setMenuOpen((open) => !open)}
                                    aria-haspopup="menu"
                                    aria-expanded={menuOpen}
                                    className={cn(
                                        "group inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white py-1 pr-2.5 pl-1 shadow-sm transition-colors hover:border-slate-300 hover:bg-slate-50 focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 focus-visible:outline-none dark:border-slate-800 dark:bg-slate-900 dark:hover:border-slate-700 dark:hover:bg-slate-800 dark:focus-visible:ring-offset-slate-950",
                                        menuOpen && "border-slate-300 bg-slate-50 dark:bg-slate-800"
                                    )}
                                >
                                    <UserAvatar user={user} />
                                    <span className="flex min-w-0 flex-col items-start gap-0.5 text-left">
                                        <span className="max-w-32 truncate text-sm leading-tight font-semibold text-slate-800 dark:text-slate-100">
                                            {user.name}
                                        </span>
                                        <RoleBadge role={user.role} />
                                    </span>
                                    <ChevronDown
                                        className={cn(
                                            "size-4 text-slate-400 transition-transform duration-200",
                                            menuOpen && "rotate-180"
                                        )}
                                    />
                                </button>

                                {menuOpen ? (
                                    <div
                                        role="menu"
                                        className="absolute top-full right-0 mt-2 w-64 origin-top-right animate-in rounded-2xl border border-slate-200 bg-white p-2 shadow-xl shadow-slate-900/10 duration-150 zoom-in-95 fade-in slide-in-from-top-1 dark:border-slate-800 dark:bg-slate-900 dark:shadow-black/40"
                                    >
                                        <div className="flex items-center gap-3 rounded-xl bg-slate-50 p-3 dark:bg-slate-800/60">
                                            <UserAvatar user={user} className="size-11" />
                                            <div className="min-w-0">
                                                <p className="truncate text-sm font-semibold text-slate-900 dark:text-white">
                                                    {user.name}
                                                </p>
                                                {user.email ? (
                                                    <p className="truncate text-xs text-slate-500 dark:text-slate-400">
                                                        {user.email}
                                                    </p>
                                                ) : null}
                                                <RoleBadge role={user.role} className="mt-1.5" />
                                            </div>
                                        </div>

                                        <div className="mt-1.5 space-y-0.5">
                                            <Link
                                                role="menuitem"
                                                href="/dashboard"
                                                onClick={() => setMenuOpen(false)}
                                                className="flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-100 hover:text-slate-900 dark:text-slate-200 dark:hover:bg-slate-800 dark:hover:text-white"
                                            >
                                                <LayoutDashboard className="size-4 text-slate-400" />
                                                Dashboard
                                            </Link>
                                            <Link
                                                role="menuitem"
                                                href="/profile"
                                                onClick={() => setMenuOpen(false)}
                                                className="flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-100 hover:text-slate-900 dark:text-slate-200 dark:hover:bg-slate-800 dark:hover:text-white"
                                            >
                                                <UserRound className="size-4 text-slate-400" />
                                                Update Profile
                                            </Link>
                                        </div>

                                        <div className="my-1.5 h-px bg-slate-100 dark:bg-slate-800" />

                                        <button
                                            type="button"
                                            role="menuitem"
                                            onClick={handleSignOut}
                                            className="flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-left text-sm font-medium text-rose-600 transition-colors hover:bg-rose-50 hover:text-rose-700 dark:text-rose-400 dark:hover:bg-rose-500/10 dark:hover:text-rose-300"
                                        >
                                            <LogOut className="size-4" />
                                            Sign Out
                                        </button>
                                    </div>
                                ) : null}
                            </div>
                        </>
                    ) : (
                        <>
                            <Link
                                href="/login"
                                className="inline-flex h-10 items-center justify-center rounded-lg border border-slate-200 bg-white px-4 text-sm font-semibold text-slate-700 shadow-sm transition-colors hover:border-slate-300 hover:bg-slate-50 focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 focus-visible:outline-none dark:border-slate-800 dark:bg-slate-900 dark:text-slate-200 dark:hover:border-slate-700 dark:hover:bg-slate-800 dark:focus-visible:ring-offset-slate-950"
                            >
                                Sign In
                            </Link>
                            <Link
                                href="/signUp"
                                className="group inline-flex h-10 items-center justify-center gap-1.5 rounded-lg bg-indigo-600 px-4 text-sm font-semibold text-white shadow-sm shadow-indigo-600/30 transition-all hover:bg-indigo-700 hover:shadow-md focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 focus-visible:outline-none active:translate-y-px dark:focus-visible:ring-offset-slate-950"
                            >
                                <Sparkles className="size-4" />
                                Sign Up
                            </Link>
                        </>
                    )}
                </div>

                <button
                    type="button"
                    onClick={() => setMobileOpen((open) => !open)}
                    aria-controls="mobile-navigation"
                    aria-expanded={mobileOpen}
                    className="inline-flex size-10 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-700 shadow-sm transition-colors hover:bg-slate-50 focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:outline-none lg:hidden dark:border-slate-800 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800"
                >
                    <span className="sr-only">
                        {mobileOpen ? "Close navigation menu" : "Open navigation menu"}
                    </span>
                    {mobileOpen ? <X className="size-5" /> : <Menu className="size-5" />}
                </button>
            </div>

            {mobileOpen ? (
                <div
                    id="mobile-navigation"
                    className="absolute inset-x-0 top-full animate-in border-b border-slate-200 bg-white shadow-2xl shadow-slate-900/10 duration-200 fade-in slide-in-from-top-2 lg:hidden dark:border-slate-800 dark:bg-slate-950 dark:shadow-black/50"
                >
                    <div className="max-h-[calc(100dvh-4rem)] overflow-y-auto px-4 py-5 sm:px-6">
                        <nav aria-label="Mobile" className="space-y-1">
                            {NAV_LINKS.map((link) => {
                                const active = isActivePath(pathname, link.href)

                                return (
                                    <Link
                                        key={link.href}
                                        href={link.href}
                                        onClick={closeMobileMenu}
                                        aria-current={active ? "page" : undefined}
                                        className={cn(
                                            "flex items-center justify-between rounded-xl px-3 py-3 text-base font-medium transition-colors",
                                            active
                                                ? "bg-indigo-50 text-indigo-700 dark:bg-indigo-400/10 dark:text-indigo-300"
                                                : "text-slate-700 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-white"
                                        )}
                                    >
                                        {link.label}
                                        {active ? (
                                            <span className="size-1.5 rounded-full bg-indigo-500" />
                                        ) : null}
                                    </Link>
                                )
                            })}
                        </nav>

                        <div className="mt-5 border-t border-slate-200 pt-5 dark:border-slate-800">
                            {user ? (
                                <div className="space-y-3">
                                    <div className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 p-3 dark:border-slate-800 dark:bg-slate-900">
                                        <UserAvatar user={user} className="size-11" />
                                        <div className="min-w-0 flex-1">
                                            <p className="truncate text-sm font-semibold text-slate-900 dark:text-white">
                                                {user.name}
                                            </p>
                                            {user.email ? (
                                                <p className="truncate text-xs text-slate-500 dark:text-slate-400">
                                                    {user.email}
                                                </p>
                                            ) : null}
                                            <RoleBadge role={user.role} className="mt-1.5" />
                                        </div>
                                    </div>

                                    <div className="grid gap-2">
                                        <Link
                                            href="/dashboard"
                                            onClick={closeMobileMenu}
                                            className="inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-indigo-600 px-4 text-sm font-semibold text-white shadow-sm shadow-indigo-600/25 transition-colors hover:bg-indigo-700"
                                        >
                                            <LayoutDashboard className="size-4" />
                                            Dashboard
                                        </Link>
                                        <Link
                                            href="/profile"
                                            onClick={closeMobileMenu}
                                            className="inline-flex h-11 items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 text-sm font-semibold text-slate-700 transition-colors hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800"
                                        >
                                            <UserRound className="size-4" />
                                            Update Profile
                                        </Link>
                                        <button
                                            type="button"
                                            onClick={handleSignOut}
                                            className="inline-flex h-11 items-center justify-center gap-2 rounded-xl px-4 text-sm font-semibold text-rose-600 transition-colors hover:bg-rose-50 dark:text-rose-400 dark:hover:bg-rose-500/10"
                                        >
                                            <LogOut className="size-4" />
                                            Sign Out
                                        </button>
                                    </div>
                                </div>
                            ) : (
                                <div className="grid grid-cols-2 gap-2">
                                    <Link
                                        href="/signin"
                                        onClick={closeMobileMenu}
                                        className="inline-flex h-11 items-center justify-center rounded-xl border border-slate-200 bg-white px-4 text-sm font-semibold text-slate-700 transition-colors hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800"
                                    >
                                        Sign In
                                    </Link>
                                    <Link
                                        href="/signup"
                                        onClick={closeMobileMenu}
                                        className="inline-flex h-11 items-center justify-center gap-1.5 rounded-xl bg-indigo-600 px-4 text-sm font-semibold text-white shadow-sm shadow-indigo-600/25 transition-colors hover:bg-indigo-700"
                                    >
                                        <Sparkles className="size-4" />
                                        Sign Up
                                    </Link>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            ) : null}
        </header>
    )
}

export default Navbar
