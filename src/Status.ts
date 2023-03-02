import { GAME_CLASS_ID, WINDOWS } from "./lib/config";
import { listenToGameInfo } from "./lib/games";
import { getPreferedWindowName, togglePreferedWindow } from "./lib/windows";

export default function Status() {
  const gameStatus =
    document.querySelector<HTMLParagraphElement>(".game-status")!;

  listenToGameInfo((gameInfo) => {
    const gameIsRunning = gameInfo?.classId === GAME_CLASS_ID;
    if (gameIsRunning) {
      gameStatus.classList.add("ok");
    } else {
      gameStatus.classList.add("issue");
    }
  });

  const overlay = document.querySelector<HTMLInputElement>("#overlay")!;

  getPreferedWindowName().then((windowName) => {
    overlay.checked = windowName === WINDOWS.OVERLAY;
  });

  overlay.onchange = async () => {
    togglePreferedWindow();
    overlay.checked = (await getPreferedWindowName()) === WINDOWS.OVERLAY;
  };

  const locationStatus =
    document.querySelector<HTMLParagraphElement>(".location-status")!;
  locationStatus.innerText = "Location is not detected";

  function setLocation(location: { x: number; y: number; z: number } | null) {
    if (!location) {
      locationStatus.innerText = "Location is not detected";
    } else {
      locationStatus.innerText = `X: ${location.x} Y: ${location.y} Z: ${location.z}`;
    }
  }
  return {
    setLocation,
  };
}
