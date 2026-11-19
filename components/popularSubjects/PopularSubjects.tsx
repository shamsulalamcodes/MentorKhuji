'use client';

import React, { useEffect, useState } from 'react';
import {
    Calculator,
    Atom,
    Code2,
    Languages,
    FlaskConical,
    BookOpen,
    ShieldCheck,
    Star,
    ArrowUpRight,
    Users,
    Sparkles,
    CheckCircle2,
    GraduationCap,
    ChevronDown,
    ChevronUp,
    Quote,
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
} from '@/components/ui/card';
import { cn } from '@/lib/utils';
import type {
    SubjectCategory,
    TopSubjectsSectionProps,
    UserRole,
    VerifiedHighlight,
} from '@/lib/type';

export const DEFAULT_SUBJECTS: SubjectCategory[] = [
    {
        id: 'math',
        title: 'Mathematics',
        tagline: 'Algebra, Calculus, Linear Algebra & Exam Prep',
        icon: Calculator,
        accentBg: 'bg-blue-500/10 dark:bg-blue-400/10',
        accentText: 'text-blue-600 dark:text-blue-400',
        borderHover: 'hover:border-blue-500/40 dark:hover:border-blue-400/40',
        verifiedTutors: '1,420+',
        activeStudents: '8,900+ learners',
        rating: '4.94',
        reviewCount: 640,
        avgHourlyRate: '$22/hr',
        demandBadge: 'High Demand',
        topics: ['Calculus', 'Statistics', 'SAT Math', 'Linear Algebra'],
        featuredReview: {
            quote: 'Raised my AP Calculus grade from a C to an A in 6 weeks.',
            author: 'Amina R.',
            role: 'Verified Student',
        },
    },
    {
        id: 'physics',
        title: 'Physics',
        tagline: 'Mechanics, Electromagnetism, Quantum & Lab Prep',
        icon: Atom,
        accentBg: 'bg-violet-500/10 dark:bg-violet-400/10',
        accentText: 'text-violet-600 dark:text-violet-400',
        borderHover: 'hover:border-violet-500/40 dark:hover:border-violet-400/40',
        verifiedTutors: '860+',
        activeStudents: '4,350+ learners',
        rating: '4.91',
        reviewCount: 412,
        avgHourlyRate: '$25/hr',
        demandBadge: 'Top Rated',
        topics: ['Mechanics', 'Thermodynamics', 'IB Physics', 'Optics'],
        featuredReview: {
            quote: 'Complex vector problems finally clicked after two 1-on-1 sessions.',
            author: 'Tanvir H.',
            role: 'Verified Student',
        },
    },
    {
        id: 'programming',
        title: 'Programming',
        tagline: 'Python, React, Data Structures & Full-Stack Dev',
        icon: Code2,
        accentBg: 'bg-emerald-500/10 dark:bg-emerald-400/10',
        accentText: 'text-emerald-600 dark:text-emerald-400',
        borderHover: 'hover:border-emerald-500/40 dark:hover:border-emerald-400/40',
        verifiedTutors: '1,680+',
        activeStudents: '11,200+ learners',
        rating: '4.96',
        reviewCount: 895,
        avgHourlyRate: '$30/hr',
        demandBadge: 'Most Popular',
        topics: ['Python', 'JavaScript / React', 'DSA', 'SQL'],
        featuredReview: {
            quote: 'Landed my first junior dev internship with mentor code reviews.',
            author: 'Sadia K.',
            role: 'Verified Student',
        },
    },
    {
        id: 'ielts',
        title: 'IELTS & English',
        tagline: 'Academic & General Band 8+ Coaching, Speaking Mocks',
        icon: Languages,
        accentBg: 'bg-amber-500/10 dark:bg-amber-400/10',
        accentText: 'text-amber-600 dark:text-amber-400',
        borderHover: 'hover:border-amber-500/40 dark:hover:border-amber-400/40',
        verifiedTutors: '940+',
        activeStudents: '6,740+ learners',
        rating: '4.95',
        reviewCount: 730,
        avgHourlyRate: '$20/hr',
        demandBadge: 'Fast Track',
        topics: ['Speaking Band 8+', 'Writing Task 2', 'Listening', 'Academic'],
        featuredReview: {
            quote: 'Scored Band 8.0 overall on my first attempt with weekly mock tests.',
            author: 'Nafis M.',
            role: 'Verified Student',
        },
    },
    {
        id: 'chemistry',
        title: 'Chemistry',
        tagline: 'Organic, Inorganic, Stoichiometry & Pre-Med Prep',
        icon: FlaskConical,
        accentBg: 'bg-rose-500/10 dark:bg-rose-400/10',
        accentText: 'text-rose-600 dark:text-rose-400',
        borderHover: 'hover:border-rose-500/40 dark:hover:border-rose-400/40',
        verifiedTutors: '620+',
        activeStudents: '3,180+ learners',
        rating: '4.89',
        reviewCount: 290,
        avgHourlyRate: '$23/hr',
        demandBadge: 'Verified',
        topics: ['Organic Chem', 'Biochemistry', 'A-Level', 'Stoichiometry'],
        featuredReview: {
            quote: 'Reaction mechanisms became super intuitive with visual breakdowns.',
            author: 'Farhana T.',
            role: 'Verified Student',
        },
    },
    {
        id: 'literature',
        title: 'Academic Writing',
        tagline: 'Research Essays, Thesis Structuring & Critical Analysis',
        icon: BookOpen,
        accentBg: 'bg-cyan-500/10 dark:bg-cyan-400/10',
        accentText: 'text-cyan-600 dark:text-cyan-400',
        borderHover: 'hover:border-cyan-500/40 dark:hover:border-cyan-400/40',
        verifiedTutors: '510+',
        activeStudents: '2,890+ learners',
        rating: '4.92',
        reviewCount: 245,
        avgHourlyRate: '$19/hr',
        demandBadge: 'Verified',
        topics: ['Essay Structure', 'SOP / Admissions', 'Grammar', 'Literature'],
        featuredReview: {
            quote: 'My university admission essay stood out thanks to my mentor.',
            author: 'Rafiul I.',
            role: 'Verified Student',
        },
    },
];

