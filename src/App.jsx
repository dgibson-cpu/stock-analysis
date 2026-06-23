import { useState } from 'react';
import Header from './components/Header.jsx';
import Footer from './components/Footer.jsx';
import Intro from './steps/Intro.jsx';
import Step1Profile from './steps/Step1Profile.jsx';
import Step2Numbers from './steps/Step2Numbers.jsx';
import Step3TaxProfile from './steps/Step3TaxProfile.jsx';
import Results from './steps/Results.jsx';
import Confirmation from './steps/Confirmation.jsx';

const DEFAULT_FORM = {
  firstName: '',
  province: 'ON',
  age: '',
  horizonYears: 20,
  retainedEarnings: 500000,
  returnRate: 0.05,
  investedStatus: 'yes',
  lastName: '',
  email: '',
  phone: '',
  bestTime: '',
  wantsEmailCopy: false,
};

export default function App() {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState(DEFAULT_FORM);

  const onChange = (field, value) =>
    setFormData((prev) => ({ ...prev, [field]: value }));

  const reset = () => {
    setFormData(DEFAULT_FORM);
    setCurrentStep(0);
  };

  const showHeader = true;
  const showFooter = true;
  const showProgressBar = currentStep >= 1 && currentStep <= 3;

  const content = (() => {
    switch (currentStep) {
      case 0:
        return <Intro onStart={() => setCurrentStep(1)} />;
      case 1:
        return (
          <Step1Profile
            formData={formData}
            onChange={onChange}
            onNext={() => setCurrentStep(2)}
          />
        );
      case 2:
        return (
          <Step2Numbers
            formData={formData}
            onChange={onChange}
            onNext={() => setCurrentStep(3)}
            onBack={() => setCurrentStep(1)}
          />
        );
      case 3:
        return (
          <Step3TaxProfile
            formData={formData}
            onNext={() => setCurrentStep(4)}
            onBack={() => setCurrentStep(2)}
          />
        );
      case 4:
        return (
          <Results
            formData={formData}
            onChange={onChange}
            onSubmit={() => setCurrentStep(5)}
          />
        );
      case 5:
        return <Confirmation formData={formData} onReset={reset} />;
      default:
        return null;
    }
  })();

  return (
    <div className="min-h-screen bg-bg flex flex-col">
      {showHeader && <Header />}

      <main className={`flex-1 ${showHeader ? 'pt-16' : ''}`}>
        {content}
      </main>

      {showFooter && <Footer />}
    </div>
  );
}
