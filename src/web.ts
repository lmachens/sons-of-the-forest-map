import CustomNode from "./CustomNode";
import Filters from "./Filters";
import ImageOverlay from "./ImageOverlay";
import Map from "./Map";
import Multiplayer from "./Multiplayer";
import Nodes from "./Nodes";

let lastLocation = { x: 0, y: 0, z: 0 };
let lastRotation = 0;

function getLastPosition() {
  return { location: lastLocation, rotation: lastRotation };
}

const mapElement = document.querySelector<HTMLDivElement>(".map")!;
const map = Map(mapElement);
ImageOverlay({ map });

Multiplayer({
  map,
});

const { refresh } = Nodes({ map });
CustomNode({ map, getLastPosition, onAdd: refresh });
Filters({ onChange: refresh });
