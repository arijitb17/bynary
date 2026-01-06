"use client"
import Image from 'next/image';
import { useState, useEffect, useRef } from 'react';
import { ArrowUpRight, Menu, X } from 'lucide-react';
import gsap from 'gsap';
import { scrollToSection } from "@/lib/scrollToSection";
import { useRouter } from "next/navigation";


export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const linksRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
   
  const handleContactClick = () => {
    sessionStorage.setItem("scrollTo", "contact");
    router.push("/");
  };

  const handleHomeClick = () => {
    sessionStorage.setItem("scrollTo", "home");
    router.push("/");
  };

  const handleProjectsClick = () => {
    sessionStorage.setItem("scrollTo", "projects");
    router.push("/");
  };

  const handleAboutClick = () => {
    sessionStorage.setItem("scrollTo", "about");
    router.push("/");
  };

  const handleBlogClick = () => {
    sessionStorage.setItem("scrollTo", "blog");
    router.push("/");
  };

  useEffect(() => {
    // Navbar slides down
    gsap.from(navRef.current, {
      y: -100,
      opacity: 0,
      duration: 0.8,
      ease: "power3.out"
    });

    // Logo animation
    gsap.from(logoRef.current, {
      x: -50,
      opacity: 0,
      duration: 0.6,
      delay: 0.3,
      ease: "power2.out"
    });

    // Links stagger animation
    const links = linksRef.current?.querySelectorAll('a');
    if (links && links.length > 0) {
      gsap.from(links, {
        y: -20,
        opacity: 0,
        duration: 0.5,
        stagger: 0.1,
        delay: 0.5,
        ease: "power2.out"
      });
    }

    // Button animation
    gsap.from(buttonRef.current, {
      scale: 0,
      opacity: 0,
      duration: 0.5,
      delay: 0.9,
      ease: "back.out(1.7)"
    });
  }, []);

  return (
    <nav ref={navRef} className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md border-b border-gray-200" style={{ backgroundColor: 'rgba(248, 248, 248, 0.95)' }}>
      <div className="max-w-[1600px] mx-auto px-6 md:px-12 lg:px-16 py-3 md:py-4">
        <div className="flex items-center justify-between">
          
          {/* Logo */}
          <div ref={logoRef} className="flex items-center">
            <Image
              src="/logo.png"
              alt="BYNARY Logo"
              width={70}
              height={70}
              priority
              className="object-contain pt-3"
            />

            <a
              href="/"
              className="text-3xl md:text-4xl font-extrabold tracking-tight hover:opacity-70 transition-opacity leading-none"
              style={{ color: '#1a1a1a' }}
            >
              BYNARY
            </a>
          </div>

          {/* Desktop Navigation Links */}
          <div
            ref={linksRef}
            className="hidden md:flex items-center gap-6 lg:gap-10"
          >
            <button
              onClick={handleHomeClick}
              className="text-md font-bold uppercase tracking-wide hover:opacity-60 transition-opacity"
              style={{ color: "#1a1a1a" }}
            >
              HOME
            </button>

            <button
              onClick={handleProjectsClick}
              className="text-md font-bold uppercase tracking-wide hover:opacity-60 transition-opacity"
              style={{ color: "#1a1a1a" }}
            >
              PROJECTS
            </button>

            <button
              onClick={handleAboutClick}
              className="text-md font-bold uppercase tracking-wide hover:opacity-60 transition-opacity"
              style={{ color: "#1a1a1a" }}
            >
              ABOUT
            </button>

            <button
              onClick={handleBlogClick}
              className="text-md font-bold uppercase tracking-wide hover:opacity-60 transition-opacity"
              style={{ color: "#1a1a1a" }}
            >
              REVIEWS
            </button>
          </div>


          {/* Contact Button (Desktop) */}
          <div ref={buttonRef} className="hidden md:block" style={{ opacity: 1 }}>
            <button
              onClick={handleContactClick}
              className="
                group flex items-center gap-2
                px-6 py-2.5 rounded-full
                bg-[#1a1a1a] text-[#f8f8f8]
                transition-all duration-300 ease-out
                hover:bg-white hover:text-black
                border-black border
              "
            >
              <span className="text-sm font-medium uppercase tracking-wide">
                CONTACT
              </span>

              <div className="w-5 h-5 rounded-full flex items-center justify-center bg-[#f8f8f8]">
                <ArrowUpRight className="w-3 h-3 text-black transition-transform duration-300 group-hover:rotate-45" />
              </div>
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" style={{ color: '#1a1a1a' }} /> : <Menu className="w-6 h-6" style={{ color: '#1a1a1a' }} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden absolute top-full left-0 right-0 border-b border-gray-200 shadow-lg" style={{ backgroundColor: '#f8f8f8' }}>
            <div className="flex flex-col px-6 py-6 gap-4">
              <button
                onClick={() => {
                  handleHomeClick();
                  setMobileMenuOpen(false);
                }}
                className="text-sm font-bold uppercase tracking-wide py-2 text-left hover:opacity-60"
                style={{ color: "#1a1a1a" }}
              >
                HOME
              </button>

              <button
                onClick={() => {
                  handleProjectsClick();
                  setMobileMenuOpen(false);
                }}
                className="text-sm font-bold uppercase tracking-wide py-2 text-left hover:opacity-60"
                style={{ color: "#1a1a1a" }}
              >
                PROJECTS
              </button>

              <button
                onClick={() => {
                  handleAboutClick();
                  setMobileMenuOpen(false);
                }}
                className="text-sm font-bold uppercase tracking-wide py-2 text-left hover:opacity-60"
                style={{ color: "#1a1a1a" }}
              >
                ABOUT
              </button>

              <button
                onClick={() => {
                  handleBlogClick();
                  setMobileMenuOpen(false);
                }}
                className="text-sm font-bold uppercase tracking-wide py-2 text-left hover:opacity-60"
                style={{ color: "#1a1a1a" }}
              >
                REVIEWS
              </button>

              <button
                onClick={() => {
                  handleContactClick();
                  setMobileMenuOpen(false);
                }}
                className="group flex items-center justify-center gap-2 px-6 py-3 rounded-full mt-2"
                style={{ backgroundColor: "#1a1a1a", color: "#f8f8f8" }}
              >
                <span className="text-sm font-medium uppercase tracking-wide">
                  CONTACT
                </span>
                <div className="w-5 h-5 rounded-full flex items-center justify-center bg-[#f8f8f8]">
                  <ArrowUpRight className="w-3 h-3 transition-transform duration-300 group-hover:rotate-45 text-black" />
                </div>
              </button>

            </div>
          </div>
        )}
      </div>
    </nav>
  );
}