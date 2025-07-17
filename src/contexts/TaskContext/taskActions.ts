import type { TaskModel } from "../../models/TaskModel";
import type { TaskStateModel } from "../../models/TaskStateModel";

export enum TaskActionTypes {
  START_TASK = "START_TASK",
  STOP_TASK = "STOP_TASK",
  RESET_TASK = "RESET_TASK",
  COUNT_DOWN = "COUNT_DOWN",
  COMPLETE_TASK = "COMPLETE_TASK",
  CHANGE_SETTINGS = "CHANGE_SETTINGS",
}

export type TaskActionModel =
  | {
      type: TaskActionTypes.START_TASK;
      payload: TaskModel;
    }
  | {
      type: TaskActionTypes.STOP_TASK;
    }
  | {
      type: TaskActionTypes.RESET_TASK;
    }
  | {
      type: TaskActionTypes.COUNT_DOWN;
      payload: { secondsRemaining: number }; // seconds remaining
    }
  | {
      type: TaskActionTypes.COMPLETE_TASK; // completed task
    }
  | {
      type: TaskActionTypes.CHANGE_SETTINGS; // completed task
      payload: TaskStateModel["config"]; // completed task
    };
