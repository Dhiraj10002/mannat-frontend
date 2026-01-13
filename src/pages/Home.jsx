import Hero from "../components/Home/Hero";
import AboutPreview from "../components/Home/AboutPreview";
import WorkPreview from "../components/Home/WorkPreview";
import TeamSection from "../components/team/TeamSection";
import GalleryPreview from "../components/gallery/GalleryPreview";
import TestimonialsSection from "../components/testimonials/TestimonialsSection";
import DonateCTA from "../components/cta/DonateCTA";
import SEO from "../components/common/SEO"; 




const Home = () => {
  return (
    <>

       <SEO
        title="Helping Communities Grow"
        description="Mannat Foundation is a non-profit organization working in education, welfare, and social awareness to empower communities."
        keywords="NGO, charity, education, welfare, social work"
        url="https://mannatfoundation.org/"
      />

      <Hero />
      <AboutPreview />
      <WorkPreview />
      <TeamSection />
      <GalleryPreview/>
      <TestimonialsSection />
      <DonateCTA />

      

    </>

  );
};

export default Home;
