import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import LawNavbar from "./LawNavbar";
import Hero from "./Hero";
import Services from "./Services";
import About from "./About";
import WhyChooseUs from "./WhyChooseUs";
import LawFooter from "./LawFooter";

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
    <div className="bg-white">
      <LawNavbar />
      <Hero />
      <Services />
      <About />
      <WhyChooseUs />

    
      <LawFooter />

      {/* Floating AI Button */}
      <button
        type="button"
        onClick={handleAiAccess}
        className="fixed bottom-8 right-8 z-50 flex items-center gap-2.5 px-6 py-3 font-semibold text-[13px] tracking-wide rounded-lg shadow-lg hover:-translate-y-0.5 transition-all duration-200"
        style={{ background: '#E4574E', color: '#fff' }}
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
        <div className="fixed inset-0 z-[100] bg-[#18181b]/40 backdrop-blur-sm flex items-center justify-center p-4" onClick={() => setShowLoginPrompt(false)}>
          <div
            className="bg-white max-w-md w-full p-10 text-center rounded-xl border border-[#E4574E] shadow-2xl"
            role="dialog"
            aria-modal="true"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="w-10 h-10 rounded-lg bg-[#E4574E]/10 flex items-center justify-center mx-auto mb-6">
              <svg className="w-5 h-5 text-[#E4574E]" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-[#18181b] mb-2">Login Required</h3>
            <p className="text-[#23263a] text-sm leading-[1.7] mb-8">
              Please log in to access the AI workspace and start your legal analysis.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link
                to="/login"
                className="px-8 py-3 bg-[#E4574E] text-white font-semibold text-[13px] tracking-wide rounded-lg hover:bg-[#c13d36] transition-colors duration-200"
                onClick={() => setShowLoginPrompt(false)}
              >
                Login
              </Link>
              <button
                type="button"
                className="px-8 py-3 border border-[#E4574E] text-[#18181b] text-[13px] font-medium rounded-lg hover:border-[#23263a] hover:text-[#23263a] transition-colors duration-200"
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
