export default function Layout({ children, setCurrentPage }) {

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <header className="sticky top-0 z-50 backdrop-blur-sm bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <button onClick={() => setCurrentPage("home")} className="text-lg font-bold text-gray-900 hover:text-green-600 transition-colors duration-200 cursor-pointer">URL Shortener</button>

          <div className="flex items-center gap-4">
            <a
              href="https://github.com/pranitakash/distributed-url-shortener"
              target="_blank"
              rel="noreferrer"
              className="text-sm font-semibold text-gray-600 hover:text-green-600 transition-colors duration-200"
            >
              GitHub
            </a>
          </div>
        </div>
      </header>

      <main className="flex-1">{children}</main>

      <footer className="bg-white border-t border-gray-200 mt-32">
        <div className="max-w-7xl mx-auto px-6 py-12 text-center">
          <p className="text-xs text-gray-500">
            © 2026 URL Shortener. Built by Pranit Akash.
          </p>
        </div>
      </footer>
    </div>
  );
}
