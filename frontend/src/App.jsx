import { useState } from "react";
import Layout from "./components/Layout";
import UrlForm from "./components/UrlForm";
import ShortenedUrl from "./components/ShortenedUrl";

// ✅ use backend from env (NOT localhost)
const API_BASE = import.meta.env.VITE_BACKEND_URL + "/api";

export default function App() {
  const [urls, setUrls] = useState([]);
  const [showForm, setShowForm] = useState(true);

  const handleShorten = async (longUrl, customAlias) => {
    try {
      const res = await fetch(`${API_BASE}/urls`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          longUrl,
          customAlias: customAlias || undefined,
        }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || "Failed to shorten URL");
      }

      const data = await res.json();
      setUrls([data, ...urls]);
      setShowForm(false);
    } catch (err) {
      alert(err.message);
    }
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
              Create New Short URL
            </button>

            <div className="history-grid">
              {urls.map((urlData, index) => (
                <ShortenedUrl
                  key={index}
                  shortUrl={urlData.shortUrl}
                  message={urlData.message || ""}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
}
