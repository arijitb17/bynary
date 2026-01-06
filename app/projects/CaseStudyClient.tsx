"use client"
import { notFound } from "next/navigation";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import projects from "@/data/projects.json";

gsap.registerPlugin(ScrollTrigger);

type CaseStudyClientProps = {
  slug: string;
};

export default function CaseStudyClient({ slug }: CaseStudyClientProps) {
  const heroRef = useRef<HTMLDivElement>(null);
  const heroTextRef = useRef<HTMLDivElement>(null);
  const heroImageRef = useRef<HTMLDivElement>(null);
  const infoBarRef = useRef<HTMLElement>(null);
  const summaryRef = useRef<HTMLElement>(null);
  const contextRef = useRef<HTMLElement>(null);
  const challengeRef = useRef<HTMLElement>(null);
  const approachRef = useRef<HTMLElement>(null);
  const solutionRef = useRef<HTMLElement>(null);
  const technicalRef = useRef<HTMLElement>(null);
  const resultsRef = useRef<HTMLElement>(null);
  const testimonialRef = useRef<HTMLElement>(null);
  const ctaRef = useRef<HTMLElement>(null);


  const project = projects.find((p) => p.slug === slug);

  if (!project) {
    notFound();
  }
  const handleClick = () => {
    sessionStorage.setItem("scrollTo", "contact");
    window.location.href = "/"; 
  };
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero Section
      gsap.fromTo(heroTextRef.current,
        { x: -100, opacity: 0 },
        { x: 0, opacity: 1, duration: 1, ease: "power3.out" }
      );

      gsap.fromTo(heroImageRef.current,
        { x: 100, opacity: 0 },
        { x: 0, opacity: 1, duration: 1, delay: 0.3, ease: "power3.out" }
      );

      // Info Bar
      const infoItems = infoBarRef.current?.querySelectorAll('.info-item');
      if (infoItems) {
        gsap.fromTo(infoItems,
          { y: 30, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.6,
            stagger: 0.1,
            scrollTrigger: {
              trigger: infoBarRef.current,
              start: "top 80%",
              toggleActions: "play none none none"
            }
          }
        );
      }

      // Summary Section
      gsap.fromTo(summaryRef.current,
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          scrollTrigger: {
            trigger: summaryRef.current,
            start: "top 80%",
            toggleActions: "play none none none"
          }
        }
      );

      // Context Section
      gsap.fromTo(contextRef.current,
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          scrollTrigger: {
            trigger: contextRef.current,
            start: "top 80%",
            toggleActions: "play none none none"
          }
        }
      );

      // Challenge Section
      gsap.fromTo(challengeRef.current,
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          scrollTrigger: {
            trigger: challengeRef.current,
            start: "top 80%",
            toggleActions: "play none none none"
          }
        }
      );

      // Approach Items
      const approachItems = approachRef.current?.querySelectorAll('.approach-item');
      if (approachItems) {
        gsap.fromTo(approachItems,
          { x: -50, opacity: 0 },
          {
            x: 0,
            opacity: 1,
            duration: 0.6,
            stagger: 0.2,
            scrollTrigger: {
              trigger: approachRef.current,
              start: "top 80%",
              toggleActions: "play none none none"
            }
          }
        );
      }

      // Solution Section
      gsap.fromTo(solutionRef.current,
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          scrollTrigger: {
            trigger: solutionRef.current,
            start: "top 80%",
            toggleActions: "play none none none"
          }
        }
      );

      // Technical Items
      const techItems = technicalRef.current?.querySelectorAll('.tech-item');
      if (techItems) {
        gsap.fromTo(techItems,
          { x: -30, opacity: 0 },
          {
            x: 0,
            opacity: 1,
            duration: 0.5,
            stagger: 0.1,
            scrollTrigger: {
              trigger: technicalRef.current,
              start: "top 80%",
              toggleActions: "play none none none"
            }
          }
        );
      }

      // Metrics
      const metrics = resultsRef.current?.querySelectorAll('.metric-item');
      if (metrics) {
        gsap.fromTo(metrics,
          { scale: 0, opacity: 0 },
          {
            scale: 1,
            opacity: 1,
            duration: 0.6,
            stagger: 0.1,
            ease: "back.out(1.7)",
            scrollTrigger: {
              trigger: resultsRef.current,
              start: "top 80%",
              toggleActions: "play none none none"
            }
          }
        );
      }

      // Results Items
      const resultItems = resultsRef.current?.querySelectorAll('.result-item');
      if (resultItems) {
        gsap.fromTo(resultItems,
          { y: 30, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.6,
            stagger: 0.1,
            scrollTrigger: {
              trigger: resultItems[0],
              start: "top 85%",
              toggleActions: "play none none none"
            }
          }
        );
      }

      // Testimonial
      gsap.fromTo(testimonialRef.current,
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          scrollTrigger: {
            trigger: testimonialRef.current,
            start: "top 80%",
            toggleActions: "play none none none"
          }
        }
      );

      // CTA
      gsap.fromTo(ctaRef.current,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          scrollTrigger: {
            trigger: ctaRef.current,
            start: "top 85%",
            toggleActions: "play none none none"
          }
        }
      );
    });

    return () => ctx.revert();
  }, []);

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section ref={heroRef} className="relative bg-white px-6 md:px-12 lg:px-24 py-20 md:py-32">
        <div className="max-w-[1400px] mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div ref={heroTextRef} className="opacity-0">
              <div className="inline-block px-4 py-2 bg-black text-white text-sm uppercase tracking-wider mb-6 rounded">
                Case Study
              </div>
              <h1 className="text-5xl md:text-7xl font-bold text-gray-900 leading-tight mb-6">
                {project.title}
              </h1>
              <p className="text-xl text-gray-600 leading-relaxed mb-8">
                {project.shortDescription}
              </p>
              <div className="flex flex-wrap gap-3">
                {project.services.map((service, i) => (
                  <span key={i} className="px-4 py-2 bg-gray-50 border border-gray-200 rounded-full text-sm text-gray-700">
                    {service}
                  </span>
                ))}
              </div>
            </div>
            <div ref={heroImageRef} className="relative opacity-0">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-2xl transform rotate-3"></div>
              <img
                src={project.image}
                alt={project.title}
                className="relative rounded-2xl shadow-2xl w-full"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Project Info Bar */}
      <section ref={infoBarRef} className="border-y border-gray-200 bg-white">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-24 py-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="info-item opacity-0">
              <div className="text-sm text-gray-500 uppercase tracking-wider mb-2">Client</div>
              <div className="text-lg font-semibold text-gray-900">{project.client}</div>
            </div>
            <div className="info-item opacity-0">
              <div className="text-sm text-gray-500 uppercase tracking-wider mb-2">Industry</div>
              <div className="text-lg font-semibold text-gray-900">{project.industry}</div>
            </div>
            <div className="info-item opacity-0">
              <div className="text-sm text-gray-500 uppercase tracking-wider mb-2">Duration</div>
              <div className="text-lg font-semibold text-gray-900">{project.duration}</div>
            </div>
            <div className="info-item opacity-0">
              <div className="text-sm text-gray-500 uppercase tracking-wider mb-2">Technologies</div>
              <div className="text-lg font-semibold text-gray-900">{project.technologies.slice(0, 2).join(", ")}</div>
            </div>
          </div>
        </div>
      </section>

      {/* Executive Summary */}
      <section ref={summaryRef} className="px-6 md:px-12 lg:px-24 py-20 opacity-0">
        <div className="max-w-[900px] mx-auto">
          <h2 className="text-4xl font-bold text-gray-900 mb-8">Executive Summary</h2>
          <p className="text-xl text-gray-700 leading-relaxed">
            {project.overview}
          </p>
        </div>
      </section>

      {/* Business Context */}
      <section ref={contextRef} className="bg-gray-50 px-6 md:px-12 lg:px-24 py-20 opacity-0">
        <div className="max-w-[900px] mx-auto">
          <h2 className="text-4xl font-bold text-gray-900 mb-8">Business Context</h2>
          <p className="text-lg text-gray-700 leading-relaxed">
            {project.businessContext}
          </p>
        </div>
      </section>

      {/* The Challenge */}
      <section ref={challengeRef} className="px-6 md:px-12 lg:px-24 py-20 opacity-0">
        <div className="max-w-[900px] mx-auto">
          <h2 className="text-4xl font-bold text-gray-900 mb-8">The Challenge</h2>
          <p className="text-lg text-gray-700 leading-relaxed">
            {project.challenge}
          </p>
        </div>
      </section>

      {/* Strategic Approach */}
      <section ref={approachRef} className="bg-gray-50 px-6 md:px-12 lg:px-24 py-20">
        <div className="max-w-[900px] mx-auto">
          <h2 className="text-4xl font-bold text-gray-900 mb-12">Strategic Approach</h2>
          <div className="space-y-6">
            {project.strategicApproach.map((item, i) => (
              <div key={i} className="approach-item flex gap-6 items-start opacity-0">
                <div className="flex-shrink-0 w-10 h-10 bg-black text-white rounded-full flex items-center justify-center font-bold">
                  {i + 1}
                </div>
                <p className="text-lg text-gray-700 leading-relaxed pt-1">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Solution */}
      <section ref={solutionRef} className="px-6 md:px-12 lg:px-24 py-20 opacity-0">
        <div className="max-w-[900px] mx-auto">
          <h2 className="text-4xl font-bold text-gray-900 mb-8">Our Solution</h2>
          <p className="text-lg text-gray-700 leading-relaxed mb-12">
            {project.solution}
          </p>

          <h3 className="text-2xl font-bold text-gray-900 mb-6">Key Features Delivered</h3>
          <div className="grid md:grid-cols-2 gap-4">
            {project.keyFeatures.map((feature, i) => (
              <div key={i} className="flex gap-3 items-start p-4 bg-gray-50 rounded-lg">
                <svg className="flex-shrink-0 w-6 h-6 text-green-600 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-gray-700">{feature}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Technical Implementation */}
      <section ref={technicalRef} className="bg-soft-black text-white px-6 md:px-12 lg:px-24 py-20">
        <div className="max-w-[900px] mx-auto">
          <h2 className="text-4xl font-bold mb-8">Technical Implementation</h2>
          <div className="space-y-4">
            {project.technicalImplementation.map((item, i) => (
              <div key={i} className="tech-item flex gap-4 items-start opacity-0">
                <div className="flex-shrink-0 w-2 h-2 bg-soft-white rounded-full mt-2"></div>
                <p className="text-gray-300 leading-relaxed">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Results & Impact */}
      <section ref={resultsRef} className="px-6 md:px-12 lg:px-24 py-20">
        <div className="max-w-[1200px] mx-auto">
          <h2 className="text-4xl font-bold text-gray-900 mb-12 text-center">Results & Impact</h2>
          
          {/* Metrics Grid */}
          <div className="grid md:grid-cols-4 gap-8 mb-16">
            {project.metrics.map((metric, i) => (
              <div key={i} className="metric-item text-center p-6 bg-gray-50 rounded-xl opacity-0">
                <div className="text-3xl font-bold text-gray-900 mb-2">{metric.value}</div>
                <div className="text-sm text-gray-600 uppercase tracking-wider">{metric.label}</div>
              </div>
            ))}
          </div>

          {/* Results List */}
          <div className="space-y-4">
            {project.results.map((result, i) => (
              <div key={i} className="result-item flex gap-4 items-start p-6 bg-white border border-gray-200 rounded-lg hover:shadow-lg transition-shadow opacity-0">
                <svg className="flex-shrink-0 w-6 h-6 text-green-600 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <p className="text-gray-700 leading-relaxed">{result}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Client Testimonial */}
      <section ref={testimonialRef} className="bg-soft-black text-white px-6 md:px-12 lg:px-24 py-20 opacity-0">
        <div className="max-w-[900px] mx-auto text-center">
          <svg className="w-16 h-16 mx-auto mb-8 text-soft-white opacity-50" fill="currentColor" viewBox="0 0 24 24">
            <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
          </svg>
          <blockquote className="text-2xl md:text-3xl font-light leading-relaxed mb-8">
            "{project.clientTestimonial.quote}"
          </blockquote>
          <div className="text-lg">
            <div className="font-semibold">{project.clientTestimonial.author}</div>
            <div className="text-gray-400">{project.clientTestimonial.position}</div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section ref={ctaRef} className="px-6 md:px-12 lg:px-24 py-20 bg-white opacity-0">
        <div className="max-w-[900px] mx-auto text-center">
          <h2 className="text-4xl font-bold text-gray-900 mb-6">Ready to Transform Your Business?</h2>
          <p className="text-xl text-gray-600 mb-8">
            Let's discuss how we can help you achieve similar results for your project.
          </p>
          <button
  onClick={handleClick}

  className="inline-block px-8 py-4 bg-black text-white rounded-lg text-lg font-semibold
             hover:bg-white hover:text-black transition-colors border border-black"
>
  Start Your Project
</button>

        </div>
      </section>
    </div>
  );
}