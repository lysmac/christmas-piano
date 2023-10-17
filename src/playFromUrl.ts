export default function playFromUrl() {
  let url = new URL(window.location.href);

  let parts = url.pathname.split("&");

  // Add check for valid chars/numbers
  let notes = parts[0].substring(1);
  let delays = parts[1].split(",").map(Number);

  return {
    notes: notes,
    delays: delays,
  };
}
