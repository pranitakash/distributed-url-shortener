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
      className="relative rounded-xl bg-white dark:bg-[#121212] border border-gray-200 dark:border-gray-800 shadow-sm p-6 sm:p-8 space-y-4 transition-colors duration-300"
    >
      <input
        type="text"
        placeholder="https://example.com/very-long-url"
        value={longUrl}
        onChange={(e) => setLongUrl(e.target.value)}
        className="w-full rounded-lg px-4 py-3 bg-white dark:bg-[#0a0a0a] border border-gray-300 dark:border-gray-800 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition"
      />

      <input
        type="text"
        placeholder="Optional custom alias"
        value={customAlias}
        onChange={(e) => setCustomAlias(e.target.value)}
        maxLength={20}
        className="w-full rounded-lg px-4 py-3 bg-white dark:bg-[#0a0a0a] border border-gray-300 dark:border-gray-800 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition"
      />

      <button
        type="submit"
        disabled={loading}
        className="w-full rounded-lg bg-green-600 text-white py-3 font-semibold hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition shadow-sm hover:shadow-md"
      >
        {loading ? "Creating..." : "Create Short URL"}
      </button>

      {error && (
        <p className="text-sm text-red-500 text-center">{error}</p>
      )}
    </form>
  );
}
