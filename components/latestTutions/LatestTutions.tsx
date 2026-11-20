import Link from "next/link"
import {
    ArrowRight,
    BookOpen,
    Sparkles,
} from "lucide-react"
import { getLatestTutions } from "@/lib/api"
import { Tuition } from "@/lib/type"
import TuitionCard from "./TutionCard"

const LatestTutions = async () => {
    let tuitions: Tuition[] = []

    try {
        const data = await getLatestTutions()
        console.log(data.length);
        if (Array.isArray(data)) {
            tuitions = data
        }
    } catch {
        tuitions = []
    }

    return (
        <section
            aria-labelledby="latest-tuitions-heading"
            className="relative overflow-hidden bg-slate-50/70 py-16 sm:py-20 dark:bg-slate-950"
        >
            <div
                aria-hidden="true"
                className="pointer-events-none absolute -top-32 left-1/3 -z-10 size-80 rounded-full bg-indigo-300/10 blur-3xl dark:bg-indigo-500/5"
            />

            <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
                    <div className="mx-auto max-w-2xl text-center">
                        <span className="inline-flex items-center gap-1.5 rounded-full border border-indigo-100 bg-white px-3 py-1 text-[11px] font-semibold text-indigo-700 shadow-sm dark:border-indigo-400/20 dark:bg-indigo-400/10 dark:text-indigo-300">
                            <Sparkles className="size-3.5 text-amber-500" />
                            New opportunities added
                        </span>

                        <h2
                            id="latest-tuitions-heading"
                            className="mt-3 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl dark:text-white"
                        >
                            Latest Tuitions
                        </h2>
                        <p className="mt-2 max-w-xl text-sm leading-6 text-slate-600 sm:text-base dark:text-slate-300">
                            Explore the newest tuition opportunities from verified tutors and
                            find the right fit for your learning goals.
                        </p>
                    </div>
                </div>
                <div className="gap-5 flex justify-end">
                    <Link
                        href="/tuitions"
                        className="group inline-flex w-fit items-center gap-1.5 rounded-lg text-sm font-semibold text-indigo-600 transition-colors hover:text-indigo-700 dark:text-indigo-400 dark:hover:text-indigo-300"
                    >
                        Browse all tuitions
                        <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
                    </Link>
                </div>

                {tuitions.length > 0 ? (
                    <div className="mt-9 grid auto-rows-fr grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3">
                        {tuitions.map((tuition) => (
                            <TuitionCard key={tuition._id} tuition={tuition} />
                        ))}
                    </div>
                ) : (
                    <div className="mt-9 rounded-3xl border border-dashed border-slate-300 bg-white/70 px-6 py-14 text-center dark:border-slate-700 dark:bg-slate-900/50">
                        <BookOpen className="mx-auto size-8 text-slate-400" />
                        <h3 className="mt-3 text-base font-semibold text-slate-900 dark:text-white">
                            No tuitions available right now
                        </h3>
                        <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                            New opportunities are posted regularly. Please check back soon.
                        </p>
                    </div>
                )}
            </div>
        </section >
    )
}

export default LatestTutions
