import { useState } from "react";

export default function ShortenedUrl({ shortUrl, longUrl, message }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(shortUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="rounded-xl bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 p-6 space-y-4 shadow-sm hover:shadow-md dark:hover:shadow-lg transition-all duration-300">
      {message && (
        <p className="text-green-700 dark:text-green-500 font-semibold text-sm">{message}</p>
      )}
      
      <div className="space-y-2">
        <p className="text-gray-600 dark:text-gray-300 text-sm font-medium">🔗 Short URL:</p>
        <a 
          href={shortUrl} 
          target="_blank" 
          rel="noreferrer"
          className="block text-green-600 dark:text-green-500 hover:text-green-700 dark:hover:text-green-400 break-all font-mono text-lg transition-colors duration-200"
        >
          {shortUrl}
        </a>
      </div>
      
      {longUrl !== 'N/A' && (
        <div className="space-y-2 border-t border-gray-200 dark:border-gray-600 pt-4">
          <p className="text-gray-600 dark:text-gray-300 text-sm font-medium">📍 Original URL:</p>
          <p className="text-gray-700 dark:text-gray-200 break-all font-mono text-sm">{longUrl}</p>
        </div>
      )}
      
      <button 
        onClick={handleCopy}
        className="w-full mt-4 rounded-lg bg-green-600 dark:bg-green-600 text-white py-2 font-semibold hover:bg-green-700 dark:hover:bg-green-700 transition-colors duration-200 shadow-sm hover:shadow-md"
      >
        {copied ? "✅ Copied!" : "📋 Copy to clipboard"}
      </button>
    </div>
  );
}
