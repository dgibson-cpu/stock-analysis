import ProgressBar from '../components/ProgressBar.jsx';
import { formatCurrency } from '../utils/formatting.js';

const labelClass = 'block text-text-secondary text-sm font-medium mb-1.5 font-inter';
const inputClass =
  'flex-1 bg-surface text-text-primary rounded-sm px-3 py-3 border border-border focus:outline-none focus:ring-2 focus:ring-accent font-inter text-base';

export default function Step2Numbers({ formData, onChange, onNext, onBack }) {
  return (
    <div className="step-fade max-w-lg mx-auto px-6 py-8">
      <ProgressBar currentStep={2} totalSteps={3} />

      <h2 className="font-playfair text-text-primary font-bold mb-1" style={{ fontSize: '1.75rem' }}>
        Your Numbers
      </h2>
      <p className="text-text-secondary font-inter text-sm mb-8">
        These numbers drive the calculation — adjust them to match your situation.
      </p>

      {/* Retained Earnings */}
      <div className="mb-7">
        <label className={labelClass}>Retained Earnings Inside Your Corporation</label>
        <div className="flex items-center gap-0 border border-border rounded-sm overflow-hidden focus-within:ring-2 focus-within:ring-accent">
          <span className="bg-border text-text-secondary px-3 py-3 font-inter text-base select-none">
            $
          </span>
          <input
            type="number"
            className="flex-1 bg-surface text-text-primary px-3 py-3 focus:outline-none font-inter text-base"
            value={formData.retainedEarnings}
            onChange={(e) => onChange('retainedEarnings', Math.max(0, parseInt(e.target.value) || 0))}
            min={100000}
            max={5000000}
            step={25000}
          />
        </div>
        <div className="mt-3">
          <input
            type="range"
            className="w-full"
            min={100000}
            max={5000000}
            step={25000}
            value={formData.retainedEarnings}
            onChange={(e) => onChange('retainedEarnings', parseInt(e.target.value))}
          />
          <div className="flex justify-between text-text-secondary text-xs font-mono mt-1">
            <span>$100K</span>
            <span className="text-accent-light font-semibold">{formatCurrency(formData.retainedEarnings)}</span>
            <span>$5M</span>
          </div>
        </div>
      </div>

      {/* Already Invested Toggle */}
      <div className="mb-7">
        <label className={labelClass}>Are these earnings currently invested?</label>
        <div className="flex gap-2">
          {[
            { value: 'yes', label: 'Yes, invested' },
            { value: 'partial', label: 'Partially' },
            { value: 'no', label: 'Not yet' },
          ].map(({ value, label }) => (
            <button
              key={value}
              onClick={() => onChange('investedStatus', value)}
              className={`flex-1 py-2.5 px-3 rounded-full text-sm font-inter font-medium transition-colors duration-150 border ${
                formData.investedStatus === value
                  ? 'bg-accent border-accent text-bg'
                  : 'bg-surface border-border text-text-secondary hover:border-accent'
              }`}
            >
              {label}
            </button>
          ))}
        </div>

        {formData.investedStatus === 'no' && (
          <div className="mt-3 border-l-4 border-accent bg-surface px-4 py-3 rounded-r">
            <p className="text-text-secondary font-inter text-sm leading-relaxed">
              Even uninvested retained earnings represent opportunity. The calculator will
              show what these dollars could do.
            </p>
          </div>
        )}
      </div>

      {/* Return Rate Slider */}
      <div className="mb-8">
        <label className={labelClass}>Assumed Annual Return Rate</label>
        <input
          type="range"
          className="w-full"
          min={0.03}
          max={0.09}
          step={0.005}
          value={formData.returnRate}
          onChange={(e) => onChange('returnRate', parseFloat(e.target.value))}
        />
        <div className="flex justify-between text-text-secondary text-xs font-mono mt-1">
          <span>3.0%</span>
          <span className="text-accent-light font-semibold">
            {(formData.returnRate * 100).toFixed(1)}% per year
          </span>
          <span>9.0%</span>
        </div>
        <p className="text-text-secondary text-xs font-inter mt-2 leading-relaxed">
          Assumed annual return if retained earnings are invested in a balanced portfolio
          inside your corporation.
        </p>
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
          Continue →
        </button>
      </div>
    </div>
  );
}
