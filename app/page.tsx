import Banner from "@/components/banner/Banner";
import { BecomeTutor } from "@/components/BecomeTutor/BecomeTutor";
import { HowItWorks } from "@/components/howitworks/HowItWorks";
import LatestTutions from "@/components/latestTutions/LatestTutions";
import { PopularSubjects } from "@/components/popularSubjects/PopularSubjects";
import { PricingSection } from "@/components/pricingSection/PricingSection";
import { Review } from "@/components/review/Review";


export default function Page() {
  return (
    <>
      <Banner />
      <LatestTutions />
      <PricingSection />
      <HowItWorks />
      <PopularSubjects />
      <Review />
      <BecomeTutor />
    </>
  )
}
