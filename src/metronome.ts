// import playNote from "./playNote";

// const metronomeArray: string[] = [];
// const metronomeSound = "../src/assets/sounds/m.mp3";

// export default function metronome(delayToPrevious: number, note: string) {
//   // första noten returneras bara
//   if (delayToPrevious === 0) {
//     return;
//   }

//   if (delayToPrevious >= 250) {
//     return "tick";
//   }

//   if (!toggle) {
//     console.log("Stopped the metronome");
//     clearInterval(intervalId);
//     const returnArray = [...metronomeArray];
//     metronomeArray.length = 0;
//     return returnArray;
//   }

// not kommer in 1-249ms, 250ms till nästa not
// not kommer in 250-499ms, 500ms till nästa not
// om det gått 125ms och ingen not, addera tick
// om det kommer en not inom 125ms, addera noten.

// om man halverar, kam man kanske bara ignorera när det är ett tick i rad?

// är det ojämnt ignorera tick?

// göra "tick" till 0.5 och avrunda neråt?

// if (toggle) {
//   if (note) {
//     metronomeArray.push(note);
//     console.log(note);
//   } else {
//     intervalId = setInterval(() => {
//       metronomeArray.push("tick");
//       playNote(metronomeSound);
//     }, 250);
//   }
// }
// if (toggle) {
//   if (note) {
//     metronomeArray.push(note);
//   } else {
//     intervalId = setInterval(() => {
//       metronomeArray.push("tick");
//       // playNote(metronomeSound);
//     }, 250);
//   }
// }
// }
