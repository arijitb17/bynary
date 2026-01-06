"use client"
import React, { useEffect, useRef, useState } from 'react';
import { ArrowUpRight } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import projects from "@/data/projects.json";
import { useRouter } from 'next/navigation';

gsap.registerPlugin(ScrollTrigger);

export default function ProjectsSection() {
   const router = useRouter();
  const sectionRef = useRef<HTMLElement>(null);
  const labelRef = useRef<HTMLDivElement>(null);
  const numbersRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const descriptionRef = useRef<HTMLParagraphElement>(null);
  const projectsRef = useRef<HTMLDivElement>(null);
  const viewAllRef = useRef<HTMLDivElement>(null);
  const [loadedImages, setLoadedImages] = useState<Record<number, boolean>>({});

  useEffect(() => {
    // Fallback: Force show images after 3 seconds if they haven't loaded
    const timeout = setTimeout(() => {
      const allLoaded: Record<number, boolean> = {};
      projects.forEach(p => {
        allLoaded[p.id] = true;
      });
      setLoadedImages(allLoaded);
    }, 3000);

    return () => clearTimeout(timeout);
  }, []);

  const handleImageLoad = (id: number) => {
    setLoadedImages(prev => ({ ...prev, [id]: true }));
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Label animation
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

      // Numbers animation (left and right)
      const numbers = numbersRef.current?.querySelectorAll('.number-item');
      if (numbers && numbers.length > 0) {
        gsap.fromTo(numbers,
          {
            y: -20,
            opacity: 0
          },
          {
            y: 0,
            opacity: 1,
            duration: 0.6,
            stagger: 0.2,
            delay: 0.2,
            ease: "power2.out",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 80%",
              toggleActions: "play none none none"
            }
          }
        );
      }

      // Heading animation
      gsap.fromTo(headingRef.current,
        {
          y: 50,
          opacity: 0
        },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          delay: 0.4,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            toggleActions: "play none none none"
          }
        }
      );

      // Description animation
      gsap.fromTo(descriptionRef.current,
        {
          y: 30,
          opacity: 0
        },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          delay: 0.6,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            toggleActions: "play none none none"
          }
        }
      );

      // Projects grid - animate each card individually
      const projectCards = projectsRef.current?.querySelectorAll('.project-card');
      if (projectCards && projectCards.length > 0) {
        projectCards.forEach((card) => {
          gsap.fromTo(card,
            {
              y: 60,
              opacity: 0
            },
            {
              y: 0,
              opacity: 1,
              duration: 0.8,
              ease: "power2.out",
              scrollTrigger: {
                trigger: card,
                start: "top 90%",
                toggleActions: "play none none none"
              }
            }
          );
        });
      }

      // View All button animation
      gsap.fromTo(viewAllRef.current,
        {
          y: 30,
          opacity: 0
        },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: viewAllRef.current,
            start: "top 90%",
            toggleActions: "play none none none"
          }
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="bg-white py-20 md:py-32 px-6 md:px-12 lg:px-16">
      <div className="max-w-[1600px] mx-auto">
        
        {/* Top Section */}
        <div className="relative mb-16">
          
          {/* Section Label */}
          <div ref={labelRef} className="flex items-center gap-2 mb-8 opacity-0">
            <div className="w-2 h-2 bg-black rounded-full"></div>
            <span className="text-xs md:text-sm uppercase tracking-[0.2em] text-gray-600 font-medium">
              SHOWCASE
            </span>
          </div>

          {/* Heading with Numbers */}
          <div ref={numbersRef} className="relative flex items-start justify-between mb-8">
            <span className="number-item text-sm md:text-base text-gray-400 font-light absolute left-0 top-0 opacity-0">
              [01]
            </span>
            
            <div className="flex-1 text-center">
              <h2 ref={headingRef} className="text-black text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-light mb-6 opacity-0">
                Our Works
              </h2>
            </div>

            <span className="number-item text-sm md:text-base text-gray-400 font-light absolute right-0 top-0 opacity-0">
              ©2026
            </span>
          </div>

          {/* Description */}
          <p ref={descriptionRef} className="text-center text-base md:text-lg text-gray-600 leading-relaxed max-w-3xl mx-auto opacity-0">
            A curated body of work showcasing our approach to web, branding, and motion.
Each project reflects precision, creativity, and purpose—built to make ideas perform.
          </p>
        </div>

        {/* Projects Grid */}
        <div ref={projectsRef} className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 lg:gap-16">
          {projects.map((project) => (
            <div key={project.id} className="project-card group cursor-pointer opacity-0">
              <div className="relative overflow-hidden rounded-2xl mb-6 aspect-[4/3] bg-gray-100">
                {/* Loading skeleton - only show if image not loaded */}
                {!loadedImages[project.id] && (
                  <div className="absolute inset-0 z-10 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200" 
                       style={{ 
                         backgroundSize: '200% 100%',
                         animation: 'shimmer 1.5s infinite linear'
                       }} 
                  />
                )}
                
                {/* Actual image */}
                <img
                  src={project.image}
                  alt={project.title}
                  onLoad={(e) => {
                    console.log(`Image loaded: ${project.id}`);
                    handleImageLoad(project.id);
                  }}
                  onError={(e) => {
                    console.log(`Image error: ${project.id}`);
                    handleImageLoad(project.id);
                  }}
                  className="w-full h-full object-cover transition-opacity duration-500 group-hover:scale-110"
                  style={{ 
                    opacity: loadedImages[project.id] ? 1 : 0,
                    transition: 'transform 0.7s ease, opacity 0.5s ease'
                  }}
                />
              </div>

              <div className="space-y-4">
                <h3 className="text-black text-2xl md:text-3xl font-semibold">
                  {project.title}
                </h3>

                <p className="text-base md:text-lg text-gray-600">
                  {project.shortDescription}
                </p>

                <a
                  href={`/projects/${project.slug}`}
                  className="inline-flex items-center gap-2 uppercase tracking-wider text-sm font-medium hover:gap-3 transition-all duration-300"
                >
                  <span>View Case Study</span>
                  <ArrowUpRight className="w-4 h-4" />
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* View All Button */}
        <div ref={viewAllRef} className="flex justify-center mt-16 opacity-0">
          <button 
            onClick={() => router.push('/projects')}
            className="group flex items-center gap-3 px-8 py-4 bg-transparent border-2 border-black text-black rounded-full hover:bg-black hover:text-white transition-all duration-300"
          >
            <span className="text-sm md:text-base font-medium uppercase tracking-wider">
              VIEW ALL WORKS
            </span>
            <div className="w-6 h-6 bg-black group-hover:bg-white rounded-full flex items-center justify-center transition-colors duration-300">
              <ArrowUpRight className="w-4 h-4 text-white group-hover:text-black transition-all duration-300 group-hover:rotate-45" />
            </div>
          </button>
        </div>
      </div>

      <style jsx>{`
        @keyframes shimmer {
          0% { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }
      `}</style>
    </section>
  );
}