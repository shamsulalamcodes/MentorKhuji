"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Check, Loader2, Minus } from "lucide-react";
import { SiStripe } from "react-icons/si";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type Audience = "student" | "tutor";
type Feature = { text: string; included: boolean };
type Plan = {
    name: string;
    price: number;
    tagline: string;
    features: Feature[];
};

// Edit prices and features here. Keep prices in sync with your Stripe products.
const PLANS: Record<Audience, { free: Plan; pro: Plan }> = {
    student: {
        free: {
            name: "Free",
            price: 0,
            tagline: "Everything you need to find a tutor.",
            features: [
                { text: "Search and filter all approved tuitions", included: true },
                { text: "Apply to up to 5 tuitions per month", included: true },
                { text: "Track application status in real time", included: true },
                { text: "Save favourite tutors", included: false },
                { text: "Priority in tutors' inbox", included: false },
                { text: "Priority support", included: false },
            ],
        },
        pro: {
            name: "Pro",
            price: 4.99,
            tagline: "Apply more and get noticed faster.",
            features: [
                { text: "Search and filter all approved tuitions", included: true },
                { text: "Unlimited tuition applications", included: true },
                { text: "Track application status in real time", included: true },
                { text: "Save favourite tutors", included: true },
                { text: "Priority in tutors' inbox", included: true },
                { text: "Priority support", included: true },
            ],
        },
    },
    tutor: {
        free: {
            name: "Free",
            price: 0,
            tagline: "Start teaching and reach your first students.",
            features: [
                { text: "Post up to 2 tuition listings", included: true },
                { text: "Manage student applications", included: true },
                { text: "Public tutor profile", included: true },
                { text: "Featured placement in search", included: false },
                { text: "Pro badge on your profile", included: false },
                { text: "Priority support", included: false },
            ],
        },
        pro: {
            name: "Pro",
            price: 9.99,
            tagline: "Grow your batches and stand out.",
            features: [
                { text: "Unlimited tuition listings", included: true },
                { text: "Manage student applications", included: true },
                { text: "Public tutor profile", included: true },
                { text: "Featured placement in search", included: true },
                { text: "Pro badge on your profile", included: true },
                { text: "Priority support", included: true },
            ],
        },
    },
};

const formatPrice = (price: number) =>
    price === 0 ? "$0" : `$${price.toFixed(2)}`;

