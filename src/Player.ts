import leaflet from "leaflet";
import PlayerMarker from "./lib/player-marker";

export default function Player({ map }: { map: leaflet.Map }) {
  const icon = leaflet.icon({
    iconUrl: "/arrow.webp",
    className: "",
    iconSize: [32, 32],
  });
  const marker = new PlayerMarker([0, 0], {
    icon,
    interactive: false,
  });
  marker.rotation = 0;

  marker.addTo(map);

  let firstTime = true;
  function updatePosition(position: {
    location: {
      x: number;
      y: number;
      z: number;
    };
    rotation: number;
  }) {
    marker.updatePosition(position);
    if (firstTime) {
      map.flyTo(marker.getLatLng(), 2);
      firstTime = false;
    }
  }

  function panTo() {
    map.panTo(marker.getLatLng());
  }
  return {
    updatePosition,
    panTo,
  };
}
