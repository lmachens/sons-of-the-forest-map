import Ads from "./Ads";
import CustomNode from "./CustomNode";
import DirectionLine from "./DirectionLine";
import Filters from "./Filters";
import ImageOverlay from "./ImageOverlay";
import { WINDOWS } from "./lib/config";
import {
  listenToGameLaunched,
  listenToOverlayEnablement,
  setFeatures,
} from "./lib/games";
import { waitForOverwolf } from "./lib/overwolf";
import { closeWindow, getCurrentWindow } from "./lib/windows";
import Map from "./Map";
import Multiplayer from "./Multiplayer";
import Nodes from "./Nodes";
import Player from "./Player";
import Status from "./Status";
import TraceLine from "./TraceLine";

waitForOverwolf().then(async () => {
  console.log("Init main");

  initAppHeader();
  initResizeBorders();

  const mapElement = document.querySelector<HTMLDivElement>(".map")!;
  const map = Map(mapElement);
  ImageOverlay({ map });

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
  const showOnMap = document.querySelector<HTMLButtonElement>(".show-on-map")!;
  showOnMap.onclick = () => {
    panTo();
  };
  const { updatePosition: updateDirectionLinePosition } = DirectionLine({
    map,
  });
  const { updatePosition: updateTraceLinePosition, clear } = TraceLine({
    map,
  });

  function updatePlayer(location: { x: number; y: number; z: number }) {
    lastRotation =
      (Math.atan2(
        location.y - (lastLocation.y || location.y),
        location.x - (lastLocation.x || location.x)
      ) *
        180) /
      Math.PI;
    console.log(
      lastLocation,
      location,
      lastRotation,
      location.y - (lastLocation.y || location.y),
      location.x - (lastLocation.x || location.x)
    );

    lastLocation = location;

    setLocation(lastLocation);
    const lastPosition = getLastPosition();
    updatePlayerPosition(lastPosition);
    panTo();
    updateDirectionLinePosition(lastPosition);
    updateTraceLinePosition(lastPosition);
    updateMultiplayerPosition(lastPosition);
  }

  const ads = document.querySelector<HTMLDivElement>(".ads")!;
  Ads(ads);

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
        match_info: { location: string };
      };
      try {
        const { loc_x, loc_y, loc_z } = JSON.parse(
          payload.match_info.location
        ) as { loc_x: number; loc_y: number; loc_z: number };
        updatePlayer({ x: loc_x, y: loc_y, z: loc_z });
      } catch (error) {
        //
      }
    }
  }
  function onNewEvents(info: overwolf.games.events.NewGameEvents) {
    // https://overwolf.github.io/api/games/events/sons-of-the-forest#match_info
    if (info.events.some((event) => event.name === "match_start")) {
      clear();
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

  const { refresh } = Nodes({ map });
  CustomNode({ map, getLastPosition, onAdd: refresh });
  Filters({ onChange: refresh });
});

async function initAppHeader() {
  const currentWindow = await getCurrentWindow();

  let isMaximized = currentWindow.stateEx === "maximized";
  if (isMaximized) {
    document.body.classList.add("maximized");
  }

  const header = document.querySelector<HTMLElement>(".app-header")!;
  header.onmousedown = () => {
    if (!isMaximized) {
      overwolf.windows.dragMove(currentWindow.id);
    }
  };
  const version = document.querySelector<HTMLElement>(".version")!;
  overwolf.extensions.current.getManifest((manifest) => {
    version.innerText += ` v${manifest.meta.version}`;
  });

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
}
