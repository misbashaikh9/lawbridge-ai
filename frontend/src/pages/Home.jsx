import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Navbar from "../components/Navbar";
import "./Home.css";

const FeatureIcon = ({ type }) => {
  const icons = {
    chat: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
      </svg>
    ),
    classify: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="7" height="7" /><rect x="14" y="3" width="7" height="7" />
        <rect x="14" y="14" width="7" height="7" /><rect x="3" y="14" width="7" height="7" />
      </svg>
    ),
    severity: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
        <line x1="12" y1="9" x2="12" y2="13" /><line x1="12" y1="17" x2="12.01" y2="17" />
      </svg>
    ),
    lawyer: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
    template: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
        <polyline points="14 2 14 8 20 8" />
        <line x1="16" y1="13" x2="8" y2="13" /><line x1="16" y1="17" x2="8" y2="17" />
        <polyline points="10 9 9 9 8 9" />
      </svg>
    ),
    verify: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
        <polyline points="22 4 12 14.01 9 11.01" />
      </svg>
    ),
  };
  return <span className="feature-icon">{icons[type]}</span>;
};

const features = [
  { icon: "chat", title: "AI Legal Chat", desc: "Ask Indian legal questions and get AI-powered explanations in plain language." },
  { icon: "classify", title: "Legal Classification", desc: "Automatically categorize your issue across labour, consumer, property, cyber, family, constitutional, and criminal law." },
  { icon: "severity", title: "Case Severity Detection", desc: "Know if your issue is minor or serious and receive the right next steps instantly." },
  { icon: "lawyer", title: "Lawyer Recommendations", desc: "Get matched with lawyers based on your case category and city." },
  { icon: "template", title: "Template Generator", desc: "Generate complaint letters, legal notices, and request emails in seconds." },
  { icon: "verify", title: "Legal Information Check", desc: "Review whether legal information and claims appear reliable or misleading." },
];

const stats = [
  { value: "50K+", label: "Cases Resolved" },
  { value: "98%", label: "Accuracy Rate" },
  { value: "200+", label: "Legal Experts" },
  { value: "24/7", label: "AI Availability" },
];

const steps = [
  { n: "01", title: "Describe Your Issue", desc: "Type your legal question in plain, everyday language — no legal jargon required." },
  { n: "02", title: "AI Analyzes & Classifies", desc: "Our AI classifies your case, assesses severity, and simplifies complex laws for you." },
  { n: "03", title: "Get Actionable Results", desc: "Receive step-by-step guidance, document templates, or matched lawyer recommendations." },
];

const trustCards = [
  {
    icon: "⚙️",
    title: "Professional Services",
    desc: "Structured help for Indian legal issues across labour, family, property, cyber, consumer, and constitutional matters.",
  },
  {
    icon: "🏆",
    title: "Top Legal Experts",
    desc: "Designed to help users understand categories, severity, and the likely next legal step before approaching counsel.",
  },
  {
    icon: "💼",
    title: "Trusted Legal Workflow",
    desc: "A calmer, law-firm inspired interface that builds confidence before users move into AI-assisted analysis.",
  },
];

const partnerMarks = [
  "J.H RICK MEYERS",
  "MAC NET STUDIO",
  "firStudio PRINTING",
  "cronit",
  "STALLION",
  "BAVER boutique",
];

const teamMembers = [
  {
    name: "Advisory Workflow",
    role: "Legal intake design",
    body: "Built to help users frame their issue clearly before moving into formal legal action or professional consultation.",
  },
  {
    name: "AI Case Review",
    role: "Issue classification",
    body: "The platform organizes facts into understandable legal categories so the next step feels less uncertain.",
  },
  {
    name: "Document Support",
    role: "Practical legal output",
    body: "Templates, summaries, and structured guidance keep the product useful even before a lawyer is involved.",
  },
];

