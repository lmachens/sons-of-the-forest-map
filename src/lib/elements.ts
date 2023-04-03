export function createElement<K extends keyof HTMLElementTagNameMap>(
  tagName: K,
  props: Partial<Omit<HTMLElementTagNameMap[K], "style">> & {
    style?: string;
  } = {},
  children?: (string | Node)[]
) {
  const element = document.createElement(tagName);
  Object.assign(element, props);
  if (children) {
    element.append(...children);
  }
  return element;
}
