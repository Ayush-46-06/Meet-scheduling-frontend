'use client';
import { cn } from '@/lib/utils';

interface Props {
  slots: string[];
  selected: string | null;
  onSelect: (slot: string) => void;
  dateLabel?: string;
}

export default function TimeSlotPicker({ slots, selected, onSelect, dateLabel }: Props) {
  return (
    <div className="px-5 pb-5">
      <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-3">
        {dateLabel ? `Available — ${dateLabel}` : 'Available Slots'}
      </p>
      <div className="grid grid-cols-3 gap-1.5">
        {slots.map(slot => (
          <button
            key={slot}
            onClick={() => onSelect(slot)}
            className={cn(
              'py-2 text-[12px] rounded-lg border transition-all',
              selected === slot
                ? 'font-semibold border-transparent'
                : 'border-slate-200 text-slate-500 hover:border-teal-400 hover:text-slate-800 hover:bg-teal-50'
            )}
            style={selected === slot ? {
              background: 'var(--teal)',
              color: 'var(--navy)',
              borderColor: 'var(--teal)',
            } : {}}
          >
            {slot}
          </button>
        ))}
      </div>
    </div>
  );
}