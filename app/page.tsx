import ScrollToSection from "@/components/ScrollToSection";
import AchievementsSection from "@/components/Achievements";
import ContactSection from "@/components/Contact";
import Footer from "@/components/Footer";
import TeamPhotoSection from "@/components/Group";
import Hero from "@/components/Hero";
import ProcessSection from "@/components/Process";
import ServicesSection from "@/components/Services";
import TeamSection from "@/components/Team";
import TestimonialsSection from "@/components/Testimonials";
import ProjectsSection from "@/components/Works";

export default function HomePage() {
  return (
    <>
      {/* 👇 this enables scroll from other routes */}
      <ScrollToSection />

      <section id="home">
        <Hero />
      </section>

      <section id="projects">
        <ProjectsSection />
      </section>

      <section id="about">
        <TeamSection />
        <ServicesSection />

        <div className="h-[800px] md:h-[1000px] lg:h-[700px]" />

        <div className="relative w-full min-h-screen overflow-hidden">
          <ProcessSection />
        </div>

        <TeamPhotoSection />
      </section>

      <section id="blog">
        <TestimonialsSection />
      </section>

      <section id="contact">
        <ContactSection />
      </section>

      <Footer />
    </>
  );
}
