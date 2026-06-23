import { useState } from 'react';
import ProgressBar from '../components/ProgressBar.jsx';
import { PROVINCE_LABELS } from '../utils/calculations.js';

const inputClass =
  'w-full bg-surface text-text-primary rounded-sm px-3 py-3 border border-border focus:outline-none focus:ring-2 focus:ring-accent font-inter text-base';
const labelClass = 'block text-text-secondary text-sm font-medium mb-1.5 font-inter';

export default function Step1Profile({ formData, onChange, onNext }) {
  const [errors, setErrors] = useState({});

  const validate = () => {
    const errs = {};
    if (!formData.firstName.trim()) errs.firstName = 'First name is required.';
    const age = parseInt(formData.age);
    if (!formData.age) {
      errs.age = 'Age is required.';
    } else if (isNaN(age) || age < 30 || age > 70) {
      errs.age = 'Please enter an age between 30 and 70.';
    }
    if (!formData.horizonYears) errs.horizonYears = 'Please select a time horizon.';
    return errs;
  };

  const handleNext = () => {
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }
    onNext();
  };

  return (
    <div className="step-fade max-w-lg mx-auto px-6 py-8">
      <ProgressBar currentStep={1} totalSteps={3} />

      <h2 className="font-playfair text-text-primary font-bold mb-1" style={{ fontSize: '1.75rem' }}>
        Your Business Profile
      </h2>
      <p className="text-text-secondary font-inter text-sm mb-8">
        We'll use this to personalize your tax analysis.
      </p>

      {/* First Name */}
      <div className="mb-5">
        <label className={labelClass}>First Name</label>
        <input
          type="text"
          className={inputClass}
          value={formData.firstName}
          onChange={(e) => onChange('firstName', e.target.value)}
          placeholder="e.g. Sarah"
        />
        {errors.firstName && (
          <p className="text-danger text-xs mt-1 font-inter">{errors.firstName}</p>
        )}
      </div>

      {/* Province */}
      <div className="mb-5">
        <label className={labelClass}>Province of Incorporation</label>
        <select
          className={inputClass}
          value={formData.province}
          onChange={(e) => onChange('province', e.target.value)}
        >
          {Object.entries(PROVINCE_LABELS).map(([code, label]) => (
            <option key={code} value={code}>
              {label}
            </option>
          ))}
        </select>
      </div>

      {/* Age */}
      <div className="mb-5">
        <label className={labelClass}>Your Age</label>
        <input
          type="number"
          className={inputClass}
          value={formData.age}
          onChange={(e) => onChange('age', e.target.value)}
          placeholder="e.g. 45"
          min="30"
          max="70"
        />
        {errors.age && (
          <p className="text-danger text-xs mt-1 font-inter">{errors.age}</p>
        )}
      </div>

      {/* Investment Horizon */}
      <div className="mb-8">
        <label className={labelClass}>Investment Horizon</label>
        <select
          className={inputClass}
          value={formData.horizonYears}
          onChange={(e) => onChange('horizonYears', parseInt(e.target.value))}
        >
          {[10, 15, 20, 25, 30].map((y) => (
            <option key={y} value={y}>
              {y} years
            </option>
          ))}
        </select>
        {errors.horizonYears && (
          <p className="text-danger text-xs mt-1 font-inter">{errors.horizonYears}</p>
        )}
      </div>

      <button
        onClick={handleNext}
        className="w-full bg-accent hover:bg-accent-light text-bg font-semibold font-inter py-3.5 rounded transition-colors duration-150"
      >
        Continue →
      </button>
    </div>
  );
}
