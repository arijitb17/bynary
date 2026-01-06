"use client"
import React, { useEffect, useRef, useState } from 'react';
import { ArrowUpRight, Filter } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import projects from "@/data/projects.json";

gsap.registerPlugin(ScrollTrigger);

export default function AllProjectsPage() {
  const heroRef = useRef<HTMLElement>(null);
  const filterRef = useRef<HTMLDivElement>(null);
  const projectsRef = useRef<HTMLDivElement>(null);
  const [loadedImages, setLoadedImages] = useState<Record<number, boolean>>({});
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const handleClick = () => {
    sessionStorage.setItem("scrollTo", "contact");
    window.location.href = "/";
  };

  // Get unique categories from projects
  const categories = ["All", ...new Set(projects.flatMap(p => p.services))];

  // Filter projects based on selected category
  const filteredProjects = selectedCategory === "All" 
    ? projects 
    : projects.filter(p => p.services.includes(selectedCategory));

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
      // Hero section animation
      gsap.fromTo(heroRef.current,
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: "power3.out" }
      );

      // Filter buttons animation
      const filterButtons = filterRef.current?.querySelectorAll('button');
      if (filterButtons) {
        gsap.fromTo(filterButtons,
          { y: 20, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.5,
            stagger: 0.05,
            delay: 0.3,
            ease: "power2.out"
          }
        );
      }

      // Projects grid - animate each card individually
      const projectCards = projectsRef.current?.querySelectorAll('.project-card');
      if (projectCards && projectCards.length > 0) {
        projectCards.forEach((card) => {
          gsap.fromTo(card,
            { y: 60, opacity: 0 },
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
    }, heroRef);

    return () => ctx.revert();
  }, [filteredProjects]);

  return (
    <div className="bg-white min-h-screen pt-24">
      {/* Hero Section */}
      <section ref={heroRef} className="px-6 md:px-12 lg:px-16 py-16 md:py-24 opacity-0">
        <div className="max-w-[1600px] mx-auto text-center">
          <div className="inline-flex items-center gap-2 mb-6 px-4 py-2 bg-black text-white rounded-full">
            <span className="text-xs md:text-sm uppercase tracking-wider font-medium">
              Portfolio
            </span>
          </div>
          
          <h1 className="text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold text-black mb-6">
            All Works
          </h1>
          
          <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Explore our complete portfolio of web design, branding, and digital experiences.
            Each project represents our commitment to exceptional design and strategic thinking.
          </p>
        </div>
      </section>

      {/* Filter Section */}
      <section className="px-6 md:px-12 lg:px-16 pb-12 sticky top-20 bg-white z-40 border-b border-gray-200">
        <div ref={filterRef} className="max-w-[1600px] mx-auto">
          <div className="flex items-center gap-3 flex-wrap justify-center">
            <Filter className="w-5 h-5 text-gray-500" />
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-6 py-2.5 rounded-full text-sm font-medium uppercase tracking-wider transition-all duration-300 opacity-0 ${
                  selectedCategory === category
                    ? 'bg-black text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
          
          <div className="text-center mt-4 text-sm text-gray-500">
            Showing {filteredProjects.length} {filteredProjects.length === 1 ? 'project' : 'projects'}
          </div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="px-6 md:px-12 lg:px-16 py-12">
        <div ref={projectsRef} className="max-w-[1600px] mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
          {filteredProjects.map((project) => (
            <div key={project.id} className="project-card group cursor-pointer opacity-0">
              <div className="relative overflow-hidden rounded-2xl mb-6 aspect-[4/3] bg-gray-100">
                {/* Loading skeleton */}
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
                  onLoad={() => handleImageLoad(project.id)}
                  onError={() => handleImageLoad(project.id)}
                  className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110"
                  style={{ 
                    opacity: loadedImages[project.id] ? 1 : 0,
                    transition: 'transform 0.7s ease, opacity 0.5s ease'
                  }}
                />
                
                {/* Overlay on hover */}
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <span className="text-white text-lg font-semibold uppercase tracking-wider">
                    View Project
                  </span>
                </div>
              </div>

              <div className="space-y-3">
                {/* Services Tags */}
                <div className="flex flex-wrap gap-2">
                  {project.services.slice(0, 3).map((service, i) => (
                    <span key={i} className="px-3 py-1 bg-gray-100 text-gray-700 text-xs rounded-full">
                      {service}
                    </span>
                  ))}
                </div>

                <h3 className="text-black text-xl md:text-2xl font-semibold group-hover:text-gray-600 transition-colors">
                  {project.title}
                </h3>

                <p className="text-sm md:text-base text-gray-600 line-clamp-2">
                  {project.shortDescription}
                </p>

                <a
                  href={`/projects/${project.slug}`}
                  className="inline-flex items-center gap-2 uppercase tracking-wider text-xs font-bold hover:gap-3 transition-all duration-300 text-black"
                >
                  <span>View Case Study</span>
                  <ArrowUpRight className="w-3 h-3" />
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* No results message */}
        {filteredProjects.length === 0 && (
          <div className="text-center py-20">
            <p className="text-xl text-gray-500">No projects found in this category.</p>
            <button
              onClick={() => setSelectedCategory("All")}
              className="mt-6 px-6 py-3 bg-black text-white rounded-full hover:bg-gray-800 transition-colors"
            >
              View All Projects
            </button>
          </div>
        )}
      </section>

      {/* CTA Section */}
      <section className="px-6 md:px-12 lg:px-16 py-20 bg-gray-50">
        <div className="max-w-[900px] mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-black mb-6">
            Ready to Start Your Project?
          </h2>
          <p className="text-lg md:text-xl text-gray-600 mb-8">
            Let's create something amazing together. Get in touch to discuss your next project.
          </p>
           <button
  onClick={handleClick}
            className="inline-flex items-center gap-3 px-8 py-4 bg-black text-white rounded-full hover:bg-gray-800 transition-colors text-base font-semibold uppercase tracking-wider"
          >
            <span>Get In Touch</span>
            <ArrowUpRight className="w-5 h-5" />
        </button>
        </div>
      </section>

      <style jsx>{`
        @keyframes shimmer {
          0% { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }
      `}</style>
    </div>
  );
}