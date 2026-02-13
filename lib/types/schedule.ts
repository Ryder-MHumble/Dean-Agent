export interface ScheduleEvent {
  time: string;
  endTime: string;
  title: string;
  subtitle: string;
  color: string;
  type: "meeting" | "conflict" | "deadline";
  confirmed: boolean;
  location: string;
  description: string;
  stakeholders: Array<{
    name: string;
    initial: string;
    role: string;
    bgColor: string;
  }>;
  talkingPoints: string[];
  files: Array<{
    name: string;
    size: string;
    added: string;
    iconBg: string;
    iconColor: string;
    icon: "doc" | "ppt";
  }>;
  conflictNote?: string;
  deadlineNote?: string;
}

export interface UpcomingEvent {
  day: string;
  date: string;
  title: string;
  time: string;
  type: "meeting" | "deadline";
}
