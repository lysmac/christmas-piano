export default function arrayToChars(history: (string | number)[]): string {
  const availableNotes = ["a", "b", "c", "d", "e", "f", "g"];
  const onePauseNotes = ["h", "i", "j", "k", "l", "m", "n"];
  const twoPauseNotes = ["A", "B", "C", "D", "E", "F", "G"];
  const threePauseNotes = ["H", "I", "J", "K", "L", "M", "N"];
  const fourPauseNotes = ["o", "p", "q", "r", "s", "t", "u"];
  const fivePauseNotes = ["O", "P", "Q", "R", "S", "T", "U"];
  const sixPauseNotes = ["v", "w", "x", "y", "z", "å", "ä"];
  const sevenPauseNotes = ["V", "W", "X", "Y", "Z", "Å", "Ä"];

  const resultArray: string[] = [];

  for (let i = 1; i < history.length; i += 2) {
    const note = history[i] as string;
    let pause = history[i + 1] as number;

    const noteIndex = availableNotes.indexOf(note);

    // Byt till 250 om 250ms
    const tempo = 125;

    // Om 250 ms, ändra till 8
    let semicolons = "";
    while (pause >= tempo * 8) {
      semicolons += ";";
      pause -= tempo * 8;
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

    if (pause <= tempo + tempo / 2) {
      resultArray.push(availableNotes[noteIndex]);
    } else if (pause <= tempo * 2 + tempo / 2) {
      resultArray.push(onePauseNotes[noteIndex]);
    } else if (pause <= tempo * 3 + tempo / 2) {
      resultArray.push(twoPauseNotes[noteIndex]);
    } else if (pause <= tempo * 4 + tempo / 2) {
      resultArray.push(threePauseNotes[noteIndex]);
    } else if (pause <= tempo * 5 + tempo / 2) {
      resultArray.push(fourPauseNotes[noteIndex]);
    } else if (pause <= tempo * 6 + tempo / 2) {
      resultArray.push(fivePauseNotes[noteIndex]);
    } else if (pause <= tempo * 7 + tempo / 2) {
      resultArray.push(sixPauseNotes[noteIndex]);
    } else if (pause > tempo * 8 + tempo / 2) {
      resultArray.push(sevenPauseNotes[noteIndex]);
    }

    // Om man vill köra 250ms istället för det ovan

    // if (pause <= tempo + tempo / 2) {
    //   resultArray.push(availableNotes[noteIndex]);
    // } else if (pause <= tempo * 2 + tempo / 2) {
    //   resultArray.push(onePauseNotes[noteIndex]);
    // } else if (pause <= tempo * 3 + tempo / 2) {
    //   resultArray.push(twoPauseNotes[noteIndex]);
    // } else if (pause > tempo * 3 + tempo / 2) {
    //   resultArray.push(threePauseNotes[noteIndex]);
    // }

    resultArray.push(semicolons);
  }

  return resultArray.join("");
}
