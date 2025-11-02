"use client";
export default function Error({ error, reset }: { error: Error, reset: () => void }) {
  return (
    <main className="p-10 text-center">
      <h2 className="text-xl font-bold mb-2">حدث خطأ غير متوقع</h2>
      <p className="opacity-80 mb-6">{error.message}</p>
      <button onClick={reset} className="rounded-xl bg-emerald-700 text-white px-4 py-2">إعادة المحاولة</button>
    </main>
  );
}
