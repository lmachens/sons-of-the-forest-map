import leaflet from "leaflet";
import CanvasMarker from "./lib/canvas-marker";
import locations from "./lib/locations.json" assert { type: "json" };
import { types } from "./lib/nodes";

export default function Nodes({ map }: { map: leaflet.Map }) {
  const group = new leaflet.LayerGroup();

  const showNodes = document.querySelector<HTMLInputElement>("#show_nodes")!;
  showNodes.checked = localStorage.getItem("hide_nodes") !== "true";
  if (showNodes.checked) {
    group.addTo(map);
  }

  showNodes.onchange = () => {
    if (showNodes.checked) {
      localStorage.removeItem("hide_nodes");
      group.addTo(map);
    } else {
      localStorage.setItem("hide_nodes", "true");
      group.removeFrom(map);
    }
  };

  locations.forEach((location) => {
    const type = types.find((type) => type.value === location.type)!;

    const marker = new CanvasMarker([location.y, location.x], {
      radius: 15,
      src: type.icon,
    });
    marker.addTo(group);
    marker.bindTooltip(type.title, {
      direction: "top",
      offset: [0, -14],
    });
  });
}
