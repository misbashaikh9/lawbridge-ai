const services = [
  {
    icon: (
      <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        <path d="M9 12l2 2 4-4" />
      </svg>
    ),
    title: "Fake Article Detection",
    description:
      "Our ML-powered engine scans and verifies legal articles, court orders, and case documents to detect fabricated or tampered content with high accuracy.",
    tag: "AI / ML",
  },
  {
    icon: (
      <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
    title: "Lawyer Recommendation",
    description:
      "Get matched with the right legal expert based on your case type, jurisdiction, budget, and urgency — powered by intelligent recommendation algorithms.",
    tag: "Smart Matching",
  },
  {
    icon: (
      <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="4" width="20" height="16" rx="2" />
        <path d="M22 7l-10 6L2 7" />
      </svg>
    ),
    title: "Legal Email Drafting",
    description:
      "Generate professionally worded legal emails, notices, and demand letters using AI prompts tailored to Indian legal standards and formal communication protocols.",
    tag: "AI Prompt",
  },
  {
    icon: (
      <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
        <polyline points="14 2 14 8 20 8" />
        <line x1="16" y1="13" x2="8" y2="13" />
        <line x1="16" y1="17" x2="8" y2="17" />
        <polyline points="10 9 9 9 8 9" />
      </svg>
    ),
    title: "Document Generation",
    description:
      "Instantly create rent agreements, affidavits, legal notices, and compliance documents from pre-approved templates — ready for review and signature.",
    tag: "Automation",
  },
  {
    icon: (
      <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="11" cy="11" r="8" />
        <line x1="21" y1="21" x2="16.65" y2="16.65" />
        <line x1="8" y1="11" x2="14" y2="11" />
        <line x1="11" y1="8" x2="11" y2="14" />
      </svg>
    ),
    title: "Case Analysis & Research",
    description:
      "Upload case details and receive AI-driven analysis including severity assessment, legal category classification, and relevant precedent research.",
    tag: "Deep Analysis",
  },
  {
    icon: (
      <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
        <path d="M8 9h8" />
        <path d="M8 13h6" />
      </svg>
    ),
    title: "24/7 AI Legal Assistant",
    description:
      "Get instant answers to legal queries, understand your rights, and receive step-by-step guidance on legal procedures — available around the clock.",
    tag: "Always On",
  },
];

const Services = () => {
  return (
    <section id="services" className="py-28 bg-white relative">
      {/* Thin top accent */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-px bg-gold/30" />

      <div className="max-w-7xl mx-auto px-8 lg:px-12">
        {/* Header */}
        <div className="text-center mb-20">
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="w-12 h-px bg-gold" />
            <span className="text-gold text-[12px] tracking-[0.2em] uppercase font-semibold">
              What We Offer
            </span>
            <div className="w-12 h-px bg-gold" />
          </div>
          <h2 className="font-heading text-4xl md:text-[44px] font-normal text-charcoal mb-5">
            Our <span className="italic text-gold">Services</span>
          </h2>
          <p className="text-gray max-w-xl mx-auto leading-[1.8] text-[15px]">
            AI-powered legal tools and expert counsel — designed to make justice
            accessible, efficient, and transparent.
          </p>
        </div>

        {/* Cards grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service) => (
            <div
              key={service.title}
              className="group relative border border-gray-200 bg-ivory p-8 hover:border-gold/40 hover:shadow-lg transition-all duration-500"
            >
              {/* Tag */}
              <span className="absolute top-6 right-6 text-[10px] tracking-[0.15em] uppercase text-gray font-medium group-hover:text-gold transition-colors duration-300">
                {service.tag}
              </span>

              {/* Icon */}
              <div className="text-gold/70 mb-6 group-hover:text-gold transition-colors duration-300">
                {service.icon}
              </div>

              {/* Title */}
              <h3 className="font-heading text-xl text-charcoal mb-3 group-hover:text-navy transition-colors duration-300">
                {service.title}
              </h3>

              {/* Description */}
              <p className="text-gray text-sm leading-[1.8] group-hover:text-charcoal/70 transition-colors duration-300">
                {service.description}
              </p>

              {/* Bottom accent */}
              <div className="absolute bottom-0 left-0 w-0 h-[2px] bg-gold group-hover:w-full transition-all duration-500" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
