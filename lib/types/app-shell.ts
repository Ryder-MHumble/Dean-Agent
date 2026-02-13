export interface NotificationItem {
  title: string;
  time: string;
  type: "urgent" | "deadline" | "warning" | "info";
  module: string;
}
