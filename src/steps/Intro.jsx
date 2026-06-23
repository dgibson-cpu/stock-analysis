export default function Intro({ onStart }) {
  return (
    <div className="step-fade flex flex-col items-center justify-center min-h-screen px-6 py-24 text-center">
      <h1
        className="font-playfair font-bold text-text-primary mb-6 leading-tight"
        style={{ fontSize: 'clamp(2.2rem, 5vw, 3.5rem)', maxWidth: '800px' }}
      >
        How Much Are Your Retained Earnings Actually Costing You?
      </h1>

      <p
        className="font-inter text-text-secondary mb-6 leading-relaxed"
        style={{ fontSize: '1.1rem', maxWidth: '600px' }}
      >
        Canadian business owners with retained earnings inside their corporation
        pay up to 50.17% tax on passive investment income — and most don't realize
        their Small Business Deduction is at risk too.
      </p>

      <p
        className="font-inter text-text-secondary mb-10 leading-relaxed"
        style={{ fontSize: '0.95rem', maxWidth: '540px' }}
      >
        This calculator takes 2 minutes. Enter your numbers and see exactly how much
        passive income tax you're paying, whether your SBD is being clawed back, and
        what the alternative looks like.
      </p>

      <button
        onClick={onStart}
        className="font-inter font-semibold text-bg bg-accent hover:bg-accent-light transition-colors duration-150 rounded px-8 py-4 text-base mb-12"
        style={{ fontSize: '16px', padding: '14px 32px' }}
      >
        Calculate My Tax Leakage →
      </button>

      {/* Trust signals */}
      <div className="flex flex-col md:flex-row items-center gap-6 md:gap-10">
        <TrustSignal icon={<ShieldIcon />} text="Built for Canadian corporations" />
        <TrustSignal icon={<ClockIcon />} text="Takes 2 minutes" />
        <TrustSignal icon={<LockIcon />} text="Your numbers stay private" />
      </div>
    </div>
  );
}

function TrustSignal({ icon, text }) {
  return (
    <div className="flex items-center gap-2.5 text-text-secondary font-inter text-sm">
      <span className="text-accent">{icon}</span>
      <span>{text}</span>
    </div>
  );
}

function ShieldIcon() {
  return (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
    </svg>
  );
}

function ClockIcon() {
  return (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  );
}

function LockIcon() {
  return (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
    </svg>
  );
}
