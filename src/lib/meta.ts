export const DEFAULT_TITLE = "Sons Of The Forest Map";
export const DEFAULT_DESCRIPTION =
  "Stay on top of your game with real-time position tracking, nodes of weapons & points of interest, and overlay mode for seamless progress tracking.";

export function setTitle(title?: string) {
  if (title) {
    document.title = `${title} - ${DEFAULT_TITLE}`;
  } else {
    document.title = DEFAULT_TITLE;
  }
}

export function setDescription(description?: string) {
  const meta = document.querySelector(
    "meta[name='description']"
  ) as HTMLMetaElement;
  if (description) {
    meta.content = description;
  } else {
    meta.content = DEFAULT_DESCRIPTION;
  }
}

export function setMeta(title: string, description?: string) {
  setTitle(title);
  setDescription(description);
}
