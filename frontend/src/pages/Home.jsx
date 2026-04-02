import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import LawNavbar from "../components/lawfirm/LawNavbar";
import Hero from "../components/lawfirm/Hero";
import About from "../components/lawfirm/About";
import PracticeAreas from "../components/lawfirm/PracticeAreas";
import WhyChooseUs from "../components/lawfirm/WhyChooseUs";
import Team from "../components/lawfirm/Team";
import LawFooter from "../components/lawfirm/LawFooter";

const Home = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [showLoginPrompt, setShowLoginPrompt] = useState(false);

  const handleAiAccess = () => {
    if (user) {
      navigate("/chat");
      return;
    }
    setShowLoginPrompt(true);
  };

  return (
    <div className="bg-ivory">
      <LawNavbar />
      <Hero />
      <About />
      <PracticeAreas />
      <WhyChooseUs />
      <Team />

      {/* Contact Section */}
      <section id="contact" className="py-28 bg-white">
        <div className="max-w-3xl mx-auto px-8 lg:px-12">
          <div className="text-center mb-14">
            <div className="flex items-center justify-center gap-4 mb-6">
              <div className="w-12 h-px bg-gold" />
              <span className="text-gold text-[12px] tracking-[0.2em] uppercase font-semibold">Get In Touch</span>
              <div className="w-12 h-px bg-gold" />
            </div>
            <h2 className="font-heading text-4xl md:text-[44px] font-normal text-charcoal mb-5">
              Schedule a Consultation
            </h2>
            <p className="text-gray leading-[1.8] text-[15px]">
              Describe your legal situation and our team will respond within 24 hours.
            </p>
          </div>

          <form
            className="border border-gray-200 p-10 md:p-12"
            onSubmit={(e) => e.preventDefault()}
          >
            <div className="grid sm:grid-cols-2 gap-5 mb-5">
              <input
                type="text"
                placeholder="Your Full Name"
                required
                className="w-full px-5 py-3.5 border border-gray-200 bg-ivory text-charcoal text-sm placeholder:text-gray-light focus:outline-none focus:border-gold transition-colors duration-300"
              />
              <input
                type="email"
                placeholder="Email Address"
                required
                className="w-full px-5 py-3.5 border border-gray-200 bg-ivory text-charcoal text-sm placeholder:text-gray-light focus:outline-none focus:border-gold transition-colors duration-300"
              />
            </div>
            <textarea
              placeholder="Briefly describe your legal issue..."
              rows={5}
              required
              className="w-full px-5 py-3.5 border border-gray-200 bg-ivory text-charcoal text-sm placeholder:text-gray-light focus:outline-none focus:border-gold transition-colors duration-300 resize-none mb-7"
            />
            <button
              type="submit"
              className="w-full sm:w-auto px-10 py-3.5 bg-gold text-navy font-semibold text-[13px] tracking-[0.06em] uppercase hover:bg-gold-light transition-all duration-300 flex items-center justify-center gap-3 mx-auto"
            >
              Send Message
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </button>
          </form>
        </div>
      </section>

      <LawFooter />

      {/* Floating AI Button */}
      <button
        type="button"
        onClick={handleAiAccess}
        className="fixed bottom-8 right-8 z-50 flex items-center gap-2.5 px-6 py-3.5 bg-gold text-navy font-semibold text-[13px] tracking-[0.04em] uppercase hover:bg-gold-light hover:-translate-y-0.5 transition-all duration-300"
        aria-label={user ? "Open AI chat workspace" : "AI assistant login required"}
      >
        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 3l1.4 2.84L16.5 7l-3.1 1.16L12 11l-1.4-2.84L7.5 7l3.1-1.16L12 3z" />
          <path d="M6 14.5A3.5 3.5 0 0 1 9.5 11h5A3.5 3.5 0 0 1 18 14.5v1A2.5 2.5 0 0 1 15.5 18H8.5A2.5 2.5 0 0 1 6 15.5v-1z" />
          <path d="M9 18v1.25A1.75 1.75 0 0 0 10.75 21h2.5A1.75 1.75 0 0 0 15 19.25V18" />
        </svg>
        Ask AI
      </button>

      {/* Login Prompt Modal */}
      {showLoginPrompt && (
        <div className="fixed inset-0 z-[100] bg-navy/70 backdrop-blur-sm flex items-center justify-center p-4" onClick={() => setShowLoginPrompt(false)}>
          <div
            className="bg-white max-w-md w-full p-10 text-center border border-gray-200"
            role="dialog"
            aria-modal="true"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="w-px h-10 bg-gold mx-auto mb-6" />
            <h3 className="font-heading text-2xl text-charcoal mb-3">Login Required</h3>
            <p className="text-gray text-sm leading-[1.7] mb-8">
              Please log in to access the AI workspace and start your legal analysis.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link
                to="/login"
                className="px-8 py-3 bg-gold text-navy font-semibold text-[13px] tracking-[0.06em] uppercase hover:bg-gold-light transition-colors duration-300"
                onClick={() => setShowLoginPrompt(false)}
              >
                Login
              </Link>
              <button
                type="button"
                className="px-8 py-3 border border-gray-200 text-gray text-[13px] tracking-[0.06em] uppercase font-medium hover:border-charcoal hover:text-charcoal transition-colors duration-300"
                onClick={() => setShowLoginPrompt(false)}
              >
                Stay on Home
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
