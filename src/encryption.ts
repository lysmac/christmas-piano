import { History } from "./components/Piano.vue";

const availableNotes = ["a", "b", "c", "d", "e", "f", "g"];
const onePauseNotes = ["h", "i", "j", "k", "l", "m", "n"];
const twoPauseNotes = ["A", "B", "C", "D", "E", "F", "G"];
const threePauseNotes = ["H", "I", "J", "K", "L", "M", "N"];
const fourPauseNotes = ["o", "p", "q", "r", "s", "t", "u"];
const fivePauseNotes = ["O", "P", "Q", "R", "S", "T", "U"];
const sixPauseNotes = ["v", "w", "x", "y", "z", "-", "_"];
const sevenPauseNotes = ["V", "W", "X", "Y", "Z", ".", "~"];

export class Encryption {
  public static encrypt(history: (string | number)[]): string {
    const encryptedMessage = arrayToChars(history);
    return encryptedMessage;
  }
  public static kryptera(history: History[]): string {
    const encryptedMessage = test(history);
    return encryptedMessage;
  }

  public static decrypt(char: string) {
    const decryptedMessage = decoder(char);
    return decryptedMessage;
  }
}

const tempoInMs = 125;

function test(history: History[]) {
  const allNotes = [
    availableNotes,
    onePauseNotes,
    twoPauseNotes,
    threePauseNotes,
    fourPauseNotes,
    fivePauseNotes,
    sixPauseNotes,
    sevenPauseNotes,
  ];

  const resultArray: string[] = [];

  const flattenedHistory = history.flatMap((item) => [item.time, item.note]);
  flattenedHistory.shift();
  flattenedHistory.push(0);

  for (let i = 0; i < flattenedHistory.length; i += 2) {
    const note = flattenedHistory[i] as string;
    let pause = flattenedHistory[i + 1] as number;

    const noteIndex = allNotes[0].indexOf(note);
    if (noteIndex === -1) {
      continue;
    }

    let semicolons = "";
    while (pause >= tempoInMs * 8) {
      semicolons += ";";
      pause -= tempoInMs * 8;
    }

    if (pause <= tempoInMs + tempoInMs / 2) {
      resultArray.push(availableNotes[noteIndex]);
    } else if (pause <= tempoInMs * 2 + tempoInMs / 2) {
      resultArray.push(onePauseNotes[noteIndex]);
    } else if (pause <= tempoInMs * 3 + tempoInMs / 2) {
      resultArray.push(twoPauseNotes[noteIndex]);
    } else if (pause <= tempoInMs * 4 + tempoInMs / 2) {
      resultArray.push(threePauseNotes[noteIndex]);
    } else if (pause <= tempoInMs * 5 + tempoInMs / 2) {
      resultArray.push(fourPauseNotes[noteIndex]);
    } else if (pause <= tempoInMs * 6 + tempoInMs / 2) {
      resultArray.push(fivePauseNotes[noteIndex]);
    } else if (pause <= tempoInMs * 7 + tempoInMs / 2) {
      resultArray.push(sixPauseNotes[noteIndex]);
    } else if (pause > tempoInMs * 8 + tempoInMs / 2) {
      resultArray.push(sevenPauseNotes[noteIndex]);
    }

    resultArray.push(semicolons);
  }
  console.log("testfunction:", resultArray.join(""));
  return resultArray.join("");
}

