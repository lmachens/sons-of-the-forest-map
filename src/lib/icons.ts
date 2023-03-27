import leaflet from "leaflet";
import { createElement } from "./elements";
import { NodeType } from "./nodes";

export function getIconSVG(type: NodeType, color = "currentColor") {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" ><defs><filter id="shadow-1" height="300%" width="300%" x="-100%" y="-100%"><feFlood flood-color="rgba(0, 0, 0, 1)" result="flood"></feFlood><feComposite in="flood" in2="SourceGraphic" operator="atop" result="composite"></feComposite><feGaussianBlur in="composite" stdDeviation="25" result="blur"></feGaussianBlur><feOffset dx="2" dy="2" result="offset"></feOffset><feComposite in="SourceGraphic" in2="offset" operator="over"></feComposite></filter></defs><path d="${type.icon}" fill="${color}" fill-opacity="1" stroke="#000000" stroke-opacity="1" stroke-width="1%" filter="url(#shadow-1)"></path></svg>`;
}

export function getIconElement(type: NodeType) {
  return createElement("div", {
    className: `filter-icon node-icon node-${type.value}`,
    innerHTML: getIconSVG(type),
  });
}

export function getDivIcon(
  type: NodeType,
  isCustom: boolean,
  color?: string,
  className?: string
) {
  return leaflet.divIcon({
    html: getIconSVG(type, color),
    className: `node-icon node-${type.value} ${isCustom ? "node-custom" : ""} ${
      className || ""
    }`,
    iconSize: [32, 32],
    tooltipAnchor: [0, -20],
  });
}
