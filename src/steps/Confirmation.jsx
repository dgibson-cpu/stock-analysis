export default function Confirmation({ formData, onReset }) {
  return (
    <div className="step-fade flex flex-col items-center justify-center min-h-screen px-6 py-24">
      <div className="bg-surface border border-border rounded-lg p-10 max-w-xl w-full text-center">
        {/* Checkmark */}
        <div className="w-16 h-16 rounded-full bg-accent/10 border-2 border-accent flex items-center justify-center mx-auto mb-6">
          <svg className="w-8 h-8 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
          </svg>
        </div>

        <h2 className="font-playfair text-text-primary font-bold mb-4" style={{ fontSize: '1.75rem' }}>
          Thank you, {formData.firstName}.
        </h2>

        <p className="text-text-secondary font-inter text-base leading-relaxed mb-8">
          Daniel will review your numbers and return a personalized corporate insurance
          analysis within 2 business days.
        </p>

        {/* Contact block */}
        <div className="bg-bg border border-border rounded p-5 mb-8 text-left space-y-3">
          <div className="flex items-center gap-3 text-text-secondary font-inter text-sm">
            <span className="text-lg">📧</span>
            <a href="mailto:daniel@consiliumwealth.ca" className="text-accent hover:underline">
              daniel@consiliumwealth.ca
            </a>
          </div>
          <div className="flex items-center gap-3 text-text-secondary font-inter text-sm">
            <span className="text-lg">📞</span>
            <a href="tel:+14160000000" className="hover:text-accent transition-colors">
              (416) 000-0000
            </a>
          </div>
          <div className="flex items-center gap-3 text-text-secondary font-inter text-sm">
            <span className="text-lg">🗓</span>
            <a
              href="https://calendly.com/danielgibson"
              target="_blank"
              rel="noopener noreferrer"
              className="text-accent hover:underline"
            >
              Book directly via Calendly →
            </a>
          </div>
        </div>

        <button
          onClick={onReset}
          className="font-inter font-medium text-accent border border-accent rounded px-6 py-3 hover:bg-accent hover:text-bg transition-colors duration-150"
        >
          ← Run another calculation
        </button>
      </div>
    </div>
  );
}
