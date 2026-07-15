import "./SiteHeader.css";

export default function SiteHeader() {
  return (
    <header className="site-header">
      <div className="site-header-inner">
        <div className="site-brand">
          <span className="site-brand-mark mono">SB · EC</span>
          <span className="site-brand-name">Built Here</span>
        </div>
        <nav className="site-nav mono">
          <a href="#timeline">Timeline</a>
          <a href="#breakdown">Breakdown</a>
          <a href="#about">About</a>
        </nav>
      </div>
    </header>
  );
}
