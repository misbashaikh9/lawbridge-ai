const teamMembers = [
  {
    name: "Adv. Priya Sharma",
    role: "Senior Partner — Corporate Law",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&auto=format&fit=crop&q=80",
    bio: "15+ years in corporate governance, M&A, and regulatory compliance across India.",
  },
  {
    name: "Adv. Rajesh Kumar",
    role: "Partner — Criminal Defense",
    image: "https://images.unsplash.com/photo-1556157382-97eda2d62296?w=400&auto=format&fit=crop&q=80",
    bio: "Former public prosecutor with deep expertise in criminal trial advocacy and bail proceedings.",
  },
  {
    name: "Adv. Meera Patel",
    role: "Partner — Family Law",
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&auto=format&fit=crop&q=80",
    bio: "Specializes in divorce, custody, and inheritance with a compassionate, results-driven approach.",
  },
  {
    name: "Adv. Arjun Kapoor",
    role: "Associate — Property Law",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop&q=80",
    bio: "Expert in land acquisition, title disputes, and commercial real estate transactions.",
  },
];

const Team = () => {
  return (
    <section id="team" className="py-28 bg-ivory relative">
      {/* Thin top border */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-px bg-gold/30" />
      <div className="max-w-7xl mx-auto px-8 lg:px-12">
        {/* Header */}
        <div className="text-center mb-20">
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="w-12 h-px bg-gold" />
            <span className="text-gold text-[12px] tracking-[0.2em] uppercase font-semibold">Our Legal Team</span>
            <div className="w-12 h-px bg-gold" />
          </div>
          <h2 className="font-heading text-4xl md:text-[44px] font-normal text-charcoal mb-5">
            Meet Our Attorneys
          </h2>
          <p className="text-gray max-w-xl mx-auto leading-[1.8] text-[15px]">
            Dedicated professionals committed to delivering exceptional legal outcomes.
          </p>
        </div>

        {/* Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {teamMembers.map((member) => (
            <div
              key={member.name}
              className="group cursor-pointer"
            >
              {/* Image */}
              <div className="relative overflow-hidden mb-6">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-80 object-cover grayscale group-hover:grayscale-0 group-hover:scale-[1.02] transition-all duration-700"
                />
                <div className="absolute inset-0 bg-navy/0 group-hover:bg-navy/20 transition-all duration-500" />
              </div>

              {/* Info */}
              <h3 className="font-heading text-lg text-charcoal group-hover:text-gold transition-colors duration-300 mb-1">
                {member.name}
              </h3>
              <p className="text-gold text-[11px] tracking-[0.12em] uppercase font-semibold mb-3">
                {member.role}
              </p>
              <p className="text-gray text-sm leading-[1.7]">
                {member.bio}
              </p>

              {/* Thin divider */}
              <div className="mt-5 h-px bg-gray-200 group-hover:bg-gold/40 transition-colors duration-500" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Team;
