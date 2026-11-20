import { auth } from "@/lib/auth"
import { headers } from "next/headers"

export const getCurrentUserOnServer = async () => {
    const session = await auth.api.getSession({ headers: await headers() })
    const user = session?.user
    return user
}