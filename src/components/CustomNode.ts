import "leaflet";

import "@geoman-io/leaflet-geoman-free";
import "@geoman-io/leaflet-geoman-free/dist/leaflet-geoman.css";
import leaflet from "leaflet";

import CanvasMarker from "../lib/canvas-marker";
import { createElement } from "../lib/elements";
import { t } from "../lib/i18n";
import { getIconElement } from "../lib/icons";
import { getCustomNodes, getTypes, setCustomNodes } from "../lib/nodes";
import { PlayerPosition } from "../lib/player-marker";

export default function CustomNode({
  element,
  map,
  getLastPosition,
  onAdd,
  onOpen,
}: {
  element: HTMLButtonElement;
  map: leaflet.Map;
  getLastPosition: () => PlayerPosition;
  onAdd: () => void;
  onOpen: () => void;
}) {
  const types = getTypes();
  let isAdding = false;
  element.onclick = (event) => {
    event.stopPropagation();
    onOpen();
    if (isAdding) {
      return;
    }
    isAdding = true;
    const playerPosition = getLastPosition();

    const marker = new CanvasMarker(
      [playerPosition.location.y, playerPosition.location.x],
      {
        id: Date.now(),
        path: types[0].icon,
        color: "#ffffff",
        radius: 16,
        interactive: true,
        pmIgnore: false,
        tooltipContent: "",
      }
    );
    marker.addTo(map);

    const save = createElement("input", {
      type: "submit",
      className: "tooltip-button",
      value: t("Save"),
    });
    const cancel = createElement("button", {
      type: "button",
      className: "tooltip-button",
      innerText: t("Cancel"),
      onclick: () => {
        marker.remove();
        isAdding = false;
      },
    });

    const actions = createElement("div", { className: "actions" }, [
      save,
      cancel,
    ]);
    actions.append(save, cancel);
    const note = createElement("span", {
      innerText: t("Drag icon to move the node position"),
      className: "description",
    });

    const titleLabel = createElement("label", {}, [
      createElement("span", { innerText: "Title" }),
      createElement("input", { name: "title", required: true }),
    ]);
    const form = createElement("form");
    const container = createElement("div", {
      className: "node-form",
      innerHTML: `
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
    `,
    });
    container.prepend(titleLabel);
    container.append(note);

    form.append(container, actions);

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

      const customNodes = getCustomNodes();
      customNodes.push({
        id: Date.now(),
        title,
        description,
        type,
        x,
        y,
        color,
      });
      setCustomNodes(customNodes);
      onAdd();
      marker.remove();
      isAdding = false;
    };

    const tooltipContainer = createElement(
      "div",
      {
        className: "tooltip-container",
      },
      [form]
    );

    marker.pm.enableLayerDrag();

    marker.bindPopup(tooltipContainer, {
      offset: [0, -10],
    });
    marker.openPopup();

    titleLabel.focus();
  };
}
