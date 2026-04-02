import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const Hero = () => {
  const { user } = useAuth();

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=1920&auto=format&fit=crop&q=80"
          alt=""
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-navy/90" />
      </div>

      {/* Building skyline silhouette — bottom */}
      <div className="absolute bottom-0 left-0 w-full z-[1] pointer-events-none">
        <svg className="w-full h-48 md:h-64" viewBox="0 0 1440 260" preserveAspectRatio="none" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0 260V180h40v-30h20v30h30V120h10v-20h10v20h10V60h20V40h10v20h20v100h40V140h15v-25h10v25h15v40h60V100h10V70h10v30h10v80h50V130h20v-40h10v40h20v50h60V90h15V60h10v30h15v100h40V120h10v-20h10v20h10v60h80V110h20V80h10v30h20v70h50V120h15v-30h10v30h15v60h70V100h10V60h10v40h10v80h40v-50h20v50h30V140h10v-20h10v20h10v40h70V90h15V50h10v40h15v90h40V110h10V80h10v30h10v60h90v-40h20v40h40V130h15v-30h10v30h15v50h50V160h10v-20h10v20h10v20h0v80H0z" fill="rgba(15,23,42,0.35)" />
          <path d="M0 260V210h50V170h15v-20h10v20h15v40h40V160h10v-30h10v30h10v50h80V180h20v-50h10v50h20v30h50V150h15V120h10v30h15v60h60V180h10v-20h10v20h10v30h70V150h20V110h10v40h20v60h40V170h15v-30h10v30h15v40h50V160h10v-20h10v20h10v50h80V180h20V150h10v30h20v30h60V160h10v-20h10v20h10v50h50V170h10VS130h10v40h10v40h50v-30h20v30h0v50H0z" fill="rgba(15,23,42,0.55)" />
        </svg>
      </div>

      {/* Architectural column lines */}
      <div className="absolute inset-0 z-[2] pointer-events-none overflow-hidden">
        <div className="absolute top-20 left-[10%] w-px h-[60%] bg-gradient-to-b from-gold/[0.07] via-gold/[0.03] to-transparent" />
        <div className="absolute top-32 left-[25%] w-px h-[50%] bg-gradient-to-b from-white/[0.04] via-white/[0.02] to-transparent" />
        <div className="absolute top-16 right-[10%] w-px h-[60%] bg-gradient-to-b from-gold/[0.07] via-gold/[0.03] to-transparent" />
        <div className="absolute top-28 right-[25%] w-px h-[50%] bg-gradient-to-b from-white/[0.04] via-white/[0.02] to-transparent" />
      </div>

      {/* Thin decorative line */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-28 bg-gradient-to-b from-transparent via-gold/40 to-transparent z-10" />

      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto px-8 text-center pt-32 pb-40">
        <p className="text-gold text-[13px] tracking-[0.2em] uppercase font-medium mb-8">
          Established 2020 &mdash; Trusted Legal Counsel
        </p>

        <h1 className="font-heading text-5xl md:text-6xl lg:text-[72px] font-normal text-white leading-[1.1] mb-8 tracking-[-0.01em]">
          Justice Through
          <br />
          <span className="italic text-gold">Expertise</span> & Integrity
        </h1>

        <p className="text-white/50 text-lg md:text-xl max-w-2xl mx-auto mb-12 leading-relaxed font-light">
          Comprehensive legal solutions built on a foundation of integrity, precision,
          and unwavering dedication to your rights under Indian law.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-5">
          {user ? (
            <Link
              to="/chat"
              className="px-10 py-4 bg-gold text-navy font-semibold text-[13px] tracking-[0.08em] uppercase hover:bg-gold-light transition-all duration-300"
            >
              Open AI Workspace
            </Link>
          ) : (
            <Link
              to="/signup"
              className="px-10 py-4 bg-gold text-navy font-semibold text-[13px] tracking-[0.08em] uppercase hover:bg-gold-light transition-all duration-300"
            >
              Schedule Consultation
            </Link>
          )}
          <a
            href="#about"
            className="px-10 py-4 border border-white/20 text-white/70 text-[13px] tracking-[0.08em] uppercase font-medium hover:border-gold/60 hover:text-gold transition-all duration-300"
          >
            Learn More
          </a>
        </div>
      </div>

      {/* Bottom stats bar */}
      <div className="absolute bottom-0 left-0 w-full z-10 border-t border-white/[0.06] bg-navy/60 backdrop-blur-sm">
        <div className="max-w-5xl mx-auto px-8 py-8 grid grid-cols-2 md:grid-cols-4 gap-8">
          {[
            { value: "500+", label: "Cases Won" },
            { value: "98%", label: "Success Rate" },
            { value: "50+", label: "Legal Experts" },
            { value: "24/7", label: "AI Available" },
          ].map((stat, i) => (
            <div key={stat.label} className={`text-center ${i < 3 ? "md:border-r md:border-white/[0.06]" : ""}`}>
              <p className="font-heading text-3xl md:text-4xl text-gold font-normal">{stat.value}</p>
              <p className="text-[11px] text-white/40 mt-1.5 tracking-[0.15em] uppercase">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Hero;
