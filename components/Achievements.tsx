import React from 'react';
import { ArrowUpRight, ChevronRight } from 'lucide-react';

export default function AchievementsSection() {
  const stats = [
    {
      number: "$500M",
      title: "Raised by our clients",
      description: "Helping Startups and business to get funding and grow"
    },
    {
      number: "50+",
      title: "Websites and apps",
      description: "We support founders everywhere to make their mark"
    },
    {
      number: "12+",
      title: "Years of experience",
      description: "We're a knit-packed team of trusted marketers & designers"
    }
  ];

  return (
    <section className="relative bg-[#F5F5F5] py-20 md:py-32 px-6 md:px-12 lg:px-16 overflow-hidden">
      <div className="max-w-[1600px] mx-auto">
        
        {/* Section Label */}
        <div className="flex items-center gap-2 mb-12">
          <div className="w-2 h-2 bg-black rounded-full"></div>
          <span className="text-slate-900 text-xs md:text-sm uppercase tracking-[0.2em] text-gray-600 font-medium">
            ACHIEVEMENTS
          </span>
        </div>

        {/* Heading */}
        <div className="mb-20">
          <h2 className="text-slate-900 text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-light leading-tight max-w-5xl">
            As a data driven team, we let the numbers speak for us
          </h2>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8 lg:gap-16 mb-20">
          {stats.map((stat, index) => (
            <div key={index} className="space-y-6">
              {/* Large Number */}
              <h3 className="text-slate-900 text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight">
                {stat.number}
              </h3>
              
              {/* Title */}
              <h4 className="text-slate-900 text-xl md:text-2xl font-semibold">
                {stat.title}
              </h4>
              
              {/* Description */}
              <p className="text-slate-900 text-base md:text-lg text-gray-600 leading-relaxed">
                {stat.description}
              </p>
            </div>
          ))}
        </div>

        {/* Bottom Section with Arrows and CTA */}
        <div className="relative flex items-center justify-between pt-12">
          
          {/* Decorative Arrows - Left */}
          <div className="hidden lg:flex items-center gap-2 opacity-20">
            {[...Array(6)].map((_, i) => (
              <ChevronRight key={`left-${i}`} className="w-12 h-12 text-gray-900" />
            ))}
          </div>

          {/* CTA Button - Center */}
          <div className="flex-shrink-0 mx-auto lg:mx-0">
            <button className="text-slate-900 group flex items-center gap-3 px-8 py-4 bg-transparent border-2 border-black text-black rounded-full hover:bg-black hover:text-white transition-all duration-300">
              <span className=" text-sm md:text-base font-medium uppercase tracking-wider">
                GET IN TOUCH
              </span>
              <div className="w-6 h-6 bg-black group-hover:bg-white rounded-full flex items-center justify-center transition-colors duration-300">
                <ArrowUpRight className="w-4 h-4 text-white group-hover:text-black transition-all duration-300 group-hover:rotate-45" />
              </div>
            </button>
          </div>

          {/* Decorative Arrows - Right */}
          <div className="hidden lg:flex items-center gap-2 opacity-20">
            {[...Array(6)].map((_, i) => (
              <ChevronRight key={`right-${i}`} className="w-12 h-12 text-gray-900 rotate-180" />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}