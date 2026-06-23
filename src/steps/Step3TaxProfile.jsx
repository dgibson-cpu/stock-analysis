import { useState } from 'react';
import ProgressBar from '../components/ProgressBar.jsx';
import { PASSIVE_TAX_RATES } from '../utils/calculations.js';
import { formatCurrency, formatPercent } from '../utils/formatting.js';

function InfoTooltip({ text }) {
  const [open, setOpen] = useState(false);
  return (
    <span className="relative inline-flex items-center ml-1">
      <button
        onMouseEnter={() => setOpen(true)}
        onMouseLeave={() => setOpen(false)}
        onFocus={() => setOpen(true)}
        onBlur={() => setOpen(false)}
        className="text-text-secondary hover:text-accent transition-colors"
        aria-label="More information"
      >
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
        </svg>
      </button>
      {open && (
        <div className="absolute left-6 top-0 z-50 w-72 bg-surface border border-border rounded p-3 shadow-xl text-text-secondary text-xs font-inter leading-relaxed">
          {text}
        </div>
      )}
    </span>
  );
}

export default function Step3TaxProfile({ formData, onNext, onBack }) {
  const { province, retainedEarnings, returnRate } = formData;
  const T = PASSIVE_TAX_RATES[province];
  const annualGrossReturn = retainedEarnings * returnRate;
  const SBD_THRESHOLD = 50000;
  const barMax = Math.max(annualGrossReturn * 1.5, 75000);
  const safeFillPct = Math.min((SBD_THRESHOLD / barMax) * 100, 100);
  const overThreshold = annualGrossReturn > SBD_THRESHOLD;
  const overFillPct = overThreshold
    ? Math.min(((annualGrossReturn - SBD_THRESHOLD) / barMax) * 100, 100)
    : 0;

  return (
    <div className="step-fade max-w-lg mx-auto px-6 py-8">
      <ProgressBar currentStep={3} totalSteps={3} />

      <h2 className="font-playfair text-text-primary font-bold mb-1" style={{ fontSize: '1.75rem' }}>
        Your Tax Profile
      </h2>
      <p className="text-text-secondary font-inter text-sm mb-8">
        Here's how CRA treats passive investment income inside your corporation.
      </p>

      {/* Card 1 */}
      <div className="bg-surface border border-border rounded p-5 mb-4">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-text-secondary text-xs font-inter font-medium uppercase tracking-wide mb-1">
              Passive Investment Income Tax Rate
              <InfoTooltip text="In Canada, investment income earned inside a CCPC is taxed at a combined federal/provincial rate. In Ontario, this is 50.17%. This rate applies to interest, dividends, and capital gains earned on passive investments inside your corporation." />
            </p>
            <p className="text-text-primary font-mono font-semibold text-2xl">
              {formatPercent(T)}
            </p>
          </div>
          <div className="bg-danger/10 border border-danger/30 rounded px-3 py-1.5 text-danger text-xs font-inter font-medium">
            High
          </div>
        </div>
      </div>

      {/* Card 2 */}
      <div className="bg-surface border border-border rounded p-5 mb-6">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-text-secondary text-xs font-inter font-medium uppercase tracking-wide mb-1">
              Small Business Deduction Threshold
              <InfoTooltip text="If your corporation earns more than $50,000/year in passive investment income, the CRA begins reducing your access to the Small Business Deduction. For every $1 above $50,000, your SBD limit decreases by $5. At $150,000 of passive income, your SBD is eliminated entirely — and your active business income tax rate jumps from 12.2% to 26.5% in Ontario." />
            </p>
            <p className="text-text-primary font-mono font-semibold text-2xl">
              $50,000
            </p>
            <p className="text-text-secondary text-xs font-inter mt-1">passive income per year</p>
          </div>
        </div>
      </div>

      {/* Live Preview */}
      <div className="bg-surface border border-border rounded p-5 mb-8">
        <p className="text-text-secondary text-xs font-inter font-medium uppercase tracking-wide mb-4">
          Based on your inputs
        </p>

        <div className="flex justify-between text-sm font-inter mb-2">
          <span className="text-text-secondary">Annual passive income generated</span>
          <span className="text-text-primary font-semibold font-mono">
            {formatCurrency(annualGrossReturn)}
          </span>
        </div>
        <div className="flex justify-between text-sm font-inter mb-4">
          <span className="text-text-secondary">SBD threshold</span>
          <span className="text-text-primary font-mono">$50,000</span>
        </div>

        {/* Bar */}
        <div className="relative h-5 rounded overflow-hidden bg-border mb-2">
          <div
            className="absolute left-0 top-0 h-full bg-success"
            style={{ width: `${safeFillPct}%` }}
          />
          {overThreshold && (
            <div
              className="absolute top-0 h-full bg-danger"
              style={{ left: `${safeFillPct}%`, width: `${overFillPct}%` }}
            />
          )}
          {/* Threshold marker */}
          <div
            className="absolute top-0 h-full w-0.5 bg-text-primary opacity-60"
            style={{ left: `${safeFillPct}%` }}
          />
        </div>
        <div className="flex justify-between text-text-secondary text-xs font-mono">
          <span>$0</span>
          <span>$50,000 threshold</span>
          <span>{formatCurrency(barMax, true)}</span>
        </div>

        <div className="mt-4">
          {overThreshold ? (
            <span className="inline-flex items-center gap-1.5 bg-danger/10 border border-danger/30 text-danger text-xs font-inter font-medium rounded-full px-3 py-1.5">
              <span>⚠</span> SBD at risk
            </span>
          ) : (
            <span className="inline-flex items-center gap-1.5 bg-success/10 border border-success/30 text-success text-xs font-inter font-medium rounded-full px-3 py-1.5">
              <span>✓</span> Currently below threshold
            </span>
          )}
        </div>
      </div>

      <div className="flex gap-3">
        <button
          onClick={onBack}
          className="w-1/3 border border-border text-text-secondary font-inter font-medium py-3.5 rounded hover:border-accent hover:text-accent transition-colors duration-150"
        >
          ← Back
        </button>
        <button
          onClick={onNext}
          className="flex-1 bg-accent hover:bg-accent-light text-bg font-semibold font-inter py-3.5 rounded transition-colors duration-150"
        >
          See My Results →
        </button>
      </div>
    </div>
  );
}
