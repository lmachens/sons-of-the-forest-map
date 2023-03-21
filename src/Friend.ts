import leaflet from "leaflet";
import PlayerMarker from "./lib/player-marker";

export default function Friend({ map }: { map: leaflet.Map }) {
  const icon = leaflet.icon({
    iconUrl: "/arrow.webp",
    className: "",
    iconSize: [32, 32],
  });
  const marker = new PlayerMarker([0, 0], {
    icon,
    interactive: false,
  });
  marker.rotation = 90;
  marker.addTo(map);
  const element = marker.getElement()!;
  element.style.filter += `hue-rotate(${generateRandomInteger(10, 350)}deg)`;

  return {
    updatePosition: marker.updatePosition,
    remove: () => marker.remove(),
  };
}

function generateRandomInteger(min: number, max: number) {
  return Math.floor(min + Math.random() * (max - min + 1));
}
