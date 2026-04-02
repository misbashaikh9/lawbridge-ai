const reasons = [
  {
    title: "Proven Track Record",
    description: "Over 500 cases handled successfully with a 98% client satisfaction rate across all practice areas.",
  },
  {
    title: "24/7 AI Assistance",
    description: "Our AI-powered platform provides instant legal guidance any time of day, so you never have to wait.",
  },
  {
    title: "Expert Legal Team",
    description: "A dedicated team of experienced attorneys specializing in Indian law across multiple jurisdictions.",
  },
  {
    title: "Complete Confidentiality",
    description: "Enterprise-grade encryption and strict privacy policies ensure your sensitive information stays protected.",
  },
  {
    title: "Transparent Pricing",
    description: "No hidden fees or surprise charges. Clear, upfront pricing with flexible consultation plans.",
  },
  {
    title: "Document Generation",
    description: "Instantly generate legal notices, complaint letters, and request templates tailored to your case.",
  },
];

const WhyChooseUs = () => {
  return (
    <section id="why-us" className="py-28 bg-navy relative overflow-hidden">
      {/* Subtle accent line */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-gold/20 to-transparent" />

      {/* Building silhouette — right side */}
      <div className="absolute right-0 bottom-0 w-1/2 h-full pointer-events-none z-0 opacity-[0.04]">
        <svg className="absolute bottom-0 right-0 w-full h-3/4" viewBox="0 0 600 500" preserveAspectRatio="xMaxYMax meet" fill="white" xmlns="http://www.w3.org/2000/svg">
          <rect x="500" y="100" width="60" height="400" />
          <rect x="510" y="80" width="40" height="20" />
          <rect x="525" y="50" width="10" height="30" />
          <rect x="420" y="180" width="50" height="320" />
          <rect x="430" y="160" width="30" height="20" />
          <rect x="350" y="220" width="45" height="280" />
          <rect x="280" y="260" width="50" height="240" />
          <rect x="290" y="240" width="30" height="20" />
          <rect x="220" y="300" width="35" height="200" />
          <rect x="160" y="280" width="40" height="220" />
          <rect x="170" y="260" width="20" height="20" />
          <rect x="100" y="320" width="35" height="180" />
          <rect x="50" y="350" width="30" height="150" />
          {/* Windows */}
          {[120, 160, 200, 240, 280, 320, 360, 400, 440].map((y) => (
            <g key={`w-${y}`}>
              <rect x="510" y={y} width="8" height="12" opacity="0.5" />
              <rect x="525" y={y} width="8" height="12" opacity="0.5" />
              <rect x="540" y={y} width="8" height="12" opacity="0.5" />
            </g>
          ))}
          {[200, 240, 280, 320, 360, 400, 440].map((y) => (
            <g key={`w2-${y}`}>
              <rect x="428" y={y} width="7" height="10" opacity="0.5" />
              <rect x="443" y={y} width="7" height="10" opacity="0.5" />
              <rect x="458" y={y} width="7" height="10" opacity="0.5" />
            </g>
          ))}
        </svg>
      </div>

      {/* Vertical architectural lines */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute top-0 left-[8%] w-px h-full bg-gradient-to-b from-gold/[0.04] via-transparent to-gold/[0.04]" />
        <div className="absolute top-0 right-[8%] w-px h-full bg-gradient-to-b from-gold/[0.04] via-transparent to-gold/[0.04]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-8 lg:px-12">
        <div className="grid lg:grid-cols-2 gap-20 items-start">
          {/* Left */}
          <div className="lg:sticky lg:top-32">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-px bg-gold" />
              <span className="text-gold text-[12px] tracking-[0.2em] uppercase font-semibold">Why Choose Us</span>
            </div>
            <h2 className="font-heading text-4xl md:text-[44px] font-normal text-white leading-[1.15] mb-8">
              Legal Excellence
              <br />
              You Can <span className="italic text-gold">Trust</span>
            </h2>
            <p className="text-white/40 leading-[1.8] text-[15px] mb-12 max-w-md">
              We combine traditional legal expertise with modern AI technology
              to deliver unparalleled service and results.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href="#contact"
                className="px-8 py-3.5 bg-gold text-navy font-semibold text-[13px] tracking-[0.06em] uppercase hover:bg-gold-light transition-all duration-300 text-center"
              >
                Schedule Consultation
              </a>
              <a
                href="#practice"
                className="px-8 py-3.5 border border-white/15 text-white/60 text-[13px] tracking-[0.06em] uppercase font-medium hover:border-gold/50 hover:text-gold transition-all duration-300 text-center"
              >
                Practice Areas
              </a>
            </div>
          </div>

          {/* Right */}
          <div className="space-y-0">
            {reasons.map((reason, i) => (
              <div
                key={reason.title}
                className={`group py-8 ${i !== reasons.length - 1 ? "border-b border-white/[0.06]" : ""}`}
              >
                <div className="flex items-start gap-6">
                  <span className="text-gold/30 font-heading text-[28px] leading-none mt-0.5 shrink-0">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <h3 className="font-heading text-xl text-white group-hover:text-gold transition-colors duration-300 mb-2">
                      {reason.title}
                    </h3>
                    <p className="text-white/40 text-sm leading-[1.75]">
                      {reason.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom accent line */}
      <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-gold/20 to-transparent" />
    </section>
  );
};

export default WhyChooseUs;
