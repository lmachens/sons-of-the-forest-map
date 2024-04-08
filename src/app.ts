import leaflet from "leaflet";
import Compass from "./components/Compass";
import ContextMenu from "./components/ContextMenu";
import CustomNode from "./components/CustomNode";
import DirectionLine from "./components/DirectionLine";
import DiscordRPC from "./components/DiscordRPC";
import Filters from "./components/Filters";
import FollowLocation from "./components/FollowLocation";
import GameSessions from "./components/GameSessions";
import { JoinCommunity } from "./components/JoinCommunity";
import Kelvin from "./components/Kelvin";
import LocaleSelector from "./components/LocaleSelector";
import Map from "./components/Map";
import Multiplayer from "./components/Multiplayer";
import Nodes from "./components/Nodes";
import OverwolfAds from "./components/OverwolfAds";
import Player from "./components/Player";
import Search from "./components/Search";
import Status from "./components/Status";
import TileLayer from "./components/TileLayer";
import TraceLine from "./components/TraceLine";
import Zones from "./components/Zones";
import { WINDOWS } from "./lib/config";
import {
  listenToGameLaunched,
  listenToOverlayEnablement,
  setFeatures,
} from "./lib/games";
import { loadDictionary, translateHTML } from "./lib/i18n";
import { initPlausible } from "./lib/plausible";
import { useAccountStore } from "./lib/stores/account";
import { updateVersion } from "./lib/version";
import { initWakelock } from "./lib/wakelock";
import { closeWindow, getCurrentWindow } from "./lib/windows";
import { getCustomNodes, setCustomNodes } from "./lib/nodes";
import { openFileOrFiles } from "./lib/storage";

console.log("Init main");

await loadDictionary();
translateHTML();
LocaleSelector();

const mapElement = document.querySelector<HTMLDivElement>(".map")!;
const map = Map(mapElement);
TileLayer({ map });
initAppHeader({ map });
initResizeBorders();

let lastLocation = { x: 0, y: 0, z: 0 };
let lastRotation = 0;

function getLastPosition() {
  return { location: lastLocation, rotation: lastRotation };
}

const { setLocation } = Status();
const { updatePosition: updateMultiplayerPosition } = Multiplayer({
  map,
  getLastPosition,
});
const { panTo, updatePosition: updatePlayerPosition } = Player({ map });
const { updatePosition: updateKelvinPosition } = Kelvin({ map });
const showOnMap = document.querySelector<HTMLButtonElement>(".show-on-map")!;
showOnMap.onclick = () => {
  panTo();
};
const { isFollowing } = FollowLocation();

const { updatePosition: updateDirectionLinePosition } = DirectionLine({
  map,
});
const {
  updatePosition: updateTraceLinePosition,
  showSession,
  hideSession,
} = TraceLine({
  map,
});
const { updateRotation } = Compass();
const { updatePosition: updateDiscordRPCPosition } = DiscordRPC();

function updatePlayer(location: { x: number; y: number; z: number }) {
  lastRotation =
    (Math.atan2(
      location.y - (lastLocation.y || location.y),
      location.x - (lastLocation.x || location.x)
    ) *
      180) /
    Math.PI;

  lastLocation = location;

  setLocation(lastLocation);
  const lastPosition = getLastPosition();
  updatePlayerPosition(lastPosition);
  if (isFollowing()) {
    panTo();
  }
  updateDirectionLinePosition(lastPosition);
  updateTraceLinePosition(lastPosition);
  updateMultiplayerPosition(lastPosition);
  updateRotation(lastRotation);
  updateDiscordRPCPosition(lastPosition);
}

const ads = document.querySelector<HTMLDivElement>(".ads")!;
const banner = document.querySelector<HTMLDivElement>(".banner")!;
let isPatron = useAccountStore.getState().isPatron;

if (!isPatron) {
  OverwolfAds(ads);
} else {
  ads.remove();
  banner.remove();
}

useAccountStore.subscribe((state) => {
  if (isPatron !== state.isPatron && state.isPatron) {
    isPatron = state.isPatron;
    ads?.remove();
    banner?.remove();
  }
});

