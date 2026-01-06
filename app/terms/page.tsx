"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function TermsAndConditions() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    gsap.fromTo(
      containerRef.current,
      { opacity: 0, y: 40 },
      { opacity: 1, y: 0, duration: 1, ease: "power3.out" }
    );
  }, []);

  return (
    <section className="bg-[#F5F5F5] min-h-screen px-6 md:px-12 lg:px-16 py-24 mt-10">
      <div
        ref={containerRef}
        className="max-w-[1200px] mx-auto"
      >
        {/* Title */}
        <h1 className="text-[12vw] md:text-[6vw] font-bold tracking-tight text-gray-400 leading-none mb-16">
          Terms & Conditions
        </h1>

        {/* Content */}
        <div className="space-y-10 text-gray-700 text-base md:text-lg leading-relaxed max-w-3xl">
          <p>
            By accessing or using the BYNARY website, you agree to be bound by
            the following terms and conditions.
          </p>

          <section>
            <h2 className="text-xl font-semibold text-slate-900 mb-3">
              Use of Website
            </h2>
            <p>
              You agree to use this website for lawful purposes only and not to
              engage in any activity that may harm or disrupt our services.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-slate-900 mb-3">
              Intellectual Property
            </h2>
            <p>
              All content, branding, and materials on this website are the
              property of BYNARY and may not be reproduced without permission.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-slate-900 mb-3">
              Limitation of Liability
            </h2>
            <p>
              BYNARY shall not be liable for any direct or indirect damages
              arising from the use of this website.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-slate-900 mb-3">
              External Links
            </h2>
            <p>
              Our website may contain links to third-party websites. We are not
              responsible for their content or practices.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-slate-900 mb-3">
              Modifications
            </h2>
            <p>
              We reserve the right to update these terms at any time. Continued
              use of the website indicates acceptance of the revised terms.
            </p>
          </section>
        </div>
      </div>
    </section>
  );
}
