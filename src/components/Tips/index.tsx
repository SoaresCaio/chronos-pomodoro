import { useTaskContext } from "../../contexts/TaskContext/useTaskContext";
import { getNextCycle } from "../utils/getNextCycle";
import { getNextCycleType } from "../utils/getNextCycleType";

export function Tips() {
  const { state } = useTaskContext();
  const nextCycle = getNextCycle(state.currentCycle);
  const nextCycleType = getNextCycleType(nextCycle);
  const tipsForWhenActiveTask = {
    workTime: (
      <span>Focus on your task for {state.config.workTime} minutes.</span>
    ),
    shortBreakTime: (
      <span>Take a short break for {state.config.shortBreakTime} minutes.</span>
    ),
    longBreakTime: <span>Long break</span>,
  };

  const tipsForNoActiveTask = {
    workTime: <span>Next cycle is {state.config.workTime} minutes.</span>,
    shortBreakTime: (
      <span>Break for {state.config.shortBreakTime} minutes.</span>
    ),
    longBreakTime: (
      <span>Next break is {state.config.longBreakTime} minutes.</span>
    ),
  };
  return (
    <>
      {!!state.activeTask && tipsForWhenActiveTask[state.activeTask.type]}
      {!state.activeTask && tipsForNoActiveTask[nextCycleType]}
    </>
  );
}
