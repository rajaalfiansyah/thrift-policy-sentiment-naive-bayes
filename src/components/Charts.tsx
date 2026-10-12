import type { SentimentLabel } from '@/engine/types';

interface PieSlice {
  label: SentimentLabel;
  count: number;
  color: string;
}

export function PieChart({ data, size = 200 }: { data: Record<SentimentLabel, number>; size?: number }) {
  const total = data.positif + data.negatif + data.netral || 1;
  const slices: PieSlice[] = [
    { label: 'positif', count: data.positif, color: '#10b981' },
    { label: 'negatif', count: data.negatif, color: '#ef4444' },
    { label: 'netral', count: data.netral, color: '#f59e0b' },
  ];

  const radius = size / 2 - 10;
  const cx = size / 2;
  const cy = size / 2;
  let cumulative = 0;

  const arcs = slices.map((slice) => {
    const fraction = slice.count / total;
    const startAngle = cumulative * 2 * Math.PI - Math.PI / 2;
    cumulative += fraction;
    const endAngle = cumulative * 2 * Math.PI - Math.PI / 2;

    const x1 = cx + radius * Math.cos(startAngle);
    const y1 = cy + radius * Math.sin(startAngle);
    const x2 = cx + radius * Math.cos(endAngle);
    const y2 = cy + radius * Math.sin(endAngle);

    const largeArc = fraction > 0.5 ? 1 : 0;

    const path = `M ${cx} ${cy} L ${x1} ${y1} A ${radius} ${radius} 0 ${largeArc} 1 ${x2} ${y2} Z`;

    return { path, color: slice.color, label: slice.label, pct: (fraction * 100).toFixed(1) };
  });

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      {arcs.map((arc, i) => (
        <path
          key={i}
          d={arc.path}
          fill={arc.color}
          stroke="white"
          strokeWidth="2"
          className="transition-opacity hover:opacity-80"
        />
      ))}
      <circle cx={cx} cy={cy} r={radius * 0.5} fill="white" />
      <text x={cx} y={cy - 5} textAnchor="middle" className="fill-slate-700 text-lg font-bold">
        {total}
      </text>
      <text x={cx} y={cy + 15} textAnchor="middle" className="fill-slate-400 text-xs">
        Total Data
      </text>
    </svg>
  );
}

export function BarChart({ data }: { data: Record<SentimentLabel, number> }) {
  const total = data.positif + data.negatif + data.netral || 1;
  const bars: { label: SentimentLabel; count: number; color: string; display: string }[] = [
    { label: 'positif', count: data.positif, color: 'bg-emerald-500', display: 'Positif' },
    { label: 'negatif', count: data.negatif, color: 'bg-red-500', display: 'Negatif' },
    { label: 'netral', count: data.netral, color: 'bg-amber-500', display: 'Netral' },
  ];

  return (
    <div className="space-y-3">
      {bars.map((bar) => {
        const pct = (bar.count / total) * 100;
        return (
          <div key={bar.label}>
            <div className="mb-1 flex justify-between text-sm font-medium text-slate-600">
              <span>{bar.display}</span>
              <span>{bar.count} ({pct.toFixed(1)}%)</span>
            </div>
            <div className="h-3 w-full overflow-hidden rounded-full bg-slate-100">
              <div
                className={`h-full rounded-full ${bar.color} transition-all duration-1000 ease-out`}
                style={{ width: `${pct}%` }}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
}
