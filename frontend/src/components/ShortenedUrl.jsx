import { useState } from "react";

export default function ShortenedUrl({ shortUrl, longUrl, message }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(shortUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="rounded-xl bg-white border border-gray-200 p-6 space-y-4 shadow-sm hover:shadow-md transition">
      {message && (
        <p className="text-green-700 font-semibold text-sm">{message}</p>
      )}
      
      <div className="space-y-2">
        <p className="text-gray-600 text-sm font-medium">🔗 Short URL:</p>
        <a 
          href={shortUrl} 
          target="_blank" 
          rel="noreferrer"
          className="block text-green-600 hover:text-green-700 break-all font-mono text-lg transition"
        >
          {shortUrl}
        </a>
      </div>
      
      {longUrl !== 'N/A' && (
        <div className="space-y-2 border-t border-gray-200 pt-4">
          <p className="text-gray-600 text-sm font-medium">📍 Original URL:</p>
          <p className="text-gray-700 break-all font-mono text-sm">{longUrl}</p>
        </div>
      )}
      
      <button 
        onClick={handleCopy}
        className="w-full mt-4 rounded-lg bg-green-600 text-white py-2 font-semibold hover:bg-green-700 transition shadow-sm hover:shadow-md"
      >
        {copied ? "✅ Copied!" : "📋 Copy to clipboard"}
      </button>
    </div>
  );
}
