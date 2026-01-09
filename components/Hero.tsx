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
    // Heading animation
    const headingLines = headingRef.current?.querySelectorAll('.heading-line');
    if (headingLines && headingLines.length > 0) {
      gsap.fromTo(headingLines, 
        {
          y: 50,
          opacity: 0
        },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          stagger: 0.15,
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
        delay: 1,
        ease: "back.out(1.7)"
      }
    );

    // Image animation
    gsap.fromTo(imageRef.current,
      {
        scale: 1.1,
        opacity: 0
      },
      {
        scale: 1,
        opacity: 1,
        duration: 1.5,
        delay: 0.2,
        ease: "power3.out"
      }
    );
  }, []);

  return (
    <section className="relative h-screen w-full overflow-hidden bg-black">
      
      {/* Background Image - Full Screen */}
      <div className="absolute inset-0 z-0">
        <img 
          ref={imageRef}
          src="/hero.png"
          alt="Digital Human"
          className="w-full h-full object-cover object-center opacity-0"
          style={{
            filter: 'brightness(0.6) contrast(1.1)'
          }}
        />
        {/* Gradient overlays for better text readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/80" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-transparent to-black/40" />
      </div>

      {/* Content Container */}
      <div className="relative z-10 h-full flex flex-col justify-between px-6 sm:px-8 md:px-12 lg:px-16 xl:px-24 py-20 sm:py-24">
        
        {/* Top Section - Logo space or empty */}
        <div className="flex-shrink-0" />

        {/* Center Section - Main Heading */}
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center max-w-5xl mx-auto">
            <h1
              ref={headingRef}
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold leading-tight tracking-tight text-white"
              style={{
                textShadow: '0 0 30px rgba(255, 255, 255, 0.4), 0 0 60px rgba(255, 255, 255, 0.2), 0 2px 20px rgba(0, 0, 0, 0.8)'
              }}
            >
              <span className="heading-line block opacity-0 mb-3 sm:mb-4 md:mb-6">
                Designing Systems
              </span>
              <span className="heading-line block opacity-0 text-white/80">
                People Remember
              </span>
            </h1>
          </div>
        </div>

        {/* Bottom Section - CTA Button */}
        <div className="flex-shrink-0 flex justify-center">
          <button 
            onClick={() => scrollToSection("#contact")}
            ref={buttonRef}
            className="group flex items-center gap-3 px-8 sm:px-10 md:px-12 py-3.5 sm:py-4 bg-white text-black border-2 border-white rounded-full hover:bg-transparent hover:text-white transition-all duration-300 text-sm sm:text-base font-semibold uppercase tracking-wider opacity-0"
            style={{
              boxShadow: '0 0 30px rgba(255, 255, 255, 0.4), 0 0 60px rgba(255, 255, 255, 0.2)'
            }}
          >
            <span>Get In Touch</span>
            <div className="w-5 h-5 rounded-full flex items-center justify-center bg-black group-hover:bg-white transition-all duration-300">
              <ArrowUpRight className="w-3 h-3 text-white group-hover:text-black transition-all duration-300 group-hover:rotate-45" />
            </div>
          </button>
        </div>
      </div>
    </section>
  );
}