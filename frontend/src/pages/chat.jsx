import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import API from "../services/api";
import "./Chat.css";

const starterPrompts = [
  "My employer is not depositing my provident fund and salary is delayed.",
  "The builder has delayed possession of my flat and is ignoring RERA commitments.",
  "Someone used my Aadhaar and bank details for online fraud.",
];

const buildErrorMessage = (error) => {
  const status = error.response?.status;
  const code   = error.response?.data?.code;

  if (status === 503 || code === "AI_TEMPORARILY_UNAVAILABLE") {
    return "The AI service is waking up or temporarily busy. Please try again in a few seconds.";
  }
  if (status === 400) {
    return "Please enter a clearer description before sending the request.";
  }
  if (status === 404) {
    return "Chat API endpoint not found. Check that the backend exposes POST /api/ai/query.";
  }
  return "The AI service could not analyze that issue just now. Try again in a moment.";
};

// Renders full_response text line by line preserving all formatting
function RichResponse({ text }) {
  return (
    <div className="chat-rich-response">
      {text.split("\n").map((line, i) => {
        const trimmed = line.trim();

        // Empty line → spacer
        if (!trimmed) {
          return <div key={i} className="chat-rich-spacer" />;
        }

        // Section headings: lines starting with a digit like "2." "3." "4."
        if (/^\d+\./.test(trimmed)) {
          return <p key={i} className="chat-rich-heading">{trimmed}</p>;
        }

        // Step lines: "Step 1:" "Step 2:" etc.
        if (/^Step \d+:/i.test(trimmed)) {
          return <p key={i} className="chat-rich-step">{trimmed}</p>;
        }

        // Default line
        return <p key={i} className="chat-rich-line">{trimmed}</p>;
      })}
    </div>
  );
}

export default function Chat() {
  const [messages, setMessages]  = useState([]);
  const [input,    setInput]     = useState("");
  const [loading,  setLoading]   = useState(false);
  const warmupPromiseRef = useRef(null);
  const bottomRef        = useRef(null);

  const resetConversation = () => {
    if (loading) return;
    setMessages([]);
    setInput("");
  };

  const sendMessage = async (presetQuestion) => {
    const question = (presetQuestion ?? input).trim();
    if (!question || loading) return;

    if (warmupPromiseRef.current) {
      try   { await warmupPromiseRef.current; }
      catch (e) { console.error("Warmup failed:", e); }
      finally   { warmupPromiseRef.current = null; }
    }

    setMessages((prev) => [...prev, { type: "user", text: question }]);
    setInput("");
    setLoading(true);

    try {
      // Backend proxies to ai-service /predict (see backend/routes/ai.js)
      const res = await API.post("/api/ai/query", { question });

      const { category, severity, full_response, error } = res.data;

      if (error) {
        setMessages((prev) => [...prev, { type: "ai", text: `Error: ${error}` }]);
        return;
      }

      setMessages((prev) => [
        ...prev,
        { type: "ai", full_response, category, severity },
      ]);
    } catch (err) {
      console.error(err);
      setMessages((prev) => [
        ...prev,
        { type: "ai", text: buildErrorMessage(err) },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleComposerKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  

  return (
    <div className="chat-page">
      <div className="chat-layout">

        {/* Sidebar */}
        <aside className="chat-sidebar" aria-label="Chat navigation">
          <div className="chat-sidebar__top">
            <Link to="/dashboard" className="chat-sidebar__back" aria-label="Back to dashboard">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"
                strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M15 18l-6-6 6-6" />
              </svg>
              <span>Back to dashboard</span>
            </Link>

            <div className="chat-sidebar__brand">
              <p className="chat-sidebar__eyebrow">LawBridge AI</p>
              <h1 className="chat-sidebar__title">Legal assistant</h1>
            </div>

            <button type="button" className="chat-sidebar__new" onClick={resetConversation}>
              New analysis
            </button>
          </div>

          <div className="chat-sidebar__section">
            <p className="chat-sidebar__label">Suggested prompts</p>
            <div className="chat-sidebar__prompts" aria-label="Suggested prompts">
              {starterPrompts.map((prompt) => (
                <button key={prompt} type="button"
                  className="chat-sidebar__prompt"
                  onClick={() => sendMessage(prompt)}>
                  {prompt}
                </button>
              ))}
            </div>
          </div>

          <div className="chat-sidebar__section chat-sidebar__section--note">
            <p className="chat-sidebar__label">Best results</p>
            <p className="chat-sidebar__note">
              Include what happened, who was involved, and what loss or harm occurred.
            </p>
          </div>
        </aside>

        {/* Main workspace */}
        <main className="chat-workspace" aria-label="LawBridge chat workspace">
          <header className="chat-workspace__header">
            <div>
              <p className="chat-workspace__eyebrow">Legal issue analysis</p>
              <h2 className="chat-workspace__title">Describe the matter in plain language</h2>
            </div>
            <p className="chat-workspace__subtitle">
              The assistant will explain the applicable law and steps you should take.
            </p>
          </header>

          <div className="chat-messages">
            {messages.length === 0 && !loading && (
              <div className="chat-empty-state">
                <div className="chat-empty-state__badge">Ready</div>
                <h3 className="chat-empty-state__title">Start a new legal analysis</h3>
                <p className="chat-empty-state__body">
                  Use the prompt box below or choose a suggested issue from the sidebar.
                </p>
              </div>
            )}

            {messages.map((msg, index) => (
              <div key={`${msg.type}-${index}`}
                className={`chat-message chat-message--${msg.type}`}>
                <div className="chat-message__avatar">
                  {msg.type === "user" ? "You" : "AI"}
                </div>

                <div className="chat-message__bubble">
                  {/* AI message with rich Groq response */}
                  {msg.type === "ai" && msg.full_response ? (
                    <>
                      <RichResponse text={msg.full_response} />
                      {(msg.category || msg.severity) && (
                        <div className="chat-message__meta-row">
                          {msg.category && (
                            <span className="chat-chip">{msg.category}</span>
                          )}
                          {msg.severity && (
                            <span className={`chat-chip chat-chip--${msg.severity.toLowerCase()}`}>
                              {msg.severity}
                            </span>
                          )}
                        </div>
                      )}
                    </>
                  ) : (
                    <p className="chat-message__text">{msg.text}</p>
                  )}
                </div>
              </div>
            ))}

            {loading && (
              <div className="chat-message chat-message--ai">
                <div className="chat-message__avatar">AI</div>
                <div className="chat-message__bubble chat-message__bubble--loading">
                  <span className="chat-typing-dot" />
                  <span className="chat-typing-dot" />
                  <span className="chat-typing-dot" />
                </div>
              </div>
            )}

            <div ref={bottomRef} />
          </div>

          {/* Composer */}
          <div className="chat-composer">
            <div className="chat-composer__row">
              <textarea
                id="legal-issue-input"
                className="chat-composer__input"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleComposerKeyDown}
                placeholder="Describe your legal issue..."
                rows={3}
              />
              <button type="button"
                onClick={() => sendMessage()}
                className="chat-composer__button"
                disabled={loading}>
                {loading ? "Analyzing..." : "Analyze"}
              </button>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}