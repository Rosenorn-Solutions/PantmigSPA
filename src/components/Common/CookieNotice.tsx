"use client";
import { useEffect, useState } from 'react';
import Link from 'next/link';

/**
 * Informational cookie / no-tracking notice.
 * No actual cookies are set here; purely communicates current practice.
 */
export default function CookieNotice() {
  const STORAGE_KEY = 'pantmig_cookie_notice_dismissed_v1';
  const [open, setOpen] = useState(false);

  useEffect(() => {
    try {
      const dismissed = typeof window !== 'undefined' && window.localStorage.getItem(STORAGE_KEY);
      if (!dismissed) setOpen(true);
    } catch {
      // ignore storage access errors
      setOpen(true);
    }
  }, []);

  const dismiss = () => {
    try { window.localStorage.setItem(STORAGE_KEY, '1'); } catch {}
    setOpen(false);
  };

  if (!open) return null;

  return (
    <div className="fixed bottom-4 left-1/2 z-[9999] w-[calc(100%-2rem)] max-w-xl -translate-x-1/2 rounded-lg border border-gray-200 bg-white p-4 shadow-lg dark:border-gray-700 dark:bg-gray-900">
      <div className="flex items-start gap-4">
        <div className="text-sm text-gray-700 dark:text-gray-200">
          <strong className="font-semibold">Ingen tracking-cookies.</strong> Vi bruger i øjeblikket ingen
          markedsførings- eller adfærds-tracking. Kun nødvendige funktioner. Læs mere i vores{' '}
          <Link href="/privatlivspolitik" className="text-primary underline">privatlivspolitik</Link>.
        </div>
        <button
          onClick={dismiss}
          aria-label="Luk besked"
          className="rounded-md p-1 text-gray-500 transition hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-white"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>
        </button>
      </div>
      <div className="mt-3 flex flex-wrap gap-3">
        <button onClick={dismiss} className="rounded bg-primary px-4 py-1.5 text-sm font-medium text-white shadow hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-primary/40">OK</button>
        <button onClick={dismiss} className="text-sm text-gray-600 underline underline-offset-2 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white">Skjul</button>
      </div>
    </div>
  );
}
