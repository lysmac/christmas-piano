import { History } from "./components/Piano.vue";

const availableNotes = ["a", "b", "c", "d", "e", "f", "g"];
const onePauseNotes = ["h", "i", "j", "k", "l", "m", "n"];
const twoPauseNotes = ["A", "B", "C", "D", "E", "F", "G"];
const threePauseNotes = ["H", "I", "J", "K", "L", "M", "N"];
const fourPauseNotes = ["o", "p", "q", "r", "s", "t", "u"];
const fivePauseNotes = ["O", "P", "Q", "R", "S", "T", "U"];
const sixPauseNotes = ["v", "w", "x", "y", "z", "-", "_"];
const sevenPauseNotes = ["V", "W", "X", "Y", "Z", ".", "~"];

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
const tempoInMs = 125;

export class Encryption {
  public static encrypt(history: History[]): string {
    const encryptedMessage = encryptData(history);
    return encryptedMessage;
  }

  public static decrypt(char: string) {
    const decryptedMessage = decryptData(char);
    return decryptedMessage;
  }
}

function encryptData(history: History[]) {
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
    for (let i = 0; i < allNotes.length; i++) {
      if (pause <= tempoInMs * (i + 1) + tempoInMs / 2) {
        resultArray.push(allNotes[i][noteIndex]);
        break;
      }
    }

    if (pause > tempoInMs * allNotes.length + tempoInMs / 2) {
      resultArray.push(allNotes[allNotes.length - 1][noteIndex]);
    }

    resultArray.push(semicolons);
  }
  return resultArray.join("");
}

function decryptData(char: string) {
  const noteIndices = allNotes.map((notes) =>
    notes.findIndex((n) => n === char),
  );

  const foundIndex = noteIndices.findIndex((index) => index !== -1);
  if (foundIndex === 0) {
    return char;
  }
  if (foundIndex >= 1 && foundIndex <= 7) {
    return availableNotes[noteIndices[foundIndex]] + foundIndex;
  }
  if (char === ";") {
    return 8;
  }

  // Om återställa till 250ms, return 4 på ;. Ta bort allt efter 4

  return "";
}
