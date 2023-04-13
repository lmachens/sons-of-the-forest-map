import leaflet from "leaflet";

const ZONE_SIZE = 160;
const OFFSET = -13 * ZONE_SIZE + ZONE_SIZE / 2;
export default function Zones({ map }: { map: leaflet.Map }) {
  const layerGroup = new leaflet.LayerGroup();
  layerGroup.addTo(map);

  const showZones = document.querySelector<HTMLInputElement>("#zones_grid")!;
  showZones.checked = localStorage.getItem("show_zones") === "true";
  if (showZones.checked) {
    drawZones();
  }

  showZones.onchange = () => {
    if (showZones.checked) {
      localStorage.setItem("show_zones", "true");
      drawZones();
      layerGroup.addTo(map);
    } else {
      localStorage.removeItem("show_zones");
      removeZones();
      layerGroup.removeFrom(map);
    }
  };

  function drawZones() {
    for (let i = 0; i < 25; i++) {
      for (let j = 0; j < 25; j++) {
        leaflet
          .rectangle(
            [
              [j * ZONE_SIZE + OFFSET, i * ZONE_SIZE + OFFSET],
              [
                j * ZONE_SIZE + ZONE_SIZE + OFFSET,
                i * ZONE_SIZE + ZONE_SIZE + OFFSET,
              ],
            ],
            { color: "#000000", weight: 1, interactive: false }
          )
          .addTo(layerGroup);
        leaflet
          .marker(
            [
              j * ZONE_SIZE + ZONE_SIZE / 2 + OFFSET,
              i * ZONE_SIZE + ZONE_SIZE / 2 + OFFSET,
            ],
            {
              icon: leaflet.divIcon({
                className: "zone-label",
                html: `${String.fromCharCode(97 + i)}${String.fromCharCode(
                  97 + j
                )}`.toUpperCase(),
              }),
              interactive: false,
            }
          )
          .addTo(layerGroup);
      }
    }
  }

  function removeZones() {
    layerGroup.clearLayers();
  }
}
