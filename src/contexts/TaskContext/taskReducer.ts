import { formatSecondsToMinutes } from "../../components/utils/formatSecontsToMinutes";
import { getNextCycle } from "../../components/utils/getNextCycle";
import type { TaskStateModel } from "../../models/TaskStateModel";
import { TaskActionTypes, type TaskActionModel } from "./taskActions";

export function taskReducer(
  state: TaskStateModel,
  action: TaskActionModel
): TaskStateModel {
  switch (action.type) {
    case TaskActionTypes.START_TASK: {
      const newTask = action.payload;
      const nextCycle = getNextCycle(state.currentCycle);
      const secondsRemaining = newTask.duration * 60; // Convert minutes to seconds
      return {
        ...state,
        activeTask: newTask,
        currentCycle: nextCycle,
        secondsRemaining: newTask.duration * 60, // Convert minutes to seconds
        formattedSecondsRemaining: formatSecondsToMinutes(secondsRemaining), // Placeholder, should be formatted later
        tasks: [...state.tasks, newTask],
      };
    }
    case TaskActionTypes.STOP_TASK: {
      return {
        ...state,
        activeTask: null,
        secondsRemaining: 0,
        formattedSecondsRemaining: "00:00",
        tasks: state.tasks.map((task) => {
          if (state.activeTask && state.activeTask.id === task.id) {
            return {
              ...task,
              interruptedDate: Date.now(),
            };
          }
          return task;
        }),
      };
    }
    case TaskActionTypes.COMPLETE_TASK: {
      return {
        ...state,
        activeTask: null,
        secondsRemaining: 0,
        formattedSecondsRemaining: "00:00",
        tasks: state.tasks.map((task) => {
          if (state.activeTask && state.activeTask.id === task.id) {
            return {
              ...task,
              completeDate: Date.now(),
            };
          }
          return task;
        }),
      };
    }
    case TaskActionTypes.COUNT_DOWN: {
      const secondsRemaining = action.payload.secondsRemaining;
      return {
        ...state,
        secondsRemaining,
        formattedSecondsRemaining: formatSecondsToMinutes(secondsRemaining),
      };
    }
  }
  return state;
}
