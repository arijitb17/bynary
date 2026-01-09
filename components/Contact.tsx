"use client"
import { useState, useRef, useEffect } from 'react';
import { Mail, User, MessageSquare, CheckCircle2, AlertCircle, Sparkles } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function ContactSection() {
  const [mounted, setMounted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const sectionRef = useRef<HTMLElement>(null);
  const labelRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const descriptionRef = useRef<HTMLParagraphElement>(null);
  const infoCardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const formRef = useRef<HTMLDivElement>(null);
  const toastRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const rippleContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted || typeof window === 'undefined') return;

    const ctx = gsap.context(() => {
      gsap.set([labelRef.current, headingRef.current, descriptionRef.current], {
        opacity: 0,
        y: 30
      });

      gsap.set(infoCardsRef.current, {
        opacity: 0,
        x: -30
      });

      gsap.set(formRef.current, {
        opacity: 0,
        x: 30
      });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 70%',
          end: 'top 20%',
          toggleActions: 'play none none none'
        }
      });

      tl.to(labelRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: 'power3.out'
      })
      .to(headingRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: 'power3.out'
      }, '-=0.4')
      .to(descriptionRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: 'power3.out'
      }, '-=0.5')
      .to(infoCardsRef.current, {
        opacity: 1,
        x: 0,
        duration: 0.6,
        stagger: 0.15,
        ease: 'power3.out'
      }, '-=0.4')
      .to(formRef.current, {
        opacity: 1,
        x: 0,
        duration: 0.8,
        ease: 'power3.out'
      }, '-=0.6');

    }, sectionRef);

    return () => ctx.revert();
  }, [mounted]);

  const setInfoCardRef = (index: number) => (el: HTMLDivElement | null) => {
    infoCardsRef.current[index] = el;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const showCustomToast = (type: 'success' | 'error', message: string) => {
    if (!toastRef.current) return;

    const toast = toastRef.current;
    
    gsap.set(toast, {
      opacity: 0,
      scale: 0.8,
      y: -30,
      display: 'flex'
    });

    gsap.to(toast, {
      opacity: 1,
      scale: 1,
      y: 0,
      duration: 0.6,
      ease: 'back.out(1.7)',
      delay: 0.3
    });

    setTimeout(() => {
      gsap.to(toast, {
        opacity: 0,
        scale: 0.8,
        y: -30,
        duration: 0.4,
        ease: 'power2.in',
        onComplete: () => {
          gsap.set(toast, { display: 'none' });
        }
      });
    }, 4000);
  };

  const createSuccessParticles = () => {
    if (!rippleContainerRef.current || !buttonRef.current) return;

    const container = rippleContainerRef.current;
    const button = buttonRef.current;
    const rect = button.getBoundingClientRect();
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    for (let i = 0; i < 20; i++) {
      const particle = document.createElement('div');
      particle.className = 'absolute w-2 h-2 rounded-full';
      particle.style.background = 'linear-gradient(135deg, #10b981, #34d399)';
      particle.style.left = `${centerX}px`;
      particle.style.top = `${centerY}px`;
      container.appendChild(particle);

      const angle = (Math.PI * 2 * i) / 20;
      const distance = 80 + Math.random() * 40;
      const x = Math.cos(angle) * distance;
      const y = Math.sin(angle) * distance;

      gsap.to(particle, {
        x,
        y,
        opacity: 0,
        scale: 0,
        duration: 0.8 + Math.random() * 0.4,
        ease: 'power2.out',
        onComplete: () => particle.remove()
      });
    }

    const ripple = document.createElement('div');
    ripple.className = 'absolute rounded-lg border-2 border-green-500';
    ripple.style.left = '0';
    ripple.style.top = '0';
    ripple.style.right = '0';
    ripple.style.bottom = '0';
    container.appendChild(ripple);

    gsap.fromTo(ripple, 
      { scale: 0.8, opacity: 1 },
      { 
        scale: 1.3, 
        opacity: 0, 
        duration: 0.8,
        ease: 'power2.out',
        onComplete: () => ripple.remove()
      }
    );
  };

  const handleSubmit = async (e: React.MouseEvent) => {
    e.preventDefault();
    setStatus('loading');
    setErrorMessage('');

    if (buttonRef.current) {
      gsap.to(buttonRef.current, {
        scale: 0.98,
        duration: 0.6,
        repeat: -1,
        yoyo: true,
        ease: 'power1.inOut'
      });
    }

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setStatus('success');
        setFormData({ name: '', email: '', message: '' });
        
        if (buttonRef.current) {
          gsap.killTweensOf(buttonRef.current);
          
          gsap.to(buttonRef.current, {
            scale: 1.1,
            duration: 0.2,
            ease: 'back.out(2)',
            onComplete: () => {
              gsap.to(buttonRef.current, {
                scale: 1,
                duration: 0.3,
                ease: 'elastic.out(1, 0.5)'
              });
            }
          });

          createSuccessParticles();
        }
        
        showCustomToast('success', 'Message sent successfully! We\'ll get back to you soon.');
        setTimeout(() => setStatus('idle'), 5000);
      } else {
        setStatus('error');
        setErrorMessage(data.error || 'Something went wrong. Please try again.');
        
        if (buttonRef.current) {
          gsap.killTweensOf(buttonRef.current);
          
          gsap.to(buttonRef.current, {
            x: -10,
            duration: 0.1,
            yoyo: true,
            repeat: 5,
            ease: 'power2.inOut',
            onComplete: () => {
              gsap.set(buttonRef.current, { x: 0, scale: 1 });
            }
          });
        }
        
        showCustomToast('error', data.error || 'Something went wrong. Please try again.');
        setTimeout(() => setStatus('idle'), 5000);
      }
    } catch (error) {
      setStatus('error');
      setErrorMessage('Failed to send message. Please try again.');
      
      if (buttonRef.current) {
        gsap.killTweensOf(buttonRef.current);
        
        gsap.to(buttonRef.current, {
          x: -10,
          duration: 0.1,
          yoyo: true,
          repeat: 5,
          ease: 'power2.inOut',
          onComplete: () => {
            gsap.set(buttonRef.current, { x: 0, scale: 1 });
          }
        });
      }
      
      showCustomToast('error', 'Failed to send message. Please try again.');
      setTimeout(() => setStatus('idle'), 5000);
    }
  };

  if (!mounted) {
    return null;
  }

  return (
    <>
      <div 
        ref={toastRef}
        className="fixed top-8 right-8 z-50 hidden items-center gap-3 px-6 py-4 bg-white border-2 border-black rounded-full shadow-2xl"
        style={{ display: 'none' }}
      >
        {status === 'success' ? (
          <>
            <CheckCircle2 className="w-6 h-6 text-green-600 flex-shrink-0" />
            <p className="text-black font-medium">Message sent successfully!</p>
          </>
        ) : (
          <>
            <AlertCircle className="w-6 h-6 text-red-600 flex-shrink-0" />
            <p className="text-black font-medium">{errorMessage}</p>
          </>
        )}
      </div>

      <section ref={sectionRef} className="bg-white py-20 md:py-32 px-6 md:px-12 lg:px-16">
        <div className="max-w-[1600px] mx-auto">
          
          <div ref={labelRef} className="flex items-center justify-center gap-2 mb-16">
            <div className="w-2 h-2 bg-black rounded-full"></div>
            <span className="text-xs md:text-sm uppercase tracking-[0.2em] text-gray-600 font-medium">
              GET IN TOUCH
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
            
            <div className="space-y-8">
              <div>
                <h2 ref={headingRef} className="text-4xl md:text-5xl lg:text-6xl font-bold text-black mb-6">
                  Let's Create Something Amazing Together
                </h2>
                <p ref={descriptionRef} className="text-lg md:text-xl text-gray-600 leading-relaxed">
                  Ready to elevate your brand? Drop us a message and let's discuss how we can help you achieve your goals.
                </p>
              </div>

              <div className="space-y-6 pt-8">
                <div ref={setInfoCardRef(0)} className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-black rounded-full flex items-center justify-center flex-shrink-0">
                    <Mail className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-black mb-1">Email Us</h3>
                    <p className="text-gray-600">bynary.in@gmail.com</p>
                  </div>
                </div>

                <div ref={setInfoCardRef(1)} className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-black rounded-full flex items-center justify-center flex-shrink-0">
                    <MessageSquare className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-black mb-1">Response Time</h3>
                    <p className="text-gray-600">We typically respond within 24 hours</p>
                  </div>
                </div>
              </div>
            </div>

            <div ref={formRef} className="bg-gray-50 rounded-2xl p-8 md:p-10">
              <div className="space-y-6">
                
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                    Your Name
                  </label>
                  <div className="relative">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent transition-all outline-none text-black"
                      placeholder="Your Name"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent transition-all outline-none text-black"
                      placeholder="example@gmail.com"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                    Your Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent transition-all outline-none resize-none text-black"
                    placeholder="Tell us about your project..."
                  />
                </div>

                <div className="relative">
                  <div ref={rippleContainerRef} className="absolute inset-0 pointer-events-none overflow-visible" />
                  <button
                    ref={buttonRef}
                    onClick={handleSubmit}
                    disabled={status === 'loading'}
                    className="w-full relative overflow-hidden group flex items-center justify-center gap-3 px-8 py-4 bg-black text-white rounded-lg hover:bg-gray-900 transition-all duration-300 text-base font-medium disabled:opacity-70 disabled:cursor-not-allowed"
                  >
                    {status === 'loading' && (
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent" 
                           style={{
                             backgroundSize: '200% 100%',
                             animation: 'shimmer 1.5s infinite'
                           }} />
                    )}
                    <span className="relative z-10 flex items-center gap-2">
                      {status === 'success' ? (
                        <>
                          <CheckCircle2 className="w-5 h-5" />
                          Sent Successfully
                        </>
                      ) : status === 'error' ? (
                        <>
                          <AlertCircle className="w-5 h-5" />
                          Try Again
                        </>
                      ) : status === 'loading' ? (
                        <>
                          <Sparkles className="w-5 h-5 animate-spin" />
                          Sending...
                        </>
                      ) : (
                        <>
                          Send Message
                          <Sparkles className="w-5 h-5 group-hover:rotate-12 transition-transform" />
                        </>
                      )}
                    </span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <style jsx global>{`
        @keyframes shimmer {
          0% {
            background-position: -200% 0;
          }
          100% {
            background-position: 200% 0;
          }
        }
      `}</style>
    </>
  );
}