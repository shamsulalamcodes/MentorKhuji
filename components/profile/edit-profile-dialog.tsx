"use client"

import { useState } from "react"
import { Pencil, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
    Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger,
} from "@/components/ui/dialog"
import { User } from "@/lib/type"
import { updateUser } from "@/lib/api"
import { useRouter } from "next/navigation"
import { authClient } from "@/lib/auth-client"
import { toast } from "../ui/toast"

export function EditProfileDialog({ user }: { user: User }) {
    const { refetch } = authClient.useSession()
    const router = useRouter()
    const [open, setOpen] = useState(false)
    const [loading, setLoading] = useState(false)
    const [name, setName] = useState(user.name)
    const [email, setEmail] = useState(user.email)
    const [photo, setPhoto] = useState<File | null>(null)

    const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (photo && photo.size > 5 * 1024 * 1024) {
            return toast.add({ type: "error", title: "Image must be less than 5MB" })
        }
        try {
            setLoading(true)
            const updated = await updateUser(user._id, { name, email, photo })
            if (updated) {
                toast.add({ type: "success", title: "Profile updated" })
                setOpen(false)
                await refetch()
                router.refresh()
            }
        } catch (err) {
            toast.add({
                title: "Update failed",
                description: err instanceof Error ? err.message : "Something went wrong",
                type: "error",
            })
        } finally {
            setLoading(false)
        }
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger render={<Button variant="outline" className="gap-2" />}>
                <Pencil className="size-4" /> Edit Profile
            </DialogTrigger>
            <DialogContent className="bg-white sm:max-w-md">
                <DialogHeader>
                    <DialogTitle>Edit profile</DialogTitle>
                    <DialogDescription>Update your personal information.</DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="name">Name</Label>
                        <Input id="name" required value={name} onChange={(e) => setName(e.target.value)} />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input id="email" type="email" required value={email} onChange={(e) => setEmail(e.target.value)} />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="photo">Photo</Label>
                        <Input
                            id="photo"
                            type="file"
                            accept="image/*"
                            onChange={(e) => setPhoto(e.target.files?.[0] ?? null)}
                        />
                    </div>
                    <DialogFooter>
                        <Button type="button" variant="ghost" onClick={() => setOpen(false)}>
                            Cancel
                        </Button>
                        <Button type="submit" disabled={loading}>
                            {loading && <Loader2 className="mr-2 size-4 animate-spin" />}
                            Save changes
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}