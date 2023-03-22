import leaflet from "leaflet";
import { PlayerPosition } from "./lib/player-marker";

export default function DirectionLine({ map }: { map: leaflet.Map }) {
  const polyline = leaflet.polyline([], {
    color: "orange",
    dashArray: "5",
  });

  const directionLine =
    document.querySelector<HTMLInputElement>("#direction_line")!;
  directionLine.checked =
    localStorage.getItem("hide_direction_line") !== "true";
  if (directionLine.checked) {
    polyline.addTo(map);
  }

  directionLine.onchange = () => {
    if (directionLine.checked) {
      localStorage.removeItem("hide_direction_line");
      polyline.addTo(map);
    } else {
      localStorage.setItem("hide_direction_line", "true");
      polyline.removeFrom(map);
    }
  };

  function updatePosition({ location, rotation }: PlayerPosition) {
    const latLng: [number, number] = [
      location.y + Math.sin((rotation * Math.PI) / 180) * 1000,
      location.x + Math.cos((rotation * Math.PI) / 180) * 1000,
    ];
    const latLngs = [[location.y, location.x] as [number, number], latLng];

    polyline.setLatLngs(latLngs);
  }

  return {
    updatePosition,
  };
}
