import CTABanner from "@/components/home/CTA";
import FeaturedCourses from "@/components/home/FeaturedCourses";
import Hero from "@/components/home/Hero";
import Testimonials from "@/components/home/Testimonials";
import WhyChooseUs from "@/components/home/why";

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
