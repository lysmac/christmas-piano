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

  //const masterlist = [...onePauseNotes, ...twoPauseNotes, ...threePauseNotes]

  const noteIndex = availableNotes.findIndex((n) => n === note);

  if (noteIndex === -1) {
    return note;
  }

  let emptyTickBlock = "";
  let rest = pauses;

  if (pauses >= 4) {
    rest = pauses % 4;
    let loop = pauses;
    while (loop >= 4) {
      emptyTickBlock += ";";
      loop -= 4;
    }
  }
  // console.log("empty blocks:", emptyTickBlock);
  // console.log("rest:", rest);

  switch (rest) {
    case 1:
      if (emptyTickBlock.length != 0) {
        return onePauseNotes[noteIndex] + emptyTickBlock;
      } else {
        return onePauseNotes[noteIndex];
      }
    case 2:
      if (emptyTickBlock.length != 0) {
        return twoPauseNotes[noteIndex] + emptyTickBlock;
      } else {
        return twoPauseNotes[noteIndex];
      }
    case 3:
      if (emptyTickBlock.length != 0) {
        return threePauseNotes[noteIndex] + emptyTickBlock;
      } else {
        return threePauseNotes[noteIndex];
      }
    default:
      if (emptyTickBlock.length != 0) {
        return note + emptyTickBlock;
      } else {
        return note;
      }
  }
}
