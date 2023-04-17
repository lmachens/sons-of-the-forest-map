import leaflet from "leaflet";
import CanvasMarker from "../lib/canvas-marker";
import { createElement } from "../lib/elements";
import { getIconElement } from "../lib/icons";
import {
  MapLocation,
  getMapLocationById,
  getMapLocations,
} from "../lib/locations";
import { setMeta } from "../lib/meta";
import {
  filters,
  getCustomNodes,
  getDeselectedFilters,
  getDiscoveredNodeIDs,
  setCustomNodes,
  setDiscoveredNodeIDs,
  types,
} from "../lib/nodes";
import { getMapLocationId, setMapLocationId } from "../lib/router";

const ICON_RADIUS = 16;
const HIGHLIGHTED_ICON_RADIUS = ICON_RADIUS * 1.5;
export default function Nodes({ map }: { map: leaflet.Map }) {
  const group = new leaflet.LayerGroup();
  const customGroup = new leaflet.LayerGroup();

  let selectedMarker: CanvasMarker | null = null;

  map.on("click", (event) => {
    // @ts-ignore
    if (event.originalEvent.propagatedFromMarker) {
      return;
    }
    setMapLocationId(null);
    unselectMarker();
  });

  function refresh() {
    const deselectedFilters = getDeselectedFilters();
    const customNodes = getCustomNodes();
    const discoveredNodeIDs = getDiscoveredNodeIDs();
    customGroup.clearLayers();

    const mapLocationId = getMapLocationId();

    if (!deselectedFilters.includes("custom")) {
      customNodes.forEach((node) => {
        const isSelected = node.id === mapLocationId;
        const marker = addMarker(
          node,
          true,
          discoveredNodeIDs.includes(node.id),
          isSelected
        );
        if (isSelected) {
          selectedMarker = marker;
        }
      });
    }
    group.clearLayers();
    getMapLocations()
      .filter((mapLocation) => {
        const type = types.find((type) => type.value === mapLocation.type)!;
        return !deselectedFilters.includes(type.filter!);
      })
      .forEach((mapLocation) => {
        const isSelected = mapLocation.id === mapLocationId;
        const marker = addMarker(
          mapLocation,
          false,
          discoveredNodeIDs.includes(mapLocation.id),
          isSelected
        );
        if (isSelected) {
          selectedMarker = marker;
        }
      });

    const customNodesCount = document.querySelector<HTMLSpanElement>(
      "#custom_nodes_count"
    );
    if (customNodesCount) {
      customNodesCount.innerText = customNodes.length.toString();
    }
    const discoveredNodesCount = document.querySelector<HTMLSpanElement>(
      "#discovered_nodes_count"
    );
    if (discoveredNodesCount) {
      discoveredNodesCount.innerText = discoveredNodeIDs.length.toString();
    }
  }
  refresh();

  group.addTo(map);
  customGroup.addTo(map);

  function displaySelectedMarker() {
    if (selectedMarker) {
      selectedMarker.bringToFront();
      selectedMarker.unbindTooltip();
      selectedMarker.openPopup();

      const mapLocation = getMapLocationById(selectedMarker.options.id);
      if (mapLocation) {
        setMeta(mapLocation.title, mapLocation.description);
      }
    }
  }

  function unselectMarker() {
    if (selectedMarker) {
      selectedMarker.options.isHighlighted = false;
      selectedMarker.setRadius(ICON_RADIUS);
      selectedMarker.closePopup();
      selectedMarker.bindTooltip(selectedMarker.options.tooltipContent, {
        direction: "top",
        offset: [0, -15],
      });
      selectedMarker.redraw();
      selectedMarker = null;
    }
  }

  displaySelectedMarker();

  let contextMenuTooltip: leaflet.Tooltip | null = null;

  function addMarker(
    mapLocation: MapLocation,
    isCustom: boolean,
    isDiscovered: boolean,
    isHighlighted = false
  ) {
    const type =
      types.find((type) => type.value === mapLocation.type) || types[0];
    const filter =
      filters.find((filter) => filter.value === type.filter) || filters[0];

    const requirements = mapLocation.requirements
      ?.map((requirementId) => {
        const mapLocation = getMapLocationById(requirementId);
        return `<p class="italic">${mapLocation?.title}</p>`;
      })
      .join("\n");

    const items = mapLocation.items
      ?.map((itemsId) => {
        const mapLocation = getMapLocationById(itemsId);
        return `<p class="italic">${mapLocation?.title}</p>`;
      })
      .join("\n");

    const tooltipContent = createElement("div", {
      className: "tooltip-container",
      innerHTML: `
      <div class="tooltip-content">
      <p class="bold">${mapLocation.title ?? ""}</p>
      <p class="italic">${isCustom ? "Custom Node" : type.title}</p>
      <p>${mapLocation.description?.replaceAll("\n", "<br/>") || ""}</p>
      ${
        mapLocation.isUnderground
          ? '<p class="info italic">Underground</p>'
          : ""
      }
      ${requirements ? `<p class="bold">Requirements</p>${requirements}` : ""}
      ${items ? `<p class="bold">Items</p>${items}` : ""}
      <p class="hint">Right-Click to open menu</p>
    </div>`,
    });
    if (mapLocation.screenshot) {
      const screenshot = createElement("img", {
        className: "screenshot-preview",
        src: `/screenshots/${mapLocation.screenshot}`,
        alt: "",
        onclick: () => {
          const container = createElement(
            "div",
            {
              className: "screenshot-container",
              onclick: () => {
                container.remove();
              },
            },
            [
              createElement("img", {
                className: "screenshot-full",
                src: `/screenshots/${mapLocation.screenshot}`,
                alt: "",
              }),
            ]
          );
          document.body.appendChild(container);
        },
      });
      tooltipContent.prepend(screenshot);
    }

    const marker = new CanvasMarker([mapLocation.y, mapLocation.x], {
      id: mapLocation.id,
      path: type.icon,
      color: mapLocation.color || filter.color || "#ffffff",
      radius: isHighlighted ? HIGHLIGHTED_ICON_RADIUS : ICON_RADIUS,
      isDiscovered,
      isUnderground: mapLocation.isUnderground,
      pmIgnore: true,
      isHighlighted,
      tooltipContent,
    });
    marker.addTo(isCustom ? customGroup : group);

    marker.bindTooltip(tooltipContent, {
      direction: "top",
      offset: [0, -15],
    });

    marker.bindPopup(tooltipContent, {
      offset: [0, -10],
    });

    function openEditCustomNodeTooltip() {
      marker.options.pmIgnore = false;
      leaflet.PM.reInitLayer(marker);

      const form = createElement("form", {
        className: "node-form",
        innerHTML: `
      <label><span>Title</span><input name="title" value="${
        mapLocation.title
      }" required /></label>
      <label><span>Description</span><textarea name="description">${
        mapLocation.description
      }</textarea></label>
      <label><span>Color</span><input type="color" name="color" value="${
        mapLocation.color || "#ffffff"
      }"/></label>
      <label><span>Icon</span><div class="types">${types
        .map(
          (type) =>
            `<label class="type-label"><input name="type" type="radio" value="${
              type.value
            }" ${type.value === mapLocation.type ? "checked" : ""} />${
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
          customNodes = customNodes.filter(
            (node) => node.id !== mapLocation.id
          );
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
        const id = mapLocation.id;
        const title = formData.get("title") as string;
        const description = formData.get("description") as string;
        const type = formData.get("type") as string;
        const color = formData.get("color") as string;
        const latLng = marker.getLatLng();
        const x = latLng.lng;
        const y = latLng.lat;

        let customNodes = getCustomNodes();
        customNodes = customNodes.filter((node) => node.id !== id);
        customNodes.push({ id, title, description, type, x, y, color });
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
              (id) => id !== mapLocation.id
            );
          } else {
            discoveredNodeIDs.push(mapLocation.id);
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

    if (isHighlighted) {
      marker.bindPopup(tooltipContent);
      marker.openPopup();
    }

    marker.on("click", () => {
      unselectMarker();
      selectedMarker = marker;
      selectedMarker.setRadius(HIGHLIGHTED_ICON_RADIUS);
      selectedMarker.options.isHighlighted = true;
      selectedMarker.redraw();
      displaySelectedMarker();
      setMapLocationId(mapLocation.id);
    });

    return marker;
  }

  const resetDiscoveredNodes = document.querySelector<HTMLButtonElement>(
    "#reset_discovered_nodes"
  )!;
  resetDiscoveredNodes.onclick = () => {
    if (!confirm("Are you sure you want to reset all discovered nodes?")) {
      return;
    }
    setDiscoveredNodeIDs([]);
    refresh();
  };

  return {
    refresh,
  };
}
