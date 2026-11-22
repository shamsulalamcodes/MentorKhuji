"use client";

import * as React from "react";
import Link from "next/link";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AuthInput, PasswordInput } from "@/components/auth/auth-inputs";
import { SocialButtons } from "@/components/auth/social-buttons";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { toast } from "../ui/toast";

export function LoginForm() {
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState("");
  const router = useRouter()

  async function onSubmit(e: React.SubmitEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");

    const form = new FormData(e.currentTarget);
    const email = String(form.get("email") ?? "").trim();
    const password = String(form.get("password") ?? "");

    setLoading(true);
    try {
      const credentials = { email, password };
      await authClient.signIn.email(credentials, {
        onSuccess: () => router.push("/dashboard"),
        onError: (ctx) => setError(ctx.error.message),
      });
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <form onSubmit={onSubmit} className="space-y-4">
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
          label="Password"
          autoComplete="current-password"
          required
        />
        {/* 
        <div className="flex justify-end">
          <Link
            href="/forgot-password"
            className="text-sm font-medium text-indigo-600 hover:underline"
          >
            Forgot password?
          </Link>
        </div> */}

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
          className="h-14 w-full rounded-full bg-indigo-600 text-white text-md font-semibold shadow-none hover:bg-indigo-700"
        >
          {loading && <Loader2 className="size-5 animate-spin" />}
          Log in
        </Button>
      </form>

      <p className="my-4 text-center text-sm text-slate-400">or</p>

      <SocialButtons
        verb="Log in"
        disabled={loading}
        onGoogle={() => { }}
      />

      <p className="mt-8 text-center text-[15px] font-medium text-slate-400">
        Don&apos;t have an account?{" "}
        <Link href="/signUp" className="font-semibold text-slate-900 hover:underline">
          Sign up
        </Link>
      </p>
    </div>
  );
}
