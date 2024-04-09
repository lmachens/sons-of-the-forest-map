import Cookies from "js-cookie";
import AppStatus from "./components/AppStatus";
import ContextMenu from "./components/ContextMenu";
import CustomNode from "./components/CustomNode";
import Filters from "./components/Filters";
import { JoinCommunity } from "./components/JoinCommunity";
import LocaleSelector from "./components/LocaleSelector";
import Map from "./components/Map";
import NitroPay from "./components/NitroPay";
import Nodes from "./components/Nodes";
import Search from "./components/Search";
import TileLayer from "./components/TileLayer";
import Zones from "./components/Zones";
import { loadDictionary, translateHTML } from "./lib/i18n";
import { initPlausible } from "./lib/plausible";
import { useAccountStore } from "./lib/stores/account";
import { initWakelock } from "./lib/wakelock";
import { getCustomNodes, setCustomNodes } from "./lib/nodes";
import { openFileOrFiles, saveFile } from "./lib/storage";

let lastLocation = { x: 0, y: 0, z: 0 };
let lastRotation = 0;

function getLastPosition() {
  return { location: lastLocation, rotation: lastRotation };
}

loadDictionary().then(() => {
  translateHTML();
  LocaleSelector();

  const mapElement = document.querySelector<HTMLDivElement>(".map")!;
  const map = Map(mapElement);
  TileLayer({ map });

  AppStatus({
    map,
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
      const fileName = `Discovered_Nodes_${Date.now()}.json`;
      const blob = new Blob([JSON.stringify(customNodes)], {
        type: "text/json",
      });
      saveFile(blob, fileName);
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

  JoinCommunity();
  Zones({ map });
  initWakelock();
  Search({ panToMarker });

  const container = document.querySelector("#sotf-video")!;
  const adNote = document.querySelector(".ad-note")!;
  let isPatron = useAccountStore.getState().isPatron;

  if (!isPatron && !matchMedia("print").matches) {
    NitroPay();
  } else {
    container.remove();
    adNote.remove();
  }

  useAccountStore.subscribe((state) => {
    if (isPatron !== state.isPatron && state.isPatron) {
      isPatron = state.isPatron;
      container?.remove();
      adNote?.remove();
    }
  });

  let userId = Cookies.get("userId");
  const refreshState = async () => {
    if (!userId) {
      const state = useAccountStore.getState();
      if (state.isPatron) {
        state.setIsPatron(false);
      }
      return;
    }

    const response = await fetch(
      `https://www.th.gl/api/patreon?appId=bemfloapmmjpmdmjfjgegnacdlgeapmkcmcmceei`,
      { credentials: "include" }
    );
    const state = useAccountStore.getState();
    try {
      const body = (await response.json()) as { previewAccess: boolean };
      if (!response.ok) {
        console.warn(body);
        state.setIsPatron(false);
      } else {
        console.log(`Patreon successfully activated`);
        state.setIsPatron(true, userId, body.previewAccess);
      }
    } catch (err) {
      console.error(err);
      state.setIsPatron(false);
    }
  };
  refreshState();

  document.addEventListener("visibilitychange", () => {
    if (document.visibilityState === "visible") {
      const newUserId = Cookies.get("userId");
      if (newUserId !== userId) {
        userId = newUserId;
        refreshState();
      }
    }
  });
});

initPlausible("sotf.th.gl", "https://metrics.th.gl");
