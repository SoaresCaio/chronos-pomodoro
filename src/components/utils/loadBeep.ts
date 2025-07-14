import audiobeep from "../../assets/audios/gravitational_beep.mp3";

export function loadBeep() {
  const audio = new Audio(audiobeep);
  audio.load();
  return () => {
    audio.currentTime = 0;
    audio.play();
  };
}
