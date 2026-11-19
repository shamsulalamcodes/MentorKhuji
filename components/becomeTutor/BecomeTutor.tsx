import Image from "next/image";
import Link from "next/link";
import { Star } from "lucide-react";
import { Button } from "@/components/ui/button";

// Photo: "Elderly man teaching young boy math at desk" by Vitaly Gariev on Unsplash (Unsplash License)
// https://unsplash.com/photos/elderly-man-teaching-young-boy-math-at-desk-bY6KnLOxp2Y
const PHOTO = "https://images.unsplash.com/photo-1758687126375-e2c1683219e9?q=80&w=1332&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=NHwxMjA3fDA%3D";

export function BecomeTutor() {
    return (
        <section className="mx-auto w-full max-w-6xl px-4 py-12 sm:px-6">
            <div className="relative">
                {/* Photo */}
                <div className="relative h-[380px] w-full overflow-hidden rounded-[2rem] bg-slate-200 sm:h-[480px] md:h-[560px] md:rounded-[2.5rem]">
                    <Image
                        src={PHOTO}
                        alt="A tutor teaching a student at a desk"
                        fill
                        sizes="(min-width: 1152px) 1152px, 100vw"
                        className="object-cover object-left"
                    />
                </div>

                {/* Peach card: overlaps the photo on desktop, sits below it on mobile */}
                <div className="relative -mt-20 mx-4 rounded-[2rem] bg-[#FFD9C7] p-6 shadow-lg sm:mx-8 sm:p-8 md:absolute md:bottom-10 md:right-10 md:mx-0 md:mt-0 md:w-[480px] md:shadow-none">
                    <h2 className="text-3xl font-bold leading-tight tracking-tight text-slate-900 sm:text-4xl">
                        You can become
                        <br />a great tutor too!
                    </h2>
                    <p className="mt-4 text-base font-medium leading-relaxed text-slate-800">
                        Share your knowledge, post your tuition batches and become your own
                        boss.
                    </p>
                    <Button
                        className="mt-6 h-14 w-full rounded-full bg-slate-900 text-base font-semibold shadow-none hover:bg-slate-800"
                    >
                        <Link href="/signUp">
                            Find out more
                            <Star className="size-5" />
                        </Link>
                    </Button>
                </div>
            </div>
        </section>
    );
}