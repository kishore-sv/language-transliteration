export default function About({ onBack }: { onBack: () => void }) {
  return (
    <div className="card about-card">
      <div className="header">
        <h1>About the Tool</h1>
        <p className="subtitle">Translating context, not just letters</p>
      </div>

      <div className="about-content">
        <p>
          Chat Language Tool is a specialized transliteration engine designed for casual 
          digital communication. It converts Romanized text (English letters) into native 
          scripts while preserving the informal, spoken nuances of the language.
        </p>

        <div className="features">
          <h3>Key Features</h3>
          <ul>
            <li><strong>Natural Flow:</strong> Optimized for WhatsApp and casual chat styles.</li>
            <li><strong>Multiple Languages:</strong> Support for Kannada, Hindi, Telugu, Tamil, and Malayalam.</li>
            <li><strong>Dual Engines:</strong> Choice between a fast local engine and an AI-powered external engine for complex translations.</li>
          </ul>
        </div>

        <div className="usage">
          <h3>How to use</h3>
          <p>
            Type your message in English letters as you would in a chat (e.g., "Hegiddira?"). 
            The tool will convert it to the native script (ಹೇಗಿದ್ದೀರಾ?).
          </p>
        </div>

        <button className="submit-btn back-btn" onClick={onBack}>
          Back to Tool
        </button>
      </div>
    </div>
  );
}
