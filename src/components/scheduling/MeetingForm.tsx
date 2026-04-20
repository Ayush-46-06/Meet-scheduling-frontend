'use client';
import { Calendar, Clock, Info, ArrowRight, CalendarCheck2 } from 'lucide-react';
import { Meeting } from '@/types/meeting';

interface Props {
  form: Partial<Meeting>;
  onChange: (field: keyof Meeting, value: string) => void;
  onSubmit: () => void;
  selectedDateLabel: string;
  selectedTime: string;
  endTime: string
  isValid: boolean;
}

export default function MeetingForm({ form, onChange, onSubmit, selectedDateLabel, selectedTime, isValid, endTime }: Props) {
  return (
    <div className="p-6">
      <h2 className="text-[17px] font-bold text-slate-800 mb-1"
        style={{ fontFamily: 'var(--font-sora)' }}>
        Meeting Details
      </h2>
      <p className="text-[13px] text-slate-400 mb-6">
        Fill in your information to confirm the booking
      </p>

      {[
        { label: 'Meeting Title', field: 'title' as keyof Meeting, placeholder: 'e.g. Product Demo Call', type: 'text' },
        { label: 'Your Email', field: 'email' as keyof Meeting, placeholder: 'name@company.com', type: 'email' },
      ].map(({ label, field, placeholder, type }) => (
        <div key={field} className="mb-4">
          <label className="block text-[11px] font-semibold text-slate-500 uppercase tracking-wider mb-1.5">
            {label}
          </label>
          <input
            type={type}
            placeholder={placeholder}
            value={(form[field] as string) || ''}
            onChange={e => onChange(field, e.target.value)}
            className="w-full px-3 py-2.5 text-sm border-[1.5px] border-slate-200 rounded-xl bg-slate-50 focus:outline-none focus:border-teal-400 focus:bg-white focus:ring-2 focus:ring-teal-400/10 transition-all"
          />
        </div>
      ))}

      <div className="mb-4">
        <label className="block text-[11px] font-semibold text-slate-500 uppercase tracking-wider mb-1.5">
          Selected Date
        </label>
        <div className="flex items-center justify-between px-3 py-2.5 border-[1.5px] border-slate-200 rounded-xl bg-slate-50 text-sm">
          <span className={selectedDateLabel ? 'text-slate-700' : 'text-slate-300'}>
            {selectedDateLabel || 'Pick a date from calendar'}
          </span>
          <Calendar size={14} className="text-teal-400" />
        </div>
      </div>

      <div className="mb-5">
        <label className="block text-[11px] font-semibold text-slate-500 uppercase tracking-wider mb-1.5">
          Time
        </label>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <p className="text-[11px] text-slate-400 mb-1">Start Time</p>
            <div className="flex items-center justify-between px-3 py-2.5 border-[1.5px] border-slate-200 rounded-xl bg-slate-50 text-sm">
              <span className={selectedTime ? 'text-slate-700' : 'text-slate-300'}>
                {selectedTime || 'Select slot'}
              </span>
              <Clock size={14} className="text-teal-400" />
            </div>
          </div>
          <div>
            <p className="text-[11px] text-slate-400 mb-1">End Time</p>
            <div className="flex items-center justify-between px-3 py-2.5 border-[1.5px] border-slate-200 rounded-xl bg-slate-50 text-sm">
              <span className={endTime ? 'text-slate-700' : 'text-slate-300'}>
                {endTime || 'Select slot'}
              </span>
              <Clock size={14} className="text-teal-400" />
            </div>
          </div>
        </div>
      </div>

      <div className="flex items-start gap-2 bg-slate-50 border border-slate-200 rounded-xl p-3 mb-5">
        <Info size={13} className="text-teal-400 mt-0.5 shrink-0" />
        <p className="text-[12px] text-slate-500">
          Google Calendar invite will be sent automatically after Confirming.
        </p>
      </div>

      <button
        onClick={onSubmit}
        disabled={!isValid}
        className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl font-semibold text-[15px] text-white transition-all disabled:opacity-40 disabled:cursor-not-allowed hover:enabled:-translate-y-0.5 active:enabled:translate-y-0"
        style={{ background: 'var(--navy)', fontFamily: 'var(--font-sora)' }}
      >
        <CalendarCheck2 size={20} />
        Confirm Meeting
      </button>
    </div>
  );
}