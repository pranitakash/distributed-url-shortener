export default function About() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300">
      {/* Hero */}
      <section className="pt-24 pb-16 px-6 text-center">
        <h1 className="text-5xl sm:text-6xl font-extrabold tracking-tight text-gray-900 dark:text-white">
          About <span className="text-green-600 dark:text-green-500">URL Shortener</span>
        </h1>
        <p className="mt-6 text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
          Built by developers, for developers. A simple, fast, and reliable way to shorten and share URLs.
        </p>
      </section>

      {/* Story */}
      <section className="max-w-4xl mx-auto px-6 py-16 space-y-8">
        <div>
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Our Story</h2>
          <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
            URL Shortener was created out of a simple need: developers wanted a lightweight, no-fuss tool to create short links without complicated dashboards or paywalls. We built this to be exactly that — fast, reliable, and developer-friendly.
          </p>
        </div>

        <div>
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">What We Believe</h2>
          <ul className="space-y-4 text-gray-600 dark:text-gray-300">
            <li className="flex gap-4">
              <span className="text-green-600 dark:text-green-500 font-bold">✓</span>
              <span><strong>Simplicity matters.</strong> We keep things minimal and intuitive, no bloat.</span>
            </li>
            <li className="flex gap-4">
              <span className="text-green-600 dark:text-green-500 font-bold">✓</span>
              <span><strong>Reliability is non-negotiable.</strong> Your links work. Every time.</span>
            </li>
            <li className="flex gap-4">
              <span className="text-green-600 dark:text-green-500 font-bold">✓</span>
              <span><strong>Developers come first.</strong> Built for people who code, by people who code.</span>
            </li>
            <li className="flex gap-4">
              <span className="text-green-600 dark:text-green-500 font-bold">✓</span>
              <span><strong>No signup required.</strong> Just shorten and share. That's it.</span>
            </li>
          </ul>
        </div>

        <div>
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Built with</h2>
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            URL Shortener is built with modern, production-ready technology:
          </p>
          <ul className="grid md:grid-cols-2 gap-4 text-gray-600 dark:text-gray-300">
            <li>• Node.js & Express backend</li>
            <li>• React + Vite frontend</li>
            <li>• MongoDB database</li>
            <li>• Deployed on Vercel & Render</li>
          </ul>
        </div>

        <div className="border-t border-gray-200 dark:border-gray-700 pt-8">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Get in Touch</h2>
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            Have feedback, questions, or just want to say hi? I'd love to hear from you.
          </p>
          <div className="flex gap-6">
            <a href="https://www.linkedin.com/in/pranit-akash/" target="_blank" rel="noreferrer" className="text-green-600 dark:text-green-500 hover:text-green-700 dark:hover:text-green-400 font-semibold transition-colors duration-200">
              LinkedIn →
            </a>
            <a href="mailto:pranit.dot.akash@gmail.com" className="text-green-600 dark:text-green-500 hover:text-green-700 dark:hover:text-green-400 font-semibold transition-colors duration-200">
              Email →
            </a>
            <a href="https://instagram.com/pranit_akash" target="_blank" rel="noreferrer" className="text-green-600 dark:text-green-500 hover:text-green-700 dark:hover:text-green-400 font-semibold transition-colors duration-200">
              Instagram →
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
