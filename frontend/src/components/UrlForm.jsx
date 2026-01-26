import { useState } from "react";

export default function UrlForm({ onShorten }) {
  const [longUrl, setLongUrl] = useState("");
  const [customAlias, setCustomAlias] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    
    if (!longUrl.trim()) {
      setError("Please enter a URL");
      return;
    }

    setLoading(true);
    try {
      await onShorten(longUrl.trim(), customAlias.trim() || undefined);
      setLongUrl("");
      setCustomAlias("");
    } catch (err) {
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-row">
        <input
          type="text"
          placeholder="https://example.com/very-long-url..."
          value={longUrl}
          onChange={(e) => setLongUrl(e.target.value)}
          required
        />
      </div>
      
      <div className="form-row">
        <input
          type="text"
          placeholder="Optional custom alias (e.g., mylink)"
          value={customAlias}
          onChange={(e) => setCustomAlias(e.target.value)}
          maxLength={20}
        />
      </div>
      
      <button type="submit" disabled={loading}>
        {loading ? "Creating..." : "Create Short URL"}
      </button>
      
      {error && <p className="error">{error}</p>}
    </form>
  );
}
