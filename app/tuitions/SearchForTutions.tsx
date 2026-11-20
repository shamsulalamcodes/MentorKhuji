import { Search } from 'lucide-react';

const SearchForTutions = () => {
    return (
        <div>
            <form
                action="/tuitions"
                role="search"
                className="mt-8 rounded-2xl border border-slate-200/80 bg-white/90 p-2 shadow-xl shadow-slate-900/5 backdrop-blur dark:border-slate-800 dark:bg-slate-900/80 dark:shadow-black/20"
            >
                <div className="flex flex-col gap-1.5 sm:flex-row sm:items-center">
                    <div className="flex flex-1 items-center gap-2.5 rounded-xl px-3 py-2.5 transition-colors focus-within:bg-slate-50 dark:focus-within:bg-slate-800/60">
                        <Search className="size-4.5 shrink-0 text-indigo-500" />
                        <label htmlFor="banner-subject" className="sr-only">
                            Subject, class or exam
                        </label>
                        <input
                            id="banner-subject"
                            name="q"
                            type="search"
                            placeholder="Subject, class or exam..."
                            className="w-full min-w-0 bg-transparent text-sm font-medium text-slate-900 outline-none placeholder:font-normal placeholder:text-slate-400 dark:text-white dark:placeholder:text-slate-500"
                        />
                    </div>

                    <button
                        type="submit"
                        className="inline-flex h-11 shrink-0 items-center justify-center gap-1.5 rounded-xl bg-slate-900 px-5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-slate-800 focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 focus-visible:outline-none dark:bg-white dark:text-slate-900 dark:hover:bg-slate-100 dark:focus-visible:ring-offset-slate-950"
                    >
                        <Search className="size-4 sm:hidden" />
                        Search
                    </button>
                </div>
            </form>
        </div>
    );
};

export default SearchForTutions;