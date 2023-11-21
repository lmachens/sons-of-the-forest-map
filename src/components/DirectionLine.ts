import leaflet from "leaflet";
import { PlayerPosition } from "../lib/player-marker";
import { useSettingsStore } from "../lib/stores/settings";

export default function DirectionLine({ map }: { map: leaflet.Map }) {
  const polyline = leaflet.polyline([], {
    color: "orange",
    dashArray: "5",
  });

  const settings = useSettingsStore.getState();
  const directionLine =
    document.querySelector<HTMLInputElement>("#direction_line")!;
  directionLine.checked = settings.showDirectionLine;
  if (directionLine.checked) {
    polyline.addTo(map);
  }

  directionLine.onchange = () => {
    if (directionLine.checked) {
      settings.setValue("showDirectionLine", true);
      polyline.addTo(map);
    } else {
      settings.setValue("showDirectionLine", false);
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
