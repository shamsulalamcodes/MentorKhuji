import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent } from "@/components/ui/card"
import { Mail } from "lucide-react"
import { User } from "@/lib/type"
import { EditProfileDialog } from "@/components/profile/edit-profile-dialog"
import { getCurrentUserOnServer } from "@/hooks/use-server-auth"

export default async function ProfilePage() {
    const currentUser = await getCurrentUserOnServer()

    const initialUser: User = {
        _id: currentUser?.id as string, name: currentUser?.name as string, email: currentUser?.email as string, photo: currentUser?.image as string
    }

    const initials = initialUser?.name?.split(" ").map((n) => n[0]).join("").slice(0, 2).toUpperCase()

    const preview = initialUser?.photo instanceof File ? URL.createObjectURL(initialUser?.photo) : initialUser?.photo || undefined

    return (
        <div className="mx-auto w-full max-w-3xl p-4 md:p-8">
            <h1 className="mb-6 text-2xl font-semibold tracking-tight">My Profile</h1>
            <Card>
                <CardContent className="flex flex-col items-center gap-6 p-6 text-center sm:flex-row sm:text-left">
                    <Avatar className="size-24 sm:size-28">
                        <AvatarImage src={preview} alt={initialUser?.name} />
                        <AvatarFallback className="text-2xl">{initials}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1 space-y-1">
                        <h2 className="text-xl font-semibold">{initialUser?.name}</h2>
                        <p className="flex items-center justify-center gap-2 text-muted-foreground sm:justify-start">
                            <Mail className="size-4" /> {initialUser?.email}
                        </p>
                    </div>
                    <EditProfileDialog key={initialUser?._id} user={initialUser} />
                </CardContent>
            </Card>
        </div>
    )
}