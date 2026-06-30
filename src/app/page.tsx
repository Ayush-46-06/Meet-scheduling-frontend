'use client';
import { useState, useEffect } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import CalendarPicker from '@/components/scheduling/CalendarPicker';
import TimeSlotPicker from '@/components/scheduling/TimeSlotPicker';
import MeetingForm from '@/components/scheduling/MeetingForm';
import { Meeting } from '@/types/meeting';
import { formatDate, generateTimeSlots } from '@/lib/utils';
import { useAuth } from '@/context/AuthContext';
import LoginModal from '@/components/ui/LoginModal';
import MeetingResultModal from '@/components/ui/MeetingResultModal';
import { ScheduledMeeting } from '@/types/meeting';
import MyMeetings from '@/components/scheduling/MyMeetings';

const TIME_SLOTS = generateTimeSlots(9, 18, 30);

export default function Home() {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [form, setForm] = useState<Partial<Meeting>>({});
  const { user } = useAuth();
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [myMeetings, setMyMeetings] = useState<ScheduledMeeting[]>([]);
  const [meetingsLoading, setMeetingsLoading] = useState(false);
  const [modalState, setModalState] = useState<{
    show: boolean;
    type: 'success' | 'conflict' | 'error';
    meetLink?: string;
  }>({ show: false, type: 'success' });

  // button disable until fill all
  const isFormValid =
    !!selectedDate &&
    !!selectedTime &&
    !!form.title?.trim() &&
    !!form.email?.trim()

  const handleSubmit = async () => {
    if (!selectedDate || !selectedTime || !form.title || !form.email) return;

    // time convert — "9:00 AM" → "09:00"
    const convertTo24 = (time: string): string => {
      const [t, ampm] = time.split(' ');
      let [h, m] = t.split(':').map(Number);
      if (ampm === 'PM' && h !== 12) h += 12;
      if (ampm === 'AM' && h === 12) h = 0;
      return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}`;
    };

    // correct time 
    const formatLocalDate = (date: Date) => {
      const y = date.getFullYear();
      const m = String(date.getMonth() + 1).padStart(2, '0');
      const d = String(date.getDate()).padStart(2, '0');
      return `${y}-${m}-${d}`;
    };
    const payload = {
      title: form.title,
      meetingDate: formatLocalDate(selectedDate!),
      startTime: convertTo24(selectedTime),
      endTime: convertTo24(calculateEndTime(selectedTime)),
      userEmail: form.email,
    };

    try {
      const res = await fetch('/api/create-meeting', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        const text = await res.text();
        // "Meeting created successfully: https://meet.google.com/xxx"
        const meetLink = text.includes('https://') ? text.split(': ')[1] : undefined;
        setModalState({ show: true, type: 'success', meetLink });
        // fetch meeting details
        fetch('/api/my-meetings', { credentials: 'include' })
          .then(r => r.json())
          .then(setMyMeetings);
      } else if (res.status === 409) {
        setModalState({ show: true, type: 'conflict' });
      } else {
        setModalState({ show: true, type: 'error' });
      }
    } catch {
      setModalState({ show: true, type: 'error' });
    }
  };

  // meeting fetch 
  useEffect(() => {
    if (!user) return;
    console.log('Fetching meetings for:', user.email);
    setMeetingsLoading(true);
    fetch('/api/my-meetings', {
      credentials: 'include',
    })
      .then(res => {
        console.log('Response status:', res.status);
        return res.ok ? res.json() : [];
      })
      .then(data => {
        console.log('Meetings data:', data);
        setMyMeetings(data);
        setMeetingsLoading(false);
      })
      .catch(err => {
        console.error('Error:', err);
        setMeetingsLoading(false);
      });
  }, [user]);

  // login required 
  const requireAuth = (callback: () => void) => {
    if (!user) {
      setShowLoginModal(true);
      return;
    }
    callback();
  };

  // end time 
  const calculateEndTime = (start: string): string => {
    if (!start) return '';
    const [time, ampm] = start.split(' ');
    const [h, m] = time.split(':').map(Number);
    let totalMin = (h % 12) * 60 + m + (ampm === 'PM' ? 720 : 0) + 30; // 30 min add
    const endH = Math.floor(totalMin / 60) % 12 || 12;
    const endM = totalMin % 60;
    const endAmpm = Math.floor(totalMin / 60) >= 12 ? 'PM' : 'AM';
    return `${endH}:${endM === 0 ? '00' : endM} ${endAmpm}`;
  };

  return (
    <div className="min-h-screen flex flex-col" style={{ background: '#F0F4F8' }}>
      {/* Login Modal */}
      {showLoginModal && (
        <LoginModal onClose={() => setShowLoginModal(false)} />
      )}
      {/* Navbar component */}
      <Navbar />
      {/* meeting result model */}
      {modalState.show && (
        <MeetingResultModal
          type={modalState.type}
          meetLink={modalState.meetLink}
          onClose={() => setModalState({ show: false, type: 'success' })}
        />
      )}

      <main className="flex-1 max-w-5xl mx-auto w-full px-6 py-10">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-slate-800"
            style={{ fontFamily: 'var(--font-sora)', color: 'var(--navy)' }}>
            Schedule a Meeting
          </h1>
          <p className="text-sm text-slate-500 mt-1">Pick a date and time that works best for you</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
          {/* Calendar Card */}
          <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
            <div className="p-6 relative overflow-hidden"
              style={{ background: 'linear-gradient(135deg, var(--navy) 0%, #1a3a5c 100%)' }}>
              <div className="absolute -top-4 -right-4 w-24 h-24 rounded-full bg-teal-400/10" />
              <h2 className="text-lg font-bold text-white relative z-10 inline"
                style={{ fontFamily: 'var(--font-sora)' }}>Meet with Us</h2>

              <p className="text-white/60 text-sm mt-0.5 relative z-10">Select your preferred date</p>

              <span className="inline-flex items-center gap-1.5 mt-3 px-3 py-1 rounded-lg text-[11px] font-medium relative z-10"
                style={{ background: 'rgba(45,212,191,0.2)', color: 'var(--teal)' }}>
                <span className="w-1.5 h-1.5 rounded-full bg-teal-400 inline-block" />
                30 min session
              </span>
            </div>

            {/* calender picker */}
            <CalendarPicker
              selectedDate={selectedDate}
              onDateSelect={(date) => requireAuth(() => setSelectedDate(date))} />

            {selectedDate && (
              <TimeSlotPicker
                slots={TIME_SLOTS}
                selected={selectedTime}
                onSelect={(slot) => requireAuth(() => setSelectedTime(slot))}
                dateLabel={selectedDate?.toLocaleDateString('en-IN', { month: 'short', day: 'numeric' })}
              />
            )}
          </div>

          {/* Form Card */}
          <div className="bg-white rounded-2xl border border-slate-200">
            <MeetingForm
              form={form}
              onChange={(field, value) => requireAuth(() =>
                setForm(prev => ({ ...prev, [field]: value }))
              )}
              onSubmit={() => requireAuth(handleSubmit)}
              selectedDateLabel={selectedDate ? formatDate(selectedDate) : ''}
              selectedTime={selectedTime || ''}
              endTime={calculateEndTime(selectedTime || '')}
              isValid={isFormValid}
            />
          </div>
        </div>
        {/* my meeting component */}
        <MyMeetings meetings={myMeetings} loading={meetingsLoading} />
      </main>
      {/* footer */}
      <Footer />
    </div>
  );
}