function onError(info: overwolf.games.events.ErrorEvent) {
  console.error(info);
}
function onInfoUpdates2(
  info: overwolf.games.events.InfoUpdates2Event<
    string,
    overwolf.games.events.InfoUpdate2
  >
) {
  // https://overwolf.github.io/api/games/events/sons-of-the-forest#location
  if (info.feature === "location") {
    const payload = info.info as unknown as {
      match_info: { location?: string; npc_location?: string };
    };
    try {
      if (payload.match_info.location) {
        const { loc_x, loc_y, loc_z } = JSON.parse(
          payload.match_info.location
        ) as {
          loc_x: number;
          loc_y: number;
          loc_z: number;
        };
        updatePlayer({ x: loc_x, y: loc_y, z: loc_z });
      }
      if (payload.match_info.npc_location) {
        const { loc_x, loc_y } = JSON.parse(
          payload.match_info.npc_location
        ) as {
          loc_x: number;
          loc_y: number;
          loc_z: number;
        };
        updateKelvinPosition(loc_x, loc_y);
      }
    } catch (error) {
      //
    }
  }
}
function onNewEvents(info: overwolf.games.events.NewGameEvents) {
  // https://overwolf.github.io/api/games/events/sons-of-the-forest#match_info
  if (info.events.some((event) => event.name === "match_start")) {
  }
  if (info.events.some((event) => event.name === "match_end")) {
  }
  if (info.events.some((event) => event.name === "death")) {
  }
}

function registerEvents() {
  overwolf.games.events.onError.addListener(onError);
  overwolf.games.events.onInfoUpdates2.addListener(onInfoUpdates2);
  overwolf.games.events.onNewEvents.addListener(onNewEvents);
}

function unregisterEvents() {
  overwolf.games.events.onError.removeListener(onError);
  overwolf.games.events.onInfoUpdates2.removeListener(onInfoUpdates2);
  overwolf.games.events.onNewEvents.removeListener(onNewEvents);
}

listenToGameLaunched(() => {
  unregisterEvents();
  registerEvents();
  setTimeout(setFeatures, 1000);
});

listenToOverlayEnablement((enabled) => {
  const gameOverlayWarning = document.querySelector(".game-overlay")!;
  if (enabled) {
    gameOverlayWarning.classList.add("hidden");
  } else {
    gameOverlayWarning.classList.remove("hidden");
  }
});

const { refresh, panToMarker } = Nodes({ map });
CustomNode({
  element: document.querySelector<HTMLButtonElement>("#add_custom_node")!,
  map,
  getLastPosition,
  onAdd: refresh,
});
document
  .querySelector<HTMLButtonElement>("#backup_custom_node")!
  .addEventListener("click", () => {
    const customNodes = getCustomNodes();
    const folder = overwolf.io.paths.documents + "\\sons-of-the-forest-map";
    const fileName = `Discovered_Nodes_${Date.now()}.json`;
    overwolf.io.writeFileContents(
      `${folder}\\${fileName}`,
      JSON.stringify(customNodes),
      "UTF8" as overwolf.io.enums.eEncoding.UTF8,
      true,
      () => console.log
    );
    overwolf.utils.openWindowsExplorer(folder, console.log);
  });
document
  .querySelector<HTMLButtonElement>("#restore_custom_node")!
  .addEventListener("click", async () => {
    const file = await openFileOrFiles();
    if (!file) {
      return;
    }
    const reader = new FileReader();
    reader.addEventListener("load", (loadEvent) => {
      const text = loadEvent.target?.result;
      if (!text || typeof text !== "string") {
        return;
      }
      try {
        let customNodes = JSON.parse(text);
        if (!Array.isArray(customNodes)) {
          customNodes = [];
        }

        setCustomNodes(customNodes);
        refresh();
      } catch (error) {
        // Do nothing
      }
    });
    reader.readAsText(file);
  });

ContextMenu({ map, onAdd: refresh });
Filters({ onChange: refresh });
JoinCommunity();
GameSessions({ showSession, hideSession });
Zones({ map });
Search({ panToMarker });

