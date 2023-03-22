import { GAME_CLASS_ID, WINDOWS } from "./lib/config";
import { listenToGameInfo } from "./lib/games";
import { listenToHotkeyBinding } from "./lib/hotkeys";
import { getPreferedWindowName, togglePreferedWindow } from "./lib/windows";

export default function Status() {
  const status = document.querySelector<HTMLParagraphElement>("#game_status")!;

  listenToGameInfo((gameInfo) => {
    const gameIsRunning = gameInfo?.classId === GAME_CLASS_ID;
    if (gameIsRunning) {
      status.classList.add("ok");
      status.classList.remove("issue");
    } else {
      status.classList.add("issue");
      status.classList.remove("ok");
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

  const toggleAppHotkey =
    document.querySelector<HTMLButtonElement>("#toggle_app_hotkey")!;

  toggleAppHotkey.onclick = () => {
    location.href = `overwolf://settings/games-overlay?hotkey=toggle_app&gameId=${GAME_CLASS_ID}`;
  };
  listenToHotkeyBinding("toggle_app", (binding) => {
    toggleAppHotkey.innerText = binding;
  });

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
