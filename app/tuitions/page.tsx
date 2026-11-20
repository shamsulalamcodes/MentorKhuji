import TuitionCard from "@/components/latestTutions/TutionCard";
import { getAllTutions } from "@/lib/api";
import { Tuition } from "@/lib/type";
import SearchForTutions from "./SearchForTutions";

const Tutions = async () => {
    const salst: Tuition[] = await getAllTutions()

    return (
        <div className="mx-auto w-full py-10">
            <div className="mx-auto max-w-2xl text-center">
                <h2
                    id="latest-tuitions-heading"
                    className="mt-3 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl dark:text-white"
                >
                    Browse All Tuitions
                </h2>
                <p className="mt-2 max-w-xl text-sm leading-6 text-slate-600 sm:text-base dark:text-slate-300 mx-auto">
                    Explore all the tuition opportunities from verified tutors and
                    find the right fit for your learning goals.
                </p>
            </div>

            <div className="w-1/2 mx-auto">
                <SearchForTutions />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 justify-between items-center gap-5 p-5">
                {
                    salst.map(sl => <TuitionCard key={sl._id} tuition={sl} />)
                }
            </div>
        </div>
    );
};

export default Tutions;