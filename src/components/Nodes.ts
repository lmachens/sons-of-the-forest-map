import leaflet from "leaflet";
import CanvasMarker from "../lib/canvas-marker";
import { createElement } from "../lib/elements";
import { t } from "../lib/i18n";
import { getIconElement } from "../lib/icons";
import {
  MapLocation,
  getMapLocationById,
  getMapLocations,
} from "../lib/locations";
import { setMeta } from "../lib/meta";
import {
  getCustomNodes,
  getDeselectedFilters,
  getDiscoveredNodeIDs,
  getFilters,
  getTypes,
  setCustomNodes,
  setDiscoveredNodeIDs,
} from "../lib/nodes";
import { getMapLocationId, setMapLocationId } from "../lib/router";

const ICON_RADIUS = 16;
const HIGHLIGHTED_ICON_RADIUS = ICON_RADIUS * 1.5;
export default function Nodes({ map }: { map: leaflet.Map }) {
  const types = getTypes();
  const filters = getFilters();
  const group = new leaflet.LayerGroup();
  const customGroup = new leaflet.LayerGroup();

  let selectedMarker: CanvasMarker | null = null;
  let latestMarkers: CanvasMarker[] = [];

  map.on("click", (event) => {
    // @ts-ignore
    if (event.originalEvent.propagatedFromMarker) {
      return;
    }
    setMapLocationId(null);
    unselectMarker();
  });

  function refreshVisibility() {
    const deselectedFilters = getDeselectedFilters();
    const mapLocationId = getMapLocationId();

    getMapLocations().forEach((mapLocation) => {
      const type = types.find((type) => type.value === mapLocation.type)!;
      const isVisible =
        mapLocation.id === mapLocationId ||
        !deselectedFilters.includes(type.filter!);

      const marker = latestMarkers.find(
        (marker) => marker.options.id === mapLocation.id
      );
      if (marker) {
        if (group.hasLayer(marker)) {
          if (!isVisible) {
            group.removeLayer(marker);
          }
        } else {
          if (isVisible) {
            group.addLayer(marker);
          }
        }
      }
    });
  }

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
        marker.addTo(customGroup);
      });
    }
    group.clearLayers();
    latestMarkers = getMapLocations().map((mapLocation) => {
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
      return marker;
    });
    refreshVisibility();

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
    refreshVisibility();
  }

  displaySelectedMarker();

  const panToMarker = (id: number) => {
    unselectMarker();
    setMapLocationId(id);
    const marker = latestMarkers.find((marker) => marker.options.id === id);
    if (marker) {
      if (!group.hasLayer(marker)) {
        marker.addTo(group);
      }
      selectedMarker = marker;
      selectedMarker.setRadius(HIGHLIGHTED_ICON_RADIUS);
      selectedMarker.options.isHighlighted = true;
      selectedMarker.redraw();
      displaySelectedMarker();
      map.setView(selectedMarker.getLatLng());
    }
  };

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

    const requirements = mapLocation.requirements?.map((requirementId) => {
      const mapLocation = getMapLocationById(requirementId);
      return createElement("a", {
        href: `/locations/${requirementId}`,
        innerText: mapLocation?.title,
        onclick: (event) => {
          event.preventDefault();
          panToMarker(requirementId);
        },
      });
    });

    const items = mapLocation.items?.map((itemId) => {
      const mapLocation = getMapLocationById(itemId);
      return createElement("a", {
        href: `/locations/${itemId}`,
        innerText: mapLocation?.title,
        onclick: (event) => {
          event.preventDefault();
          panToMarker(itemId);
        },
      });
    });

    const tooltipContent = createElement("div", {
      className: "tooltip-content",
      innerHTML: `
      <p class="bold">${mapLocation.title ?? ""}</p>
      <p class="italic">${isCustom ? t("Custom Node") : type.title}</p>
      <p>${mapLocation.description || ""}</p>
      ${
        mapLocation.isUnderground
          ? `<p class="info italic">${t("Underground")}</p>`
          : ""
      }
      `,
    });

    if (mapLocation.wiki) {
      tooltipContent.append(
        createElement("a", {
          href: mapLocation.wiki,
          className: "external-link",
          innerText: t("Wiki"),
          target: "_blank",
        })
      );
    }

    if (requirements) {
      tooltipContent.append(
        createElement("p", { className: "bold", innerText: t("Requirements") }),
        ...requirements
      );
    }
    if (items) {
      tooltipContent.append(
        createElement("p", { className: "bold", innerText: t("Items") }),
        ...items
      );
    }

    const hideElement = createElement("button", {
      className: "tooltip-button",
      innerText: isDiscovered
        ? t("Set as undiscovered")
        : t("Set as discoverd"),
      onclick: (event) => {
        event.stopPropagation();
        let discoveredNodeIDs = getDiscoveredNodeIDs();
        if (isDiscovered) {
          discoveredNodeIDs = discoveredNodeIDs.filter(
            (id) => id !== mapLocation.id
          );
        } else {
          discoveredNodeIDs.push(mapLocation.id);
        }
        setDiscoveredNodeIDs(discoveredNodeIDs);
        hideElement.innerText = selectedMarker!.options.isDiscovered
          ? t("Set as discoverd")
          : t("Set as undiscovered");
        selectedMarker!.options.isDiscovered =
          !selectedMarker!.options.isDiscovered;
        selectedMarker?.redraw();
      },
    });
    const actionsContainer = createElement("div", {}, [hideElement]);
    if (isCustom) {
      const editElement = createElement("button", {
        className: "tooltip-button",
        innerText: t("Edit Custom Node"),
        onclick: openEditCustomNodeTooltip,
      });
      actionsContainer.append(editElement);
    }

    const tooltipContainer = createElement(
      "div",
      {
        className: "tooltip-container",
      },
      [tooltipContent, actionsContainer]
    );
    if (mapLocation.screenshot) {
      const screenshot = createElement("img", {
        className: "screenshot-preview",
        src: `/screenshots/${mapLocation.screenshot}`,
        alt: "",
        loading: "lazy",
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
                loading: "lazy",
              }),
            ]
          );
          document.body.appendChild(container);
        },
      });
      tooltipContainer.prepend(screenshot);
    }

    const marker = new CanvasMarker([mapLocation.y, mapLocation.x], {
      id: mapLocation.id,
      type: type.value,
      path: type.icon,
      color: mapLocation.color || filter.color || "#ffffff",
      radius: isHighlighted ? HIGHLIGHTED_ICON_RADIUS : ICON_RADIUS,
      isDiscovered,
      isUnderground: mapLocation.isUnderground,
      pmIgnore: true,
      isHighlighted,
      tooltipContent: tooltipContainer,
    });

    marker.bindTooltip(tooltipContainer, {
      direction: "top",
      offset: [0, -15],
    });

    marker.bindPopup(tooltipContainer, {
      offset: [0, -10],
    });

    function openEditCustomNodeTooltip(event: MouseEvent) {
      event.stopPropagation();
      marker.options.pmIgnore = false;
      leaflet.PM.reInitLayer(marker);

      const form = createElement("form");
      const container = createElement("div", {
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
        className: "tooltip-button",
        value: t("Save"),
      });
      const remove = createElement("button", {
        type: "button",
        className: "tooltip-button",
        innerText: t("Delete"),
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
        className: "tooltip-button",
        innerText: t("Cancel"),
        onclick: (event) => {
          event.stopPropagation();
          marker.pm.disableLayerDrag();
          marker.options.pmIgnore = true;
          tooltipContainer.replaceChildren(tooltipContent, actionsContainer);
          leaflet.PM.reInitLayer(marker);
        },
      });
      const actions = createElement(
        "div",
        {
          className: "actions",
        },
        [save, remove, cancel]
      );
      const note = createElement("span", {
        innerText: t("Drag icon to move the node position"),
        className: "description",
      });

      container.append(note);
      form.append(container, actions);

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
        tooltipContainer.replaceChildren(tooltipContent, actionsContainer);
        refresh();
      };
      tooltipContainer.replaceChildren(form);
      marker.pm.enableLayerDrag();
    }

    if (isHighlighted) {
      marker.bindPopup(tooltipContainer);
      marker.openPopup();
    }

    marker.on("click", () => {
      // if (marker.pm?.layerDragEnabled()) {
      //   return;
      // }
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
    if (!confirm(t("Are you sure you want to reset all discovered nodes?"))) {
      return;
    }
    setDiscoveredNodeIDs([]);
    refresh();
  };

  return {
    refresh,
    panToMarker,
  };
}
