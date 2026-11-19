import Link from "next/link";
import {
    ArrowUpRight,
    Atom,
    BadgeCheck,
    BookOpen,
    Calculator,
    Code,
    FlaskConical,
    Languages,
    Star,
    type LucideIcon,
} from "lucide-react";

type Subject = {
    name: string;
    icon: LucideIcon;
    tutors: number;
    rating: number;
    tint: string; // soft pastel tile
};

// Replace these numbers with real counts from your database.
const SUBJECTS: Subject[] = [
    { name: "Mathematics", icon: Calculator, tutors: 420, rating: 4.9, tint: "bg-indigo-50 text-indigo-600" },
    { name: "Physics", icon: Atom, tutors: 310, rating: 4.8, tint: "bg-sky-50 text-sky-600" },
    { name: "Programming", icon: Code, tutors: 185, rating: 4.9, tint: "bg-emerald-50 text-emerald-600" },
    { name: "IELTS", icon: Languages, tutors: 140, rating: 4.8, tint: "bg-amber-50 text-amber-600" },
    { name: "Chemistry", icon: FlaskConical, tutors: 265, rating: 4.7, tint: "bg-rose-50 text-rose-600" },
    { name: "English", icon: BookOpen, tutors: 380, rating: 4.8, tint: "bg-violet-50 text-violet-600" },
];

const STATS = [
    { value: "2,500+", label: "Verified tutors" },
    { value: "10,000+", label: "Happy students" },
    { value: "4.8/5", label: "Average rating" },
    { value: "50+", label: "Subjects" },
];

export function PopularSubjects() {
    return (
        <section id="subjects" className="bg-slate-50 py-16 sm:py-24">
            <div className="mx-auto max-w-6xl px-4 sm:px-6">
                <div className="mx-auto max-w-2xl text-center">
                    <p className="text-sm font-semibold uppercase tracking-wider text-indigo-600">
                        Top subjects
                    </p>
                    <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
                        Learn what matters most
                    </h2>
                    <p className="mt-4 text-base text-slate-600 sm:text-lg">
                        Explore the most in-demand subjects, taught by verified tutors.
                    </p>
                </div>

                {/* Subject cards */}
                <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
                    {SUBJECTS.map(({ name, icon: Icon, tutors, rating, tint }) => (
                        <Link
                            key={name}
                            href={`/tuitions?subject=${encodeURIComponent(name)}`}
                            className="group flex items-center gap-4 rounded-2xl bg-white p-5 ring-1 ring-slate-200 transition hover:-translate-y-1 hover:shadow-lg hover:shadow-indigo-100 hover:ring-indigo-200"
                        >
                            <span className={`flex size-14 shrink-0 items-center justify-center rounded-2xl ${tint}`}>
                                <Icon className="size-6" aria-hidden="true" />
                            </span>
                            <span className="min-w-0 flex-1">
                                <span className="block text-lg font-semibold text-slate-900">{name}</span>
                                <span className="mt-0.5 flex items-center gap-3 text-sm text-slate-500">
                                    <span className="inline-flex items-center gap-1">
                                        <BadgeCheck className="size-4 text-indigo-500" aria-hidden="true" />
                                        {tutors}+ tutors
                                    </span>
                                    <span className="inline-flex items-center gap-1">
                                        <Star className="size-4 fill-amber-400 text-amber-400" aria-hidden="true" />
                                        {rating}
                                    </span>
                                </span>
                            </span>
                            <ArrowUpRight className="size-5 shrink-0 text-slate-300 transition group-hover:text-indigo-600" aria-hidden="true" />
                        </Link>
                    ))}
                </div>

                {/* Trust counters */}
                <dl className="mt-12 grid grid-cols-2 gap-6 rounded-3xl bg-white p-6 ring-1 ring-slate-200 sm:p-8 lg:grid-cols-4">
                    {STATS.map(({ value, label }) => (
                        <div key={label} className="text-center">
                            <dt className="order-2 mt-1 text-sm font-medium text-slate-500">{label}</dt>
                            <dd className="text-3xl font-bold tracking-tight text-indigo-600 sm:text-4xl">{value}</dd>
                        </div>
                    ))}
                </dl>
            </div>
        </section>
    );
}