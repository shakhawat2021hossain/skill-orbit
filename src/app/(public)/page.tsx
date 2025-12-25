import CTABanner from "@/components/modules/home/CTA";
import FeaturedCourses from "@/components/modules/home/FeaturedCourses";
import Hero from "@/components/modules/home/Hero";
import Testimonials from "@/components/modules/home/Testimonials";
import WhyChooseUs from "@/components/modules/home/why";

export default function Home() {
  return (
    <div className="">
      <Hero/>
      {/* <FeaturedCourses/> */}
      <Testimonials/>
      <WhyChooseUs/>
      <CTABanner/>
      
    </div>
  );
}
