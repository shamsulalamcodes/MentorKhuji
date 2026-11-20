import { HowItWorksPage } from '@/components/howitworks/HowItWorks';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: "About | MentorLagbe",
    description: "MentorLagbe About.",
};

const About = () => {
    return (
        <div>
            <HowItWorksPage />
        </div>
    );
};

export default About;