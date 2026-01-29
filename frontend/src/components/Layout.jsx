import { useEffect, useState } from "react";

export default function Layout({ children }) {
  const [dark, setDark] = useState(
    window.matchMedia("(prefers-color-scheme: dark)").matches
  );

  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
  }, [dark]);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-black transition-colors">
      {/* NAVBAR */}
      <header className="border-b border-gray-200 dark:border-gray-800">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <span className="text-xl font-bold text-gray-900 dark:text-white">
            URL Shortener
          </span>

          <div className="flex items-center gap-4">
            <button
              onClick={() => setDark(!dark)}
              className="rounded-lg border px-3 py-1 text-sm text-gray-700 dark:text-gray-300"
            >
              {dark ? "Light" : "Dark"}
            </button>
            <a
              href="https://github.com/pranitakash/distributed-url-shortener"
              target="_blank"
              className="text-sm text-indigo-600 font-semibold"
            >
              GitHub
            </a>
          </div>
        </div>
      </header>

      <main className="px-6">{children}</main>

      {/* FOOTER */}
      <footer className="py-10 text-center text-sm text-gray-500 dark:text-gray-400">
        Built by Pranit Akash · Deployed on Vercel & Render
      </footer>
    </div>
  );
}