function arrayToChars(history: (string | number)[]): string {
  // const availableNotes = ["a", "b", "c", "d", "e", "f", "g"];
  // const onePauseNotes = ["h", "i", "j", "k", "l", "m", "n"];
  // const twoPauseNotes = ["A", "B", "C", "D", "E", "F", "G"];
  // const threePauseNotes = ["H", "I", "J", "K", "L", "M", "N"];
  // const fourPauseNotes = ["o", "p", "q", "r", "s", "t", "u"];
  // const fivePauseNotes = ["O", "P", "Q", "R", "S", "T", "U"];
  // const sixPauseNotes = ["v", "w", "x", "y", "z", "å", "ä"];
  // const sevenPauseNotes = ["V", "W", "X", "Y", "Z", "Å", "Ä"];
  console.log("arrayToChars input:", history);

  const resultArray: string[] = [];

  for (let i = 1; i < history.length; i += 2) {
    const note = history[i] as string;
    let pause = history[i + 1] as number;

    const noteIndex = availableNotes.indexOf(note);

    // Om 250 ms, ändra till 8
    let semicolons = "";
    while (pause >= tempoInMs * 8) {
      semicolons += ";";
      pause -= tempoInMs * 8;
    }

    // Intervall (inkl. min delay mellan noter):
    // 0 - 375 = 250
    // 376 - 625 = 500
    // 626 - 875 = 750
    // 876 - 1000 = 1000

    // 0 - 187,5 = 125
    // 187,5 - 312,5 = 250
    // 312,5 - 437,5 = 375
    // 437,5 - 562,5 = 500

    // 562,5 - 687,5 = 625
    // 687,5 - 812,5 = 750
    // 812,5 - 937,5 = 875
    // 937,5 - 1000 = 1000

    if (pause <= tempoInMs + tempoInMs / 2) {
      resultArray.push(availableNotes[noteIndex]);
    } else if (pause <= tempoInMs * 2 + tempoInMs / 2) {
      resultArray.push(onePauseNotes[noteIndex]);
    } else if (pause <= tempoInMs * 3 + tempoInMs / 2) {
      resultArray.push(twoPauseNotes[noteIndex]);
    } else if (pause <= tempoInMs * 4 + tempoInMs / 2) {
      resultArray.push(threePauseNotes[noteIndex]);
    } else if (pause <= tempoInMs * 5 + tempoInMs / 2) {
      resultArray.push(fourPauseNotes[noteIndex]);
    } else if (pause <= tempoInMs * 6 + tempoInMs / 2) {
      resultArray.push(fivePauseNotes[noteIndex]);
    } else if (pause <= tempoInMs * 7 + tempoInMs / 2) {
      resultArray.push(sixPauseNotes[noteIndex]);
    } else if (pause > tempoInMs * 8 + tempoInMs / 2) {
      resultArray.push(sevenPauseNotes[noteIndex]);
    }

    // Om man vill köra 250ms istället för det ovan

    // if (pause <= tempoInMs + tempoInMs / 2) {
    //   resultArray.push(availableNotes[noteIndex]);
    // } else if (pause <= tempoInMs * 2 + tempoInMs / 2) {
    //   resultArray.push(onePauseNotes[noteIndex]);
    // } else if (pause <= tempoInMs * 3 + tempoInMs / 2) {
    //   resultArray.push(twoPauseNotes[noteIndex]);
    // } else if (pause > tempoInMs * 3 + tempoInMs / 2) {
    //   resultArray.push(threePauseNotes[noteIndex]);
    // }

    resultArray.push(semicolons);
  }
  console.log("old function:", resultArray.join(""));
  return resultArray.join("");
}

function decoder(char: string) {
  const allNotes = [
    availableNotes,
    onePauseNotes,
    twoPauseNotes,
    threePauseNotes,
    fourPauseNotes,
    fivePauseNotes,
    sixPauseNotes,
    sevenPauseNotes,
  ];
  const noteIndices = allNotes.map((notes) =>
    notes.findIndex((n) => n === char),
  );

  const foundIndex = noteIndices.findIndex((index) => index !== -1);

  if (foundIndex === 0) {
    return char;
  }
  if (foundIndex === 1) {
    return availableNotes[noteIndices[1]] + 1;
  }
  if (foundIndex === 2) {
    return availableNotes[noteIndices[2]] + 2;
  }
  if (foundIndex === 3) {
    return availableNotes[noteIndices[3]] + 3;
  }
  if (foundIndex === 4) {
    return availableNotes[noteIndices[4]] + 4;
  }
  if (foundIndex === 5) {
    return availableNotes[noteIndices[5]] + 5;
  }
  if (foundIndex === 6) {
    return availableNotes[noteIndices[6]] + 6;
  }
  if (foundIndex === 7) {
    return availableNotes[noteIndices[7]] + 7;
  }

  if (char === ";") {
    return 8;
  }

  // Om återställa till 250ms, return 4 på ;. Ta bort allt efter 4

  return "";
}
