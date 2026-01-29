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
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white dark:bg-gray-900 rounded-2xl shadow-lg p-6 space-y-4"
    >
      <input
        type="text"
        placeholder="https://example.com/very-long-url"
        value={longUrl}
        onChange={(e) => setLongUrl(e.target.value)}
        className="w-full rounded-xl border px-4 py-3 bg-transparent text-gray-900 dark:text-white"
      />

      <input
        type="text"
        placeholder="Optional custom alias"
        value={customAlias}
        onChange={(e) => setCustomAlias(e.target.value)}
        maxLength={20}
        className="w-full rounded-xl border px-4 py-3 bg-transparent text-gray-900 dark:text-white"
      />

      <button
        type="submit"
        disabled={loading}
        className="w-full rounded-xl bg-indigo-600 text-white py-3 font-semibold hover:bg-indigo-700 transition"
      >
        {loading ? "Creating..." : "Create Short URL"}
      </button>

      {error && (
        <p className="text-sm text-red-500 text-center">{error}</p>
      )}
    </form>
  );
}
