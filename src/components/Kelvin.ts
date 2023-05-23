import leaflet from "leaflet";

export default function Kelvin({ map }: { map: leaflet.Map }) {
  const icon = leaflet.icon({
    iconUrl: "./kelvin.webp",
    className: "friend",
    iconSize: [32, 32],
  });
  const marker = new leaflet.Marker([0, 0], {
    icon,
    interactive: false,
    pmIgnore: true,
  });

  let firstTime = true;
  function updatePosition(x: number, y: number) {
    marker.setLatLng([y, x]);
    if (firstTime) {
      marker.addTo(map);
      firstTime = false;
    }
  }

  return {
    updatePosition,
    remove: () => {
      marker.remove();
    },
  };
}
