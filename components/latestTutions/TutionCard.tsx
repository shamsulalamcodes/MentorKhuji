import { Tuition } from "@/lib/type"
import { cn } from "cn"
import { ArrowRight, BookOpen, GraduationCap, MapPin, Wifi } from "lucide-react"
import Image from "next/image"
import Link from "next/link"


function formatFee(fee: number) {
    if (!Number.isFinite(fee)) return "—"

    return new Intl.NumberFormat("en-US", { maximumFractionDigits: 0 }).format(
        fee
    )
}

function getInitials(name: string) {
    return (
        name
            .trim()
            .split(/\s+/)
            .slice(0, 2)
            .map((part) => part[0]?.toUpperCase() ?? "")
            .join("") || "T"
    )
}

export default function TuitionCard({ tuition }: { tuition: Tuition }) {
    const isOnline = tuition.mode?.toLowerCase() === "online"
    const detailsHref = `/tutions/${tuition._id}`

    return (
        <article className="group flex h-full flex-col overflow-hidden rounded-3xl border border-slate-200/80 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-slate-300 hover:shadow-xl hover:shadow-slate-900/5 dark:border-slate-800 dark:bg-slate-900 dark:hover:border-slate-700 dark:hover:shadow-black/20">
            <div className="relative aspect-[16/9] shrink-0 overflow-hidden bg-slate-100 dark:bg-slate-800">
                {tuition.bannerImage ? (
                    <Image
                        src={tuition.bannerImage}
                        alt={`${tuition.title} banner`}
                        fill
                        unoptimized
                        sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                ) : (
                    <div className="flex size-full items-center justify-center bg-linear-to-br from-indigo-500 to-sky-500 text-3xl font-bold text-white">
                        {tuition.subject?.charAt(0) ?? "T"}
                    </div>
                )}

                <div
                    aria-hidden="true"
                    className="absolute inset-x-0 top-0 h-20 bg-linear-to-b from-slate-950/35 to-transparent"
                />

                <span className="absolute top-3 left-3 inline-flex max-w-[55%] items-center gap-1.5 rounded-full bg-white/95 px-2.5 py-1 text-[11px] font-semibold text-slate-800 shadow-sm backdrop-blur">
                    <BookOpen className="size-3.5 shrink-0 text-indigo-500" />
                    <span className="truncate">{tuition.subject}</span>
                </span>

                <span
                    className={cn(
                        "absolute top-3 right-3 inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-semibold text-white shadow-sm ring-1 ring-white/20 backdrop-blur",
                        isOnline ? "bg-emerald-600/90" : "bg-amber-600/90"
                    )}
                >
                    {isOnline ? (
                        <Wifi className="size-3.5" />
                    ) : (
                        <MapPin className="size-3.5" />
                    )}
                    {tuition.mode}
                </span>
            </div>

            <div className="flex flex-1 flex-col p-5">
                <h3 className="line-clamp-2 min-h-14 text-lg leading-7 font-bold tracking-tight text-slate-900 dark:text-white">
                    {tuition.title}
                </h3>

                <div className="mt-3 flex items-center gap-2 text-sm font-medium text-slate-600 dark:text-slate-300">
                    <GraduationCap className="size-4 shrink-0 text-indigo-500" />
                    <span className="truncate">{tuition.classLevel}</span>
                </div>

                <div className="mt-3 flex items-center gap-2.5">
                    <span className="grid size-8 shrink-0 place-items-center rounded-full bg-indigo-50 text-[10px] font-bold text-indigo-700 dark:bg-indigo-400/10 dark:text-indigo-300">
                        {getInitials(tuition.tutorName)}
                    </span>
                    <div className="min-w-0">
                        <p className="text-[10px] font-semibold tracking-[0.14em] text-slate-400 uppercase dark:text-slate-500">
                            Tutor
                        </p>
                        <p className="truncate text-sm font-semibold text-slate-700 dark:text-slate-200">
                            {tuition.tutorName}
                        </p>
                    </div>
                </div>

                <div className="mt-auto pt-5">
                    <div className="flex items-end justify-between gap-3 border-t border-slate-100 pt-4 dark:border-slate-800">
                        <div>
                            <p className="text-[10px] font-semibold tracking-[0.14em] text-slate-400 uppercase dark:text-slate-500">
                                Monthly Fee
                            </p>
                            <p className="mt-0.5 text-xl font-bold tracking-tight text-slate-900 dark:text-white">
                                ৳{formatFee(tuition.monthlyFee)}
                                <span className="ml-1 text-xs font-medium text-slate-400 dark:text-slate-500">
                                    /month
                                </span>
                            </p>
                        </div>
                        <span className="inline-flex items-center gap-1.5 text-[11px] font-medium text-slate-400 dark:text-slate-500">
                            {isOnline ? (
                                <Wifi className="size-3.5" />
                            ) : (
                                <MapPin className="size-3.5" />
                            )}
                            {tuition.mode}
                        </span>
                    </div>

                    <Link
                        href={detailsHref}
                        className="group/button mt-4 inline-flex h-10 w-full items-center justify-center gap-1.5 rounded-xl bg-indigo-600 px-4 text-sm font-semibold text-white shadow-sm shadow-indigo-600/20 transition-colors hover:bg-indigo-700 focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 focus-visible:outline-none dark:focus-visible:ring-offset-slate-900"
                    >
                        View Details
                        <ArrowRight className="size-4 transition-transform group-hover/button:translate-x-0.5" />
                    </Link>
                </div>
            </div>
        </article>
    )
}