export function PricingSection() {
    const router = useRouter();
    const [audience, setAudience] = React.useState<Audience>("student");
    const [loading, setLoading] = React.useState(false);
    const [error, setError] = React.useState("");

    const { free, pro } = PLANS[audience];

    async function handleSubscribe() {
        setError("");
        setLoading(true);
        try {
            // Your backend should create a Stripe Checkout Session and return { url }.
            const res = await fetch(
                `${process.env.NEXT_PUBLIC_API_URL}/create-checkout-session`,
                {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    credentials: "include",
                    body: JSON.stringify({ plan: "pro", role: audience }),
                }
            );

            if (res.status === 401) {
                router.push("/login");
                return;
            }

            const data = await res.json().catch(() => ({}));
            if (!res.ok || !data.url) {
                throw new Error(data.message ?? "Could not start checkout.");
            }
            window.location.href = data.url;
        } catch (err) {
            setError(
                err instanceof Error ? err.message : "Something went wrong. Try again."
            );
        } finally {
            setLoading(false);
        }
    }

    return (
        <section id="pricing" className="bg-slate-50 py-16 sm:py-24">
            <div className="mx-auto max-w-6xl px-4 sm:px-6">
                {/* Heading */}
                <div className="mx-auto max-w-2xl text-center">
                    <p className="text-sm font-semibold uppercase tracking-wider text-indigo-600">
                        Pricing
                    </p>
                    <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
                        Simple plans for students and tutors
                    </h2>
                    <p className="mt-4 text-base text-slate-600 sm:text-lg">
                        Start free. Upgrade to Pro whenever you want more reach, more
                        applications and priority support.
                    </p>
                </div>

                {/* Audience switch */}
                <div
                    role="group"
                    aria-label="Choose your account type"
                    className="mx-auto mt-8 grid w-full max-w-xs grid-cols-2 gap-1 rounded-full bg-slate-200/70 p-1"
                >
                    {(["student", "tutor"] as const).map((a) => (
                        <button
                            key={a}
                            type="button"
                            aria-pressed={audience === a}
                            onClick={() => {
                                setAudience(a);
                                setError("");
                            }}
                            className={cn(
                                "h-11 rounded-full text-sm font-semibold capitalize transition-colors",
                                audience === a
                                    ? "bg-white text-indigo-700 shadow-sm"
                                    : "text-slate-600 hover:text-slate-900"
                            )}
                        >
                            For {a}s
                        </button>
                    ))}
                </div>

                {/* Plans */}
                <div className="mx-auto mt-10 grid max-w-4xl gap-6 md:grid-cols-2">
                    {/* Free */}
                    <article className="flex flex-col rounded-3xl bg-white p-6 ring-1 ring-slate-200 sm:p-8">
                        <h3 className="text-lg font-semibold text-slate-900">{free.name}</h3>
                        <p className="mt-1 text-sm text-slate-500">{free.tagline}</p>

                        <p className="mt-6 flex items-baseline gap-1">
                            <span className="text-5xl font-bold tracking-tight text-slate-900">
                                {formatPrice(free.price)}
                            </span>
                            <span className="text-sm font-medium text-slate-500">/ forever</span>
                        </p>

                        <Button
                            variant="outline"
                            className="mt-6 h-12 w-full rounded-full border-slate-300 text-base font-semibold"
                        >
                            <Link href="/signup">Get started free</Link>
                        </Button>

                        <FeatureList features={free.features} />
                    </article>

                    {/* Pro */}
                    <article className="relative flex flex-col rounded-3xl bg-white p-6 shadow-xl shadow-indigo-100 ring-2 ring-indigo-600 sm:p-8">
                        <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 rounded-full bg-indigo-600 px-4 py-1 text-xs font-semibold uppercase tracking-wide text-white">
                            Most popular
                        </span>

                        <h3 className="text-lg font-semibold text-slate-900">{pro.name}</h3>
                        <p className="mt-1 text-sm text-slate-500">{pro.tagline}</p>

                        <p className="mt-6 flex items-baseline gap-1">
                            <span className="text-5xl font-bold tracking-tight text-slate-900">
                                {formatPrice(pro.price)}
                            </span>
                            <span className="text-sm font-medium text-slate-500">/ month</span>
                        </p>

                        <Button
                            type="button"
                            onClick={handleSubscribe}
                            disabled={loading}
                            className="mt-6 h-12 w-full rounded-full bg-indigo-600 text-white font-semibold shadow-none hover:bg-indigo-700"
                        >
                            {loading ? (
                                <Loader2 className="size-5 animate-spin" />
                            ) : (
                                <SiStripe className="size-5" />
                            )}
                            Subscribe with Stripe
                        </Button>

                        {error && (
                            <p
                                role="alert"
                                className="mt-3 rounded-xl bg-red-50 px-4 py-2.5 text-sm font-medium text-red-600"
                            >
                                {error}
                            </p>
                        )}

                        <FeatureList features={pro.features} />
                    </article>
                </div>

                <p className="mt-8 text-center text-sm text-slate-500">
                    Secure payments powered by Stripe. Cancel anytime.
                </p>
            </div>
        </section>
    );
}

function FeatureList({ features }: { features: Feature[] }) {
    return (
        <ul className="mt-8 flex-1 space-y-3 border-t border-slate-100 pt-8">
            {features.map((f) => (
                <li key={f.text} className="flex items-start gap-3 text-sm">
                    {f.included ? (
                        <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-indigo-100 text-indigo-600">
                            <Check className="size-3.5" strokeWidth={3} />
                        </span>
                    ) : (
                        <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-slate-100 text-slate-400">
                            <Minus className="size-3.5" strokeWidth={3} />
                        </span>
                    )}
                    <span className={f.included ? "text-slate-700" : "text-slate-400"}>
                        {f.text}
                        {!f.included && <span className="sr-only"> (not included)</span>}
                    </span>
                </li>
            ))}
        </ul>
    );
}