export interface SecretaryTodoItem {
  id: string;
  title: string;
  priority: "urgent" | "important" | "normal";
  deadline?: string;
  completed: boolean;
  actionLabel?: string;
}

export interface SecretaryScheduleConflict {
  id: string;
  title: string;
  time: string;
  conflictWith: string;
  suggestion: string;
}

export interface SecretaryRecommendation {
  id: string;
  icon: "calendar" | "users" | "file";
  title: string;
  description: string;
}
