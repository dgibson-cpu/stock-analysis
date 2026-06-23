export default function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 h-16 flex items-center justify-between px-6 md:px-10 border-b border-border"
      style={{ backgroundColor: 'var(--color-bg)' }}>
      <div className="flex flex-col leading-tight">
        <span className="font-playfair text-accent font-semibold" style={{ fontSize: '20px' }}>
          Consilium
        </span>
        <span className="font-inter text-text-secondary font-medium" style={{ fontSize: '12px' }}>
          Wealth &amp; Advisory
        </span>
      </div>
      <a
        href="https://calendly.com/danielgibson"
        target="_blank"
        rel="noopener noreferrer"
        className="font-inter font-medium text-accent border border-accent rounded px-4 py-2 text-sm hover:bg-accent hover:text-bg transition-colors duration-150"
      >
        Book a Call →
      </a>
    </header>
  );
}
