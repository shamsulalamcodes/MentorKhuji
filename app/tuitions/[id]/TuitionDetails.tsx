import Image from "next/image";
import Link from "next/link";
import {
    ArrowLeft,
    BadgeCheck,
    CalendarDays,
    GraduationCap,
    Mail,
    MapPin,
    Monitor,
    Users,
    Wallet,
    type LucideIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { SingleTuition } from "@/lib/type";

const initials = (name: string) =>
    name
        .split(" ")
        .map((n) => n[0])
        .slice(0, 2)
        .join("")
        .toUpperCase();

export function TuitionDetails({ tuition: t }: { tuition: SingleTuition }) {
    const open = t.approvalStatus === "approved" && t.isActive;
    const posted = new Date(t.createdAt).toLocaleDateString("en-GB", {
        day: "numeric",
        month: "short",
        year: "numeric",
    });

    const facts: { icon: LucideIcon; label: string; value: string }[] = [
        { icon: GraduationCap, label: "Class level", value: t.classLevel },
        { icon: Monitor, label: "Mode", value: t.mode },
        { icon: MapPin, label: "Location", value: t.location },
        { icon: CalendarDays, label: "Schedule", value: `${t.daysPerWeek} days / week` },
    ];

    return (
        <main className="min-h-screen bg-slate-50 pb-16">
            <div className="mx-auto max-w-6xl px-4 pt-6 sm:px-6 sm:pt-8">
                <Link
                    href="/tuitions"
                    className="inline-flex items-center gap-1.5 text-sm font-medium text-slate-500 transition-colors hover:text-indigo-600"
                >
                    <ArrowLeft className="size-4" />
                    Back to all tuitions
                </Link>

                {/* Banner */}
                <div className="relative mt-4 aspect-[16/9] w-full overflow-hidden rounded-3xl bg-slate-200 sm:aspect-[21/9]">
                    <Image
                        src={t.bannerImage}
                        alt={`${t.title} banner`}
                        fill
                        priority
                        unoptimized
                        sizes="(min-width: 1152px) 1152px, 100vw"
                        className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/50 via-transparent to-transparent" />
                    <span className="absolute left-4 top-4 rounded-full bg-white/95 px-3.5 py-1.5 text-xs font-semibold text-indigo-700 shadow-sm sm:left-6 sm:top-6">
                        {t.subject}
                    </span>
                </div>

                <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_360px] lg:items-start">
                    {/* Main column */}
                    <div>
                        <div className="flex flex-wrap items-center gap-2">
                            <span
                                className={cn(
                                    "inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold",
                                    open
                                        ? "bg-emerald-50 text-emerald-700"
                                        : "bg-slate-200 text-slate-600"
                                )}
                            >
                                <span
                                    className={cn(
                                        "size-1.5 rounded-full",
                                        open ? "bg-emerald-500" : "bg-slate-400"
                                    )}
                                />
                                {open ? "Accepting students" : "Not accepting applications"}
                            </span>
                            <span className="text-xs text-slate-500">Posted {posted}</span>
                        </div>

                        <h1 className="mt-3 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
                            {t.title}
                        </h1>

                        {/* Key facts */}
                        <dl className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
                            {facts.map(({ icon: Icon, label, value }) => (
                                <div
                                    key={label}
                                    className="flex items-center gap-3 rounded-2xl bg-white p-4 ring-1 ring-slate-200"
                                >
                                    <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">
                                        <Icon className="size-5" aria-hidden="true" />
                                    </span>
                                    <div className="min-w-0">
                                        <dt className="text-xs font-medium text-slate-500">{label}</dt>
                                        <dd className="truncate text-sm font-semibold text-slate-900">
                                            {value}
                                        </dd>
                                    </div>
                                </div>
                            ))}
                        </dl>

                        {/* About */}
                        <section className="mt-8 rounded-3xl bg-white p-6 ring-1 ring-slate-200 sm:p-8">
                            <h2 className="text-lg font-semibold text-slate-900">
                                About this tuition
                            </h2>
                            <p className="mt-3 leading-relaxed text-slate-600">
                                {t.description}
                            </p>
                        </section>
                    </div>

                    {/* Sticky booking card */}
                    <aside className="lg:sticky lg:top-6">
                        <div className="rounded-3xl bg-white p-6 shadow-xl shadow-indigo-100/60 ring-1 ring-slate-200 sm:p-8">
                            <p className="flex items-center gap-2 text-sm font-medium text-slate-500">
                                <Wallet className="size-4" /> Monthly fee
                            </p>
                            <p className="mt-1 flex items-baseline gap-1">
                                <span className="text-4xl font-bold tracking-tight text-slate-900">
                                    ৳{t.monthlyFee.toLocaleString("en-US")}
                                </span>
                                <span className="text-sm font-medium text-slate-500">/ month</span>
                            </p>

                            <Button
                                disabled={!open}
                                className="mt-6 h-12 w-full rounded-full bg-indigo-600 text-base font-semibold shadow-none hover:bg-indigo-700"
                            >
                                {open ? (
                                    <Link href={`/tuitions/${t._id}/apply`}>Apply now</Link>
                                ) : (
                                    <span>Applications closed</span>
                                )}
                            </Button>
                            <p className="mt-3 flex items-center justify-center gap-1.5 text-xs text-slate-500">
                                <Users className="size-3.5" /> Free to apply. No hidden charges.
                            </p>

                            {/* Tutor */}
                            <div className="mt-6 border-t border-slate-100 pt-6">
                                <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                                    Your tutor
                                </p>
                                <div className="mt-3 flex items-center gap-3">
                                    <span className="flex size-12 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-indigo-600 to-sky-500 text-sm font-bold text-white">
                                        {initials(t.tutorName)}
                                    </span>
                                    <div className="min-w-0">
                                        <p className="flex items-center gap-1.5 font-semibold text-slate-900">
                                            <span className="truncate">{t.tutorName}</span>
                                            {t.approvalStatus === "approved" && (
                                                <BadgeCheck
                                                    className="size-4 shrink-0 text-indigo-500"
                                                    aria-label="Verified tutor"
                                                />
                                            )}
                                        </p>
                                        <a
                                            href={`mailto:${t.tutorEmail}`}
                                            className="flex items-center gap-1.5 truncate text-sm text-slate-500 hover:text-indigo-600"
                                        >
                                            <Mail className="size-3.5 shrink-0" />
                                            <span className="truncate">{t.tutorEmail}</span>
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </aside>
                </div>
            </div>
        </main>
    );
}