export default function arrayToChars(history: (string | number)[]): string {
  const availableNotes = ["a", "b", "c", "d", "e", "f", "g"];
  const onePauseNotes = ["h", "i", "j", "k", "l", "m", "n"];
  const twoPauseNotes = ["A", "B", "C", "D", "E", "F", "G"];
  const threePauseNotes = ["H", "I", "J", "K", "L", "M", "N"];

  const resultArray: string[] = [];

  for (let i = 1; i < history.length; i += 2) {
    const note = history[i] as string;
    let pause = history[i + 1] as number;

    const noteIndex = availableNotes.indexOf(note);

    const tempo = 250;

    let semicolons = "";
    while (pause >= tempo * 4) {
      semicolons += ";";
      pause -= tempo * 4;
    }

    // Intervall (inkl. min delay mellan noter):
    // 0 - 375 = 250
    // 376 - 625 = 500
    // 626 - 875 = 750
    // 876 - 1000 = 1000

    if (pause <= tempo + tempo / 2) {
      resultArray.push(availableNotes[noteIndex]);
    } else if (pause <= tempo * 2 + tempo / 2) {
      resultArray.push(onePauseNotes[noteIndex]);
    } else if (pause <= tempo * 3 + tempo / 2) {
      resultArray.push(twoPauseNotes[noteIndex]);
    } else if (pause > tempo * 3 + tempo / 2) {
      resultArray.push(threePauseNotes[noteIndex]);
    }

    resultArray.push(semicolons);
  }

  return resultArray.join("");
}
