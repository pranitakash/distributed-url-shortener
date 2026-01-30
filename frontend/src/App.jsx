import { useState } from "react";
import Layout from "./components/Layout";
import UrlForm from "./components/UrlForm";
import About from "./pages/About";
import Pricing from "./pages/Pricing";

const API_BASE = import.meta.env.VITE_BACKEND_URL + "/api";

export default function App() {
  const [urls, setUrls] = useState([]);
  const [currentPage, setCurrentPage] = useState("home"); // home, about, pricing
  const [generatedUrl, setGeneratedUrl] = useState(null); // Track the most recent generated URL

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
    setGeneratedUrl(data); // Set as the current generated URL
  };

  const handleCreateAnother = () => {
    setGeneratedUrl(null); // Reset to show form again
  };

  if (currentPage === "about") {
    return (
      <Layout setCurrentPage={setCurrentPage}>
        <About />
      </Layout>
    );
  }

  if (currentPage === "pricing") {
    return (
      <Layout setCurrentPage={setCurrentPage}>
        <Pricing />
      </Layout>
    );
  }

  return (
    <Layout setCurrentPage={setCurrentPage}>
      {/* HERO */}
      <section className="pt-24 pb-32 px-6 text-center bg-white dark:bg-gray-800 transition-colors duration-300">
        <h1 className="text-5xl sm:text-6xl font-extrabold tracking-tight text-gray-900 dark:text-white">
          Shorten URLs. <br />
          <span className="text-green-600 dark:text-green-500">Share Smarter.</span>
        </h1>

        <p className="mt-6 text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
          A fast, reliable and modern URL shortener built for developers and teams.
        </p>

        {!generatedUrl ? (
          // Default State: Show Form
          <div className="mt-12 max-w-3xl mx-auto">
            <UrlForm onShorten={handleShorten} />
          </div>
        ) : (
          // Success State: Show Generated URL
          <div className="mt-12 max-w-3xl mx-auto">
            <div className="bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl p-10 shadow-sm hover:shadow-md dark:hover:shadow-lg transition-shadow duration-300">
              <p className="text-gray-600 dark:text-gray-300 text-sm font-medium mb-4">Your Short URL</p>
              <a
                href={generatedUrl.shortUrl}
                target="_blank"
                rel="noreferrer"
                className="block text-green-600 dark:text-green-500 hover:text-green-700 dark:hover:text-green-400 break-all font-bold text-2xl transition-colors duration-200 mb-2"
              >
                {generatedUrl.shortUrl}
              </a>

              {generatedUrl.message && (
                <p className="text-green-700 dark:text-green-400 font-semibold text-sm mt-4">{generatedUrl.message}</p>
              )}

              {generatedUrl.longUrl && (
                <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-600">
                  <p className="text-gray-600 dark:text-gray-300 text-sm font-medium mb-2">Original URL</p>
                  <p className="text-gray-700 dark:text-gray-200 break-all font-mono text-sm">{generatedUrl.longUrl}</p>
                </div>
              )}

              <div className="mt-8 flex flex-col sm:flex-row gap-4">
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(generatedUrl.shortUrl);
                    alert("Copied to clipboard!");
                  }}
                  className="flex-1 px-6 py-3 bg-green-600 dark:bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 dark:hover:bg-green-700 transition-colors duration-200"
                >
                  Copy to Clipboard
                </button>
                <button
                  onClick={handleCreateAnother}
                  className="flex-1 px-6 py-3 border-2 border-green-600 dark:border-green-500 text-green-600 dark:text-green-500 font-semibold rounded-lg hover:bg-green-50 dark:hover:bg-gray-600 transition-colors duration-200"
                >
                  Create Another Short URL
                </button>
              </div>
            </div>
          </div>
        )}
      </section>

      {/* PRODUCT & CONTACT CARDS */}
      <section className="bg-gray-50 dark:bg-gray-800 px-6 py-16 transition-colors duration-300">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8">
            {/* Product Card */}
            <button
              onClick={() => setCurrentPage("about")}
              className="rounded-2xl bg-white dark:bg-gray-700 border-2 border-gray-300 dark:border-gray-600 p-10 hover:border-green-600 dark:hover:border-green-500 hover:shadow-lg dark:hover:shadow-xl transition-all duration-300 text-left cursor-pointer group"
            >
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">Product</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-8">Learn more about the product and pricing.</p>
              <ul className="space-y-3">
                <li>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setCurrentPage("about");
                    }}
                    className="text-gray-600 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-500 transition-colors duration-200 flex items-center gap-2 text-base font-bold"
                  >
                    <span className="text-green-600 dark:text-green-500">→</span>
                    <span>About</span>
                  </button>
                </li>
                <li>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setCurrentPage("pricing");
                    }}
                    className="text-gray-600 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-500 transition-colors duration-200 flex items-center gap-2 text-base font-bold"
                  >
                    <span className="text-green-600 dark:text-green-500">→</span>
                    <span>Pricing</span>
                  </button>
                </li>
              </ul>
            </button>

            {/* Contact Developer Card */}
            <div className="rounded-2xl bg-white dark:bg-gray-700 border-2 border-gray-300 dark:border-gray-600 p-10 hover:border-green-600 dark:hover:border-green-500 hover:shadow-lg dark:hover:shadow-xl transition-all duration-300 group">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">Contact <span className="text-green-600 dark:text-green-500">Developer</span></h3>
              <p className="text-gray-600 dark:text-gray-300 mb-8">Connect directly with the developer behind the product.</p>
              <ul className="space-y-3">
                <li>
                  <a
                    href="https://www.linkedin.com/in/pranit-akash/"
                    target="_blank"
                    rel="noreferrer"
                    className="text-gray-600 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-500 transition-colors duration-200 flex items-center gap-3 text-base font-bold"
                  >
                    <span className="text-xl">🔗</span>
                    <span>LinkedIn</span>
                  </a>
                </li>
                <li>
                  <a
                    href="mailto:pranit.dot.akash@gmail.com"
                    className="text-gray-600 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-500 transition-colors duration-200 flex items-center gap-3 text-base font-bold"
                  >
                    <span className="text-xl">✉️</span>
                    <span>Email</span>
                  </a>
                </li>
                <li>
                  <a
                    href="https://instagram.com/pranit_akash"
                    target="_blank"
                    rel="noreferrer"
                    className="text-gray-600 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-500 transition-colors duration-200 flex items-center gap-3 text-base font-bold"
                  >
                    <span className="text-xl">📷</span>
                    <span>Instagram</span>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="bg-white dark:bg-gray-800 py-28 px-6 transition-colors duration-300">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-16">Why developers love us</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: "⚡",
                title: "Instant",
                desc: "Generate short links instantly with zero friction. Optimized for speed so your links are ready the moment you need them.",
              },
              {
                icon: "📊",
                title: "Analytics",
                desc: "Track clicks and understand link performance with real-time insights. See what works and optimize how you share.",
              },
              {
                icon: "🔐",
                title: "Secure",
                desc: "Built with reliability and security in mind. Your links are protected using production-ready infrastructure.",
              },
            ].map(({ icon, title, desc }) => (
              <div
                key={title}
                className="rounded-2xl p-7 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 shadow-sm hover:shadow-md dark:hover:shadow-lg hover:border-green-500 dark:hover:border-green-500 transition-all duration-300"
              >
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                  {title}
                </h3>
                <p className="mt-3 text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
                  {desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 text-center px-6 bg-gray-50 dark:bg-gray-800 transition-colors duration-300">
        <h2 className="text-4xl font-bold text-gray-900 dark:text-white">
          Ready to simplify your links?
        </h2>
        <p className="mt-4 text-gray-600 dark:text-gray-300 text-lg">
          Start shortening URLs instantly — no signup required.
        </p>
      </section>
    </Layout>
  );
}
