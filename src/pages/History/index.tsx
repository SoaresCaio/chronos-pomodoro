import { TrashIcon } from "lucide-react";
import { Container } from "../../components/Container";
import { DefaultButton } from "../../components/DefaultButton";
import { Heading } from "../../components/Heading";
import { MainTemplate } from "../../templates/MainTemplate";
import styles from "./styles.module.css";
import { useTaskContext } from "../../contexts/TaskContext/useTaskContext";
import { formatDate } from "../../components/utils/formatDate";
import { getTaskStatus } from "../../components/utils/getTaskStatus";
import { sortTasks } from "../../components/utils/sortTasks";
import { TaskActionTypes } from "../../contexts/TaskContext/taskActions";
import { useEffect } from "react";

export function History() {
  const { state, dispatch } = useTaskContext();
  const sorteTasks = sortTasks({ tasks: state.tasks });
  const hasTasks = sorteTasks.length > 0;

  function handleResetHistory() {
    if (!confirm("Are you sure you want to delete all history?")) return;

    dispatch({ type: TaskActionTypes.RESET_TASK });
  }
  useEffect(() => {
    // This runs when tasks change - add any logic you need here
    // For example: save to localStorage, analytics, etc.
    console.log("Tasks updated:", state.tasks.length);
  }, [state.tasks]);

  return (
    <MainTemplate>
      <Container>
        <Heading>
          <span>History</span>
          {hasTasks && (
            <span className={styles.buttonContainer}>
              <DefaultButton
                icon={<TrashIcon />}
                color="red"
                aria-label="delete all history"
                title="delete all history"
                onClick={handleResetHistory}
              />
            </span>
          )}
        </Heading>
      </Container>

      <Container>
        {hasTasks && (
          <div className={styles.responsiveTable}>
            <table>
              <thead>
                <tr>
                  <th>Task</th>
                  <th>Duration</th>
                  <th>Date</th>
                  <th>Status</th>
                  <th>Type</th>
                </tr>
              </thead>

              <tbody>
                {sorteTasks.map((task) => {
                  const taskTypeDict = {
                    workTime: "Work Time",
                    shortBreakTime: "Short Break",
                    longBreakTime: "Long Break",
                  };

                  return (
                    <tr key={task.id}>
                      <td>{task.name}</td>
                      <td>{task.duration}min</td>
                      <td>{formatDate(task.startDate)}</td>
                      <td>{getTaskStatus(task, state.activeTask)}</td>
                      <td>{taskTypeDict[task.type]}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}

        {!hasTasks && (
          <p style={{ textAlign: "center", fontWeight: "bold" }}>
            No tasks found.
          </p>
        )}
      </Container>
    </MainTemplate>
  );
}
