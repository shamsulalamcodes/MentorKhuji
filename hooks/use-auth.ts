import { authClient } from "@/lib/auth-client"

export type UserRole = "student" | "tutor" | "admin"

export type AuthUser = {
  id?: string | number
  name: string
  email?: string
  avatarUrl?: string | null
  role: UserRole
}

const ROLES: UserRole[] = ["student", "tutor", "admin"];

export const useCurrentUser = (): AuthUser | null => {
  const { data: session } = authClient.useSession();
  const u = session?.user;
  if (!u) return null;

  return {
    id: u.id, name: u.name, email: u.email, avatarUrl: u.image ?? null, role: ROLES.includes(u.role as UserRole) ? (u.role as UserRole) : "student",
  };
};