const newsItems = [
  {
    title: "Clearer first-step guidance for labour and salary disputes",
    body: "A more professional intake experience helps users describe workplace issues without legal jargon.",
  },
  {
    title: "Consumer and cyber issue triage with calmer presentation",
    body: "We present classification and next-step guidance in a format that feels reliable, restrained, and easier to trust.",
  },
  {
    title: "Property and family matters organized into simpler legal paths",
    body: "Dashboard-inspired sections now live inside Home so users can understand the service before signing in.",
  },
];

const legalAreas = [
  "Constitutional Law",
  "Consumer Protection",
  "Cyber Law",
  "Contract Law",
  "Property Law",
  "Criminal Law",
  "Labour Law",
  "Family Law",
];

const Home = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [showLoginPrompt, setShowLoginPrompt] = useState(false);

  const scrollToSection = (id) => {
    const target = document.getElementById(id);
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleAiAccess = () => {
    if (user) {
      navigate("/chat");
      return;
    }

    setShowLoginPrompt(true);
  };

  return (
    <div className="home">
      <Navbar />

      {/* ── Hero ─────────────────────────────── */}
      <section className="hero" id="hero">
        <div className="hero__badge">⚖️ Trusted Legal AI Platform</div>
        <h1 className="hero__title">
          Your <span className="hero__highlight">AI-Powered</span><br />
          Legal Assistant
        </h1>
        <p className="hero__sub">
          Understand your rights under Indian law, get instant legal guidance,
          and connect with the right legal help in one intelligent platform.
        </p>
        <div className="hero__buttons">
          {user ? (
            <>
              <button type="button" className="btn-primary" onClick={handleAiAccess}>Open AI Workspace</button>
              <button type="button" className="btn-secondary" onClick={() => scrollToSection("services")}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 6h16" /><path d="M4 12h16" /><path d="M4 18h10" />
                </svg>
                Explore Services
              </button>
            </>
          ) : (
            <>
              <Link to="/signup" className="btn-primary">Get Started Free</Link>
              <Link to="/login" className="btn-secondary">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10" /><polygon points="10 8 16 12 10 16 10 8" />
                </svg>
                See How It Works
              </Link>
            </>
          )}
        </div>

        {/* Stats strip */}
        <div className="hero__stats">
          {stats.map((s) => (
            <div key={s.label} className="hero__stat">
              <span className="hero__stat-value">{s.value}</span>
              <span className="hero__stat-label">{s.label}</span>
            </div>
          ))}
        </div>

        {/* Decorative blobs */}
        <div className="hero__blob hero__blob--1" />
        <div className="hero__blob hero__blob--2" />
      </section>

      {/* ── About ────────────────────────────── */}
      <section className="about section" id="about">
        <div className="container about__inner">
          <div className="about__text">
            <span className="section-label">Who We Are</span>
            <h2 className="section-title">Bridging the Gap Between<br />People &amp; the Law</h2>
            <p className="section-body">
              LawBridge AI was built with a mission: to make legal guidance affordable,
              accessible, and understandable for everyone. We combine cutting-edge
              artificial intelligence with a focus on common Indian legal issues
              to deliver answers you can understand quickly.
            </p>
            <p className="section-body">
              Whether you're dealing with a workplace dispute, consumer fraud, family issue,
              property matter, cyber complaint, or constitutional rights question, LawBridge AI is by your side.
            </p>
            <Link to="/signup" className="btn-outline">Learn More →</Link>
          </div>
          <div className="about__visual">
            <div className="about__card about__card--top">
              <span className="about__card-icon">⚖️</span>
              <div>
                <p className="about__card-title">Certified Legal AI</p>
                <p className="about__card-sub">Focused on common Indian legal issue patterns</p>
              </div>
            </div>
            <div className="about__card about__card--mid">
              <span className="about__card-icon">🔒</span>
              <div>
                <p className="about__card-title">100% Confidential</p>
                <p className="about__card-sub">Your data is always private &amp; secure</p>
              </div>
            </div>
            <div className="about__card about__card--bot">
              <span className="about__card-icon">🌐</span>
              <div>
                <p className="about__card-title">Multi-Jurisdiction</p>
                <p className="about__card-sub">Built primarily for Indian legal contexts</p>
              </div>
            </div>
            <div className="about__glow" />
          </div>
        </div>
      </section>

      <section className="firm-strip">
        <div className="container firm-strip__cards">
          {trustCards.map((card) => (
            <article className="firm-strip__card" key={card.title}>
              <div className="firm-strip__icon" aria-hidden="true">{card.icon}</div>
              <h3>{card.title}</h3>
              <p>{card.desc}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="partner-strip" aria-label="Trusted brands and partner marks">
        <div className="container partner-strip__inner">
          {partnerMarks.map((mark) => (
            <span className="partner-strip__mark" key={mark}>{mark}</span>
          ))}
        </div>
      </section>

      {/* ── Services / Features ──────────────── */}
      <section className="features section" id="services">
        <div className="container">
          <span className="section-label">What We Offer</span>
          <h2 className="section-title features__title">Everything You Need,<br />All in One Place</h2>
          <div className="features-grid" id="features">
            {features.map((f) => (
              f.icon === "chat" ? (
                <button
                  type="button"
                  className="feature-card feature-card--action"
                  key={f.title}
                  onClick={handleAiAccess}
                >
                  <FeatureIcon type={f.icon} />
                  <h3>{f.title}</h3>
                  <p>{f.desc}</p>
                </button>
              ) : (
                <div className="feature-card" key={f.title}>
                  <FeatureIcon type={f.icon} />
                  <h3>{f.title}</h3>
                  <p>{f.desc}</p>
                </div>
              )
            ))}
          </div>
        </div>
      </section>

      <section className="editorial section" id="team">
        <div className="container editorial__layout">
          <div className="editorial__panel editorial__panel--left">
            <span className="section-label">About Us</span>
            <h2 className="section-title">Built Around Real Indian Legal Problems People Face Every Day</h2>
            <p className="section-body">
              LawBridge AI is designed to classify common Indian legal issues in simple language so users can understand what kind of matter they may be dealing with before taking further steps.
            </p>
            <a href="#quote" className="btn-outline">Discuss Your Issue</a>
          </div>

          <div className="editorial__visual">
            <div className="editorial__halo" />
            <img
              src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=700&auto=format&fit=crop&q=60"
              alt="Legal professional"
            />
          </div>

          <div className="editorial__panel editorial__panel--right">
            <span className="section-label">Why Choose Us</span>
            <h2 className="section-title">Focused On Indian Categories, Clear Severity, And Simple Guidance</h2>
            <p className="section-body">
              The platform is trained on legal issue descriptions covering labour disputes, family matters, consumer complaints, cyber fraud, property disputes, criminal issues, contracts, and constitutional concerns.
            </p>
            <div className="editorial__team-list">
              {teamMembers.map((member) => (
                <article className="editorial__team-card" key={member.name}>
                  <h3>{member.name}</h3>
                  <p className="editorial__role">{member.role}</p>
                  <p>{member.body}</p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── How It Works ─────────────────────── */}
      <section className="how-it-works section" id="howitworks">
        <div className="container">
          <span className="section-label">The Process</span>
          <h2 className="section-title">How LawBridge AI Works</h2>
          <div className="steps">
            {steps.map((s, i) => (
              <div className="step" key={s.n}>
                <div className="step__head">
                  <span className="step-number">{s.n}</span>
                  {i < steps.length - 1 && <span className="step__connector" />}
                </div>
                <h3>{s.title}</h3>
                <p>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="insights section" id="news">
        <div className="container">
          <span className="section-label">News</span>
          <h2 className="section-title insights__title">Recent Product And Legal Service Updates</h2>
          <div className="insights__grid">
            {newsItems.map((item) => (
              <article className="insights__card" key={item.title}>
                <span className="insights__tag">LawBridge Update</span>
                <h3>{item.title}</h3>
                <p>{item.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA / Quote ──────────────────────── */}
      <section className="quote section" id="quote">
        <div className="container quote__inner">
          <span className="section-label quote__label">Get In Touch</span>
          <h2 className="section-title quote__title">Ready to Take Control<br />of Your Legal Situation?</h2>
          <p className="section-body quote__body">
            Start your journey today. Describe your issue and let LawBridge AI guide you
            toward the right next step under Indian law.
          </p>
          <form className="quote__form" onSubmit={(e) => e.preventDefault()}>
            <div className="quote__row">
              <input className="quote__input" type="text" placeholder="Your Full Name" required />
              <input className="quote__input" type="email" placeholder="Email Address" required />
            </div>
            <textarea className="quote__textarea" placeholder="Briefly describe your legal issue..." rows={4} required />
            <button type="submit" className="btn-primary quote__submit">
              Send Message
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
              </svg>
            </button>
          </form>
        </div>
        <div className="quote__blob" />
      </section>

      <section className="practice-grid section">
        <div className="container">
          <div className="practice-grid__header">
            <div>
              <span className="section-label">Services</span>
              <h2 className="section-title practice-grid__title">Core Legal Areas</h2>
            </div>
            <button type="button" className="btn-secondary" onClick={() => scrollToSection("services")}>
              View All
            </button>
          </div>
          <div className="practice-grid__items">
            {legalAreas.map((area) => (
              <article className="practice-grid__item" key={area}>
                <div className="practice-grid__icon" aria-hidden="true">⚖️</div>
                <p>{area}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ── Footer ───────────────────────────── */}
      <footer className="home-footer">
        <div className="container footer__inner">
          <div className="footer__brand">
            <svg className="footer__logo-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 2L2 7l10 5 10-5-10-5z" />
              <path d="M2 17l10 5 10-5" />
              <path d="M2 12l10 5 10-5" />
            </svg>
            <span className="footer__brand-name">LAWBRIDGE</span>
          </div>
          <p className="footer__tagline">AI-powered legal guidance for everyone.</p>
          <div className="footer__links">
            <Link to="/login" className="footer__link">Login</Link>
            <Link to="/signup" className="footer__link">Sign Up</Link>
            <a href="#about" className="footer__link">About</a>
            <a href="#services" className="footer__link">Services</a>
            <a href="#quote" className="footer__link">Contact</a>
          </div>
          <p className="footer__copy">© 2026 LawBridge AI. All rights reserved.</p>
        </div>
      </footer>

      <button
        type="button"
        className="home-ai-link"
        aria-label={user ? "Open AI chat workspace" : "AI assistant login required"}
        onClick={handleAiAccess}
      >
        <span className="home-ai-link__label">Ask AI</span>
        <span className="home-ai-link__icon" aria-hidden="true">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 3l1.4 2.84L16.5 7l-3.1 1.16L12 11l-1.4-2.84L7.5 7l3.1-1.16L12 3z" />
            <path d="M6 14.5A3.5 3.5 0 0 1 9.5 11h5A3.5 3.5 0 0 1 18 14.5v1A2.5 2.5 0 0 1 15.5 18H8.5A2.5 2.5 0 0 1 6 15.5v-1z" />
            <path d="M9 18v1.25A1.75 1.75 0 0 0 10.75 21h2.5A1.75 1.75 0 0 0 15 19.25V18" />
            <circle cx="10" cy="14.5" r="0.6" fill="currentColor" stroke="none" />
            <circle cx="14" cy="14.5" r="0.6" fill="currentColor" stroke="none" />
          </svg>
        </span>
      </button>

      {showLoginPrompt && (
        <div className="home-modal-backdrop" onClick={() => setShowLoginPrompt(false)}>
          <div
            className="home-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="home-modal-title"
            onClick={(event) => event.stopPropagation()}
          >
            <span className="home-modal__eyebrow">LawBridge AI</span>
            <h3 id="home-modal-title" className="home-modal__title">Login required</h3>
            <p className="home-modal__body">
              Please log in to open the AI workspace and start your legal analysis.
            </p>
            <div className="home-modal__actions">
              <Link to="/login" className="btn-primary" onClick={() => setShowLoginPrompt(false)}>
                Login
              </Link>
              <button type="button" className="btn-secondary" onClick={() => setShowLoginPrompt(false)}>
                Stay on home
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
