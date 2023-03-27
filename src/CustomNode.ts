import "leaflet";

import "@geoman-io/leaflet-geoman-free";
import "@geoman-io/leaflet-geoman-free/dist/leaflet-geoman.css";
import leaflet from "leaflet";

import { getDivIcon, getIconElement } from "./lib/icons";
import { getCustomNodes, setCustomNodes, types } from "./lib/nodes";
import { PlayerPosition } from "./lib/player-marker";

export default function CustomNode({
  element,
  map,
  getLastPosition,
  onAdd,
}: {
  element: HTMLButtonElement;
  map: leaflet.Map;
  getLastPosition: () => PlayerPosition;
  onAdd: () => void;
}) {
  let isAdding = false;
  element.onclick = () => {
    if (isAdding) {
      return;
    }
    isAdding = true;
    const playerPosition = getLastPosition();
    const icon = getDivIcon(types[0], true);

    const marker = new leaflet.Marker(
      [playerPosition.location.y, playerPosition.location.x],
      {
        icon,
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
    <label><span>Color</span><input type="color" name="color" value="#ffffff"/></label>
    <label><span>Type</span><div class="types">${types
      .map(
        (type, index) =>
          `<label class="type-label"><input name="type" type="radio" value="${
            type.value
          }" ${index === 0 ? "checked" : ""} />${
            getIconElement(type).outerHTML
          }</label>`
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
    const note = document.createElement("span");
    note.innerText = "Drag icon to move the node position";
    note.className = "description";
    form.append(actions, note);

    form.onclick = (event) => event.stopPropagation();
    form.onmousedown = (event) => event.stopPropagation();
    form.ondblclick = (event) => event.stopPropagation();
    form.onwheel = (event) => event.stopPropagation();
    form.onsubmit = (event) => {
      event.preventDefault();
      const formData = new FormData(form);
      const title = formData.get("title") as string;
      const description = formData.get("description") as string;
      const type = formData.get("type") as string;
      const color = formData.get("color") as string;
      const latLng = marker.getLatLng();
      const x = latLng.lng;
      const y = latLng.lat;
      const z = 0;

      const customNodes = getCustomNodes();
      customNodes.push({
        id: Date.now(),
        title,
        description,
        type,
        x,
        y,
        z,
        color,
      });
      setCustomNodes(customNodes);
      onAdd();
      marker.remove();
      isAdding = false;
    };
    marker.bindTooltip(form, {
      direction: "top",
      interactive: true,
      permanent: true,
    });
    marker.pm.enableLayerDrag();
  };
}
