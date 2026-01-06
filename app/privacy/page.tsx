"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function PrivacyPolicy() {
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
          Privacy Policy
        </h1>

        {/* Content */}
        <div className="space-y-10 text-gray-700 text-base md:text-lg leading-relaxed max-w-3xl">
          <p>
            At <strong>BYNARY</strong>, we respect your privacy and are committed
            to protecting the personal information you share with us.
          </p>

          <section>
            <h2 className="text-xl font-semibold text-slate-900 mb-3">
              Information We Collect
            </h2>
            <p>
              We may collect personal details such as your name, email address,
              and any information you submit through our contact forms.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-slate-900 mb-3">
              How We Use Information
            </h2>
            <p>
              The information collected is used solely to communicate with you,
              respond to inquiries, and improve our services.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-slate-900 mb-3">
              Data Security
            </h2>
            <p>
              We implement reasonable security measures to protect your data.
              However, no method of transmission over the internet is completely
              secure.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-slate-900 mb-3">
              Third-Party Services
            </h2>
            <p>
              We do not sell or share your personal data with third parties
              except where required by law.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-slate-900 mb-3">
              Updates
            </h2>
            <p>
              This policy may be updated periodically. Continued use of our
              website implies acceptance of the revised policy.
            </p>
          </section>
        </div>
      </div>
    </section>
  );
}
