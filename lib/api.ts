const base = process.env.NEXT_PUBLIC_API_URL

export const getLatestTutions = async () => {
    const res = await fetch(`${base}/latestTutions`)
    return res.json()
}

export const getAllTutions = async () => {
    const res = await fetch(`${base}/approvedTutions`)
    return res.json()
}

export const getSingleTution = async (id: string) => {
    const res = await fetch(`${base}/tution/${id}`)
    return res.json()
}