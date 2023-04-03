import Ads from "./components/Ads";
import ContextMenu from "./components/ContextMenu";
import CustomNode from "./components/CustomNode";
import DirectionLine from "./components/DirectionLine";
import Filters from "./components/Filters";
import FollowLocation from "./components/FollowLocation";
import GameSessions from "./components/GameSessions";
import ImageOverlay from "./components/ImageOverlay";
import { JoinCommunity } from "./components/JoinCommunity";
import Map from "./components/Map";
import Multiplayer from "./components/Multiplayer";
import Nodes from "./components/Nodes";
import Player from "./components/Player";
import Status from "./components/Status";
import TraceLine from "./components/TraceLine";
import { WINDOWS } from "./lib/config";
import {
  listenToGameLaunched,
  listenToOverlayEnablement,
  setFeatures,
} from "./lib/games";
import { waitForOverwolf } from "./lib/overwolf";
import { closeWindow, getCurrentWindow } from "./lib/windows";

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
  CustomNode({
    element: document.querySelector<HTMLButtonElement>("#add_custom_node")!,
    map,
    getLastPosition,
    onAdd: refresh,
  });
  ContextMenu({ map, onAdd: refresh });
  Filters({ onChange: refresh });
  JoinCommunity();
  GameSessions({ showSession, hideSession });
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

  const menuOpenElement =
    document.querySelector<HTMLButtonElement>(".layout > .menu")!;
  menuOpenElement.onclick = () => {
    document.body.classList.add("open");
    document.body.classList.remove("close");
  };

  const menuCloseElement =
    document.querySelector<HTMLButtonElement>(".aside .menu")!;
  menuCloseElement.onclick = () => {
    document.body.classList.add("close");
    document.body.classList.remove("open");
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
