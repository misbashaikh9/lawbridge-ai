import React, { useState, useRef, useEffect } from 'react';

const reasons = [
  { title: "Proven Track Record", description: "Over 500 cases handled successfully with a 98% client satisfaction rate across all practice areas." },
  { title: "24/7 AI Assistance", description: "Our AI-powered platform provides instant legal guidance any time of day, so you never have to wait." },
  { title: "Expert Legal Team", description: "A dedicated team of experienced attorneys specializing in Indian law across multiple jurisdictions." },
  { title: "Complete Confidentiality", description: "Enterprise-grade encryption and strict privacy policies ensure your sensitive information stays protected." },
  { title: "Transparent Pricing", description: "No hidden fees or surprise charges. Clear, upfront pricing with flexible consultation plans." },
  { title: "Document Generation", description: "Instantly generate legal notices, complaint letters, and request templates tailored to your case." },
];

const WhyChooseUs = () => {
  const [index, setIndex] = useState(0);
  const [isScrolling, setIsScrolling] = useState(false);
  
  // Ref to track the index value inside the event listener without staleness
  const indexRef = useRef(0);
  const scrollContainerRef = useRef(null);
  const scrollTimeout = useRef(null);

  useEffect(() => {
    const container = scrollContainerRef.current;

    const handleWheel = (e) => {
      // Prevent the main page from scrolling
      e.preventDefault();

      // Get current "isScrolling" from a ref-like check or local logic
      // We use a local check here to prevent rapid-fire scrolling
      if (scrollTimeout.current) return;

      if (Math.abs(e.deltaY) > 10) {
        let newIndex = indexRef.current;

        if (e.deltaY > 0 && newIndex < reasons.length - 2) {
          newIndex += 1;
        } else if (e.deltaY < 0 && newIndex > 0) {
          newIndex -= 1;
        }

        if (newIndex !== indexRef.current) {
          indexRef.current = newIndex;
          setIndex(newIndex);
          setIsScrolling(true);

          // Lock scrolling for a brief moment for smooth animation
          scrollTimeout.current = setTimeout(() => {
            scrollTimeout.current = null;
            setIsScrolling(false);
          }, 600);
        }
      }
    };

    if (container) {
      container.addEventListener('wheel', handleWheel, { passive: false });
    }

    return () => {
      if (container) {
        container.removeEventListener('wheel', handleWheel);
      }
      if (scrollTimeout.current) clearTimeout(scrollTimeout.current);
    };
  }, []); // Empty dependency array keeps the listener attached once

  return (
    <section className="py-20 bg-[#f8f8f8] overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          
          {/* Left Side */}
          <div>
            <span className="inline-block text-[#E4574E] text-[11px] tracking-[0.2em] uppercase font-bold mb-3">
              Why Choose Us
            </span>
            <h2 className="text-4xl md:text-5xl font-extrabold text-[#18181b] leading-[1.1] mb-6">
              Legal Excellence
              <br />
              You Can <span className="text-[#E4574E]">Trust</span>
            </h2>
            <p className="text-[#52525b] leading-[1.6] text-[16px] max-w-sm">
              We combine traditional legal expertise with modern AI technology 
              to deliver unparalleled service and results.
            </p>
          </div>

          {/* Right Side: Rolling Window */}
          <div 
            ref={scrollContainerRef}
            className="relative h-[480px] overflow-hidden cursor-ns-resize touch-none"
          >
            {/* The Moving Track */}
            <div 
              className="flex flex-col gap-5 transition-transform duration-[800ms] will-change-transform"
              style={{ 
                transform: `translateY(-${index * 235}px)`,
                transitionTimingFunction: 'cubic-bezier(0.23, 1, 0.32, 1)'
              }} 
            >
              {reasons.map((reason, i) => {
                const isVisible = i === index || i === index + 1;
                const isPeeking = i === index + 2;

                return (
                  <div
                    key={i}
                    className={`w-full min-h-[215px] bg-white rounded-2xl p-8 flex gap-6 items-start border transition-all duration-700
                      ${isVisible 
                        ? "opacity-100 scale-100 border-[#E4574E]/20 shadow-md" 
                        : isPeeking 
                          ? "opacity-30 scale-[0.97] border-transparent blur-[0.5px]" 
                          : "opacity-0 scale-90 border-transparent translate-y-10"
                      }
                    `}
                  >
                    <span className={`text-2xl font-black shrink-0 transition-colors duration-500
                      ${isVisible ? "text-[#E4574E]" : "text-gray-300"}`}>
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <div>
                      <h3 className={`text-lg font-bold mb-2 transition-colors duration-500
                        ${isVisible ? "text-[#18181b]" : "text-gray-400"}`}>
                        {reason.title}
                      </h3>
                      <p className={`text-sm leading-relaxed transition-colors duration-500
                        ${isVisible ? "text-[#52525b]" : "text-gray-300"}`}>
                        {reason.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Bottom Gradient for the "Light" effect */}
            <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-[#f8f8f8] via-[#f8f8f8]/80 to-transparent pointer-events-none z-10" />
            
            {/* Scroll Indicator Dots */}
            <div className="absolute right-0 top-1/2 -translate-y-1/2 flex flex-col gap-2">
              {[0, 1, 2, 3, 4].map((dot) => (
                <div 
                  key={dot} 
                  className={`w-1 transition-all duration-500 rounded-full ${index === dot ? 'bg-[#E4574E] h-8' : 'bg-gray-300 h-4'}`} 
                />
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;