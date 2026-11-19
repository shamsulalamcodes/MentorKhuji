import type { LucideIcon } from 'lucide-react';

export type UserRole = 'student' | 'tutor';

export interface SubjectReview {
    quote: string;
    author: string;
    role: string;
}

export interface SubjectCategory {
    id: string;
    title: string;
    tagline: string;
    icon: LucideIcon;
    accentBg: string;
    accentText: string;
    borderHover: string;
    verifiedTutors: string;
    activeStudents: string;
    rating: string;
    reviewCount: number;
    avgHourlyRate: string;
    demandBadge: string;
    topics: string[];
    featuredReview: SubjectReview;
}

export interface VerifiedHighlight {
    quote: string;
    name: string;
    badge: string;
    metric: string;
    type: UserRole;
}

export interface TopSubjectsSectionProps {
    subjects?: SubjectCategory[];
    defaultRole?: UserRole;
    title?: string;
    subtitle?: string;
    onSelectSubject?: (subject: SubjectCategory, role: UserRole) => void;
    className?: string;
}