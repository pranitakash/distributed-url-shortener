import { useEffect, useState } from "react";

export default function Layout({ children, setCurrentPage }) {
  const [dark, setDark] = useState(() => {
    // Initialize from localStorage on mount
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("theme");
      if (stored) {
        return stored === "dark";
      }
      // Fallback to system preference
      return window.matchMedia("(prefers-color-scheme: dark)").matches;
    }
    return false;
  });
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Apply theme to DOM on mount and when dark state changes
    const applyTheme = (isDark) => {
      if (isDark) {
        document.documentElement.classList.add("dark");
        console.log("Dark mode ON - dark class added to html");
      } else {
        document.documentElement.classList.remove("dark");
        console.log("Dark mode OFF - dark class removed from html");
      }
      localStorage.setItem("theme", isDark ? "dark" : "light");
      console.log("Theme saved to localStorage:", isDark ? "dark" : "light");
    };

    applyTheme(dark);
    setMounted(true);
  }, [dark]);

  const toggleDark = () => {
    setDark(!dark);
  };

  // Prevent flash of wrong theme
  if (!mounted) {
    return null;
  }

  return (
    <div className="flex flex-col min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300">
      {/* NAVBAR */}
      <header className="sticky top-0 z-50 backdrop-blur-sm bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <button onClick={() => setCurrentPage("home")} className="text-lg font-bold text-gray-900 dark:text-white hover:text-green-600 dark:hover:text-green-500 transition-colors duration-200 cursor-pointer">URL Shortener</button>

          <div className="flex items-center gap-4">
            <button
              onClick={toggleDark}
              className="px-3 py-1 rounded-lg text-sm font-medium bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors duration-200"
              title={dark ? "Switch to light mode" : "Switch to dark mode"}
            >
              {dark ? "☀️ Light" : "🌙 Dark"}
            </button>

            <a
              href="https://github.com/pranitakash/distributed-url-shortener"
              target="_blank"
              rel="noreferrer"
              className="text-sm font-semibold text-gray-600 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-500 transition-colors duration-200"
            >
              GitHub
            </a>
          </div>
        </div>
      </header>

      <main className="flex-1">{children}</main>

      {/* FOOTER */}
      <footer className="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 mt-32 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-6 py-12 text-center">
          <p className="text-xs text-gray-500 dark:text-gray-400">
            © 2026 URL Shortener. Built by Pranit Akash.
          </p>
        </div>
      </footer>
    </div>
  );
}
