import { getSingleTution } from '@/lib/api';
import { SingleTuition } from '@/lib/type';
import { TuitionDetails } from './TuitionDetails';

const TuitionDetailsCard = async ({ params }: { params: Promise<{ id: string }> }) => {
    const { id } = await params
    const data: SingleTuition = await getSingleTution(id)

    return (
        <div>
            <TuitionDetails tuition={data} />
        </div>
    );
};

export default TuitionDetailsCard;
