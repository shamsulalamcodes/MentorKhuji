const base = process.env.LOCALHOST

export const getLatestTutions = async () => {
    const res = await fetch(`${base}/latestTutions`)
    return res.json()
}
