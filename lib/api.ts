import { User } from "./type"

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

export const uploadToImgbb = async (file: File): Promise<string> => {
    const formData = new FormData()
    formData.append("image", file)

    const res = await fetch(
        `https://api.imgbb.com/1/upload?key=${process.env.NEXT_PUBLIC_IMGBB_API_KEY}`,
        { method: "POST", body: formData }
    )
    const data = await res.json()
    if (!data?.success) throw new Error(data?.error?.message || "Upload failed")
    return data?.data?.url
}


export const updateUser = async (id: string, data: { name: string; email: string; photo?: File | null }): Promise<User> => {
    const payload: Partial<User> = { name: data.name, email: data.email }

    if (data.photo instanceof File) payload.photo = await uploadToImgbb(data.photo)
    else if (typeof data.photo === "string" && data.photo) payload.photo = data.photo

    const res = await fetch(`${base}/users/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
    })
    if (!res.ok) throw new Error("Failed to update profile")
    return res.json()
}