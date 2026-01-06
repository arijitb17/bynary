"use client"
import React, { useEffect, useRef } from 'react';
import { ArrowUpRight } from 'lucide-react';
import gsap from 'gsap';
import { scrollToSection } from "@/lib/scrollToSection";

export default function HeroSection() {
  const headingRef = useRef<HTMLHeadingElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    // Main heading animation - split lines
    const headingLines = headingRef.current?.querySelectorAll('.heading-line');
    if (headingLines && headingLines.length > 0) {
      gsap.fromTo(headingLines, 
        {
          y: 100,
          opacity: 0
        },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          stagger: 0.2,
          delay: 0.3,
          ease: "power3.out"
        }
      );
    }

    // Button animation
    gsap.fromTo(buttonRef.current,
      {
        scale: 0,
        opacity: 0
      },
      {
        scale: 1,
        opacity: 1,
        duration: 0.6,
        delay: 0.9,
        ease: "back.out(1.7)"
      }
    );

    // Image animation - slide in from right and fade in
    gsap.fromTo(imageRef.current,
      {
        x: 200,
        opacity: 0
      },
      {
        x: 0,
        opacity: 1,
        duration: 1.2,
        delay: 0.5,
        ease: "power3.out"
      }
    );
  }, []);

  return (
    <section className="relative h-screen w-full overflow-hidden bg-black">
      {/* Content Container */}
      <div className="relative z-10 h-full flex flex-col justify-end px-8 md:px-16 lg:px-24">
        
        {/* Main Content */}
        <div className="flex flex-col lg:flex-row items-end justify-between gap-8 w-full">
          
          {/* Left Side - Main Heading and CTA */}
          <div className="flex-1 overflow-hidden pb-20 max-w-4xl">
            <div className="max-w-[900px]">
  <h1
    ref={headingRef}
    className="
      text-5xl md:text-6xl lg:text-7xl xl:text-8xl
      font-bold
      leading-[1.15]
      tracking-[-0.02em]
      text-white
      mb-20
    "
  >
    <span className="heading-line block opacity-0 pb-10">
      Designing Systems
    </span>

    <span className="heading-line block opacity-0 text-white/70">
      People Remember
    </span>
  </h1>
</div>


            
            <button 
              onClick={() => scrollToSection("#contact")}
              ref={buttonRef}
              className="group flex items-center gap-3 px-10 py-4 bg-white text-black border-2 border-white rounded-full hover:bg-transparent hover:text-white transition-all duration-300 text-base font-semibold uppercase tracking-wider opacity-0"
            >
              <span>Get In Touch</span>
              <div className="w-5 h-5 rounded-full flex items-center justify-center bg-black group-hover:bg-white transition-all duration-300">
                <ArrowUpRight className="w-3 h-3 text-white group-hover:text-black transition-all duration-300 group-hover:rotate-45" />
              </div>
            </button>
          </div>

          {/* Right Side - Static Image */}
          <div className="flex items-end justify-end h-full absolute right-0 bottom-0">
            <div className="relative w-full max-w-[550px] h-[750px]">
              <img 
                ref={imageRef}
                src="/hero.png"
                alt="Digital Eye"
                className="w-full h-full object-contain object-bottom mix-blend-screen brightness-110 contrast-125 opacity-0"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Animated Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-black via-blue-950/20 to-black pointer-events-none"></div>
    </section>
  );
}