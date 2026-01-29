import { useState } from "react";
import Layout from "./components/Layout";
import UrlForm from "./components/UrlForm";
import ShortenedUrl from "./components/ShortenedUrl";

const API_BASE = import.meta.env.VITE_BACKEND_URL + "/api";

export default function App() {
  const [urls, setUrls] = useState([]);

  const handleShorten = async (longUrl, customAlias) => {
    const res = await fetch(`${API_BASE}/urls`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
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
  };

  return (
    <Layout>
      {/* HERO */}
      <section className="py-24 text-center">
        <h1 className="text-5xl font-bold tracking-tight text-gray-900 dark:text-white">
          Shorten URLs. <span className="text-indigo-600">Share Smarter.</span>
        </h1>
        <p className="mt-6 text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
          A fast, reliable and modern URL shortener built for developers and teams.
        </p>

        <div className="mt-10 max-w-2xl mx-auto">
          <UrlForm onShorten={handleShorten} />
        </div>
      </section>

      {/* RESULT */}
      {urls.length > 0 && (
        <section className="max-w-3xl mx-auto mt-16 space-y-6">
          {urls.map((urlData, index) => (
            <ShortenedUrl
              key={index}
              shortUrl={urlData.shortUrl}
              message={urlData.message || ""}
            />
          ))}
        </section>
      )}

      {/* FEATURES */}
      <section className="py-24">
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {[
            ["⚡ Instant", "Create short links in milliseconds"],
            ["📊 Analytics", "Track clicks and performance"],
            ["🔐 Secure", "Reliable and production-ready"],
          ].map(([title, desc]) => (
            <div
              key={title}
              className="rounded-2xl border border-gray-200 dark:border-gray-800 p-8 bg-white dark:bg-gray-900"
            >
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                {title}
              </h3>
              <p className="mt-3 text-gray-600 dark:text-gray-400">
                {desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 text-center">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
          Ready to simplify your links?
        </h2>
        <p className="mt-4 text-gray-600 dark:text-gray-400">
          Start shortening URLs instantly — no signup required.
        </p>
      </section>
    </Layout>
  );
}
