const availableNotes = ["a", "b", "c", "d", "e", "f", "g"];
const tick = "tick";

export default function arrayToChars(array: string[]) {
  let i = 0;
  const resultArray: string[] = [];

  while (i < array.length) {
    if (availableNotes.includes(array[i])) {
      let tickCount = 0;
      let j = i + 1;
      while (array[j] === tick) {
        tickCount++;
        j++;
      }

      if (tickCount > 0) {
        // const sendIn = array[i] + tickCount;
        resultArray.push(shorterString(array[i], tickCount));
      } else {
        resultArray.push(array[i]);
      }
      i = j;
    } else {
      i++;
    }
  }

  return resultArray;
}

function shorterString(note: string, pauses: number) {
  const onePauseNotes = ["h", "i", "j", "k", "l", "m", "n"];
  const twoPauseNotes = ["A", "B", "C", "D", "E", "F", "G"];
  const threePauseNotes = ["H", "I", "J", "K", "L", "M", "N"];

  const noteIndex = availableNotes.findIndex((n) => n === note);

  if (noteIndex === -1) {
    return note;
  }

  switch (pauses) {
    case 1:
      return onePauseNotes[noteIndex];
    case 2:
      return twoPauseNotes[noteIndex];
    case 3:
      return threePauseNotes[noteIndex];
    default:
      return note;
  }
}
