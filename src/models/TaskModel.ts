import type { TaskStateModel } from "./TaskStateModel";

export type TaskModel = {
  id: string;
  name: string;
  duration: number; // in minutes
  startDate: number;
  completeDate: number | null; // null if not completed
  interruptedDate: number | null; // null if not interrupted
  type: keyof TaskStateModel["config"];
};
