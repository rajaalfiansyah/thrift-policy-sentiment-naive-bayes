import type { SentimentLabel } from '@/engine/types';

export function SentimentBadge({ label, size = 'md' }: { label: SentimentLabel; size?: 'sm' | 'md' | 'lg' }) {
  const styles: Record<SentimentLabel, string> = {
    positif: 'bg-emerald-100 text-emerald-700 border-emerald-300',
    negatif: 'bg-red-100 text-red-700 border-red-300',
    netral: 'bg-amber-100 text-amber-700 border-amber-300',
  };
  const dotStyles: Record<SentimentLabel, string> = {
    positif: 'bg-emerald-500',
    negatif: 'bg-red-500',
    netral: 'bg-amber-500',
  };
  const labels: Record<SentimentLabel, string> = {
    positif: 'POSITIF',
    negatif: 'NEGATIF',
    netral: 'NETRAL',
  };
  const sizes = {
    sm: 'px-2 py-0.5 text-xs',
    md: 'px-3 py-1 text-sm',
    lg: 'px-4 py-1.5 text-base',
  };

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border font-semibold ${styles[label]} ${sizes[size]}`}
    >
      <span className={`h-2 w-2 rounded-full ${dotStyles[label]}`} />
      {labels[label]}
    </span>
  );
}
