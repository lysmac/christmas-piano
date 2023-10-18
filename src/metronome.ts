import playNote from "./playNote";

let intervalId: number;
const metronomeArray: string[] = [];
const metronomeSound = "../src/assets/sounds/m.mp3";

export default function metronome(toggle: boolean) {
  console.log("this is the input toggle:", toggle);

  if (toggle) {
    console.log("Tick");
    playNote(metronomeSound);
    metronomeArray.push("tick");
    console.log();

    intervalId = setInterval(() => {
      console.log("Tick");
      playNote(metronomeSound);
      metronomeArray.push("tick");
    }, 1000);
  }
  if (!toggle) {
    console.log("Stopped the metronome");
    clearInterval(intervalId);
    const resultArray = [...metronomeArray];
    metronomeArray.length = 0;
    return resultArray;
  }
}
