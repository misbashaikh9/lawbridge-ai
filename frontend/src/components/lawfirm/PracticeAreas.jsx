const practiceAreas = [
  {
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
        <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
        <path d="M3 9h18M9 21V9" />
      </svg>
    ),
    title: "Corporate Law",
    description: "Expert counsel on mergers, acquisitions, compliance, and corporate governance matters.",
  },
  {
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
    title: "Family Law",
    description: "Compassionate representation in divorce, custody, adoption, and inheritance disputes.",
  },
  {
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      </svg>
    ),
    title: "Criminal Defense",
    description: "Vigorous defense strategies for criminal matters including bail, FIR, and trial advocacy.",
  },
  {
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
        <polyline points="9 22 9 12 15 12 15 22" />
      </svg>
    ),
    title: "Property & Real Estate",
    description: "Property disputes, land acquisition, title verification, and real estate transactions.",
  },
];

const PracticeAreas = () => {
  return (
    <section id="practice" className="py-28 bg-white relative">
      {/* Thin top border */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-px bg-gold/30" />
      <div className="max-w-7xl mx-auto px-8 lg:px-12">
        {/* Header */}
        <div className="text-center mb-20">
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="w-12 h-px bg-gold" />
            <span className="text-gold text-[12px] tracking-[0.2em] uppercase font-semibold">Our Expertise</span>
            <div className="w-12 h-px bg-gold" />
          </div>
          <h2 className="font-heading text-4xl md:text-[44px] font-normal text-charcoal mb-5">
            Practice Areas
          </h2>
          <p className="text-gray max-w-xl mx-auto leading-[1.8] text-[15px]">
            Decades of combined experience across the core legal disciplines,
            delivering expert guidance for every situation.
          </p>
        </div>

        {/* Cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-px bg-gray-200">
          {practiceAreas.map((area) => (
            <div
              key={area.title}
              className="group bg-white p-10 hover:bg-navy transition-all duration-500 cursor-pointer"
            >
              <div className="text-charcoal group-hover:text-gold transition-colors duration-500 mb-8">
                {area.icon}
              </div>
              <h3 className="font-heading text-xl text-charcoal group-hover:text-white transition-colors duration-500 mb-3">
                {area.title}
              </h3>
              <p className="text-gray text-sm leading-[1.75] group-hover:text-white/50 transition-colors duration-500 mb-6">
                {area.description}
              </p>
              <div className="flex items-center gap-2 text-[12px] tracking-[0.1em] uppercase font-semibold text-gold opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-2 group-hover:translate-y-0">
                <span>Learn More</span>
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PracticeAreas;
