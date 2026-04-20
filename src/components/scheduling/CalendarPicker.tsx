'use client';
import { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Props {
  onDateSelect: (date: Date) => void;
  selectedDate: Date | null;
}

const DAYS = ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'];

export default function CalendarPicker({ onDateSelect, selectedDate }: Props) {
  const [current, setCurrent] = useState(new Date());
  const today = new Date();

  const year = current.getFullYear();
  const month = current.getMonth();

  const firstDay = new Date(year, month, 1).getDay(); // 0=Sun
  const adjustedFirst = (firstDay === 0 ? 6 : firstDay - 1); // Mon=0
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const prevMonthDays = new Date(year, month, 0).getDate();

  const cells: { day: number; type: 'prev' | 'curr' | 'next'; date: Date }[] = [];

  for (let i = adjustedFirst - 1; i >= 0; i--) {
    const d = prevMonthDays - i;
    cells.push({ day: d, type: 'prev', date: new Date(year, month - 1, d) });
  }
  for (let i = 1; i <= daysInMonth; i++) {
    cells.push({ day: i, type: 'curr', date: new Date(year, month, i) });
  }
  while (cells.length % 7 !== 0) {
    const d = cells.length - daysInMonth - adjustedFirst + 1;
    cells.push({ day: d, type: 'next', date: new Date(year, month + 1, d) });
  }

  const isToday = (date: Date) =>
    date.toDateString() === today.toDateString();
  const isPast = (date: Date) => date < new Date(today.setHours(0,0,0,0));
  const isSelected = (date: Date) =>
    selectedDate?.toDateString() === date.toDateString();
  const isWeekend = (date: Date) =>
    date.getDay() === 0 || date.getDay() === 6;

  const monthLabel = current.toLocaleString('default', { month: 'long', year: 'numeric' });

  return (
    <div className="p-5">
      <div className="flex items-center justify-between mb-4">
        <button
          onClick={() => setCurrent(new Date(year, month - 1, 1))}
          className="w-8 h-8 flex items-center justify-center rounded-lg border border-slate-200 hover:bg-slate-50 text-slate-500 transition-all"
        >
          <ChevronLeft size={15} />
        </button>
        <span className="font-semibold text-[15px] text-navy"
              style={{ fontFamily: 'var(--font-sora)', color: 'var(--navy)' }}>
          {monthLabel}
        </span>
        <button
          onClick={() => setCurrent(new Date(year, month + 1, 1))}
          className="w-8 h-8 flex items-center justify-center rounded-lg border border-slate-200 hover:bg-slate-50 text-slate-500 transition-all"
        >
          <ChevronRight size={15} />
        </button>
      </div>

      <div className="grid grid-cols-7 gap-0.5">
        {DAYS.map(d => (
          <div key={d} className="text-center text-[11px] font-semibold text-slate-400 tracking-wide uppercase pb-2">
            {d}
          </div>
        ))}
        {cells.map((cell, i) => {
          const other = cell.type !== 'curr';
          const past = !other && isPast(cell.date);
          const today_ = isToday(cell.date);
          const selected = isSelected(cell.date);
          const weekend = isWeekend(cell.date);

          return (
            <button
              key={i}
              disabled={other || past}
              onClick={() => !other && !past && onDateSelect(cell.date)}
              className={cn(
                'text-center py-2 text-[13px] rounded-lg transition-all',
                other && 'text-slate-200 cursor-default',
                !other && !past && !today_ && !selected && 'text-slate-600 hover:bg-slate-100',
                !other && weekend && !today_ && !selected && 'text-red-400',
                past && !other && 'text-slate-300 cursor-not-allowed',
                today_ && 'text-white font-semibold',
                selected && !today_ && 'font-bold',
              )}
              style={{
                background: today_ ? 'var(--navy)' : selected ? 'var(--teal)' : undefined,
                color: selected && !today_ ? 'var(--navy)' : undefined,
              }}
            >
              {cell.day}
            </button>
          );
        })}
      </div>
    </div>
  );
}