async function initAppHeader({ map }: { map: leaflet.Map }) {
  const currentWindow = await getCurrentWindow();

  let isMaximized = currentWindow.stateEx === "maximized";
  if (isMaximized) {
    document.body.classList.add("maximized");
  }

  const header = document.querySelector<HTMLElement>(".app-header")!;
  header.onmousedown = () => {
    overwolf.windows.dragMove(currentWindow.id);
  };
  updateVersion();

  const minimize = document.querySelector<HTMLButtonElement>("#minimize")!;
  minimize.onclick = () => overwolf.windows.minimize(currentWindow.id);
  const maximize = document.querySelector<HTMLButtonElement>("#maximize")!;
  function toggleMaximize() {
    if (isMaximized) {
      overwolf.windows.restore(currentWindow.id);
      document.body.classList.remove("maximized");
      isMaximized = false;
    } else {
      overwolf.windows.maximize(currentWindow.id);
      document.body.classList.add("maximized");
      isMaximized = true;
    }
  }
  maximize.onclick = toggleMaximize;
  header.ondblclick = toggleMaximize;
  const close = document.querySelector<HTMLButtonElement>("#close")!;
  close.onclick = async () => {
    closeWindow(WINDOWS.CONTROLLER);
  };

  const menuOpenElement =
    document.querySelector<HTMLButtonElement>(".layout > .menu")!;
  menuOpenElement.onclick = () => {
    document.body.classList.add("open");
    document.body.classList.remove("close");
    map.invalidateSize(true);
  };

  const menuCloseElement =
    document.querySelector<HTMLButtonElement>(".aside .menu")!;
  menuCloseElement.onclick = () => {
    document.body.classList.add("close");
    document.body.classList.remove("open");
    map.invalidateSize(true);
  };
}

async function initResizeBorders() {
  const currentWindow = await getCurrentWindow();
  const top = document.querySelector<HTMLElement>(".resize.top")!;
  top.onmousedown = () => {
    overwolf.windows.dragResize(
      currentWindow.id,
      overwolf.windows.enums.WindowDragEdge.Top
    );
  };
  const right = document.querySelector<HTMLElement>(".resize.right")!;
  right.onmousedown = () => {
    overwolf.windows.dragResize(
      currentWindow.id,
      overwolf.windows.enums.WindowDragEdge.Right
    );
  };
  const bottom = document.querySelector<HTMLElement>(".resize.bottom")!;
  bottom.onmousedown = () => {
    overwolf.windows.dragResize(
      currentWindow.id,
      overwolf.windows.enums.WindowDragEdge.Bottom
    );
  };
  const left = document.querySelector<HTMLElement>(".resize.left")!;
  left.onmousedown = () => {
    overwolf.windows.dragResize(
      currentWindow.id,
      overwolf.windows.enums.WindowDragEdge.Left
    );
  };
  const topLeft = document.querySelector<HTMLElement>(".resize.top-left")!;
  topLeft.onmousedown = () => {
    overwolf.windows.dragResize(
      currentWindow.id,
      overwolf.windows.enums.WindowDragEdge.TopLeft
    );
  };
  const topRight = document.querySelector<HTMLElement>(".resize.top-right")!;
  topRight.onmousedown = () => {
    overwolf.windows.dragResize(
      currentWindow.id,
      overwolf.windows.enums.WindowDragEdge.TopRight
    );
  };
  const bottomLeft = document.querySelector<HTMLElement>(
    ".resize.bottom-left"
  )!;
  bottomLeft.onmousedown = () => {
    overwolf.windows.dragResize(
      currentWindow.id,
      overwolf.windows.enums.WindowDragEdge.BottomLeft
    );
  };
  const bottomRight = document.querySelector<HTMLElement>(
    ".resize.bottom-right"
  )!;
  bottomRight.onmousedown = () => {
    overwolf.windows.dragResize(
      currentWindow.id,
      overwolf.windows.enums.WindowDragEdge.BottomRight
    );
  };

  initWakelock();
}

initPlausible("sotf.th.gl-app", "https://metrics.th.gl");
