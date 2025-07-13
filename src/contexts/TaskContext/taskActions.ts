import type { TaskModel } from "../../models/TaskModel";

export enum TaskActionTypes {
  START_TASK = "START_TASK",
  STOP_TASK = "STOP_TASK",
}

export type TaskActionModel =
  | {
      type: TaskActionTypes.START_TASK;
      payload: TaskModel;
    }
  | {
      type: TaskActionTypes.STOP_TASK;
    };
