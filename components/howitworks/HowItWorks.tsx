"use client";

import * as React from "react";
import Link from "next/link";
import {
    ArrowRight,
    FilePlus2,
    GraduationCap,
    Inbox,
    Search,
    Send,
    ShieldCheck,
    UserPlus,
    type LucideIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type Audience = "student" | "tutor";
type Step = { icon: LucideIcon; title: string; description: string };

// Edit the copy, icons and links here.
const WORKFLOWS: Record<
    Audience,
    { steps: Step[]; cta: { label: string; href: string } }
> = {
    student: {
        steps: [
            {
                icon: UserPlus,
                title: "Create your account",
                description:
                    "Sign up free as a student with your email, Google or Apple in under a minute.",
            },
            {
                icon: Search,
                title: "Search and filter",
                description:
                    "Browse approved tuitions by subject, class level, online or offline mode, location and monthly budget.",
            },
            {
                icon: Send,
                title: "Apply for a session",
                description:
                    "Send an application with your preferred schedule and a short note to the tutor.",
            },
            {
                icon: GraduationCap,
                title: "Track and start learning",
                description:
                    "Follow your application status in real time and begin as soon as the tutor accepts.",
            },
        ],
        cta: { label: "Find a tutor", href: "/tuitions" },
    },
    tutor: {
        steps: [
            {
                icon: UserPlus,
                title: "Sign up as a tutor",
                description:
                    "Create your tutor profile with your bio, subjects and a profile photo.",
            },
            {
                icon: FilePlus2,
                title: "Post your tuition batch",
                description:
                    "Add the subject, class level, fee, schedule and a banner image for each batch or 1-on-1 mentorship.",
            },
            {
                icon: ShieldCheck,
                title: "Get approved",
                description:
                    "Our admins review every listing, so students only see verified, quality tuitions.",
            },
            {
                icon: Inbox,
                title: "Manage applications",
                description:
                    "Accept or reject student applications from your dashboard and start teaching.",
            },
        ],
        cta: { label: "Become a tutor", href: "/signup" },
    },
};

export function HowItWorks() {
    const [audience, setAudience] = React.useState<Audience>("student");
    const { steps, cta } = WORKFLOWS[audience];

    return (
        <section id="how-it-works" className="bg-white py-16 sm:py-24">
            <div className="mx-auto max-w-6xl px-4 sm:px-6">
                {/* Heading */}
                <div className="mx-auto max-w-2xl text-center">
                    <p className="text-sm font-semibold uppercase tracking-wider text-indigo-600">
                        How it works
                    </p>
                    <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
                        How MentorLagbe works
                    </h2>
                    <p className="mt-4 text-base text-slate-600 sm:text-lg">
                        Whether you want to learn or to teach, getting started takes just a
                        few simple steps.
                    </p>
                </div>

                {/* Audience switch */}
                <div
                    role="group"
                    aria-label="Choose your account type"
                    className="mx-auto mt-8 grid w-full max-w-xs grid-cols-2 gap-1 rounded-full bg-slate-100 p-1"
                >
                    {(["student", "tutor"] as const).map((a) => (
                        <button
                            key={a}
                            type="button"
                            aria-pressed={audience === a}
                            onClick={() => setAudience(a)}
                            className={cn(
                                "h-11 rounded-full text-sm font-semibold capitalize transition-colors",
                                audience === a
                                    ? "bg-white text-indigo-700 shadow-sm"
                                    : "text-slate-500 hover:text-slate-900"
                            )}
                        >
                            For {a}s
                        </button>
                    ))}
                </div>

                {/* Steps: vertical timeline on mobile, horizontal on desktop */}
                <ol className="mt-14 grid gap-0 lg:grid-cols-4 lg:gap-x-8">
                    {steps.map((step, i) => {
                        const Icon = step.icon;
                        return (
                            <li
                                key={step.title}
                                className={cn(
                                    "relative flex gap-5 pb-10 last:pb-0",
                                    "lg:flex-col lg:items-center lg:gap-0 lg:pb-0 lg:text-center",
                                    // connector line (hidden after the last step)
                                    "after:absolute after:left-[27px] after:top-16 after:bottom-2 after:w-0.5 after:bg-indigo-200 last:after:hidden",
                                    "lg:after:bottom-auto lg:after:left-[calc(50%+2.25rem)] lg:after:top-[27px] lg:after:h-0.5 lg:after:w-[calc(100%-2.5rem)]"
                                )}
                            >
                                <div className="relative flex size-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-600 to-sky-500 text-white shadow-lg shadow-indigo-200">
                                    <Icon className="size-6" aria-hidden="true" />
                                    <span className="absolute -right-2 -top-2 flex size-6 items-center justify-center rounded-full bg-amber-400 text-xs font-bold text-slate-900 ring-2 ring-white">
                                        {i + 1}
                                    </span>
                                </div>

                                <div className="lg:mt-6">
                                    <h3 className="text-lg font-semibold text-slate-900">
                                        {step.title}
                                    </h3>
                                    <p className="mt-2 text-sm leading-relaxed text-slate-600">
                                        {step.description}
                                    </p>
                                </div>
                            </li>
                        );
                    })}
                </ol>

                {/* CTA */}
                <div className="mt-14 flex justify-center">
                    <Button className="h-12 rounded-full bg-indigo-600 px-8 text-white font-semibold shadow-none hover:bg-indigo-700">
                        <Link href={cta.href} className="flex justify-center items-center gap-1">
                            {cta.label}
                            <ArrowRight className="size-5" />
                        </Link>
                    </Button>
                </div>
            </div>
        </section>
    );
}