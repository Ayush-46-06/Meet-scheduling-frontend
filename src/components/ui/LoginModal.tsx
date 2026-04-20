'use client';
import {  X, LockKeyhole } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';

interface Props {
  onClose: () => void;
}

export default function LoginModal({ onClose }: Props) {
  const { login } = useAuth();

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center"
         style={{ background: 'rgba(13,33,55,0.7)', backdropFilter: 'blur(4px)' }}>
      <div className="bg-white rounded-2xl shadow-2xl w-[90%] max-w-md p-8 relative">
        
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 transition-all"
        >
          <X size={18} />
        </button>

        {/* Icon */}
        <div className="w-14 h-14 rounded-2xl flex items-center justify-center mb-5 mx-auto">
          <LockKeyhole size={40} className='text-black ' />
        </div>

        {/* Text */}
        <h2 className="text-xl font-bold text-center mb-2"
            style={{ fontFamily: 'var(--font-sora)', color: 'var(--navy)' }}>
          Login Required
        </h2>
        <p className="text-sm text-slate-500 text-center mb-8">
          Please connect your <span className='text-sky-700'>Google account</span> to schedule a meeting
        </p>

        {/* Google Login Button */}
        <button
          onClick={login}
          className="w-full flex items-center justify-center gap-3 py-3.5 rounded-xl font-semibold text-white text-[15px] transition-all hover:-translate-y-0.5 cursor-pointer"
          style={{ background: 'var(--navy)', fontFamily: 'var(--font-sora)' }}
        >
          {/* <Chrome size={18} /> */}
          Continue with Google
        </button>
      </div>
    </div>
  );
}