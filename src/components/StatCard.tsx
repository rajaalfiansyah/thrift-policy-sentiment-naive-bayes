import type { ReactNode } from 'react';
import { useCountUp } from './useCountUp';

interface StatCardProps {
  icon: ReactNode;
  value: string | number;
  suffix?: string;
  label: string;
  sublabel?: string;
  color: 'emerald' | 'sky' | 'amber' | 'red';
}

const COLORS = {
  emerald: { bg: 'bg-emerald-50', text: 'text-emerald-600', border: 'border-emerald-100' },
  sky: { bg: 'bg-sky-50', text: 'text-sky-600', border: 'border-sky-100' },
  amber: { bg: 'bg-amber-50', text: 'text-amber-600', border: 'border-amber-100' },
  red: { bg: 'bg-red-50', text: 'text-red-600', border: 'border-red-100' },
};

export function StatCard({ icon, value, suffix, label, sublabel, color }: StatCardProps) {
  const numericValue = typeof value === 'number' ? value : 0;
  const { value: animated, ref } = useCountUp(numericValue);
  const c = COLORS[color];

  return (
    <div
      ref={ref}
      className={`rounded-2xl border ${c.border} ${c.bg} p-5 transition hover:shadow-md`}
    >
      <div className="mb-3 flex items-center justify-between">
        <div className={`flex h-10 w-10 items-center justify-center rounded-xl bg-white ${c.text}`}>
          {icon}
        </div>
      </div>
      <div className={`text-3xl font-bold ${c.text}`}>
        {typeof value === 'number' ? Math.round(animated) : value}
        {suffix}
      </div>
      <div className="mt-1 text-sm font-semibold text-slate-700">{label}</div>
      {sublabel && <div className="text-xs text-slate-500">{sublabel}</div>}
    </div>
  );
}
