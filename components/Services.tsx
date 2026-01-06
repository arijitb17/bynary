"use client";

import React, { useRef, useEffect, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import servicesData from "@/data/services.json"

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function ServicesSection() {
  const [mounted, setMounted] = useState(false);
  const serviceRefs = useRef<(HTMLDivElement | null)[]>([]);
  const scrollTriggersRef = useRef<ScrollTrigger[]>([]);

  

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted || typeof window === 'undefined') return;

    const setupScrollTriggers = () => {
      scrollTriggersRef.current.forEach(trigger => {
        if (trigger) trigger.kill();
      });
      scrollTriggersRef.current = [];

      serviceRefs.current.forEach((panel) => {
        if (!panel) return;

        try {
          const trigger = ScrollTrigger.create({
            trigger: panel,
            start: "top top",
            pin: true,
            pinSpacing: false,
          });
          scrollTriggersRef.current.push(trigger);
        } catch (error) {
          console.error('ScrollTrigger error:', error);
        }
      });
    };

    const timeoutId = setTimeout(setupScrollTriggers, 150);

    return () => {
      clearTimeout(timeoutId);
      scrollTriggersRef.current.forEach(trigger => {
        try {
          if (trigger) trigger.kill();
        } catch (error) {
          // Ignore cleanup errors
        }
      });
      scrollTriggersRef.current = [];
    };
  }, [mounted]);

  const setServiceRef = (index: number) => (el: HTMLDivElement | null) => {
    serviceRefs.current[index] = el;
  };

  if (!mounted) {
    return null;
  }

  return (
    <section className="relative">
      {servicesData.map((service, index) => (
        <div
          key={`service-${service.number}`}
          ref={setServiceRef(index)}
          className="h-screen w-full bg-white flex items-center justify-center relative"
          style={{
            zIndex: servicesData.length - index,
          }}
        >
          <div className="w-full max-w-[1600px] mx-auto px-6 md:px-12 lg:px-16">
            <div className="grid grid-cols-1 lg:grid-cols-[auto_1fr_1fr] gap-8 lg:gap-16 items-center">
              <div className="hidden lg:flex">
                <div className="w-16 h-16 rounded-full border-2 border-gray-300 flex items-center justify-center text-2xl font-light text-gray-400">
                  {service.number}
                </div>
              </div>

              <div className="space-y-6">
                <div className="flex items-center gap-3 mb-4">
                  <span className="w-3 h-3 bg-black rounded-full" />
                  <span className="text-xs uppercase tracking-[0.2em] text-gray-600">
                    SERVICE {service.number.toString().padStart(2, "0")}
                  </span>
                </div>

                <h3 className="text-4xl md:text-5xl lg:text-6xl font-light leading-tight">
                  {service.title}
                </h3>

                <p className="text-gray-600 text-lg leading-relaxed">
                  {service.description}
                </p>

                <div className="flex flex-wrap gap-3 pt-4">
                  {service.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-5 py-2 bg-gray-100 rounded-full text-sm text-gray-700"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden">
                <img
                  src={service.image}
                  alt={service.title}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      ))}
    </section>
  );
}