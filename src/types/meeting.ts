export interface Meeting {
  id?: string;
  title: string;
  email: string;
  name: string;
  selectedDate: string;
  startTime: string;
  endTime: string;
  status?: 'pending' | 'confirmed' | 'cancelled';
}

export interface MeetingResponse {
  success: boolean;
  meetLink?: string;
  error?: string;
  message?: string;
}

export interface ScheduledMeeting {
  id: number;
  title: string;
  meetingDate?: string;
  startTime: string;
  endTime: string;
  meetingLink: string;
  userEmail: string;
  managerEmail: string;
}