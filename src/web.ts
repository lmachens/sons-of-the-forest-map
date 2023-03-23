import ImageOverlay from "./ImageOverlay";
import Map from "./Map";
import Nodes from "./Nodes";

const mapElement = document.querySelector<HTMLDivElement>(".map")!;
const map = Map(mapElement);
ImageOverlay({ map });
Nodes({ map });
