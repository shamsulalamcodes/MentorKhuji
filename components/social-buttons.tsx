"use client";

import * as React from "react";
import Link from "next/link";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { AuthInput, PasswordInput } from "@/components/auth/auth-inputs";
import { SocialButtons } from "@/components/auth/social-buttons";

type Role = "student" | "tutor";

export function SignupForm() {
  const [role, setRole] = React.useState<Role>("student");
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState("");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");

    const form = new FormData(e.currentTarget);
    const name = String(form.get("name") ?? "").trim();
    const email = String(form.get("email") ?? "").trim();
    const password = String(form.get("password") ?? "");

    if (!name) return setError("Please enter your full name.");
    if (password.length < 8)
      return setError("Password must be at least 8 characters.");

    setLoading(true);
    try {
      const payload = { name, email, password, role };
      // TODO: connect BetterAuth, for example:
      // await authClient.signUp.email(payload, {
      //   onSuccess: () => router.push("/dashboard"),
      //   onError: (ctx) => setError(ctx.error.message),
      // });
      console.info("signup payload", payload);
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <form onSubmit={onSubmit} className="space-y-4" noValidate={false}>
        <div
          role="group"
          aria-label="I am a"
          className="grid grid-cols-2 gap-1 rounded-full bg-slate-100 p-1"
        >
          {(["student", "tutor"] as const).map((r) => (
            <button
              key={r}
              type="button"
              aria-pressed={role === r}
              onClick={() => setRole(r)}
              className={cn(
                "h-11 rounded-full text-sm font-semibold capitalize transition-colors",
                role === r
                  ? "bg-white text-indigo-700 shadow-sm"
                  : "text-slate-500 hover:text-slate-800"
              )}
            >
              I&apos;m a {r}
            </button>
          ))}
        </div>

        <AuthInput
          id="name"
          name="name"
          label="Full name"
          autoComplete="name"
          required
        />
        <AuthInput
          id="email"
          name="email"
          type="email"
          label="Email address"
          autoComplete="email"
          required
        />
        <PasswordInput
          id="password"
          name="password"
          label="Password (min. 8 characters)"
          autoComplete="new-password"
          required
          minLength={8}
        />

        {error && (
          <p
            role="alert"
            className="rounded-xl bg-red-50 px-4 py-3 text-sm font-medium text-red-600"
          >
            {error}
          </p>
        )}

        <Button
          type="submit"
          disabled={loading}
          className="h-14 w-full rounded-full bg-indigo-600 text-base font-semibold shadow-none hover:bg-indigo-700"
        >
          {loading && <Loader2 className="size-5 animate-spin" />}
          Sign up by email
        </Button>
      </form>

      <p className="my-4 text-center text-sm text-slate-400">or</p>

      <SocialButtons
        verb="Sign up"
        disabled={loading}
        // TODO: authClient.signIn.social({ provider: "google", callbackURL: "/dashboard" })
        onGoogle={() => {}}
        // TODO: authClient.signIn.social({ provider: "apple", callbackURL: "/dashboard" })
        onApple={() => {}}
      />

      <p className="mt-8 text-center text-[15px] font-medium text-slate-400">
        Already have an account?{" "}
        <Link href="/login" className="font-semibold text-slate-900 hover:underline">
          Log in
        </Link>
      </p>

      <p className="mt-5 text-center text-sm text-slate-400">
        By signing up, you agree to our{" "}
        <Link href="/terms" className="underline hover:text-slate-600">
          Terms of Service
        </Link>{" "}
        and{" "}
        <Link href="/privacy" className="underline hover:text-slate-600">
          Privacy Policy
        </Link>
        .
      </p>
    </div>
  );
}
