import leaflet from "leaflet";
import { BOUNDS } from "../lib/config";

export default function ImageOverlay({ map }: { map: leaflet.Map }) {
  const imageOverlay = leaflet.imageOverlay("/cartography.webp?v=2", BOUNDS);
  imageOverlay.addTo(map);
}
