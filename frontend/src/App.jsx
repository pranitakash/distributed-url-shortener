import { useState } from "react";
import Layout from "./components/Layout";
import UrlForm from "./components/UrlForm";
import ShortenedUrl from "./components/ShortenedUrl";

const API_BASE = "http://localhost:5000/api";

export default function App() {
  const [urls, setUrls] = useState([]);
  const [showForm, setShowForm] = useState(true);

  const handleShorten = async (longUrl, customAlias) => {
    const body = { longUrl };
    if (customAlias) body.customAlias = customAlias;

    const res = await fetch(`${API_BASE}/urls`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    if (!res.ok) {
      const data = await res.json();
      throw new Error(data.error || "Failed to shorten URL");
    }

    const data = await res.json();
    setUrls([data, ...urls]);
    setShowForm(false);
  };

  const handleNewUrl = () => {
    setShowForm(true);
  };

  return (
    <Layout>
      <div className="main-content">
        {showForm ? (
          <UrlForm onShorten={handleShorten} />
        ) : (
          <div>
            <button className="new-url-btn" onClick={handleNewUrl}>
              + Create New Short URL
            </button>
            <div className="history-grid">
              {urls.map((urlData, index) => (
                <ShortenedUrl 
                  key={index}
                  shortUrl={urlData.shortUrl}
                  message={urlData.message || ''}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
}
