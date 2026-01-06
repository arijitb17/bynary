"use client";

import React, { useEffect, useRef, useState } from 'react';
import { Mail, MapPin } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { scrollToSection } from "@/lib/scrollToSection";


if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function Footer() {
  const [mounted, setMounted] = useState(false);
  const footerRef = useRef<HTMLElement>(null);
  const columnsRef = useRef<(HTMLDivElement | null)[]>([]);
  const logoRef = useRef<HTMLHeadingElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted || typeof window === 'undefined') return;

    const ctx = gsap.context(() => {
      // Set initial states
      gsap.set(columnsRef.current, {
        opacity: 0,
        y: 40
      });

      gsap.set(logoRef.current, {
        opacity: 0,
        y: 60,
        scale: 0.9
      });

      gsap.set(bottomRef.current, {
        opacity: 0,
        y: 20
      });

      // Create timeline for scroll trigger
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: footerRef.current,
          start: 'top 80%',
          end: 'top 20%',
          toggleActions: 'play none none none'
        }
      });

      // Animate columns with stagger
      tl.to(columnsRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: 'power3.out'
      })
      // Animate logo
      .to(logoRef.current, {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 1,
        ease: 'power3.out'
      }, '-=0.4')
      // Animate bottom section
      .to(bottomRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: 'power2.out'
      }, '-=0.5');

    }, footerRef);

    return () => ctx.revert();
  }, [mounted]);

  const setColumnRef = (index: number) => (el: HTMLDivElement | null) => {
    columnsRef.current[index] = el;
  };

  if (!mounted) {
    return null;
  }

  return (
    <footer ref={footerRef} className="bg-[#F5F5F5] pt-20 pb-12 px-6 md:px-12 lg:px-16">
      <div className="max-w-[1600px] mx-auto">
        
        {/* Top Section - Info Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 mb-20">
          
          {/* Get in Touch */}
          <div ref={setColumnRef(0)} className="text-center md:text-left">
            <h3 className="text-xs uppercase tracking-[0.2em] text-gray-500 mb-6 font-medium">
              Get in Touch
            </h3>
            <div className="space-y-4">
              <a 
                href="mailto:bynary.in@gmail.com" 
                className="text-gray-600 flex items-center justify-center md:justify-start gap-2 text-lg md:text-xl font-medium hover:opacity-60 transition-opacity group"
              >
                <Mail className="w-5 h-5" />
                <span>bynary.in@gmail.com</span>
              </a>
            </div>
          </div>

          {/* Our Address */}
          <div ref={setColumnRef(1)} className="text-center md:text-left">
            <h3 className="text-xs uppercase tracking-[0.2em] text-gray-500 mb-6 font-medium">
              Our Address
            </h3>
            <div className="space-y-2 text-base md:text-lg">
              <div className="flex items-center justify-center md:justify-start gap-2 text-gray-600">
                <MapPin className="w-5 h-5" />
                <span>Guwahati, Assam</span>
              </div>

              <p className="text-gray-600">India</p>
            </div>
          </div>

          {/* Follow us */}
          <div ref={setColumnRef(2)} className="text-center md:text-left">
            <h3 className="text-xs uppercase tracking-[0.2em] text-gray-500 mb-6 font-medium">
              Follow us
            </h3>
            <div className="space-y-3">
              <a 
                href="https://www.instagram.com/bynary.in/" 
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 block text-base md:text-lg hover:opacity-60 transition-opacity"
              >
                Instagram
              </a>
              <a 
                href="https://www.linkedin.com/in/bynary-in-b9a33839b/" 
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 block text-base md:text-lg hover:opacity-60 transition-opacity"
              >
                LinkedIn
              </a>
            </div>
          </div>

          {/* Menu */}
          <div ref={setColumnRef(3)} className="text-center md:text-left">
            <h3 className="text-xs uppercase tracking-[0.2em] text-gray-500 mb-6 font-medium">
              Menu
            </h3>
            <div className="space-y-3">
              <button
                onClick={() => scrollToSection("#home")}
                className="text-gray-600 block w-full text-base md:text-lg hover:opacity-60 transition-opacity"
              >
                Home
              </button>

              <button
                onClick={() => scrollToSection("#projects")}
                className="text-gray-600 block w-full text-base md:text-lg hover:opacity-60 transition-opacity"
              >
                Projects
              </button>

              <button
                onClick={() => scrollToSection("#about")}
                className="text-gray-600 block w-full text-base md:text-lg hover:opacity-60 transition-opacity"
              >
                About
              </button>

              <button
                onClick={() => scrollToSection("#blog")}
                className="text-gray-600 block w-full text-base md:text-lg hover:opacity-60 transition-opacity"
              >
                Blog
              </button>

              <button
                onClick={() => scrollToSection("#contact")}
                className="text-gray-600 block w-full text-base md:text-lg hover:opacity-60 transition-opacity"
              >
                Contact
              </button>
            </div>
          </div>
        </div>

        {/* Large Logo */}
        <div className="mb-12 overflow-hidden text-center">
          <h2 
            ref={logoRef}
            className="text-gray-400 text-[15vw] md:text-[12vw] lg:text-[10vw] font-bold leading-none tracking-tight"
          >
            BYNARY
          </h2>
        </div>

        {/* Bottom Section */}
        <div 
          ref={bottomRef}
          className="flex flex-col md:flex-row justify-between items-center gap-4 pt-8 border-t border-gray-300 text-center md:text-left"
        >
          <p className="text-sm text-gray-600">
            © 2026 BYNARY. All rights reserved.
          </p>
          <div className="flex gap-6 text-sm text-gray-600">
            <a href="/privacy" className="text-slate-900 hover:text-black transition-colors">
              Privacy Policy
            </a>
            <a href="/terms" className="text-slate-900 hover:text-black transition-colors">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}