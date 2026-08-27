'use client';

import { useState } from 'react';

export function CopyCodeButton({ code }: { code: string }) {
  const [copied, setCopied] = useState(false);

  async function copyCode() {
    await navigator.clipboard?.writeText(code);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1800);
  }

  return <button className="copy-code-large" type="button" onClick={copyCode}>{copied ? 'Đã sao chép mã ✓' : `Sao chép ${code}`}</button>;
}

