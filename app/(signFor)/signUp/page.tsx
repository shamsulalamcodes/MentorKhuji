import type { Metadata } from "next";
import { AuthCard } from "@/components/auth/auth-card";
import { SignupForm } from "@/components/auth/signup-form";

export const metadata: Metadata = {
  title: "Sign up | MentorLagbe",
  description: "Create your MentorLagbe account as a student or tutor.",
};

export default function SignupPage() {
  return (
    <AuthCard title="Sign up">
      <SignupForm />
    </AuthCard>
  );
}
