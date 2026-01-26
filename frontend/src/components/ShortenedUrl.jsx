import { useState } from "react";

export default function ShortenedUrl({ shortUrl, longUrl, message }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(shortUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="short-url-card">
      {message && <p className="success-message">{message}</p>}
      
      <p className="short-url-text">
        <strong>🔗 Short URL:</strong><br/>
        <a href={shortUrl} target="_blank" rel="noreferrer">
          {shortUrl}
        </a>
      </p>
      
      {longUrl !== 'N/A' && (
        <p className="long-url-text">
          <strong>📍 Original:</strong><br/>
          <span>{longUrl}</span>
        </p>
      )}
      
      <button className="copy-btn" onClick={handleCopy}>
        {copied ? "✅ Copied!" : "📋 Copy to clipboard"}
      </button>
    </div>
  );
}
