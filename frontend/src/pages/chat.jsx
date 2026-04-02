import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import API from "../services/api";
import "./Chat.css";

const starterPrompts = [
  "My employer is not depositing my provident fund and salary is delayed.",
  "The builder has delayed possession of my flat and is ignoring RERA commitments.",
  "Someone used my Aadhaar and bank details for online fraud.",
];

const buildAssistantMessage = (category, severity) => {
  if (!category && !severity) {
    return "I could not classify that issue clearly. Try adding more concrete details about what happened.";
  }

  if (!severity) {
    return `This issue appears to fall under ${category} under Indian law.`;
  }

  return `This issue appears to fall under ${category} under Indian law, and the current severity looks ${severity.toLowerCase()}.`;
};

const buildErrorMessage = (error) => {
  const status = error.response?.status;
  const code = error.response?.data?.code;

  if (status === 503 || code === "AI_TEMPORARILY_UNAVAILABLE") {
    return "The AI service is still starting up. The first request can take longer than usual, so please try again shortly.";
  }

  if (status === 400) {
    return "Please enter a clearer description before sending the request.";
  }

  return "The AI service could not analyze that issue just now. Try again in a moment.";
};

export default function Chat() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef(null);

  const resetConversation = () => {
    if (loading) return;
    setMessages([]);
    setInput("");
  };

  const sendMessage = async (presetQuestion) => {
    const question = (presetQuestion ?? input).trim();

    if (!question || loading) return;

    const userMsg = { type: "user", text: question };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setLoading(true);

    try {
      const res = await API.post("/api/ai/query", { question });
      const { category, severity } = res.data;

      const aiMsg = {
        type: "ai",
        text: buildAssistantMessage(category, severity),
        category,
        severity,
      };

      setMessages((prev) => [...prev, aiMsg]);
    } catch (err) {
      console.error(err);
      setMessages((prev) => [
        ...prev,
        {
          type: "ai",
          text: buildErrorMessage(err),
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleComposerKeyDown = (event) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      sendMessage();
    }
  };

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  useEffect(() => {
    API.get("/api/ai/warmup").catch(() => null);
  }, []);

  return (
    <div className="chat-page">
      <div className="chat-layout">
        <aside className="chat-sidebar" aria-label="Chat navigation">
          <div className="chat-sidebar__top">
            <Link to="/" className="chat-sidebar__back" aria-label="Back to home">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M15 18l-6-6 6-6" />
              </svg>
              <span>Back to home</span>
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
                <button
                  key={prompt}
                  type="button"
                  className="chat-sidebar__prompt"
                  onClick={() => sendMessage(prompt)}
                >
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

        <main className="chat-workspace" aria-label="LawBridge chat workspace">
          <header className="chat-workspace__header">
            <div>
              <p className="chat-workspace__eyebrow">Legal issue analysis</p>
              <h2 className="chat-workspace__title">Describe the matter in plain language</h2>
            </div>
            <p className="chat-workspace__subtitle">
              The assistant will return a legal category and severity based on your description.
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
              <div key={`${msg.type}-${index}-${msg.text}`} className={`chat-message chat-message--${msg.type}`}>
                <div className="chat-message__avatar">{msg.type === "user" ? "You" : "AI"}</div>
                <div className="chat-message__bubble">
                  <p className="chat-message__text">{msg.text}</p>
                  {msg.type === "ai" && (msg.category || msg.severity) && (
                    <div className="chat-message__meta-row">
                      {msg.category && <span className="chat-chip">Category: {msg.category}</span>}
                      {msg.severity && <span className="chat-chip">Severity: {msg.severity}</span>}
                    </div>
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

          <div className="chat-composer">
            <div className="chat-composer__row">
              <textarea
                id="legal-issue-input"
                className="chat-composer__input"
                value={input}
                onChange={(event) => setInput(event.target.value)}
                onKeyDown={handleComposerKeyDown}
                placeholder="Describe your legal issue..."
                rows={3}
              />
              <button
                type="button"
                onClick={() => sendMessage()}
                className="chat-composer__button"
                disabled={loading}
              >
                {loading ? "Analyzing..." : "Analyze"}
              </button>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}