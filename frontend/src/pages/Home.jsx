import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import "./Home.css";

const Home = () => {
  return (
    <div className="home">
      <Navbar />

      {/* Hero Section */}
      <section className="hero">
        <h1>AI-Powered Legal Assistance</h1>
        <p>Understand your rights, get legal guidance, and connect with lawyers — all in one platform.</p>
        <div className="hero-buttons">
          <Link to="/signup" className="btn-primary">Get Started</Link>
          <Link to="/login" className="btn-secondary">Login</Link>
        </div>
      </section>

      {/* Features Section */}
      <section className="features">
        <h2>What LawBridge AI Offers</h2>
        <div className="features-grid">
          <div className="feature-card">
            <h3>AI Legal Chat</h3>
            <p>Ask legal questions and get instant AI-powered explanations.</p>
          </div>
          <div className="feature-card">
            <h3>Legal Classification</h3>
            <p>Automatically categorize your issue — Labour, Consumer, Property, Cyber, or Criminal Law.</p>
          </div>
          <div className="feature-card">
            <h3>Case Severity Detection</h3>
            <p>Know if your issue is minor or serious and get the right next steps.</p>
          </div>
          <div className="feature-card">
            <h3>Lawyer Recommendations</h3>
            <p>Get matched with lawyers based on your case category and location.</p>
          </div>
          <div className="feature-card">
            <h3>Template Generator</h3>
            <p>Generate complaint letters, legal notices, and request emails instantly.</p>
          </div>
          <div className="feature-card">
            <h3>Fake Content Detection</h3>
            <p>Verify if legal articles and information are reliable or misleading.</p>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="how-it-works">
        <h2>How It Works</h2>
        <div className="steps">
          <div className="step">
            <span className="step-number">1</span>
            <h3>Describe Your Issue</h3>
            <p>Type your legal question in plain language.</p>
          </div>
          <div className="step">
            <span className="step-number">2</span>
            <h3>AI Analyzes</h3>
            <p>Our AI classifies, simplifies, and provides guidance.</p>
          </div>
          <div className="step">
            <span className="step-number">3</span>
            <h3>Get Results</h3>
            <p>Receive step-by-step guidance or lawyer recommendations.</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="home-footer">
        <p>&copy; 2026 LawBridge AI. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Home;

