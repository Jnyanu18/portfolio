import React from 'react';

const LoadingSpinner: React.FC = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="text-center">
        <div className="relative">
          <div className="w-20 h-20 border-4 border-secondary-200 rounded-full animate-spin border-t-primary-600"></div>
          <div className="absolute inset-0 w-20 h-20 border-4 border-transparent rounded-full animate-ping border-t-primary-400"></div>
        </div>
        <p className="mt-4 text-secondary-600 font-medium">Loading portfolio...</p>
      </div>
    </div>
  );
};

export default LoadingSpinner;