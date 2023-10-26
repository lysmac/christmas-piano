export default function playNote(noteLetter: string) {
  audioMap[noteLetter].currentTime = 0;
  audioMap[noteLetter].play();
}

type Note = {
  sound: string;
  letter: string;
  keycode: number;
  number: string;
};
const piano: Note[] = [
  {
    sound: "/sounds/c.wav",
    letter: "c",
    keycode: 65,
    number: "1",
  },
  {
    sound: "/sounds/d.wav",
    letter: "d",
    keycode: 83,
    number: "2",
  },
  {
    sound: "/sounds/e.wav",
    letter: "e",
    keycode: 68,
    number: "3",
  },
  {
    sound: "/sounds/f.wav",
    letter: "f",
    keycode: 70,
    number: "4",
  },
  {
    sound: "/sounds/g.wav",
    letter: "g",
    keycode: 71,
    number: "5",
  },
  {
    sound: "/sounds/a.wav",
    letter: "a",
    keycode: 72,
    number: "6",
  },
  {
    sound: "/sounds/b.wav",
    letter: "b",
    keycode: 74,
    number: "7",
  },
];
const AudioContext = window.AudioContext || window.AudioContext;
const audioCtx = new AudioContext();
const audioMap: Record<string, HTMLAudioElement> = {};

piano.forEach((note) => {
  const audio = new Audio(note.sound);
  audioMap[note.letter] = audio;

  audio.load();
});
