import "leaflet";

import "@geoman-io/leaflet-geoman-free";
import "@geoman-io/leaflet-geoman-free/dist/leaflet-geoman.css";
import leaflet from "leaflet";

import CanvasMarker from "./lib/canvas-marker";
import { getCustomNodes, setCustomNodes, types } from "./lib/nodes";
import { PlayerPosition } from "./lib/player-marker";

export default function CustomNode({
  map,
  getLastPosition,
  onAdd,
}: {
  map: leaflet.Map;
  getLastPosition: () => PlayerPosition;
  onAdd: () => void;
}) {
  const addCustomNode =
    document.querySelector<HTMLButtonElement>("#add_custom_node")!;

  let isAdding = false;
  addCustomNode.onclick = () => {
    if (isAdding) {
      return;
    }
    isAdding = true;
    const playerPosition = getLastPosition();
    const marker = new CanvasMarker(
      [playerPosition.location.y, playerPosition.location.x],
      {
        radius: 15,
        src: types[0].icon,
        interactive: true,
        pmIgnore: false,
      }
    );
    marker.addTo(map);
    const form = document.createElement("form");
    form.className = "node-form";
    form.innerHTML = `
    <label><span>Title</span><input name="title" required /></label>
    <label><span>Description</span><textarea name="description"></textarea></label>
    <label><span>Type</span><div class="types">${types
      .map(
        (type, index) =>
          `<label class="type-radio"><input name="type" type="radio" value="${
            type.value
          }" ${index === 0 ? "checked" : ""} /><img src="${
            type.icon
          }"/></label>`
      )
      .join("")}</div></label>
    `;
    const actions = document.createElement("div");
    const save = document.createElement("input");
    save.type = "submit";
    save.value = "Save";
    const cancel = document.createElement("button");
    cancel.type = "button";
    cancel.innerText = "Cancel";
    cancel.onclick = () => {
      marker.remove();
      isAdding = false;
    };

    actions.append(save, cancel);
    form.append(actions);

    form.onmousedown = (event) => event.stopPropagation();
    form.ondblclick = (event) => event.stopPropagation();
    form.onwheel = (event) => event.stopPropagation();
    form.onsubmit = (event) => {
      event.preventDefault();
      const formData = new FormData(form);
      const title = formData.get("title") as string;
      const description = formData.get("description") as string;
      const type = formData.get("type") as string;
      const latLng = marker.getLatLng();
      const x = latLng.lng;
      const y = latLng.lat;
      const z = 0;

      const customNodes = getCustomNodes();
      customNodes.push({ id: Date.now(), title, description, type, x, y, z });
      setCustomNodes(customNodes);
      onAdd();
      marker.remove();
      isAdding = false;
    };
    marker.bindTooltip(form, {
      direction: "top",
      offset: [0, -14],
      interactive: true,
      permanent: true,
    });
    marker.openPopup();
    marker.pm.enableLayerDrag();
  };
}
