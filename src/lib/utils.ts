export function copyToClipboard(text: string) {
  if (typeof overwolf === "undefined") {
    navigator.clipboard.writeText(text);
  } else {
    overwolf.utils.placeOnClipboard(text);
  }
}
