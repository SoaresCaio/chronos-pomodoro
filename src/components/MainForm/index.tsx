import { PlayCircleIcon, StopCircleIcon } from "lucide-react";
import { DefaultInput } from "../DefaultInput";
import { Cycles } from "../Cycles";
import { DefaultButton } from "../DefaultButton";
import { useRef } from "react";
import type { TaskModel } from "../../models/TaskModel";
import { useTaskContext } from "../../contexts/TaskContext/useTaskContext";
import { getNextCycle } from "../utils/getNextCycle";
import { getNextCycleType } from "../utils/getNextCycleType";
import { TaskActionTypes } from "../../contexts/TaskContext/taskActions";
import { Tips } from "../Tips";

export function MainForm() {
  const { state, dispatch } = useTaskContext();
  const taskNameInput = useRef<HTMLInputElement>(null);

  //cycles
  const nextCycle = getNextCycle(state.currentCycle);
  const nextCycleType = getNextCycleType(nextCycle);

  //tips

  function handleCreateNewTask(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (taskNameInput.current === null) return;
    const taskName = taskNameInput.current.value.trim();
    if (!taskName) {
      alert("Please enter a task name.");
      return;
    }
    const newTask: TaskModel = {
      id: Date.now().toString(),
      name: taskName,
      startDate: Date.now(),
      completeDate: null,
      interruptedDate: null,
      duration: state.config[nextCycleType],
      type: nextCycleType,
    };

    const secondsRemaining = newTask.duration * 60; // Convert minutes to seconds

    dispatch({ type: TaskActionTypes.START_TASK, payload: newTask });
  }

  function handleStopTask() {
    dispatch({ type: TaskActionTypes.STOP_TASK });
  }

  return (
    <form onSubmit={handleCreateNewTask} className="form" action="">
      <div className="formRow">
        <DefaultInput
          labelText="Task"
          id="input"
          type="text"
          placeholder="Digite uma tarefa"
          ref={taskNameInput}
          disabled={!!state.activeTask}
        />
      </div>

      <div className="formRow">
        <Tips />
      </div>

      {state.currentCycle > 0 && (
        <div className="formRow">
          <Cycles />
        </div>
      )}

      <div className="formRow">
        {!state.activeTask ? (
          <DefaultButton
            aria-label="Start task"
            title="Start task"
            type="submit"
            icon={<PlayCircleIcon />}
            key="submit-task"
          />
        ) : (
          <DefaultButton
            aria-label="Stop task"
            title="Stop task"
            type="button"
            color="red"
            icon={<StopCircleIcon />}
            onClick={handleStopTask}
            key="stop-task"
          />
        )}
      </div>
    </form>
  );
}
