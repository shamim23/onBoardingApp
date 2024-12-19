import React from 'react';

interface StatusMessageProps {
  error?: string;
  success?: string;
}

export function StatusMessage({ error, success }: StatusMessageProps) {
  if (!error && !success) return null;

  const messageClass = error 
    ? "bg-red-100 border-red-400 text-red-700" 
    : "bg-green-100 border-green-400 text-green-700";

  return (
    <div className={`mt-4 p-2 border rounded ${messageClass}`}>
      {error || success}
    </div>
  );
}