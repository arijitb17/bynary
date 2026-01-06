"use client";

import { ArrowDown, ArrowRight } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function ProcessSection() {
  const [mounted, setMounted] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const labelRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const descriptionRef = useRef<HTMLParagraphElement>(null);
  const dividerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  const steps = [
    {
      number: 1,
      title: "Discovery Call",
      description: "We start with a conversation to understand your vision, goals, and project requirements.",
      image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=600&q=80"
    },
    {
      number: 2,
      title: "Research & Insights",
      description: "Our team gathers data and defines a strategy for impactful design decisions.",
      image: "https://images.unsplash.com/photo-1559028012-481c04fa702d?w=600&q=80"
    },
    {
      number: 3,
      title: "Concept & Design",
      description: "We craft high-quality visuals and branding elements that align with your objectives.",
      image: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=600&q=80"
    },
    {
      number: 4,
      title: "Refinement",
      description: "You review the designs, provide feedback, and we fine-tune everything for a perfect result.",
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&q=80"
    },
    {
      number: 5,
      title: "Finalization & Delivery",
      description: "Once approved, we finalize the assets and ensure a seamless implementation.",
      image: "https://images.unsplash.com/photo-1556761175-4b46a572b786?w=600&q=80"
    }
  ];

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted || typeof window === 'undefined') return;

    const ctx = gsap.context(() => {
      // Set initial states
      gsap.set([labelRef.current, headingRef.current, descriptionRef.current, dividerRef.current], {
        opacity: 0,
        y: 30
      });

      gsap.set(cardsRef.current, {
        opacity: 0,
        y: 60
      });

      // Create timeline for scroll trigger
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
          end: 'top 20%',
          toggleActions: 'play none none none'
        }
      });

      // Animate header elements
      tl.to(labelRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: 'power3.out'
      })
      .to(headingRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: 'power3.out'
      }, '-=0.4')
      .to(descriptionRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: 'power3.out'
      }, '-=0.5')
      .to(dividerRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.4,
        ease: 'power2.out'
      }, '-=0.3');

      // Animate cards with stagger
      tl.to(cardsRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: 'power3.out'
      }, '-=0.2');

    }, sectionRef);

    return () => ctx.revert();
  }, [mounted]);

  const setCardRef = (index: number) => (el: HTMLDivElement | null) => {
    cardsRef.current[index] = el;
  };

  if (!mounted) {
    return null;
  }

  return (
    <section ref={sectionRef} className="bg-white py-20 md:py-32 px-6 md:px-12 lg:px-16">
      <div className="max-w-[1600px] mx-auto">
        
        {/* Section Label */}
        <div ref={labelRef} className="flex items-center justify-center gap-2 mb-8">
          <div className="w-2 h-2 bg-black rounded-full"></div>
          <span className="text-xs md:text-sm uppercase tracking-[0.2em] text-gray-600 font-medium">
            HOW WE WORK
          </span>
        </div>

        {/* Heading with Numbers */}
        <div ref={headingRef} className="relative flex items-start justify-between mb-8">
          <span className="text-sm md:text-base text-gray-400 font-light absolute left-0 top-0">
            [03]
          </span>
          
          <div className="flex-1 text-center">
            <h2 className="text-slate-900 text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-light mb-6">
              Process
            </h2>
          </div>

          <span className="text-sm md:text-base text-gray-400 font-light absolute right-0 top-0">
            ©2025
          </span>
        </div>

        {/* Description */}
        <p ref={descriptionRef} className="text-center text-base md:text-lg text-gray-600 leading-relaxed max-w-3xl mx-auto mb-16">
          Our structured approach ensures a smooth briefing and a fast, focused start to every collaboration, allowing us to align quickly and move forward with clarity and confidence.
        </p>

        {/* Horizontal Divider */}
        <div ref={dividerRef} className="w-full h-px bg-gray-200 mb-16"></div>

        {/* Process Steps - All in One Line on Desktop */}
        <div className="relative mb-16">
          <div className="overflow-x-auto pb-4 -mx-6 px-6 lg:mx-0 lg:px-0 scrollbar-hide">
            <div className="flex gap-6 lg:grid lg:grid-cols-5 lg:gap-6">
              {steps.map((step, index) => (
                <div 
                  key={step.number}
                  ref={setCardRef(index)}
                  className="flex-shrink-0 w-[280px] lg:w-auto group"
                >
                  {/* Image */}
                  <div className="relative aspect-[3/4] overflow-hidden rounded-lg mb-6 bg-gray-100">
                    <img 
                      src={step.image} 
                      alt={step.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition-colors duration-500"></div>
                  </div>

                  {/* Number Badge */}
                  <div className="w-10 h-10 rounded-full border-2 border-gray-300 flex items-center justify-center mb-4">
                    <span className="text-gray-400 text-base font-medium">{step.number}</span>
                  </div>

                  {/* Title */}
                  <h3 className="text-slate-900 text-xl md:text-2xl font-semibold mb-3">
                    {step.title}
                  </h3>

                  {/* Description */}
                  <p className="text-sm md:text-base text-gray-600 leading-relaxed">
                    {step.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Scroll Arrow (visible on mobile/tablet only) */}
          <div className="absolute top-1/3 -right-4 lg:hidden">
            <div className="w-10 h-10 bg-black rounded-full flex items-center justify-center shadow-lg animate-pulse">
              <ArrowRight className="w-5 h-5 text-white" />
            </div>
          </div>
        </div>

        {/* Bottom Arrow */}
        <div className="flex justify-center">
          <button 
            className="w-14 h-14 bg-black rounded-full flex items-center justify-center hover:bg-gray-800 transition-colors duration-300 animate-bounce"
            aria-label="Scroll down"
          >
            <ArrowDown className="w-6 h-6 text-white" />
          </button>
        </div>
      </div>
    </section>
  );
}