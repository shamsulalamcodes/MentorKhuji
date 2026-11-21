
export type Tuition = {
    _id: string
    title: string
    subject: string
    classLevel: string
    mode: string
    monthlyFee: number
    tutorName: string
    bannerImage?: string | null
}

export type TuitionFilters = {
    q?: string
    subject?: string
    classLevel?: string
    mode?: string
}

export type TuitionFilterOptions = {
    subjects: string[]
    classLevels: string[]
}

export type TuitionSearchBarProps = TuitionFilters &
    Partial<TuitionFilterOptions>

export type TuitionPageProps = {
    searchParams: Promise<TuitionFilters>
}

export type SingleTuition = {
    _id: string
    title: string
    subject: string
    classLevel: string
    mode: string
    location: string
    monthlyFee: number
    daysPerWeek: number
    bannerImage: string
    description: string
    tutorName: string
    tutorEmail: string
    approvalStatus: string
    isActive: boolean
    createdAt: string
}

export type User = { _id: string; name: string; email: string; photo?: File | string | null }