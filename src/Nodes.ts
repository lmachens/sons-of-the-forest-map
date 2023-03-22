import leaflet from "leaflet";
import CanvasMarker from "./lib/canvas-marker";
import locations from "./lib/locations.json" assert { type: "json" };
import { getCustomNodes, Node, setCustomNodes, types } from "./lib/nodes";

export default function Nodes({ map }: { map: leaflet.Map }) {
  const group = new leaflet.LayerGroup();
  const customGroup = new leaflet.LayerGroup();

  function refreshCustomNodes() {
    const customNodes = getCustomNodes();
    customGroup.clearLayers();
    customNodes.forEach((node) => addMarker(node, true));
  }
  refreshCustomNodes();

  const showNodes = document.querySelector<HTMLInputElement>("#show_nodes")!;
  showNodes.checked = localStorage.getItem("hide_nodes") !== "true";
  if (showNodes.checked) {
    group.addTo(map);
  }
  customGroup.addTo(map);

  showNodes.onchange = () => {
    if (showNodes.checked) {
      localStorage.removeItem("hide_nodes");
      group.addTo(map);
    } else {
      localStorage.setItem("hide_nodes", "true");
      group.removeFrom(map);
    }
  };

  function addMarker(location: Node, isCustom: boolean) {
    const type = types.find((type) => type.value === location.type)!;

    const marker = new CanvasMarker([location.y, location.x], {
      radius: 15,
      src: type.icon,
      pmIgnore: true,
    });
    marker.addTo(isCustom ? customGroup : group);
    const tooltip = `
    <p class="bold">${location.title ?? ""}</p>
    <p class="italic">${isCustom ? "Custom Node" : type.title}</p>
    <p>${location.description?.replaceAll("\n", "<br/>") || ""}</p>
    ${isCustom ? `<p class="hint">Click to edit</p>` : ""}
    `;
    marker.bindTooltip(tooltip, {
      direction: "top",
      offset: [0, -14],
    });
    if (isCustom) {
      marker.on("click", () => {
        marker.options.pmIgnore = false;
        leaflet.PM.reInitLayer(marker);

        const form = document.createElement("form");
        form.className = "node-form";
        form.innerHTML = `
    <label><span>Title</span><input name="title" value="${
      location.title
    }" required /></label>
    <label><span>Description</span><textarea name="description">${
      location.description
    }</textarea></label>
    <label><span>Type</span><div class="types">${types
      .map(
        (type) =>
          `<label class="type-radio"><input name="type" type="radio" value="${
            type.value
          }" ${type.value === location.type ? "checked" : ""} /><img src="${
            type.icon
          }"/></label>`
      )
      .join("")}</div></label>
    `;
        const actions = document.createElement("div");
        const save = document.createElement("input");
        save.type = "submit";
        save.value = "Save";
        const remove = document.createElement("button");
        remove.type = "button";
        remove.innerText = "Delete";
        remove.onclick = () => {
          let customNodes = getCustomNodes();
          customNodes = customNodes.filter((node) => node.id !== location.id!);
          setCustomNodes(customNodes);
          marker.pm.disableLayerDrag();
          refreshCustomNodes();
        };
        const cancel = document.createElement("button");
        cancel.type = "button";
        cancel.innerText = "Cancel";
        cancel.onclick = () => {
          marker.unbindTooltip();
          marker.bindTooltip(tooltip, {
            direction: "top",
            offset: [0, -14],
          });

          marker.pm.disableLayerDrag();
          marker.options.pmIgnore = true;
          leaflet.PM.reInitLayer(marker);
        };
        actions.append(save, remove, cancel);
        form.append(actions);

        form.onclick = (event) => event.stopPropagation();
        form.onmousedown = (event) => event.stopPropagation();
        form.ondblclick = (event) => event.stopPropagation();
        form.onwheel = (event) => event.stopPropagation();
        form.onsubmit = (event) => {
          event.preventDefault();
          const formData = new FormData(form);
          const id = location.id!;
          const title = formData.get("title") as string;
          const description = formData.get("description") as string;
          const type = formData.get("type") as string;
          const latLng = marker.getLatLng();
          const x = latLng.lng;
          const y = latLng.lat;
          const z = 0;

          let customNodes = getCustomNodes();
          customNodes = customNodes.filter((node) => node.id !== id);
          customNodes.push({ id, title, description, type, x, y, z });
          setCustomNodes(customNodes);
          marker.pm.disableLayerDrag();
          refreshCustomNodes();
        };
        marker.unbindTooltip();
        marker.bindTooltip(form, {
          direction: "top",
          offset: [0, -14],
          interactive: true,
          permanent: true,
        });
        marker.openPopup();
        marker.pm.enableLayerDrag();
      });
    }
  }
  (locations as Node[]).forEach((node) => addMarker(node, false));

  return {
    refreshCustomNodes,
  };
}
