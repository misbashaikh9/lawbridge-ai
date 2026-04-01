import { Link } from "react-router-dom";
import "./Dashboard.css";

const Dashboard = () => {
  return (
    <div className="dashboard">
      {/* Navbar Structure tailored to Dashboard */}
      <nav className="dashboard-nav">
        <div className="nav-logo">
          <span className="logo-c">C</span>ollateral
          <span className="logo-associate">ASSOCIATES</span>
        </div>
        <div className="nav-links">
          <Link to="#">Home</Link>
          <Link to="#">Services</Link>
          <Link to="#">Team</Link>
          <Link to="#">About</Link>
          <Link to="#">News</Link>
          <Link to="#" className="btn-contact">Contact</Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="dash-hero">
        <div className="hero-content">
          <p className="hero-subtitle">SERVING RIGHT - SINCE 2020</p>
          <h1 className="hero-title">
            Practical Legal Support For <span className="highlight-gold">Everyday Indian Issues</span>.
          </h1>
          <div className="hero-buttons">
            <button className="btn-primary">Get A Free Quote</button>
            <button className="btn-secondary">Legal Services</button>
          </div>
          <div className="hero-info-row">
            <span><i className="icon-map"></i> India-focused legal assistance platform</span>
            <span><i className="icon-phone"></i> +91 80000 00000</span>
            <span><i className="icon-envelope"></i> support@lawbridge.ai</span>
          </div>
        </div>
        <div className="hero-image-container">
            {/* Using a placeholder for the hero lawyer */}
          <div className="hero-circle-bg"></div>
          <img src="https://images.unsplash.com/photo-1560250097-0b93528c311a?w=500&auto=format&fit=crop&q=60" alt="Lawyer" className="hero-lawyer-img" />
        </div>
      </section>

      {/* Feature Cards Row */}
      <section className="dash-features">
        <div className="feature-card">
          <div className="icon-wrapper">
             <div className="icon-inner">⚙️</div>
          </div>
          <h3>Professional Services</h3>
          <p>Structured help for Indian legal issues across labour, family, property, cyber, consumer, and constitutional matters.</p>
        </div>
        <div className="feature-card">
          <div className="icon-wrapper">
             <div className="icon-inner">🏆</div>
          </div>
          <h3>Top Legal Experts</h3>
          <p>Designed to help users understand categories, severity, and the likely next legal step before approaching counsel.</p>
        </div>
        <div className="feature-card">
          <div className="icon-wrapper">
             <div className="icon-inner">💰</div>
          </div>
          <h3>Competitive Pricing</h3>
          <p>A student-built legal AI experience that keeps guidance accessible while following a professional app flow.</p>
        </div>
      </section>

      {/* Logos Section */}
      <section className="dash-brands">
         <h4 className="sr-only">Our Partners</h4>
         <div className="brand-logo">J.H RICK MEYERS</div>
         <div className="brand-logo border-box">MAC NET STUDIO</div>
         <div className="brand-logo">firStudio PRINTING</div>
         <div className="brand-logo font-bold">cronit</div>
         <div className="brand-logo split">STAL<br/>LION</div>
         <div className="brand-logo stylish">BAVER boutique</div>
      </section>

      {/* Split Content Section */}
      <section className="dash-split-content">
        <div className="split-text left-text">
            <h5 className="sub-heading">ABOUT US</h5>
            <h2>Built Around Real Indian Legal Problems People Face Every Day</h2>
            <p>LawBridge AI is designed to classify common Indian legal issues in simple language so users can understand what kind of matter they may be dealing with before taking further steps.</p>
            <a href="#" className="read-more">- Read More -</a>
        </div>
        
        <div className="split-image">
            {/* Using placeholder for the lady lawyer */}
            <div className="split-circle-bg"></div>
            <img src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=500&auto=format&fit=crop&q=60" alt="Female Lawyer" />
        </div>

        <div className="split-text right-text">
             <h5 className="sub-heading">WHY CHOOSE US</h5>
            <h2>Focused On Indian Categories, Clear Severity, And Simple Guidance</h2>
            <p>The platform is trained on legal issue descriptions covering labour disputes, family matters, consumer complaints, cyber fraud, property disputes, criminal issues, contracts, and constitutional concerns.</p>
             <a href="#" className="read-more">- Read More -</a>
        </div>
      </section>

      {/* Quote Form Section */}
      <section className="dash-quote">
         <div className="quote-container">
            <h2>Describe Your Legal Issue</h2>
            <form className="quote-form">
                <input type="text" placeholder="First Name*" required />
                <input type="text" placeholder="Last Name*" required />
                <input type="email" placeholder="Email*" required />
                <input type="tel" placeholder="Phone*" required />
                <button type="submit">Submit Request</button>
            </form>
         </div>
      </section>

      {/* Services Grid Footer */}
      <section className="dash-services-grid">
         <div className="services-header">
             <h2>Services</h2>
             <button className="btn-view-all">View All</button>
         </div>
         <div className="grid-container">
             <div className="service-item">
                 <div className="svc-icon">📍</div>
                 <p>Constitutional Law</p>
             </div>
             <div className="service-item">
                 <div className="svc-icon">🎓</div>
                 <p>Consumer Protection</p>
             </div>
             <div className="service-item">
                 <div className="svc-icon">🛡️</div>
                 <p>Cyber Law</p>
             </div>
             <div className="service-item">
                 <div className="svc-icon">💼</div>
                 <p>Contract Law</p>
             </div>
             <div className="service-item">
                 <div className="svc-icon">🚗</div>
                 <p>Property Law</p>
             </div>
             <div className="service-item">
                 <div className="svc-icon">⚖️</div>
                 <p>Criminal Law</p>
             </div>
             <div className="service-item">
                 <div className="svc-icon">👷</div>
               <p>Labour Law</p>
             </div>
             <div className="service-item">
                 <div className="svc-icon">👨‍👩‍👧‍👦</div>
                 <p>Family Law</p>
             </div>
         </div>
      </section>

      <Link to="/chat" className="dashboard-ai-link" aria-label="Open AI chat workspace">
        <span className="dashboard-ai-link__label">Ask AI</span>
        <span className="dashboard-ai-link__icon" aria-hidden="true">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 3l1.4 2.84L16.5 7l-3.1 1.16L12 11l-1.4-2.84L7.5 7l3.1-1.16L12 3z" />
            <path d="M6 14.5A3.5 3.5 0 0 1 9.5 11h5A3.5 3.5 0 0 1 18 14.5v1A2.5 2.5 0 0 1 15.5 18H8.5A2.5 2.5 0 0 1 6 15.5v-1z" />
            <path d="M9 18v1.25A1.75 1.75 0 0 0 10.75 21h2.5A1.75 1.75 0 0 0 15 19.25V18" />
            <circle cx="10" cy="14.5" r="0.6" fill="currentColor" stroke="none" />
            <circle cx="14" cy="14.5" r="0.6" fill="currentColor" stroke="none" />
          </svg>
        </span>
      </Link>

    </div>
  );
};

export default Dashboard;
