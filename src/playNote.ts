export default function playNote(sound: string) {
  const audio = new Audio(sound);
  audio.play();
}
