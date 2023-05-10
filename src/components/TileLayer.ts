import leaflet from "leaflet";
import { createCanvasLayer } from "../lib/canvas-layer";
import { BOUNDS } from "../lib/config";

export default function TileLayer({ map }: { map: leaflet.Map }) {
  createCanvasLayer("/map/{z}-{x}-{y}.webp", {
    minNativeZoom: -3,
    minZoom: -4,
    maxNativeZoom: 0,
    maxZoom: 5,
    zoomOffset: 4,
    bounds: BOUNDS,
  }).addTo(map);
}
