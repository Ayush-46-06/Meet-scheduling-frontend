'use client';
import Image from 'next/image';
import { Key, DoorOpen } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';

export default function Navbar() {
    const { user, login, logout } = useAuth();

    return (
        <nav className="h-[70px] px-4 sm:px-8 flex items-center justify-between border-b border-white/10 sticky top-0 z-50"
            style={{ background: 'var(--navy)' }}>

            <Image
                src="/White logo.png"
                alt="Athenura"
                width={130}
                height={38}
                className="object-contain w-[100px] sm:w-[130px] h-auto"
                priority
            />

            {user ? (
                <div className="flex items-center gap-3">
                    <span className="text-white/70 text-sm hidden sm:inline">Hi, {user.name}</span>
                    <button
                        onClick={logout}
                        className="flex items-center gap-2 text-white text-sm px-4 py-2 rounded-lg border border-white/25 hover:bg-white/10 transition-all"
                    >
                        <DoorOpen size={18} />
                        Logout
                    </button>
                </div>
            ) : (
                <button
                    onClick={login}
                    className="flex items-center gap-2 text-white text-sm px-4 py-2 rounded-lg border border-white/25 hover:bg-white/10 transition-all cursor-pointer"
                >
                    <Key size={18} className="hidden sm:inline" />
                    Connect with Google
                </button>
            )}
        </nav>
    );
}