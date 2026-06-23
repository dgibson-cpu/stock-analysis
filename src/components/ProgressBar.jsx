export default function ProgressBar({ currentStep, totalSteps = 3 }) {
  return (
    <div className="w-full max-w-lg mx-auto px-4 mb-8">
      <p className="text-text-secondary text-sm font-inter mb-3 text-center">
        Step {currentStep} of {totalSteps}
      </p>
      <div className="relative flex items-center">
        {/* Connecting line behind the dots */}
        <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 h-0.5 bg-border" />
        <div
          className="absolute left-0 top-1/2 -translate-y-1/2 h-0.5 bg-accent transition-all duration-300"
          style={{ width: `${((currentStep - 1) / (totalSteps - 1)) * 100}%` }}
        />

        {/* Step dots */}
        <div className="relative z-10 flex justify-between w-full">
          {Array.from({ length: totalSteps }).map((_, i) => {
            const step = i + 1;
            const completed = step < currentStep;
            const active = step === currentStep;
            return (
              <div key={step} className="flex flex-col items-center gap-1.5">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold transition-all duration-300 border-2 ${
                    completed
                      ? 'bg-accent border-accent text-bg'
                      : active
                      ? 'bg-accent border-accent text-bg shadow-[0_0_0_4px_rgba(201,168,76,0.2)]'
                      : 'bg-surface border-border text-text-secondary'
                  }`}
                >
                  {completed ? (
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  ) : (
                    step
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
