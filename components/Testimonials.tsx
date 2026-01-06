"use client"
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Star, Quote } from 'lucide-react';

export default function TestimonialsSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  const testimonials = [
    {
      quote: "Thanks to their data-driven social media strategy, our brand visibility skyrocketed, and engagement is at an all-time high.",
      name: "Daniel M.",
      position: "CEO, Horizon Fitness",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&q=80",
      rating: 5
    },
    {
      quote: "The messaging they crafted for us perfectly captures our voice and has improved engagement across our channels.",
      name: "Sophie L.",
      position: "Marketing Director, Artisan",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=600&q=80",
      rating: 5
    },
    {
      quote: "Their creative direction and design work elevated our brand to a whole new level—our visuals now stand out in a crowded market.",
      name: "Rachel W.",
      position: "Creative Lead, Lumina",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=600&q=80",
      rating: 5
    }
  ];

  const industries = [
    "E-Commerce",
    "Healthcare",
    "Technology",
    "Fashion",
    "Real Estate",
    "Finance",
    "Education",
    "Hospitality"
  ];

  const nextTestimonial = () => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      nextTestimonial();
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 100 : -100,
      opacity: 0
    }),
    center: {
      x: 0,
      opacity: 1
    },
    exit: (direction: number) => ({
      x: direction > 0 ? -100 : 100,
      opacity: 0
    })
  };

  const currentTestimonial = testimonials[currentIndex];

  return (
    <section className="bg-white py-20 md:py-32 px-6 md:px-12 lg:px-16 overflow-hidden">
      <div className="max-w-[1600px] mx-auto">
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex items-center justify-center gap-2 mb-16"
        >
          <motion.div 
            className="w-2 h-2 bg-black rounded-full"
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
          <span className="text-xs md:text-sm uppercase tracking-[0.2em] text-gray-600 font-medium">
            TESTIMONIALS
          </span>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 mb-20 items-center">
          
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative max-w-md mx-auto lg:mx-0"
          >
            <div className="aspect-[3/4] overflow-hidden rounded-2xl bg-gray-100 relative">
              <AnimatePresence mode="wait" custom={direction}>
                <motion.img
                  key={currentIndex}
                  src={currentTestimonial.image}
                  alt={currentTestimonial.name}
                  className="w-full h-full object-cover absolute inset-0"
                  custom={direction}
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{
                    x: { type: "spring", stiffness: 300, damping: 30 },
                    opacity: { duration: 0.4 }
                  }}
                />
              </AnimatePresence>
            </div>
            
            <motion.div 
              className="absolute -top-4 -right-4 w-20 h-20 bg-white rounded-full border-4 border-gray-100 flex items-center justify-center shadow-lg"
              animate={{ 
                rotate: [0, 10, -10, 0],
                scale: [1, 1.05, 1]
              }}
              transition={{ 
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              <div className="w-12 h-12 bg-gray-600 rounded-full flex items-center justify-center">
                <Quote className="w-6 h-6 text-white" />
              </div>
            </motion.div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex flex-col justify-between"
          >
            
            <div className="space-y-8">
              <AnimatePresence mode="wait">
                <motion.div
                  key={`stars-${currentIndex}`}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={{ duration: 0.3 }}
                  className="flex gap-1"
                >
                  {[...Array(currentTestimonial.rating)].map((_, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: i * 0.1, duration: 0.3 }}
                    >
                      <Star className="w-6 h-6 fill-black text-black" />
                    </motion.div>
                  ))}
                </motion.div>
              </AnimatePresence>

              <AnimatePresence mode="wait" custom={direction}>
                <motion.blockquote
                  key={currentIndex}
                  custom={direction}
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{
                    x: { type: "spring", stiffness: 300, damping: 30 },
                    opacity: { duration: 0.4 }
                  }}
                  className="text-2xl md:text-3xl lg:text-4xl font-light leading-relaxed text-gray-800"
                >
                  "{currentTestimonial.quote}"
                </motion.blockquote>
              </AnimatePresence>

              <AnimatePresence mode="wait" custom={direction}>
                <motion.div
                  key={`author-${currentIndex}`}
                  custom={direction}
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{
                    x: { type: "spring", stiffness: 300, damping: 30 },
                    opacity: { duration: 0.4 }
                  }}
                  className="border-t border-gray-200 pt-6"
                >
                  <p className="text-slate-900 text-xl font-semibold mb-1">
                    {currentTestimonial.name}
                  </p>
                  <p className="text-base text-gray-600">
                    {currentTestimonial.position}
                  </p>
                </motion.div>
              </AnimatePresence>
            </div>

            <div className="flex gap-4 mt-8">
              <motion.button
                onClick={prevTestimonial}
                className="w-12 h-12 bg-black text-white !text-white rounded-full flex items-center justify-center"
                whileHover={{ scale: 1.1, backgroundColor: "#1f2937" }}
                whileTap={{ scale: 0.95 }}
                transition={{ duration: 0.2 }}
                aria-label="Previous testimonial"
              >
                <ChevronLeft className="w-6 h-6" />
              </motion.button>
              <motion.button
                onClick={nextTestimonial}
                className="w-12 h-12 bg-black text-white !text-white rounded-full flex items-center justify-center"
                whileHover={{ scale: 1.1, backgroundColor: "#1f2937" }}
                whileTap={{ scale: 0.95 }}
                transition={{ duration: 0.2 }}
                aria-label="Next testimonial"
              >
                <ChevronRight className="w-6 h-6" />
              </motion.button>
            </div>

            <div className="flex gap-2 mt-6">
              {testimonials.map((_, index) => (
                <motion.button
                  key={index}
                  onClick={() => {
                    setDirection(index > currentIndex ? 1 : -1);
                    setCurrentIndex(index);
                  }}
                  className="h-1 rounded-full overflow-hidden"
                  animate={{
                    width: currentIndex === index ? '40px' : '8px',
                    backgroundColor: currentIndex === index ? '#000' : '#d1d5db'
                  }}
                  transition={{ duration: 0.3 }}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>
          </motion.div>
        </div>

        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative overflow-hidden py-12 border-t border-gray-200"
        >
          <motion.div
            className="flex gap-12 md:gap-16"
            animate={{
              x: [0, -1920]
            }}
            transition={{
              x: {
                duration: 30,
                repeat: Infinity,
                ease: "linear"
              }
            }}
          >
            {[...industries, ...industries, ...industries].map((industry, index) => (
              <motion.div
                key={index}
                className="flex-shrink-0 px-6 py-3 border border-gray-300 rounded-full cursor-pointer"
                whileHover={{ 
                  borderColor: "#000",
                  scale: 1.05
                }}
                transition={{ duration: 0.2 }}
              >
                <span className="text-base md:text-lg font-medium text-gray-600 whitespace-nowrap">
                  {industry}
                </span>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}