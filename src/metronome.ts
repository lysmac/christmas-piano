import playNote from "./playNote";

let intervalId: number;
const metronomeArray: string[] = [];
const metronomeSound = "../src/assets/sounds/m.mp3";

export default function metronome(
  toggle: boolean,
  note?: string | undefined | null
) {
  clearInterval(intervalId);

  if (!toggle) {
    console.log("Stopped the metronome");
    clearInterval(intervalId);
    const returnArray = [...metronomeArray];
    metronomeArray.length = 0;
    return returnArray;
  }
  if (toggle) {
    if (note) {
      metronomeArray.push(note);
    } else {
      intervalId = setInterval(() => {
        metronomeArray.push("tick");
        playNote(metronomeSound);
      }, 1000);
    }
  }
}
