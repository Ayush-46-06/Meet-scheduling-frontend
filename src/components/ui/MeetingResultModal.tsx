'use client';
import { CheckCircle2, XCircle, Copy, ExternalLink, X } from 'lucide-react';
import { useState } from 'react';

interface Props {
  type: 'success' | 'conflict' | 'error';
  meetLink?: string;
  onClose: () => void;
}

export default function MeetingResultModal({ type, meetLink, onClose }: Props) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    if (meetLink) {
      navigator.clipboard.writeText(meetLink);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center"
         style={{ background: 'rgba(13,33,55,0.75)', backdropFilter: 'blur(4px)' }}>
      <div className="bg-white rounded-2xl shadow-2xl w-[90%] max-w-md p-8 relative">

        <button onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 transition-all">
          <X size={18} />
        </button>

        {/* SUCCESS */}
        {type === 'success' && (
          <>
            <div className="w-14 h-14 rounded-2xl flex items-center justify-center mb-5 mx-auto">
              <CheckCircle2 size={30} style={{ color: 'var(--teal)' }} />
            </div>
            <h2 className="text-xl font-bold text-center mb-2"
                style={{ fontFamily: 'var(--font-sora)', color: 'var(--navy)' }}>
              Meeting Scheduled!
            </h2>
            <p className="text-sm text-slate-400 text-center mb-6">
              Your meeting has been confirmed. Google Calendar invite has been sent.
            </p>

            {meetLink && (
              <div className="mb-5">
                <p className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider mb-2">
                  Meet Link
                </p>
                <div className="flex items-center gap-2 p-3 bg-slate-50 border border-slate-200 rounded-xl">
                  <a href={meetLink} target="_blank" rel="noreferrer"
                     className="flex-1 text-sm truncate"
                     style={{ color: 'var(--teal)' }}>
                    {meetLink}
                  </a>
                  <button onClick={handleCopy}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all border"
                    style={copied
                      ? { background: 'rgba(45,212,191,0.15)', color: 'var(--teal)', borderColor: 'var(--teal)' }
                      : { borderColor: '#E2E8F0', color: '#64748B' }}>
                    <Copy size={12} />
                    {copied ? 'Copied!' : 'Copy'}
                  </button>
                </div>
              </div>
            )}

            <a href={meetLink} target="_blank" rel="noreferrer"
               className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl font-semibold text-white text-[15px] transition-all hover:-translate-y-0.5"
               style={{ background: 'var(--navy)', fontFamily: 'var(--font-sora)' }}>
              <ExternalLink size={16} />
              Join Meeting
            </a>
          </>
        )}

        {/* CONFLICT - Slot already booked */}
        {type === 'conflict' && (
          <>
            <div className="w-14 h-14 rounded-2xl flex items-center justify-center mb-5 mx-auto"
                 >
              <XCircle size={35} className="text-red-500" />
            </div>
            <h2 className="text-xl font-bold text-center mb-2"
                style={{ fontFamily: 'var(--font-sora)', color: 'var(--navy)' }}>
              Slot Already Booked
            </h2>
            <p className="text-sm text-slate-400 text-center mb-6">
              This time slot is already taken. Please select a different date or time.
            </p>
            <button onClick={onClose}
              className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl font-semibold text-white text-[15px] transition-all"
              style={{ background: '#EF4444', fontFamily: 'var(--font-sora)' }}>
              Choose Another Slot
            </button>
          </>
        )}

        {/* GENERIC ERROR */}
        {type === 'error' && (
          <>
            <div className="w-14 h-14 rounded-2xl flex items-center justify-center mb-5 mx-auto">
              <XCircle size={35} className="text-red-500" />
            </div>
            <h2 className="text-xl font-bold text-center mb-2"
                style={{ fontFamily: 'var(--font-sora)', color: 'var(--navy)' }}>
              Something Went Wrong
            </h2>
            <p className="text-sm text-slate-400 text-center mb-6">
              Please try again after some time.
            </p>
            <button onClick={onClose}
              className="w-full py-3.5 rounded-xl font-semibold text-white text-[15px]"
              style={{ background: 'var(--navy)', fontFamily: 'var(--font-sora)' }}>
              Close
            </button>
          </>
        )}

      </div>
    </div>
  );
}