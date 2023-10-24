const availableNotes = ["a", "b", "c", "d", "e", "f", "g"];
const onePauseNotes = ["h", "i", "j", "k", "l", "m", "n"];
const twoPauseNotes = ["A", "B", "C", "D", "E", "F", "G"];
const threePauseNotes = ["H", "I", "J", "K", "L", "M", "N"];

export default function decoder(char: string) {
  const allNotes = [
    availableNotes,
    onePauseNotes,
    twoPauseNotes,
    threePauseNotes,
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

  if (char === ";") {
    return 4;
  }

  return "";
}
