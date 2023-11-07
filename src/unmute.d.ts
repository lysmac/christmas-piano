import "./unmute.js";

declare module "./unmute.js" {
  export function unmute(
    AudioContext,
    allowBackgroundPlayback,
    forceIOSBehavior,
  ): any; // Replace `any` with the actual type if you know it
}
