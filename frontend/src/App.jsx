import { useState } from "react";

function App() {
  const [url, setUrl] = useState("");
  const [alias, setAlias] = useState("");
  const [result, setResult] = useState("");
  const [error, setError] = useState("");

  const API_BASE_URL = import.meta.env.VITE_BACKEND_URL;

  const handleSubmit = async () => {
    setError("");
    setResult("");

    try {
      const response = await fetch(`${API_BASE_URL}/api/shorten`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          originalUrl: url,
          customAlias: alias,
        }),
      });

      if (!response.ok) {
        throw new Error("Request failed");
      }

      const data = await response.json();
      setResult(data.shortUrl);
    } catch (err) {
      setError("Failed to fetch");
    }
  };

  return (
    <div style={{ padding: "40px" }}>
      <h1>URL Shortener</h1>

      <input
        placeholder="Enter long URL"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
      />
      <br /><br />

      <input
        placeholder="Optional alias"
        value={alias}
        onChange={(e) => setAlias(e.target.value)}
      />
      <br /><br />

      <button onClick={handleSubmit}>Create Short URL</button>

      {result && <p>Short URL: {result}</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
}

export default App;
