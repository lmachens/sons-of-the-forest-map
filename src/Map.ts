import leaflet from "leaflet";
import "leaflet/dist/leaflet.css";

import { BOUNDS } from "./lib/config";

export default function Map(container: HTMLDivElement) {
  const map = leaflet.map(container, {
    zoomControl: false,
    attributionControl: false,
    minZoom: -3,
    maxZoom: 5,
    crs: leaflet.CRS.Simple,
  });
  map.fitBounds(BOUNDS);
  map.on("contextmenu", () => {
    // Do nothing
  });

  return map;
}
