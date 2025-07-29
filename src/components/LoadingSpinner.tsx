import React from 'react';

const LoadingSpinner: React.FC = () => {
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-white">
      <div className="text-center">
        <div className="relative">
          <div className="w-20 h-20 border-4 border-primary-100 border-t-primary-700 rounded-full animate-spin mx-auto mb-4"></div>
          <div className="absolute inset-0 w-20 h-20 mx-auto">
            <div className="w-full h-full border-2 border-primary-600 rounded-full animate-pulse opacity-50"></div>
          </div>
        </div>
        <div className="space-y-2">
          <p className="text-primary-600 animate-pulse font-semibold">
            Opening portal to the multiverse
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoadingSpinner;
