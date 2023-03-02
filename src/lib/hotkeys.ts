import { GAME_CLASS_ID } from "./config";

export function listenToHotkeyBinding(
  name: string,
  callback: (binding: string) => void
) {
  overwolf.settings.hotkeys.get((result) => {
    if (result.games) {
      const toggleAppHotkey = result.games[GAME_CLASS_ID].find(
        (hotkey) => hotkey.name === name
      );
      if (toggleAppHotkey) {
        callback(toggleAppHotkey.binding);
      }
    }
  });

  overwolf.settings.hotkeys.onChanged.addListener((event) => {
    if (event.name === name) {
      callback(event.binding);
    }
  });
}
