export default function Layout({ children }) {
  return (
    <div className="container">
      <header>
        <h1>URL Shortener</h1>
        <p>Paste a long URL and get a short, shareable link.</p>
      </header>
      <main className="main-content">
        {children}
      </main>
    </div>
  );
}
