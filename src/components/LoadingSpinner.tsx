import React from 'react';

const LoadingSpinner: React.FC = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
      <div className="text-center">
        {/* Spinner */}
        <div className="relative">
          <div className="w-20 h-20 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mx-auto mb-4"></div>
          
          {/* Portal effect */}
          <div className="absolute inset-0 w-20 h-20 mx-auto">
            <div className="w-full h-full border-2 border-green-400 rounded-full animate-pulse opacity-50"></div>
          </div>
        </div>
        
        {/* Loading text */}
        <div className="space-y-2">
          <h2 className="text-2xl font-bold text-white font-rick">
            Loading...
          </h2>
          <p className="text-gray-300 animate-pulse">
            Opening portal to the multiverse
          </p>
        </div>
        
        {/* Rick and Morty themed loading dots */}
        <div className="flex justify-center mt-6 space-x-2">
          <div className="w-3 h-3 bg-green-500 rounded-full animate-bounce"></div>
          <div className="w-3 h-3 bg-blue-500 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
          <div className="w-3 h-3 bg-purple-500 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
        </div>
      </div>
    </div>
  );
};

export default LoadingSpinner;
