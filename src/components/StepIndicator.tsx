import React from 'react';

interface StepIndicatorProps {
  currentStep: number;
}

export function StepIndicator({ currentStep }: StepIndicatorProps) {
  return (
    <div className="mb-8">
      <div className="flex justify-between items-center">
        {[1, 2, 3].map((step) => (
          <div
            key={step}
            className={`w-8 h-8 rounded-full flex items-center justify-center ${
              step <= currentStep ? 'bg-indigo-600 text-white' : 'bg-gray-200'
            }`}
          >
            {step}
          </div>
        ))}
      </div>
    </div>
  );
}