import React from 'react';

export default function LoadingSpinner() {
  return (
    <div className="min-h-screen bg-black flex items-center justify-center">
      <div className="flex flex-col items-center">
        <div className="animate-spin rounded-full h-12 w-12 border-2 border-green-500 border-t-transparent"></div>
        <p className="text-green-400 mt-4">Carregando...</p>
      </div>
    </div>
  );
}