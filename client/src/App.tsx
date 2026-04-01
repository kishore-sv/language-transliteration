import { useState } from "react";
import axios from "axios";
import "./App.css";
import Footer from "./components/footer";
import About from "./components/About";

const LANGUAGES = ["Kannada", "Hindi", "Telugu", "Tamil", "Malayalam"];

export default function App() {
  const [text, setText] = useState("");
  const [language, setLanguage] = useState("Kannada");
  const [engine, setEngine] = useState("external");
  const [output, setOutput] = useState("");
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const [view, setView] = useState<"main" | "about">("main");

  const convertText = async () => {
    if (!text.trim()) return;

    try {
      setLoading(true);
      const res = await axios.post(`/api/convert/${engine}`, {
        text,
        language,
      });
      setOutput(res.data.output);
    } catch (err) {
      setOutput("Error...");
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = () => {
    if (!output) return;
    navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) {
      convertText();
    }
  };

  return (
    <div className="container">
      {view === "main" ? (
        <div className="card">
        <div className="header">
          <h1>Chat Language Tool</h1>
          <p className="subtitle">Romanized → Native script</p>
        </div>

        <div className="input-block">
          <textarea
            placeholder="type like: I will call you later bro..."
            value={text}
            onChange={(e) => setText(e.target.value)}
            onKeyDown={handleKeyDown}
          />
        </div>

        <div className="controls">
          <label className="lang-label">
            <span className="lang-prefix">lang</span>
            <select value={language} onChange={(e) => setLanguage(e.target.value)}>
              {LANGUAGES.map((lang) => (
                <option key={lang}>{lang}</option>
              ))}
            </select>
          </label>

          <label className="lang-label">
            <span className="lang-prefix">engine</span>
            <select value={engine} onChange={(e) => setEngine(e.target.value)}>
              <option value="local">Local</option>
              <option value="external">External AI</option>
            </select>
          </label>

          <div className="btn-group">
            <button className="submit-btn" onClick={convertText} disabled={loading || !text.trim()}>
              {loading ? "..." : "convert"}
            </button>

            <button className={`copy-btn ${copied ? "copied" : ""}`} onClick={handleCopy}>
              {copied ? "copied" : "copy"}
            </button>
          </div>
        </div>

        <div className="output-block">
          {loading ? (
            <div className="typing-dots">
              <span /><span /><span />
            </div>
          ) : (
            output
          )}
        </div>
        </div>
      ) : (
        <About onBack={() => setView("main")} />
      )}
      <Footer onHomeClick={() => setView("main")} onAboutClick={() => setView("about")} />
    </div>
  );
}