import leaflet from "leaflet";
import { throttle } from "throttle-debounce";
import {
  GameSession,
  addTraceLineItem,
  getLatestGameSession,
} from "../lib/game-sessions";

export default function TraceLine({ map }: { map: leaflet.Map }) {
  const latestGameSession = getLatestGameSession();

  const layerGroup = new leaflet.LayerGroup();

  const traceLine = document.querySelector<HTMLInputElement>("#trace_line")!;
  traceLine.checked = localStorage.getItem("hide_trace_line") !== "true";
  if (traceLine.checked) {
    layerGroup.addTo(map);
  }

  traceLine.onchange = () => {
    if (traceLine.checked) {
      localStorage.removeItem("hide_trace_line");
      layerGroup.addTo(map);
    } else {
      localStorage.setItem("hide_trace_line", "true");
      layerGroup.removeFrom(map);
    }
  };

  function addCircle(
    location: { x: number; y: number; z: number },
    target: leaflet.LayerGroup = layerGroup
  ) {
    const circle = leaflet.circle(
      [location.y, location.x] as [number, number],
      {
        radius: 0,
        interactive: false,
        color: "#F78166",
      }
    );
    circle.addTo(target);
  }
  latestGameSession.traceLine.forEach((location) => addCircle(location));

  let lastLocation: {
    x: number;
    y: number;
    z: number;
  } = {
    x: 0,
    y: 0,
    z: 0,
  };
  const updatePosition = throttle(
    750,
    function updatePosition({
      location,
    }: {
      location: {
        x: number;
        y: number;
        z: number;
      };
    }) {
      if (
        Math.abs(location.x - lastLocation.x) > 3 ||
        Math.abs(location.y - lastLocation.y) > 3
      ) {
        addCircle(location);
        addTraceLineItem(location);
        lastLocation = location;
      }
    }
  );
  const layerGroups: {
    [key: string]: leaflet.LayerGroup;
  } = {};

  function showSession(session: GameSession) {
    const layerGroup = new leaflet.LayerGroup();

    session.traceLine.forEach((location) => addCircle(location, layerGroup));
    layerGroup.addTo(map);
    layerGroups[session.timestamp.toString()] = layerGroup;
  }

  function hideSession(session: GameSession) {
    const layerGroup = layerGroups[session.timestamp.toString()];
    if (layerGroup) {
      layerGroup.remove();
    }
  }

  return {
    updatePosition,
    showSession,
    hideSession,
  };
}
