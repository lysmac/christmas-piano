const availableNotes = ["a", "b", "c", "d", "e", "f", "g"];
const onePauseNotes = ["h", "i", "j", "k", "l", "m", "n"];
const twoPauseNotes = ["A", "B", "C", "D", "E", "F", "G"];
const threePauseNotes = ["H", "I", "J", "K", "L", "M", "N"];
const fourPauseNotes = ["o", "p", "q", "r", "s", "t", "u"];
const fivePauseNotes = ["O", "P", "Q", "R", "S", "T", "U"];
const sixPauseNotes = ["v", "w", "x", "y", "z", "å", "ä"];
const sevenPauseNotes = ["V", "W", "X", "Y", "Z", "Å", "Ä"];

export default function decoder(char: string) {
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
    notes.findIndex((n) => n === char)
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

  return "";
}
