import React from 'react';

interface LegalShellProps {
  title: string;
  lastUpdated: string; // format DD/MM/YYYY
  children: React.ReactNode;
  className?: string;
  note?: React.ReactNode;
}

/**
 * Shared layout wrapper for legal / policy pages to ensure consistent spacing, typography and metadata display.
 */
export const LegalShell: React.FC<LegalShellProps> = ({ title, lastUpdated, children, className = '', note }) => {
  return (
    <main className={`container mx-auto max-w-3xl px-4 pt-32 pb-16 ${className}`}>
      <h1 className="mb-6 text-3xl font-bold tracking-tight text-black dark:text-white">{title}</h1>
      <div className="prose prose-neutral dark:prose-invert max-w-none">
        {children}
      </div>
      <p className="mt-10 text-sm text-body-color dark:text-body-color-dark">Senest opdateret: {lastUpdated}</p>
      {note && <div className="mt-4 text-xs text-body-color dark:text-body-color-dark">{note}</div>}
    </main>
  );
};

export default LegalShell;
