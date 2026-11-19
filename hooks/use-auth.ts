"use client"

import { useCallback, useEffect, useState } from "react"
import { useRouter } from "next/navigation"

export type UserRole = "student" | "tutor" | "admin"

export type AuthUser = {
  id?: string | number
  name: string
  email?: string
  avatarUrl?: string | null
  role: UserRole
}

/**
 * Where the signed-in user is cached on the client. The auth flow can write to
 * this key (or dispatch the `mentorlagbe:auth-changed` event) after a successful
 * sign-in and every consumer of `useAuth` will update immediately.
 */
export const AUTH_STORAGE_KEY = "mentorlagbe:user"
export const AUTH_CHANGED_EVENT = "mentorlagbe:auth-changed"

const ROLES: UserRole[] = ["student", "tutor", "admin"]

function normalizeRole(value: unknown): UserRole | null {
  if (typeof value !== "string") return null

  const role = value.toLowerCase()

  return ROLES.includes(role as UserRole) ? (role as UserRole) : null
}

function parseUser(raw: string | null): AuthUser | null {
  if (!raw) return null

  try {
    const data = JSON.parse(raw) as Record<string, unknown>
    const role = normalizeRole(data.role)
    const name = data.name ?? data.fullName ?? data.username

    if (!role || typeof name !== "string" || !name.trim()) return null

    return {
      id:
        typeof data.id === "string" || typeof data.id === "number"
          ? data.id
          : undefined,
      name: name.trim(),
      email: typeof data.email === "string" ? data.email : undefined,
      avatarUrl:
        typeof data.avatarUrl === "string"
          ? data.avatarUrl
          : typeof data.avatar === "string"
            ? data.avatar
            : null,
      role,
    }
  } catch {
    return null
  }
}

function readUser() {
  if (typeof window === "undefined") return null

  return parseUser(window.localStorage.getItem(AUTH_STORAGE_KEY))
}

/**
 * Client-side session store. Swap the implementation for your API/provider
 * (cookies, NextAuth, a backend call, …) without changing the Navbar contract.
 */
export function useAuth() {
  const router = useRouter()
  const [user, setUser] = useState<AuthUser | null>(null)

  useEffect(() => {
    const sync = () => setUser(readUser())

    sync()

    window.addEventListener("storage", sync)
    window.addEventListener(AUTH_CHANGED_EVENT, sync)

    return () => {
      window.removeEventListener("storage", sync)
      window.removeEventListener(AUTH_CHANGED_EVENT, sync)
    }
  }, [])

  const signOut = useCallback(async () => {
    window.localStorage.removeItem(AUTH_STORAGE_KEY)
    window.dispatchEvent(new Event(AUTH_CHANGED_EVENT))
    setUser(null)
    router.push("/")
    router.refresh()
  }, [router])

  return { user, signOut }
}

export function setStoredAuthUser(user: AuthUser | null) {
  if (typeof window === "undefined") return

  if (user) {
    window.localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(user))
  } else {
    window.localStorage.removeItem(AUTH_STORAGE_KEY)
  }

  window.dispatchEvent(new Event(AUTH_CHANGED_EVENT))
}
