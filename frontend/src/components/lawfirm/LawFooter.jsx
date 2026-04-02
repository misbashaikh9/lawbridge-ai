import { Link } from "react-router-dom";

const LawFooter = () => {
  return (
    <footer className="bg-navy-dark relative overflow-hidden">
      {/* Building skyline at top of footer */}
      <div className="absolute top-0 left-0 w-full pointer-events-none z-0">
        <svg className="w-full h-20 md:h-28" viewBox="0 0 1440 120" preserveAspectRatio="none" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0 120V60h60V30h15v-10h10v10h15v30h80V40h10V20h10v20h10v20h100V35h20v-15h10v15h20v25h60V30h15V10h10v20h15v30h80V40h10V15h10v25h10v20h100V30h20v-15h10v15h20v30h60V40h15V20h10v20h15v20h100V35h20v-10h10v10h20v25h60V30h10V10h10v20h10v30h80V40h20v-20h10v20h20v20h100V35h15v-15h10v15h15v25h0v40H0z" fill="rgba(191,163,122,0.03)" />
        </svg>
      </div>

      {/* Top CTA */}
      <div className="relative z-10 border-b border-white/[0.06]">
        <div className="max-w-7xl mx-auto px-8 lg:px-12 py-20 flex flex-col md:flex-row items-center justify-between gap-8">
          <div>
            <h3 className="font-heading text-3xl md:text-4xl font-normal text-white mb-2">
              Ready to Get Started?
            </h3>
            <p className="text-white/40 text-[15px] max-w-md">
              Schedule your free consultation and navigate your legal matters with confidence.
            </p>
          </div>
          <Link
            to="/signup"
            className="shrink-0 px-10 py-4 bg-gold text-navy font-semibold text-[13px] tracking-[0.06em] uppercase hover:bg-gold-light transition-all duration-300"
          >
            Free Consultation
          </Link>
        </div>
      </div>

      {/* Main footer */}
      <div className="relative z-10 max-w-7xl mx-auto px-8 lg:px-12 py-16">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div>
            <span className="font-heading text-[20px] font-semibold tracking-[0.04em] text-white">
              LAW<span className="text-gold">BRIDGE</span>
            </span>
            <p className="text-white/35 text-sm leading-[1.8] mt-5 mb-6">
              AI-powered legal guidance that makes justice accessible. Trusted by thousands across India.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white text-[11px] tracking-[0.15em] uppercase font-semibold mb-6">Quick Links</h4>
            <ul className="space-y-3.5">
              {[
                { label: "Home", href: "#hero" },
                { label: "About Us", href: "#about" },
                { label: "Practice Areas", href: "#practice" },
                { label: "Our Team", href: "#team" },
                { label: "Contact", href: "#contact" },
              ].map((link) => (
                <li key={link.label}>
                  <a href={link.href} className="text-white/40 text-sm hover:text-gold transition-colors duration-300">{link.label}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Practice Areas */}
          <div>
            <h4 className="text-white text-[11px] tracking-[0.15em] uppercase font-semibold mb-6">Practice Areas</h4>
            <ul className="space-y-3.5">
              {["Corporate Law", "Family Law", "Criminal Defense", "Property Law", "Labour Law", "Cyber Law"].map((area) => (
                <li key={area}>
                  <a href="#practice" className="text-white/40 text-sm hover:text-gold transition-colors duration-300">{area}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white text-[11px] tracking-[0.15em] uppercase font-semibold mb-6">Contact</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <span className="text-gold text-sm mt-0.5">&#9679;</span>
                <span className="text-white/40 text-sm">Mumbai, Maharashtra, India</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-gold text-sm mt-0.5">&#9679;</span>
                <span className="text-white/40 text-sm">+91 98765 43210</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-gold text-sm mt-0.5">&#9679;</span>
                <span className="text-white/40 text-sm">contact@lawbridge.ai</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="relative z-10 border-t border-white/[0.06]">
        <div className="max-w-7xl mx-auto px-8 lg:px-12 py-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-white/25 text-xs tracking-wide">
            &copy; 2026 LawBridge AI. All rights reserved.
          </p>
          <div className="flex gap-8">
            <a href="#" className="text-white/25 text-xs hover:text-gold transition-colors duration-300">Privacy Policy</a>
            <a href="#" className="text-white/25 text-xs hover:text-gold transition-colors duration-300">Terms of Service</a>
            <a href="#" className="text-white/25 text-xs hover:text-gold transition-colors duration-300">Disclaimer</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default LawFooter;
