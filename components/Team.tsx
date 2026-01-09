"use client"
import React, { useEffect, useRef } from 'react';
import { ArrowRight, ArrowDown } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { scrollToSection } from "@/lib/scrollToSection";

gsap.registerPlugin(ScrollTrigger);

export default function TeamSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const labelRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const imagesGridRef = useRef<HTMLDivElement>(null);
  const overlayContentRef = useRef<HTMLDivElement>(null);
  const scrollArrowRef = useRef<HTMLButtonElement>(null);

  const teamImages = [
    "/team/tanmay.png",
    "/team/arijit.png",
    "/team/shweta.png",
    "/team/janjyoti.png",
    "/team/spandan.png"
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(labelRef.current,
        {
          x: -50,
          opacity: 0
        },
        {
          x: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            toggleActions: "play none none none"
          }
        }
      );

      gsap.fromTo(headingRef.current,
        {
          y: 50,
          opacity: 0
        },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          delay: 0.3,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            toggleActions: "play none none none"
          }
        }
      );

      const imageCards = imagesGridRef.current?.querySelectorAll('.team-image');
      if (imageCards && imageCards.length > 0) {
        gsap.fromTo(imageCards,
          {
            y: 80,
            opacity: 0
          },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            stagger: 0.12,
            ease: "power3.out",
            scrollTrigger: {
              trigger: imagesGridRef.current,
              start: "top 85%",
              toggleActions: "play none none none"
            }
          }
        );
      }

      gsap.fromTo(overlayContentRef.current,
        {
          scale: 0.8,
          opacity: 0
        },
        {
          scale: 1,
          opacity: 1,
          duration: 1,
          delay: 0.6,
          ease: "back.out(1.4)",
          scrollTrigger: {
            trigger: imagesGridRef.current,
            start: "top 85%",
            toggleActions: "play none none none"
          }
        }
      );

      gsap.fromTo(scrollArrowRef.current,
        {
          y: 30,
          opacity: 0
        },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          ease: "power2.out",
          scrollTrigger: {
            trigger: scrollArrowRef.current,
            start: "top 95%",
            toggleActions: "play none none none"
          }
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="py-20 md:py-32 px-6 md:px-12 lg:px-16">
      <div className="max-w-[1600px] mx-auto">
        
        <div ref={labelRef} className="flex items-center justify-center gap-2 mb-12 opacity-0">
          <div className="w-2 h-2 bg-black rounded-full"></div>
          <span className="text-xs md:text-sm uppercase tracking-[0.2em] text-gray-600 font-medium">
            WHO ARE WE?
          </span>
        </div>

        <div className="mb-16">
          <h2 ref={headingRef} className="text-slate-900 text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-light leading-relaxed text-center max-w-6xl mx-auto opacity-0">
           We're a young digital agency working at the edge of today's landscape.
We combine bold ideas with lasting quality—agile, focused, and driven by progress.
Growth and learning shape everything we build.
          </h2>
        </div>

        <div className="relative mb-20">
          <div ref={imagesGridRef} className="grid grid-cols-2 md:grid-cols-5 gap-4 md:gap-6">
            {teamImages.map((image, index) => (
              <div 
                key={index} 
                className="team-image relative aspect-[3/4] overflow-hidden rounded-lg group opacity-0"
              >
                <img 
                  src={image} 
                  alt={`Team member ${index + 1}`}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors duration-500"></div>
              </div>
            ))}
          </div>

          {/* Overlay content */}
          <div ref={overlayContentRef} className="absolute inset-0 flex flex-col items-center justify-between py-8 md:py-12 pointer-events-none opacity-0">
            <h3 className="text-white text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold drop-shadow-2xl">
              The Team
            </h3>
            
            <button 
            onClick={() => scrollToSection("#contact")}
            className="pointer-events-auto group flex items-center gap-3 px-8 py-4 bg-white text-black rounded-full hover:bg-black hover:text-white transition-all duration-300 shadow-2xl">
              <span className="text-sm md:text-base font-medium uppercase tracking-wider">
                MEET US
              </span>
              <div className="w-6 h-6 bg-black group-hover:bg-white rounded-full flex items-center justify-center transition-colors duration-300">
                <ArrowRight className="w-4 h-4 text-white group-hover:text-black transition-all duration-300" />
              </div>
            </button>
          </div>
        </div>

        <div className="flex justify-center">
          <button 
            ref={scrollArrowRef}
            className="w-14 h-14 bg-black rounded-full flex items-center justify-center hover:bg-gray-800 transition-colors duration-300 animate-bounce opacity-0"
            aria-label="Scroll down"
          >
            <ArrowDown className="w-6 h-6 text-white" />
          </button>
        </div>
      </div>
    </section>
  );
}