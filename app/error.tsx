'use client';
export default function ErrorPage({ reset }: { reset: () => void }) {
  return <main className="page-shell"><section className="empty-state"><h1>Chưa tải được nội dung</h1><p>Vui lòng thử lại sau ít phút.</p><button className="primary-button" onClick={reset}>Thử lại</button></section></main>;
}
