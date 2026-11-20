"use client";

import * as React from "react";
import Link from "next/link";
import {
    ArrowRight,
    ChevronDown,
    FilePlus2,
    GraduationCap,
    Inbox,
    Search,
    Send,
    ShieldCheck,
    UserPlus,
    type LucideIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";

type Audience = "student" | "tutor";
type Step = { icon: LucideIcon; title: string; description: string };

// Link styled as a button (works with any shadcn version, no asChild needed).
const btn =
    "inline-flex h-12 items-center justify-center gap-1.5 rounded-full px-8 text-base font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2";

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
        cta: { label: "Become a tutor", href: "/signUp" },
    },
};

const FAQS = [
    {
        q: "Is it free to join MentorLagbe?",
        a: "Yes. Students and tutors can sign up and use the core features for free. The optional Pro plan adds extras like unlimited applications or listings and priority support.",
    },
    {
        q: "How are tuitions and tutors verified?",
        a: "Every tuition post is reviewed by our admins and goes live only after approval, so students see approved listings only.",
    },
    {
        q: "How do I pay my tutor?",
        a: "Tuition fees are agreed directly between you and your tutor. Payments on MentorLagbe are only for the optional Pro plan, which is handled securely by Stripe.",
    },
    {
        q: "Can I learn online or in person?",
        a: "Both. Every tuition shows whether it is online or offline, along with its location, so you can filter by what suits you.",
    },
    {
        q: "How will I know if a tutor accepts my application?",
        a: "You can follow the status of every application (pending, accepted or rejected) from your dashboard in real time.",
    },
];

export function HowItWorks() {
    const [audience, setAudience] = React.useState<Audience>("student");
    const { steps, cta } = WORKFLOWS[audience];

    return (
        <section id="how-it-works" className="bg-white py-6 sm:py-12">
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
                    <Link
                        href={cta.href}
                        className={cn(btn, "bg-indigo-600 text-white hover:bg-indigo-700")}
                    >
                        {cta.label}
                        <ArrowRight className="size-5" />
                    </Link>
                </div>
            </div>
        </section>
    );
}

export function AboutIntro() {
    return (
        <section className="bg-linear-to-b from-indigo-50 to-white pb-4 pt-16 sm:pt-24">
            <div className="mx-auto max-w-3xl px-4 text-center sm:px-6">
                <p className="text-sm font-semibold uppercase tracking-wider text-indigo-600">
                    About MentorLagbe
                </p>
                <h1 className="mt-3 text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl">
                    Finding the right tutor should be simple
                </h1>
                <p className="mt-5 text-base leading-relaxed text-slate-600 sm:text-lg">
                    MentorLagbe connects students and parents with qualified tutors by
                    subject, class level, mode and budget. Tutors get a clear place to
                    showcase their batches and manage enrollments, all under one hood.
                </p>
            </div>
        </section>
    );
}

export function Faq() {
    return (
        <section id="faq" className="bg-slate-50 py-6 sm:py-12">
            <div className="mx-auto max-w-3xl px-4 sm:px-6">
                <div className="text-center">
                    <p className="text-sm font-semibold uppercase tracking-wider text-indigo-600">
                        FAQ
                    </p>
                    <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
                        Questions, answered
                    </h2>
                </div>

                <div className="mt-10 space-y-3">
                    {FAQS.map(({ q, a }) => (
                        <details
                            key={q}
                            className="group rounded-2xl bg-white ring-1 ring-slate-200 open:shadow-md open:shadow-indigo-100/60"
                        >
                            <summary className="flex cursor-pointer list-none items-center justify-between gap-4 rounded-2xl p-5 text-left font-semibold text-slate-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 [&::-webkit-details-marker]:hidden">
                                {q}
                                <ChevronDown
                                    className="size-5 shrink-0 text-slate-400 transition-transform group-open:rotate-180"
                                    aria-hidden="true"
                                />
                            </summary>
                            <p className="px-5 pb-5 text-sm leading-relaxed text-slate-600">
                                {a}
                            </p>
                        </details>
                    ))}
                </div>
            </div>
        </section>
    );
}

export function FinalCta() {
    return (
        <section className="bg-white px-4 py-6 sm:py-12">
            <div className="mx-auto max-w-6xl rounded-[2rem] bg-gradient-to-br from-indigo-600 to-sky-500 px-6 py-14 text-center sm:px-12">
                <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
                    Ready to get started?
                </h2>
                <p className="mx-auto mt-3 max-w-xl text-base text-indigo-50 sm:text-lg">
                    Join MentorLagbe today as a student or a tutor. It takes less than a
                    minute.
                </p>
                <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
                    <Link
                        href="/signUp"
                        className={cn(btn, "bg-white text-indigo-700 hover:bg-indigo-50")}
                    >
                        Create free account
                    </Link>
                    <Link
                        href="/tuitions"
                        className={cn(
                            btn,
                            "text-white ring-1 ring-white/50 hover:bg-white/10"
                        )}
                    >
                        Browse tuitions
                    </Link>
                </div>
            </div>
        </section>
    );
}

/** Full page: use this in app/how-it-works/page.tsx */
export function HowItWorksPage() {
    return (
        <>
            <HowItWorks />
            <AboutIntro />
            <Faq />
            <FinalCta />
        </>
    );
}