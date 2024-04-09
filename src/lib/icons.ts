import { createElement } from "./elements";
import { NodeType } from "./nodes";

export const PIN_PATH = `M235 6.22h36c9.07-.11 25.96 3.51 35 5.9C362.83 27.1 408.06 67.17 431.28 121c7.1 16.45 10.22 29.48 13.15 47 .91 5.37 1.5 6.15 1.57 12 .32 27.44.81 41.91-6.74 69-6.96 24.95-18.83 44.22-32.2 66-16 26.08-33.2 51.35-51.33 76-21.33 29.01-43.42 57.27-67.56 84-6.45 7.14-12.09 13.2-19.45 19.47-2.97 2.53-7.77 6.54-11.72 7.04-4.31.54-8.8-3.03-12-5.53-7.36-5.74-15.29-14.24-22-20.98-22.88-22.99-64.6-76.47-83.34-104-28.72-42.17-57.65-81.3-69.43-132-5.13-22.13-4.49-36.69-4.23-59 .09-7.4 3.63-24.41 5.53-32C83.92 98.42 118.18 53.92 163 29.31c25.26-13.87 44.1-18.32 72-23.09Z`;

function getIconSVG(type: NodeType, color = "currentColor") {
  if (type.src) {
    return `<img src="${type.src}" alt="${type.icon}" height="100%" width="100%" style="filter: invert(1)" />`;
  }
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><defs><filter id="shadow-1" height="300%" width="300%" x="-100%" y="-100%"><feFlood flood-color="rgba(0, 0, 0, 1)" result="flood"></feFlood><feComposite in="flood" in2="SourceGraphic" operator="atop" result="composite"></feComposite><feGaussianBlur in="composite" stdDeviation="25" result="blur"></feGaussianBlur><feOffset dx="2" dy="2" result="offset"></feOffset><feComposite in="SourceGraphic" in2="offset" operator="over"></feComposite></filter></defs><path fill="${color}" stroke="#000" d="${PIN_PATH}"/><path d="${type.icon}" fill="#fff" fill-opacity="1" stroke="#000000" stroke-opacity="1" stroke-width="1%" filter="url(#shadow-1)"></path></svg>`;
}

export function getIconElement(type: NodeType) {
  return createElement("div", {
    className: `filter-icon node-${type.value}`,
    innerHTML: getIconSVG(type),
  });
}
