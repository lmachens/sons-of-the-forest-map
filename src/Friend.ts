import leaflet from "leaflet";
import PlayerMarker, { PlayerPosition } from "./lib/player-marker";

export default function Friend({ map }: { map: leaflet.Map }) {
  const icon = leaflet.icon({
    iconUrl: "/arrow.webp",
    className: "friend",
    iconSize: [32, 32],
  });
  const marker = new PlayerMarker([0, 0], {
    icon,
    interactive: false,
    pmIgnore: true,
  });
  marker.rotation = 90;
  marker.addTo(map);
  const element = marker.getElement()!;
  element.style.filter += `hue-rotate(${generateRandomInteger(10, 350)}deg)`;

  return {
    updatePosition: (position: PlayerPosition) =>
      marker.updatePosition(position),
    remove: () => marker.remove(),
  };
}

function generateRandomInteger(min: number, max: number) {
  return Math.floor(min + Math.random() * (max - min + 1));
}
