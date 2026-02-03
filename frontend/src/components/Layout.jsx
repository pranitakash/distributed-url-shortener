import { useEffect, useState } from "react";

export default function Layout({ children, setCurrentPage }) {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    // Initialize from localStorage or system preference
    const stored = localStorage.getItem("darkMode");
    const isDark = stored ? JSON.parse(stored) : window.matchMedia("(prefers-color-scheme: dark)").matches;
    setDark(isDark);
    updateDarkMode(isDark);
  }, []);

  const updateDarkMode = (isDark) => {
    if (isDark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    localStorage.setItem("darkMode", JSON.stringify(isDark));
    console.log("Dark mode:", isDark, "Classes:", document.documentElement.className);
  };

  const toggleDark = () => {
    const newDarkState = !dark;
    setDark(newDarkState);
    updateDarkMode(newDarkState);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#0a0a0a] flex flex-col transition-colors duration-300">
      {/* NAVBAR */}
      <header className="sticky top-0 z-50 backdrop-blur-sm bg-white dark:bg-[#121212]/80 border-b border-gray-200 dark:border-gray-800 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <button onClick={() => setCurrentPage("home")} className="text-lg font-bold text-gray-900 dark:text-gray-100 hover:text-green-600 dark:hover:text-green-500 transition cursor-pointer">Distributed URL Shortener</button>

          <div className="flex items-center gap-4">
            <button
              onClick={toggleDark}
              className="px-3 py-1 rounded-lg text-sm font-medium bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition"
            >
              {dark ? "☀️ Light" : "🌙 Dark"}
            </button>

            <a
              href="https://github.com/pranitakash/distributed-url-shortener"
              target="_blank"
              rel="noreferrer"
              className="text-sm font-semibold text-gray-600 dark:text-gray-400 hover:text-green-600 dark:hover:text-green-500 transition"
            >
              GitHub
            </a>
          </div>
        </div>
      </header>

      <main className="flex-1">{children}</main>

      {/* FOOTER */}
      <footer className="bg-gray-50 dark:bg-[#121212] border-t border-gray-200 dark:border-gray-800 mt-32 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-6 py-12 text-center">
          <p className="text-xs text-gray-500 dark:text-gray-400">
            © 2026 URL Shortener. Built by Pranit Akash.
          </p>
        </div>
      </footer>
    </div>
  );
}
