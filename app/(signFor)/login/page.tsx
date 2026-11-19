import type { Metadata } from "next";
import { AuthCard } from "@/components/auth/auth-card";
import { LoginForm } from "@/components/auth/login-form";

export const metadata: Metadata = {
  title: "Log in | MentorLagbe",
  description: "Log in to your MentorLagbe account.",
};

export default function LoginPage() {
  return (
    <AuthCard title="Log in">
      <LoginForm />
    </AuthCard>
  );
}
