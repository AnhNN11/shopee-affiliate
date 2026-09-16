'use client';

import { useState } from 'react';

type CopyState = 'idle' | 'copied' | 'error';

export function CopyCodeButton({ code, disabled = false }: { code: string; disabled?: boolean }) {
  const [copyState, setCopyState] = useState<CopyState>('idle');

  async function copyCode() {
    if (disabled) return;

    try {
      if (!navigator.clipboard) throw new Error('Clipboard API unavailable');
      await navigator.clipboard.writeText(code);
      setCopyState('copied');
    } catch {
      setCopyState('error');
    }

    window.setTimeout(() => setCopyState('idle'), 1800);
  }

  const label = disabled
    ? 'Mã không còn khả dụng'
    : copyState === 'copied'
      ? 'Đã sao chép mã ✓'
      : copyState === 'error'
        ? `Hãy chọn mã ${code}`
        : `Sao chép ${code}`;

  return <button className="copy-code-large" type="button" onClick={copyCode} disabled={disabled} aria-live="polite">{label}</button>;
}
