"use client";
import { useEffect } from "react";
import { getLenis } from "@/components/SmoothScroll";

export default function ScrollToSection() {
  useEffect(() => {
    const target = sessionStorage.getItem("scrollTo");
    
    console.log("ScrollToSection checking for target:", target); // Debug
    
    if (!target) return;

    // Wait for page to fully load and Lenis to initialize
    const attemptScroll = () => {
      const el = document.getElementById(target);
      const lenis = getLenis();

      console.log("Element found:", !!el, "Lenis initialized:", !!lenis); // Debug

      if (el && lenis) {
        // Longer delay to ensure all GSAP animations are complete
        setTimeout(() => {
          // Disable smooth scroll temporarily and scroll instantly
          lenis.scrollTo(el, {
            offset: -100,
            duration: 0.1, // Near-instant scroll to avoid interruption
            immediate: true,
          });

          // Then smooth scroll to the exact position
          setTimeout(() => {
            lenis.scrollTo(el, {
              offset: -100,
              duration: 1.4,
              easing: (t: number) => 1 - Math.pow(1 - t, 4),
            });
          }, 150);

          sessionStorage.removeItem("scrollTo");
          console.log("Scrolled to section and cleared sessionStorage"); // Debug
        }, 500); // Increased delay
      } else {
        // Retry if elements aren't ready yet
        requestAnimationFrame(attemptScroll);
      }
    };

    // Give the page more time to load and animations to settle
    const timer = setTimeout(attemptScroll, 800);

    return () => clearTimeout(timer);
  }, []);

  return null;
}