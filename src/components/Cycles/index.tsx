import { useTaskContext } from "../../contexts/TaskContext/useTaskContext";
import { getNextCycle } from "../utils/getNextCycle";
import { getNextCycleType } from "../utils/getNextCycleType";
import styles from "./styles.module.css";

export function Cycles() {
  const { state } = useTaskContext();
  const cycleStep = Array.from({ length: state.currentCycle });

  const cycleDescription = {
    workTime: "focus",
    shortBreakTime: "short break",
    longBreakTime: "long break",
  };

  return (
    <div className={styles.cycles}>
      <span>Ciclos:</span>
      <div className={styles.cycleDots}>
        {cycleStep.map((_, index) => {
          const nextCycle = getNextCycle(index);
          const nextCycleType = getNextCycleType(nextCycle);
          return (
            <span
              key={`${nextCycleType}_${nextCycle}`}
              className={`${styles.cycleDot} ${styles[nextCycleType]}`}
              aria-label={`indicator of cycle type: ${cycleDescription[nextCycleType]}`}
              title={`indicator of cycle type: ${cycleDescription[nextCycleType]}`}
            ></span>
          );
        })}
        {/* <span className={`${styles.cycleDot} ${styles.nextCycleType}`}></span> */}
      </div>
    </div>
  );
}
