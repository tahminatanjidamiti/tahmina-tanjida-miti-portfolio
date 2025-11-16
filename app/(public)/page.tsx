import FeaturedPosts from "@/components/modules/Home/FeaturedPosts";
import Hero from "@/components/modules/Home/Hero";
import Projects from "@/components/modules/Home/Projects/Projects";
import AboutMe from "./about/page";
import Contact from "./contact/page";



export default function HomePage() {
  return (
    <div>
      <Hero/>
      <FeaturedPosts/>
      <Projects/>
      <AboutMe/>
      <Contact/>
    </div>
  );
}
