import { SaveIcon } from "lucide-react";
import { Container } from "../../components/Container";
import { DefaultButton } from "../../components/DefaultButton";
import { DefaultInput } from "../../components/DefaultInput";
import { Heading } from "../../components/Heading";

import { MainTemplate } from "../../templates/MainTemplate";
import { useRef } from "react";
import { useTaskContext } from "../../contexts/TaskContext/useTaskContext";
import { showMessage } from "../../adapters/showMessage";
import { TaskActionTypes } from "../../contexts/TaskContext/taskActions";

export function Settings() {
  const { state, dispatch } = useTaskContext();
  const workTimeInput = useRef<HTMLInputElement>(null);
  const shortBreakInput = useRef<HTMLInputElement>(null);
  const longBreakInput = useRef<HTMLInputElement>(null);
  function handleSaveSettings(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const workTime = Number(workTimeInput.current?.value);
    const shortBreakTime = Number(shortBreakInput.current?.value);
    const longBreakTime = Number(longBreakInput.current?.value);

    if (workTime < 1 || workTime > 99) {
      showMessage.error("Work time must be between 1 and 99 minutes.");
      return;
    }

    if (shortBreakTime < 1 || shortBreakTime > 30) {
      showMessage.error("Short break must be between 1 and 30 minutes.");
      return;
    }

    if (longBreakTime < 1 || longBreakTime > 60) {
      showMessage.error("Long break must be between 1 and 60 minutes.");
      return;
    }

    if (isNaN(workTime) || isNaN(shortBreakTime) || isNaN(longBreakTime)) {
      showMessage.error("Please enter valid numbers for all fields.");
      return;
    }
    dispatch({
      type: TaskActionTypes.CHANGE_SETTINGS,
      payload: { workTime, shortBreakTime, longBreakTime },
    });
    showMessage.success("Settings saved!");
  }

  return (
    <MainTemplate>
      <Container>
        <Heading>Settings</Heading>
      </Container>

      <Container>
        <p style={{ textAlign: "center" }}>
          Change focus, break and pomodoro duration
        </p>
      </Container>

      <Container>
        <form onSubmit={handleSaveSettings} action="" className="form">
          <div className="formRow">
            <DefaultInput
              id="focus"
              labelText="Focus"
              ref={workTimeInput}
              defaultValue={state.config.workTime}
              type="number"
            />
          </div>
          <div className="formRow">
            <DefaultInput
              id="shortBreak"
              labelText="short break"
              ref={shortBreakInput}
              defaultValue={state.config.shortBreakTime}
              type="number"
            />
          </div>
          <div className="formRow">
            <DefaultInput
              id="longBreak"
              labelText="long break"
              ref={longBreakInput}
              defaultValue={state.config.longBreakTime}
              type="number"
            />
          </div>
          <div className="formRow">
            <DefaultButton
              icon={<SaveIcon />}
              type="submit"
              aria-label="save settings"
              title="save settings"
            ></DefaultButton>
          </div>
        </form>
      </Container>
    </MainTemplate>
  );
}

