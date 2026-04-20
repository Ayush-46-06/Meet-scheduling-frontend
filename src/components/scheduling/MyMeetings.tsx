'use client';
import { Link, ExternalLink, CalendarSearch, Clock, Calendar } from 'lucide-react';
import { useState } from 'react';
import { ScheduledMeeting } from '@/types/meeting';

interface Props {
    meetings: ScheduledMeeting[];
    loading: boolean;
}

export default function MyMeetings({ meetings, loading }: Props) {
    const [copiedId, setCopiedId] = useState<number | string | null>(null);

    const handleCopy = (link: string, id: number | string) => {
        navigator.clipboard.writeText(link);
        setCopiedId(id);
        setTimeout(() => setCopiedId(null), 2000);
    };

    if (loading) {
        return (
            <div className="mt-6 bg-white rounded-2xl border border-slate-200 p-6">
                <div className="animate-pulse space-y-3">
                    <div className="h-4 bg-slate-100 rounded w-1/3" />
                    <div className="h-16 bg-slate-100 rounded-xl" />
                    <div className="h-16 bg-slate-100 rounded-xl" />
                </div>
            </div>
        );
    }

    if (meetings.length === 0) return null;

    // date and time format
    const formatTime = (datetime: string) => {
        const date = new Date(datetime);
        return date.toLocaleTimeString('en-IN', {
            hour: '2-digit', minute: '2-digit', hour12: true
        });
    };

    const formatDate = (datetime: string) => {
        const date = new Date(datetime);
        return date.toLocaleDateString('en-IN', {
            day: 'numeric', month: 'short', year: 'numeric'
        });
    };
    return (
        <div className="mt-6 bg-white rounded-2xl border border-slate-200 overflow-hidden">
            <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
                <h3
                    className="font-bold text-[15px]"
                    style={{ fontFamily: 'var(--font-sora)', color: 'var(--navy)' }}
                >
                    Your Scheduled Meetings
                </h3>
            </div>

            <div className="divide-y divide-slate-100">
                {meetings.map(meeting => (
                    <div key={meeting.id} className="px-4 sm:px-6 py-4 flex items-center gap-3 sm:gap-4">

                        {/* Left — icon */}
                        <div
                            className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                        >
                            <CalendarSearch size={25} style={{ color: 'var(--navy)' }} />
                        </div>

                        {/* Middle — details */}
                        <div className="flex-1 min-w-0">
                            <p className="font-semibold text-sm text-slate-800 truncate">
                                {meeting.title}
                            </p>
                            <div className="flex flex-col sm:flex-row sm:items-center gap-0.5 sm:gap-3 mt-0.5">
                                <span className="flex items-center gap-1 text-[12px] text-slate-500">
                                    <Calendar size={11} className='text-black'/>
                                    {formatDate(meeting.startTime)}
                                </span>
                                <span className="flex items-center gap-1 text-[12px] text-slate-500">
                                    <Clock size={11} className='text-black'/>
                                    {formatTime(meeting.startTime)} – {formatTime(meeting.endTime)}
                                </span>

                            </div>
                        </div>
                        {/* Right — join + copy */}
                        <div className="flex flex-col sm:flex-row items-end sm:items-center gap-1.5 sm:gap-2 shrink-0">
                            <a
                                href={meeting.meetingLink}
                                target="_blank"
                                rel="noreferrer"
                                className="flex items-center gap-1.5 text-[12px] font-medium px-3 py-1.5 rounded-lg border transition-all hover:bg-slate-50"
                                style={{ color: 'var(--teal)', borderColor: 'rgba(45,212,191,0.3)' }}
                            >
                                <ExternalLink size={12} />
                                Join
                            </a>
                            <button
                                onClick={() => handleCopy(meeting.meetingLink, meeting.id)}
                                className="flex items-center gap-1.5 text-[12px] font-medium px-3 py-1.5 rounded-lg border transition-all"
                                style={
                                    copiedId === meeting.id
                                        ? { background: 'rgba(45,212,191,0.1)', color: 'var(--teal)', borderColor: 'var(--teal)' }
                                        : { borderColor: '#E2E8F0', color: '#64748B' }
                                }
                            >
                                <Link size={12} />
                                <span className="hidden sm:inline">{copiedId === meeting.id ? 'Copied!' : 'Copy'}</span>
                                <span className="sm:hidden">{copiedId === meeting.id ? '✓' : ''}</span>
                            </button>
                        </div>

                    </div>
                ))}
            </div>
        </div>
    );
}