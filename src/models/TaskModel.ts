export type TaskModel = {
  id: string;
  name: string;
  duration: number; // in minutes
  startDate: number;
  endDate: number | null; // null if not completed
  interruptedDate: number | null; // null if not interrupted
  type: "workTime" | "breakTime" | "longBreakTime";
};
