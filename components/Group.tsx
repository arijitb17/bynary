
import { ArrowRight } from 'lucide-react';

export default function TeamPhotoSection() {
  return (
    <section className="relative w-full h-screen min-h-[600px] overflow-hidden bg-gray-900">
      
      {/* Background Team Photo */}
      <div className="absolute inset-0">
        <img
          src="/team/group.png"
          alt="Our team"
          className="w-full h-full object-cover"
        />
        {/* Gradient Overlay for better text readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
      </div>

      {/* Content Overlay */}
      <div className="relative z-10 h-full flex flex-col justify-end px-6 md:px-12 lg:px-16 pb-16 md:pb-24">
        <div className="max-w-[1600px] mx-auto w-full">
          
          {/* Optional Text Content */}
          <div className="mb-8">
            <h2 className="text-white !text-white text-4xl md:text-5xl lg:text-6xl font-light mb-4">
              Meet Our Team
            </h2>
            <p className="text-white/90 !text-white/90 text-lg md:text-xl max-w-2xl">
             A passionate team of creators, strategists, and innovators committed to turning your vision into meaningful digital experiences.
            </p>
          </div>

          {/* CTA Button */}
          <button className="group inline-flex items-center gap-3 px-8 py-4 bg-white text-black rounded-full hover:bg-black hover:text-white border-2 border-white transition-all duration-300">
            <span className="text-sm md:text-base font-medium uppercase tracking-wider">
              GET TO KNOW US
            </span>
            <div className="w-6 h-6 bg-black group-hover:bg-white rounded-full flex items-center justify-center transition-colors duration-300">
              <ArrowRight className="w-4 h-4 text-white group-hover:text-black transition-all duration-300" />
            </div>
          </button>
        </div>
      </div>

      {/* Optional: Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 hidden md:block">
        <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center pt-2">
          <div className="w-1.5 h-3 bg-white/50 rounded-full animate-bounce"></div>
        </div>
      </div>
    </section>
  );
}