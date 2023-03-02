import Ads from "./Ads";
import DirectionLine from "./DirectionLine";
import ImageOverlay from "./ImageOverlay";
import { WINDOWS } from "./lib/config";
import { listenToGameLaunched, setFeatures } from "./lib/games";
import { waitForOverwolf } from "./lib/overwolf";
import { closeWindow, getCurrentWindow } from "./lib/windows";
import Map from "./Map";
import Player from "./Player";
import Status from "./Status";
import TraceLine from "./TraceLine";

waitForOverwolf().then(async () => {
  console.log("Init main");

  const currentWindow = await getCurrentWindow();

  const header = document.querySelector<HTMLElement>(".app-header")!;
  header.onmousedown = () => overwolf.windows.dragMove(currentWindow.id);
  const version = document.querySelector<HTMLElement>(".version")!;
  overwolf.extensions.current.getManifest((manifest) => {
    version.innerText += ` v${manifest.meta.version}`;
  });

  const discord = document.querySelector<HTMLButtonElement>("#discord")!;
  discord.onclick = () => window.open("https://discord.com/invite/NTZu8Px");
  const minimize = document.querySelector<HTMLButtonElement>("#minimize")!;
  minimize.onclick = () => overwolf.windows.minimize(currentWindow.id);
  const maximize = document.querySelector<HTMLButtonElement>("#maximize")!;
  maximize.onclick = async () => {
    const currentWindow = await getCurrentWindow();
    if (currentWindow.stateEx === "maximized") {
      overwolf.windows.restore(currentWindow.id);
      maximize.classList.remove("toggled");
    } else {
      overwolf.windows.maximize(currentWindow.id);
      maximize.classList.add("toggled");
    }
  };
  const close = document.querySelector<HTMLButtonElement>("#close")!;
  close.onclick = async () => {
    closeWindow(WINDOWS.CONTROLLER);
  };

  const mapElement = document.querySelector<HTMLDivElement>(".map")!;
  const map = Map(mapElement);
  ImageOverlay({ map });

  const { setLocation } = Status();
  const { panTo, updatePosition: updatePlayerPosition } = Player({ map });
  const showOnMap = document.querySelector<HTMLButtonElement>(".show-on-map")!;
  showOnMap.onclick = () => {
    panTo();
  };
  const { updatePosition: updateDirectionLinePosition } = DirectionLine({
    map,
  });
  const { updatePosition: updateTraceLinePosition } = TraceLine({
    map,
  });

  let lastLocation = { x: 100, y: 100, z: 4 };
  let lastRotation = 87;

  function updatePlayer() {
    lastLocation = { x: 100, y: 100, z: 4 };
    lastRotation = 87;

    setLocation(lastLocation);
    updatePlayerPosition({ location: lastLocation, rotation: lastRotation });
    updateDirectionLinePosition({
      location: lastLocation,
      rotation: lastRotation,
    });
    updateTraceLinePosition({ location: lastLocation });
  }

  updatePlayer();

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
    console.log(info);
  }
  function onNewEvents(info: overwolf.games.events.NewGameEvents) {
    console.log(info);
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
});
