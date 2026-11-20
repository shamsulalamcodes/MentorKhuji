import TuitionCard from "@/components/shared/TutionCard";
import { getAllTutions } from "@/lib/api";
import { Tuition, TuitionPageProps } from "@/lib/type";
import { BookOpen, SearchX } from "lucide-react";
import Link from "next/link";
import SearchForTutions from "./SearchForTutions";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Tuitions | MentorLagbe",
    description: "MentorLagbe Tuitions.",
};

const getParam = (value: string | string[] | undefined) =>
    (Array.isArray(value) ? value[0] : value)?.trim() ?? "";

const uniqueSorted = (values: string[]) =>
    [...new Set(values.filter(Boolean))].sort((a, b) => a.localeCompare(b));

const Tutions = async ({ searchParams }: TuitionPageProps) => {
    const filters = await searchParams;

    const q = getParam(filters.q);
    const subject = getParam(filters.subject);
    const classLevel = getParam(filters.classLevel);
    const mode = getParam(filters.mode);

    let tuitions: Tuition[] = [];

    try {
        const data = await getAllTutions();
        if (Array.isArray(data)) tuitions = data
    } catch {
        tuitions = [];
    }

    const subjects = uniqueSorted(tuitions.map((tuition) => tuition.subject));
    const classLevels = uniqueSorted(
        tuitions.map((tuition) => tuition.classLevel)
    );

    const query = q.toLowerCase();

    const filteredTuitions = tuitions.filter((tuition) => {
        const matchesQuery =
            !query ||
            tuition.title?.toLowerCase().includes(query) ||
            tuition.subject?.toLowerCase().includes(query);

        const matchesSubject = !subject || tuition.subject === subject;
        const matchesClassLevel =
            !classLevel || tuition.classLevel === classLevel;
        const matchesMode =
            !mode || tuition.mode?.toLowerCase() === mode.toLowerCase();

        return (
            matchesQuery &&
            matchesSubject &&
            matchesClassLevel &&
            matchesMode
        );
    });

    const hasFilters = Boolean(q || subject || classLevel || mode);

    return (
        <div className="mx-auto w-full py-10">
            <div className="mx-auto max-w-2xl text-center">
                <h2
                    id="latest-tuitions-heading"
                    className="mt-3 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl dark:text-white"
                >
                    Browse All Tuitions
                </h2>
                <p className="mt-2 max-w-xl text-sm leading-6 text-slate-600 sm:text-base dark:text-slate-300 mx-auto">
                    Explore all the tuition opportunities from verified tutors and
                    find the right fit for your learning goals.
                </p>
            </div>

            <div className="mx-auto w-full max-w-3xl px-4 sm:px-6">
                <SearchForTutions
                    q={q}
                    subject={subject}
                    classLevel={classLevel}
                    mode={mode}
                    subjects={subjects}
                    classLevels={classLevels}
                />
            </div>

            <div className="mx-auto mt-6 flex w-full max-w-7xl items-center justify-between gap-3 px-5">
                <p className="text-sm font-medium text-slate-500 dark:text-slate-400">
                    {filteredTuitions.length}{" "}
                    {filteredTuitions.length === 1 ? "tuition" : "tuitions"} found
                </p>

                {hasFilters && (
                    <Link
                        href="/tuitions"
                        className="text-sm font-semibold text-indigo-600 transition-colors hover:text-indigo-700 dark:text-indigo-400 dark:hover:text-indigo-300"
                    >
                        Clear search
                    </Link>
                )}
            </div>

            {filteredTuitions.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 justify-between items-center gap-5 p-5">
                    {filteredTuitions.map((tuition) => (
                        <TuitionCard key={tuition._id} tuition={tuition} />
                    ))}
                </div>
            ) : (
                <div className="mx-auto mt-6 w-full max-w-7xl px-5">
                    <div className="rounded-3xl border border-dashed border-slate-300 bg-white/70 px-6 py-14 text-center dark:border-slate-700 dark:bg-slate-900/50">
                        {hasFilters ? (
                            <SearchX className="mx-auto size-8 text-slate-400" />
                        ) : (
                            <BookOpen className="mx-auto size-8 text-slate-400" />
                        )}
                        <h3 className="mt-3 text-base font-semibold text-slate-900 dark:text-white">
                            {hasFilters
                                ? "No tuitions match your search"
                                : "No tuitions available right now"}
                        </h3>
                        <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                            {hasFilters
                                ? "Try a different keyword or clear your filters to see all tuitions."
                                : "New opportunities are posted regularly. Please check back soon."}
                        </p>
                        {hasFilters && (
                            <Link
                                href="/tuitions"
                                className="mt-5 inline-flex h-10 items-center justify-center rounded-xl bg-indigo-600 px-4 text-sm font-semibold text-white shadow-sm shadow-indigo-600/20 transition-colors hover:bg-indigo-700"
                            >
                                Clear search
                            </Link>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default Tutions;
