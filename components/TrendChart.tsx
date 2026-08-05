export type Series = { data: number[]; color: string; label: string };

export default function TrendChart({
  series,
  height = 140,
}: {
  series: Series[];
  height?: number;
}) {
  const w = 360;
  const h = height;
  const all = series.flatMap((s) => s.data);
  const max = Math.max(...all);
  const min = Math.min(...all);
  const range = max - min || 1;
  const toPts = (data: number[]) =>
    data
      .map((v, i) => `${(i / (data.length - 1)) * w},${h - ((v - min) / range) * h}`)
      .join(" ");

  return (
    <div>
      <svg viewBox={`0 0 ${w} ${h}`} className="w-full" style={{ height }} preserveAspectRatio="none">
        {series.map((s, i) => (
          <polyline key={i} points={toPts(s.data)} fill="none" stroke={s.color} strokeWidth={2} />
        ))}
      </svg>
      <div className="mt-1 flex gap-4 text-xs text-slate-500">
        {series.map((s, i) => (
          <span key={i} className="flex items-center gap-1">
            <span className="inline-block h-2 w-2 rounded-full" style={{ background: s.color }} />
            {s.label}
          </span>
        ))}
      </div>
    </div>
  );
}
