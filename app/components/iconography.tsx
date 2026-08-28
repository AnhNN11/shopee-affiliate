type UiIconName = 'ticket' | 'spark' | 'grid' | 'search' | 'check' | 'arrow';

export function UiIcon({ name, className = '' }: { name: UiIconName; className?: string }) {
  const common = {
    className: `ui-icon ${className}`.trim(),
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: 1.8,
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const,
    'aria-hidden': true,
  };

  if (name === 'ticket') {
    return <svg {...common}><path d="M4 7.5A1.5 1.5 0 0 1 5.5 6h13A1.5 1.5 0 0 1 20 7.5v2.1a2.7 2.7 0 0 0 0 4.8v2.1a1.5 1.5 0 0 1-1.5 1.5h-13A1.5 1.5 0 0 1 4 16.5v-2.1a2.7 2.7 0 0 0 0-4.8V7.5Z" /><path d="M9 7.8v8.4" strokeDasharray="2.1 2.1" /></svg>;
  }

  if (name === 'spark') {
    return <svg {...common}><path d="m13 2-7 11h5l-1 9 8-12h-5V2Z" /></svg>;
  }

  if (name === 'grid') {
    return <svg {...common}><rect x="4" y="4" width="6" height="6" rx="1" /><rect x="14" y="4" width="6" height="6" rx="1" /><rect x="4" y="14" width="6" height="6" rx="1" /><rect x="14" y="14" width="6" height="6" rx="1" /></svg>;
  }

  if (name === 'search') {
    return <svg {...common}><circle cx="10.5" cy="10.5" r="5.5" /><path d="m15 15 4.5 4.5" /></svg>;
  }

  if (name === 'check') {
    return <svg {...common}><path d="m5 12.5 4.2 4.2L19 7" /></svg>;
  }

  return <svg {...common}><path d="M5 12h14M14 7l5 5-5 5" /></svg>;
}