const VERIFIED_HIGHLIGHTS: VerifiedHighlight[] = [
    {
        quote:
            'Every tutor goes through academic credential verification and a live demo check. Finding a Calculus tutor took under 10 minutes.',
        name: 'Maliha Chowdhury',
        badge: 'Verified Parent',
        metric: '4.9/5 Avg. Rating',
        type: 'student',
    },
    {
        quote:
            'As a Computer Science mentor, I filled my weekend schedule with serious students without chasing payments or leads.',
        name: 'Zayed Ahmed',
        badge: 'Verified Mentor • 140+ Sessions',
        metric: '98% Repeat Rate',
        type: 'tutor',
    },
];

export default function PopularSubjects({
    subjects = DEFAULT_SUBJECTS,
    defaultRole = 'student',
    title = 'Explore Top Subjects',
    subtitle,
    onSelectSubject,
    className = '',
}: TopSubjectsSectionProps) {
    const [audienceMode, setAudienceMode] = useState<UserRole>(defaultRole);
    const [showAllSubjects, setShowAllSubjects] = useState<boolean>(false);
    const [selectedSubject, setSelectedSubject] = useState<SubjectCategory | null>(
        null
    );

    const visibleSubjects = showAllSubjects ? subjects : subjects.slice(0, 4);

    const resolvedSubtitle =
        subtitle ??
        (audienceMode === 'student'
            ? 'Connect 1-on-1 with vetted subject specialists for exam prep, homework help, and career skills.'
            : 'Browse high-demand tuition categories where students are actively booking verified mentors.');

    const handleSubjectClick = (subject: SubjectCategory) => {
        setSelectedSubject(subject);
        onSelectSubject?.(subject, audienceMode);
    };

    return (
        <section
            aria-labelledby="top-subjects-heading"
            className={cn(
                'font-sans text-foreground border-t border-border/60 py-16 sm:py-20',
                className
            )}
        >
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                {/* Section Header + Dual-Intent Role Switcher */}
                <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
                    <div className="max-w-2xl space-y-3">
                        <Badge
                            variant="outline"
                            className="gap-1.5 rounded-full bg-muted/40 px-3 py-1 text-xs font-medium text-muted-foreground"
                        >
                            <ShieldCheck className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400" />
                            <span>100% ID & Credential Verified Mentors</span>
                        </Badge>

                        <h2
                            id="top-subjects-heading"
                            className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl"
                        >
                            {title}
                        </h2>

                        <p className="text-base leading-relaxed text-muted-foreground">
                            {resolvedSubtitle}
                        </p>
                    </div>

                    {/* Role Switcher using shadcn Buttons */}
                    <div
                        role="tablist"
                        aria-label="Select your role"
                        className="inline-flex self-start gap-1 rounded-lg border border-border bg-muted/60 p-1 md:self-auto"
                    >
                        <Button
                            type="button"
                            role="tab"
                            size="sm"
                            variant={audienceMode === 'student' ? 'secondary' : 'ghost'}
                            aria-selected={audienceMode === 'student'}
                            onClick={() => setAudienceMode('student')}
                            className={cn(
                                'gap-1.5 text-xs',
                                audienceMode === 'student' &&
                                'bg-background text-foreground shadow-2xs hover:bg-background'
                            )}
                        >
                            <GraduationCap className="h-3.5 w-3.5" />
                            For Students
                        </Button>
                        <Button
                            type="button"
                            role="tab"
                            size="sm"
                            variant={audienceMode === 'tutor' ? 'secondary' : 'ghost'}
                            aria-selected={audienceMode === 'tutor'}
                            onClick={() => setAudienceMode('tutor')}
                            className={cn(
                                'gap-1.5 text-xs',
                                audienceMode === 'tutor' &&
                                'bg-background text-foreground shadow-2xs hover:bg-background'
                            )}
                        >
                            <Sparkles className="h-3.5 w-3.5" />
                            For Tutors
                        </Button>
                    </div>
                </div>

                {/* Active Subject Selection Banner */}
                {selectedSubject && (
                    <Card className="mt-6 border-border bg-card shadow-2xs">
                        <CardContent className="flex flex-wrap items-center justify-between gap-3 px-4 py-3 text-sm">
                            <div className="flex items-center gap-2.5">
                                <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-600 dark:text-emerald-400" />
                                <span>
                                    {audienceMode === 'student' ? (
                                        <>
                                            Filtering{' '}
                                            <strong className="font-semibold text-foreground">
                                                <span className="font-mono tabular-nums">
                                                    {selectedSubject.verifiedTutors}
                                                </span>{' '}
                                                verified {selectedSubject.title} tutors
                                            </strong>{' '}
                                            (Avg.{' '}
                                            <span className="font-mono tabular-nums">
                                                {selectedSubject.avgHourlyRate}
                                            </span>
                                            )
                                        </>
                                    ) : (
                                        <>
                                            Viewing open tuition requests in{' '}
                                            <strong className="font-semibold text-foreground">
                                                {selectedSubject.title}
                                            </strong>{' '}
                                            (
                                            <span className="font-mono tabular-nums">
                                                {selectedSubject.activeStudents}
                                            </span>
                                            )
                                        </>
                                    )}
                                </span>
                            </div>
                            <Button
                                type="button"
                                variant="ghost"
                                size="sm"
                                onClick={() => setSelectedSubject(null)}
                                className="h-auto px-2 py-1 text-xs text-muted-foreground hover:text-foreground"
                            >
                                Clear filter
                            </Button>
                        </CardContent>
                    </Card>
                )}

                {/* Responsive Subject Cards */}
                <div className="mt-8 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-4">
                    {visibleSubjects.map((subject) => {
                        const IconComponent = subject.icon;
                        const isSelected = selectedSubject?.id === subject.id;

                        return (
                            <Card
                                key={subject.id}
                                className={cn(
                                    'group flex flex-col justify-between transition-all duration-200 hover:-translate-y-0.5 hover:shadow-sm',
                                    isSelected
                                        ? 'border-foreground ring-1 ring-foreground'
                                        : subject.borderHover
                                )}
                            >
                                <div>
                                    <CardHeader className="space-y-4 p-5 pb-0">
                                        <div className="flex items-start justify-between gap-3">
                                            <div
                                                className={cn(
                                                    'flex h-11 w-11 items-center justify-center rounded-lg transition-transform duration-200 group-hover:scale-105',
                                                    subject.accentBg,
                                                    subject.accentText
                                                )}
                                            >
                                                <IconComponent className="h-5 w-5" aria-hidden="true" />
                                            </div>

                                            <Badge
                                                variant="outline"
                                                className="gap-1 bg-muted/40 px-2 py-1 font-mono text-xs font-medium tabular-nums"
                                            >
                                                <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                                                <span>{subject.rating}</span>
                                                <span className="text-muted-foreground">
                                                    ({subject.reviewCount})
                                                </span>
                                            </Badge>
                                        </div>

                                        <div>
                                            <h3 className="text-lg font-semibold tracking-tight text-foreground">
                                                {subject.title}
                                            </h3>
                                            <p className="mt-1 line-clamp-2 text-xs leading-relaxed text-muted-foreground">
                                                {subject.tagline}
                                            </p>
                                        </div>
                                    </CardHeader>

                                    <CardContent className="p-5 pt-4">
                                        {/* Verified Counters Box */}
                                        <div className="grid grid-cols-2 gap-2 rounded-lg border border-border/80 bg-muted/30 p-2.5">
                                            <div>
                                                <div className="flex items-center gap-1 text-[11px] font-medium text-muted-foreground">
                                                    <ShieldCheck className="h-3 w-3 shrink-0 text-emerald-600 dark:text-emerald-400" />
                                                    <span>Verified Tutors</span>
                                                </div>
                                                <p className="mt-0.5 font-mono text-sm font-semibold tabular-nums text-foreground">
                                                    {subject.verifiedTutors}
                                                </p>
                                            </div>

                                            <div className="border-l border-border/80 pl-2.5">
                                                <div className="flex items-center gap-1 text-[11px] font-medium text-muted-foreground">
                                                    <Users className="h-3 w-3 shrink-0 text-muted-foreground" />
                                                    <span>Active Demand</span>
                                                </div>
                                                <p className="mt-0.5 truncate font-mono text-sm font-semibold tabular-nums text-foreground">
                                                    {subject.activeStudents.replace(' learners', '')}
                                                </p>
                                            </div>
                                        </div>

                                        {/* Topic Badges */}
                                        <div className="mt-3.5 flex flex-wrap gap-1.5">
                                            {subject.topics.slice(0, 3).map((topic) => (
                                                <Badge
                                                    key={topic}
                                                    variant="secondary"
                                                    className="rounded-md px-2 py-0.5 text-[11px] font-medium"
                                                >
                                                    {topic}
                                                </Badge>
                                            ))}
                                        </div>

                                        {/* Featured Student Review */}
                                        <div className="mt-4 border-t border-border/70 pt-3">
                                            <p className="line-clamp-2 text-xs italic text-muted-foreground">
                                                “{subject.featuredReview.quote}”
                                            </p>
                                            <p className="mt-1 text-[11px] font-medium text-muted-foreground">
                                                — {subject.featuredReview.author},{' '}
                                                <span className="text-emerald-600 dark:text-emerald-400">
                                                    {subject.featuredReview.role}
                                                </span>
                                            </p>
                                        </div>
                                    </CardContent>
                                </div>

                                <CardFooter className="">
                                    <Button
                                        type="button"
                                        variant="outline"
                                        onClick={() => handleSubjectClick(subject)}
                                        className="w-full justify-between text-xs font-semibold transition-colors group-hover:border-primary group-hover:bg-primary group-hover:text-primary-foreground"
                                    >
                                        <span>
                                            {audienceMode === 'student'
                                                ? `Find ${subject.title} Tutor`
                                                : `Apply as ${subject.title} Tutor`}
                                        </span>
                                        <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                                    </Button>
                                </CardFooter>
                            </Card>
                        );
                    })}
                </div>

                {/* Expand / Collapse Subjects Toggle */}
                {subjects.length > 4 && (
                    <div className="mt-6 flex justify-center">
                        <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            onClick={() => setShowAllSubjects((prev) => !prev)}
                            className="gap-1.5 text-xs"
                        >
                            <span>
                                {showAllSubjects
                                    ? 'Show Core 4 Subjects'
                                    : `View All ${subjects.length} Popular Subjects`}
                            </span>
                            {showAllSubjects ? (
                                <ChevronUp className="h-3.5 w-3.5" />
                            ) : (
                                <ChevronDown className="h-3.5 w-3.5" />
                            )}
                        </Button>
                    </div>
                )}

                {/* Bottom Trust Counter & Verified Feedback Cards */}
                <div className="mt-10 grid grid-cols-1 gap-4 lg:grid-cols-3">
                    <Card className="flex flex-col justify-between lg:col-span-4">
                        <CardContent className="flex h-full flex-col justify-between p-5">
                            <div>
                                <span className="font-mono text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
                                    Platform Trust Metrics
                                </span>
                                <div className="mt-3 flex items-baseline gap-2">
                                    <span className="font-mono text-3xl font-bold tracking-tight tabular-nums text-foreground">
                                        5,900+
                                    </span>
                                    <span className="text-xs font-medium text-emerald-600 dark:text-emerald-400">
                                        Verified Tutors
                                    </span>
                                </div>
                                <p className="mt-1.5 text-xs leading-relaxed text-muted-foreground">
                                    Over{' '}
                                    <span className="font-mono tabular-nums text-foreground">
                                        37,000+
                                    </span>{' '}
                                    completed 1-on-1 home & online tuition sessions with a{' '}
                                    <span className="font-mono tabular-nums text-foreground">
                                        4.93
                                    </span>{' '}
                                    average satisfaction score.
                                </p>
                            </div>

                            <div className="mt-4 flex items-center gap-3 border-t border-border/70 pt-3 text-xs text-muted-foreground">
                                <span className="inline-flex items-center gap-1 font-medium text-foreground">
                                    <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400" />
                                    Free Trial Matching
                                </span>
                                <span>•</span>
                                <span>Zero Hidden Fees</span>
                            </div>
                        </CardContent>
                    </Card>

                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:col-span-8">
                        {VERIFIED_HIGHLIGHTS.map((item) => (
                            <Card key={item.name} className="flex flex-col justify-between">
                                <CardContent className="flex h-full flex-col justify-between p-5">
                                    <div>
                                        <div className="flex items-center justify-between gap-2">
                                            <Quote className="h-4 w-4 text-muted-foreground" />
                                            <Badge
                                                variant="secondary"
                                                className="rounded-full px-2.5 py-0.5 font-mono text-[11px] font-medium tabular-nums"
                                            >
                                                {item.metric}
                                            </Badge>
                                        </div>
                                        <p className="mt-3 text-sm leading-relaxed text-foreground/90">
                                            “{item.quote}”
                                        </p>
                                    </div>

                                    <div className="mt-4 flex items-center justify-between border-t border-border/70 pt-3">
                                        <div>
                                            <p className="text-xs font-semibold text-foreground">
                                                {item.name}
                                            </p>
                                            <p className="text-[11px] font-medium text-emerald-600 dark:text-emerald-400">
                                                {item.badge}
                                            </p>
                                        </div>
                                        <div className="flex items-center gap-0.5 text-amber-400">
                                            {[...Array(5)].map((_, idx) => (
                                                <Star key={idx} className="h-3 w-3 fill-current" />
                                            ))}
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}