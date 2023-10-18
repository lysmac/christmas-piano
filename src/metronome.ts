let intervalId: number;

export default function metronome(toggle: boolean) {
  console.log("this is the input toggle:", toggle);

  if (toggle) {
    intervalId = setInterval(() => {
      console.log("Tick");
    }, 1250);
  } else {
    console.log("Stopping the metronome");
    clearInterval(intervalId);
  }
}
