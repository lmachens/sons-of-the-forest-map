import {
  filters,
  getDeselectedFilters,
  setDeselectedFilters,
} from "./lib/nodes";

export default function Filters({ onChange }: { onChange: () => void }) {
  let deselectedFilters = getDeselectedFilters();
  const container = document.querySelector<HTMLElement>("#filters")!;

  const items = filters.map((filter) => {
    const label = document.createElement("label");
    label.className = "type-label";
    label.title = filter.title;
    const span = document.createElement("span");
    span.innerText = filter.title;
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.name = filter.value;
    checkbox.checked = !deselectedFilters.includes(filter.value);
    checkbox.onchange = () => {
      if (checkbox.checked) {
        deselectedFilters = deselectedFilters.filter(
          (item) => item !== filter.value
        );
      } else {
        deselectedFilters.push(filter.value);
      }
      setDeselectedFilters(deselectedFilters);
      onChange();
    };
    label.append(checkbox, span);
    return label;
  });
  container.innerHTML = "";
  container.append(...items);
}
