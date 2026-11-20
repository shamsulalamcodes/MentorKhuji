"use client";

import { TuitionFilters, TuitionSearchBarProps } from "@/lib/type";
import { ChevronDown, Loader2, Search, SlidersHorizontal, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState, useTransition } from "react";

const selectClassName =
    "w-full appearance-none rounded-lg border border-slate-200 bg-white py-2 pr-8 pl-3 text-sm font-medium text-slate-700 transition-colors outline-none hover:border-slate-300 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-500/20 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 dark:hover:border-slate-600 dark:focus:border-indigo-500";

const DEBOUNCE_MS = 350;

const buildSearch = ({ q, subject, classLevel, mode }: Required<TuitionFilters>) => {
    const params = new URLSearchParams();

    if (q.trim()) params.set("q", q.trim());
    if (subject) params.set("subject", subject);
    if (classLevel) params.set("classLevel", classLevel);
    if (mode) params.set("mode", mode);

    return params.toString();
};

const SearchForTutions = ({
    q = "",
    subject = "",
    classLevel = "",
    mode = "",
    subjects = [],
    classLevels = [],
}: TuitionSearchBarProps) => {
    const router = useRouter();
    const [isPending, startTransition] = useTransition();

    const [query, setQuery] = useState(q);
    const [selectedSubject, setSelectedSubject] = useState(subject);
    const [selectedClassLevel, setSelectedClassLevel] = useState(classLevel);
    const [selectedMode, setSelectedMode] = useState(mode);

    const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);
    const lastAppliedRef = useRef<string | null>(null);

    const hasFilters = Boolean(query || selectedSubject || selectedClassLevel || selectedMode);

    // Keep the controls in sync with the URL (back/forward, external links),
    // without overwriting what the user is currently typing.
    useEffect(() => {
        const incoming = buildSearch({ q, subject, classLevel, mode });

        if (lastAppliedRef.current === incoming) return;

        lastAppliedRef.current = null;
        setQuery(q);
        setSelectedSubject(subject);
        setSelectedClassLevel(classLevel);
        setSelectedMode(mode);
    }, [q, subject, classLevel, mode]);

    useEffect(
        () => () => {
            if (debounceRef.current) clearTimeout(debounceRef.current);
        },
        []
    );

    const navigate = (filters: Required<TuitionFilters>) => {
        const search = buildSearch(filters);
        lastAppliedRef.current = search;

        startTransition(() => {
            router.replace(search ? `/tuitions?${search}` : "/tuitions", {
                scroll: false,
            });
        });
    };

    const cancelDebounce = () => {
        if (debounceRef.current) {
            clearTimeout(debounceRef.current);
            debounceRef.current = null;
        }
    };

    const handleQueryChange = (value: string) => {
        setQuery(value);
        cancelDebounce();

        debounceRef.current = setTimeout(() => {
            navigate({
                q: value,
                subject: selectedSubject,
                classLevel: selectedClassLevel,
                mode: selectedMode,
            });
        }, DEBOUNCE_MS);
    };

    const applyNow = (overrides: Partial<TuitionFilters>) => {
        cancelDebounce();

        navigate({
            q: query,
            subject: selectedSubject,
            classLevel: selectedClassLevel,
            mode: selectedMode,
            ...overrides,
        });
    };

    const clearFilters = () => {
        cancelDebounce();
        setQuery("");
        setSelectedSubject("");
        setSelectedClassLevel("");
        setSelectedMode("");
        navigate({ q: "", subject: "", classLevel: "", mode: "" });
    };

    return (
        <div>
            <form
                role="search"
                onSubmit={(event) => {
                    event.preventDefault();
                    applyNow({});
                }}
                className="mt-8 rounded-2xl border border-slate-200/80 bg-white/90 p-2 shadow-xl shadow-slate-900/5 backdrop-blur dark:border-slate-800 dark:bg-slate-900/80 dark:shadow-black/20"
            >
                <div className="flex items-center gap-2.5 rounded-xl px-3 py-2.5 transition-colors focus-within:bg-slate-50 dark:focus-within:bg-slate-800/60">
                    <Search className="size-4.5 shrink-0 text-indigo-500" />
                    <label htmlFor="banner-subject" className="sr-only">
                        Search by title or subject
                    </label>
                    <input
                        id="banner-subject"
                        name="q"
                        type="search"
                        value={query}
                        onChange={(event) =>
                            handleQueryChange(event.target.value)
                        }
                        placeholder="Search by title or subject..."
                        className="w-full min-w-0 bg-transparent text-sm font-medium text-slate-900 outline-none placeholder:font-normal placeholder:text-slate-400 dark:text-white dark:placeholder:text-slate-500"
                    />
                    {isPending && (
                        <Loader2
                            aria-label="Updating results"
                            className="size-4 shrink-0 animate-spin text-indigo-500"
                        />
                    )}
                </div>

                <div className="mt-1.5 flex flex-col gap-2 border-t border-slate-100 px-1 pt-2.5 sm:flex-row sm:items-center dark:border-slate-800">
                    <span className="hidden items-center gap-1.5 text-[11px] font-semibold tracking-[0.14em] text-slate-400 uppercase sm:inline-flex dark:text-slate-500">
                        <SlidersHorizontal className="size-3.5" />
                        Filters
                    </span>

                    {subjects.length > 0 && (
                        <label className="relative flex-1">
                            <span className="sr-only">
                                Filter by subject
                            </span>
                            <select
                                name="subject"
                                value={selectedSubject}
                                onChange={(event) => {
                                    setSelectedSubject(event.target.value);
                                    applyNow({ subject: event.target.value });
                                }}
                                className={selectClassName}
                            >
                                <option value="">All subjects</option>
                                {subjects.map((item) => (
                                    <option key={item} value={item}>
                                        {item}
                                    </option>
                                ))}
                            </select>
                            <ChevronDown className="pointer-events-none absolute top-1/2 right-2.5 size-3.5 -translate-y-1/2 text-slate-400" />
                        </label>
                    )}

                    {classLevels.length > 0 && (
                        <label className="relative flex-1">
                            <span className="sr-only">
                                Filter by class level
                            </span>
                            <select
                                name="classLevel"
                                value={selectedClassLevel}
                                onChange={(event) => {
                                    setSelectedClassLevel(event.target.value);
                                    applyNow({ classLevel: event.target.value });
                                }}
                                className={selectClassName}
                            >
                                <option value="">All class levels</option>
                                {classLevels.map((item) => (
                                    <option key={item} value={item}>
                                        {item}
                                    </option>
                                ))}
                            </select>
                            <ChevronDown className="pointer-events-none absolute top-1/2 right-2.5 size-3.5 -translate-y-1/2 text-slate-400" />
                        </label>
                    )}

                    <label className="relative flex-1">
                        <span className="sr-only">Filter by mode</span>
                        <select
                            name="mode"
                            value={selectedMode}
                            onChange={(event) => {
                                setSelectedMode(event.target.value);
                                applyNow({ mode: event.target.value });
                            }}
                            className={selectClassName}
                        >
                            <option value="">Any mode</option>
                            <option value="Online">Online</option>
                            <option value="Offline">Offline</option>
                        </select>
                        <ChevronDown className="pointer-events-none absolute top-1/2 right-2.5 size-3.5 -translate-y-1/2 text-slate-400" />
                    </label>

                    {hasFilters && (
                        <button
                            type="button"
                            onClick={clearFilters}
                            className="inline-flex shrink-0 items-center justify-center gap-1 rounded-lg px-2 py-2 text-xs font-semibold text-slate-500 transition-colors hover:bg-slate-100 hover:text-slate-700 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-slate-200"
                        >
                            <X className="size-3.5" />
                            Clear
                        </button>
                    )}
                </div>
            </form>
        </div>
    );
};

export default SearchForTutions;
