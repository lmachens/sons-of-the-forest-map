import leaflet from "leaflet";
import CanvasMarker from "./lib/canvas-marker";
import locations from "./lib/locations.json" assert { type: "json" };
import { types } from "./lib/nodes";

export default function Nodes({ map }: { map: leaflet.Map }) {
  locations.forEach((location) => {
    const type = types.find((type) => type.value === location.type)!;

    const marker = new CanvasMarker([location.y, location.x], {
      radius: 15,
      src: type.icon,
    });
    marker.addTo(map);
    marker.bindTooltip(type.title, {
      direction: "top",
      offset: [0, -14],
    });
  });
}
