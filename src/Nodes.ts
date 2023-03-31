import leaflet from "leaflet";
import CanvasMarker from "./lib/canvas-marker";
import { createElement } from "./lib/elements";
import { getIconElement } from "./lib/icons";
import locations from "./lib/locations.json" assert { type: "json" };
import {
  getCustomNodes,
  getDeselectedFilters,
  getDiscoveredNodeIDs,
  Node,
  setCustomNodes,
  setDiscoveredNodeIDs,
  types,
} from "./lib/nodes";

export default function Nodes({ map }: { map: leaflet.Map }) {
  const group = new leaflet.LayerGroup();
  const customGroup = new leaflet.LayerGroup();

  function refresh() {
    const deselectedFilters = getDeselectedFilters();
    const customNodes = getCustomNodes();
    const discoveredNodeIDs = getDiscoveredNodeIDs();
    customGroup.clearLayers();
    if (!deselectedFilters.includes("custom")) {
      customNodes.forEach((node) =>
        addMarker(node, true, discoveredNodeIDs.includes(node.id))
      );
    }
    group.clearLayers();
    (locations as Node[])
      .filter((node) => {
        const type = types.find((type) => type.value === node.type)!;
        return !deselectedFilters.includes(type.filter!);
      })
      .forEach((node) =>
        addMarker(node, false, discoveredNodeIDs.includes(node.id))
      );
  }
  refresh();

  group.addTo(map);
  customGroup.addTo(map);

  let contextMenuTooltip: leaflet.Tooltip | null = null;

  function addMarker(location: Node, isCustom: boolean, isDiscovered: boolean) {
    const type = types.find((type) => type.value === location.type) || types[0];

    const marker = new CanvasMarker([location.y, location.x], {
      path: type.icon,
      color: location.color || "#ffffff",
      radius: 16,
      isDiscovered,
      isUnderground: location.isUnderground,
      pmIgnore: true,
    });
    marker.addTo(isCustom ? customGroup : group);

    const requirements = location.requirements
      ?.map((requirementId) => {
        const location = locations.find(
          (location) => location.id === requirementId
        );
        return `<p class="italic">${location?.title}</p>`;
      })
      .join("\n");

    const tooltipContent = `
    <p class="bold">${location.title ?? ""}</p>
    <p class="italic">${isCustom ? "Custom Node" : type.title}</p>
    <p>${location.description?.replaceAll("\n", "<br/>") || ""}</p>
    ${location.isUnderground ? '<p class="info italic">Underground</p>' : ""}
    ${requirements ? `<p class="bold">Requirements</p>${requirements}` : ""}
    <p class="hint">Right-Click to open menu</p>
    `;
    marker.bindTooltip(tooltipContent, {
      direction: "top",
      offset: [0, -15],
    });
    function openEditCustomNodeTooltip() {
      marker.options.pmIgnore = false;
      leaflet.PM.reInitLayer(marker);

      const form = createElement("form", {
        className: "node-form",
        innerHTML: `
      <label><span>Title</span><input name="title" value="${
        location.title
      }" required /></label>
      <label><span>Description</span><textarea name="description">${
        location.description
      }</textarea></label>
      <label><span>Color</span><input type="color" name="color" value="${
        location.color || "#ffffff"
      }"/></label>
      <label><span>Icon</span><div class="types">${types
        .map(
          (type) =>
            `<label class="type-label"><input name="type" type="radio" value="${
              type.value
            }" ${type.value === location.type ? "checked" : ""} />${
              getIconElement(type).outerHTML
            }</label>`
        )
        .join("")}</div></label>
      `,
      });
      const save = createElement("input", {
        type: "submit",
        value: "Save",
      });
      const remove = createElement("button", {
        type: "button",
        innerText: "Delete",
        onclick: () => {
          let customNodes = getCustomNodes();
          customNodes = customNodes.filter((node) => node.id !== location.id!);
          setCustomNodes(customNodes);
          marker.pm.disableLayerDrag();
          refresh();
        },
      });
      const cancel = createElement("button", {
        type: "button",
        innerText: "Cancel",
        onclick: () => {
          marker.unbindTooltip();
          marker.bindTooltip(tooltipContent, {
            direction: "top",
          });

          marker.pm.disableLayerDrag();
          marker.options.pmIgnore = true;
          leaflet.PM.reInitLayer(marker);
        },
      });
      const actions = createElement("div", {}, [save, remove, cancel]);
      const note = createElement("span", {
        innerText: "Drag icon to move the node position",
        className: "description",
      });
      form.append(actions, note);

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
        const color = formData.get("color") as string;
        const latLng = marker.getLatLng();
        const x = latLng.lng;
        const y = latLng.lat;
        const z = 0;

        let customNodes = getCustomNodes();
        customNodes = customNodes.filter((node) => node.id !== id);
        customNodes.push({ id, title, description, type, x, y, z, color });
        setCustomNodes(customNodes);
        marker.pm.disableLayerDrag();
        refresh();
      };
      marker.unbindTooltip();
      marker.remove();
      marker.addTo(map);
      marker.bindTooltip(form, {
        direction: "top",
        interactive: true,
        permanent: true,
      });

      marker.pm.enableLayerDrag();
    }

    marker.on("contextmenu", (event) => {
      // @ts-ignore
      event.originalEvent.propagatedFromMarker = true;

      if (contextMenuTooltip) {
        contextMenuTooltip.remove();
      }
      const hideElement = createElement("button", {
        innerText: isDiscovered ? "Set as undiscovered" : "Set as discoverd",
        onclick: () => {
          let discoveredNodeIDs = getDiscoveredNodeIDs();
          if (isDiscovered) {
            discoveredNodeIDs = discoveredNodeIDs.filter(
              (id) => id !== location.id
            );
          } else {
            discoveredNodeIDs.push(location.id);
          }
          setDiscoveredNodeIDs(discoveredNodeIDs);
          refresh();
        },
      });
      const container = createElement("div", {}, [hideElement]);
      if (isCustom) {
        const editElement = createElement("button", {
          innerText: "Edit Custom Node",
          onclick: openEditCustomNodeTooltip,
        });
        container.append(editElement);
      }

      contextMenuTooltip = leaflet
        .tooltip({
          direction: "bottom",
          interactive: true,
          className: "contextmenu",
        })
        .setLatLng(event.latlng)
        .setContent(container)
        .addTo(map);
    });
  }

  return {
    refresh,
  };
}
