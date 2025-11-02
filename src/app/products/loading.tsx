export default function Loading() {
  return (
    <div className="grid gap-4 grid-cols-[repeat(auto-fill,minmax(220px,1fr))] p-16">
      {Array.from({ length: 8 }).map((_, i) => (
        <div key={i} className="animate-pulse rounded-2xl bg-zinc-200 h-64" />
      ))}
    </div>
  );
}
