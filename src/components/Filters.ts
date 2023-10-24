import { createElement } from "../lib/elements";
import {
  getDeselectedFilters,
  getFilters,
  setDeselectedFilters,
} from "../lib/nodes";

export default function Filters({ onChange }: { onChange: () => void }) {
    let deselectedFilters = getDeselectedFilters();
    const container = document.querySelector<HTMLElement>("#filters")!;
    const filters = getFilters();
    const items: HTMLElement[] = [];

    filters.forEach((filter) => {
        const span = createElement("span", {
            innerText: filter.title,
            style: `--color: ${filter.color}`,
        });

        const checkbox = createElement("input", {
            type: "checkbox",
            name: filter.value,
            checked: !deselectedFilters.includes(filter.value),
            onchange: () => {
                if (checkbox.checked) {
                    deselectedFilters = deselectedFilters.filter(
                        (item) => item !== filter.value
                    );
                } else {
                    deselectedFilters.push(filter.value);
                }
                setDeselectedFilters(deselectedFilters);
                onChange();
            },
        });

        const label = createElement("label", {
            className: "type-label",
            title: filter.title,
            style: "width: calc(50% - 10px); display: inline-block; padding: 2px;",
        }, [checkbox, span]);

        items.push(label);
    });

    const column1 = createElement("div", {
        style: "width: 100%; display: inline-block; vertical-align: top;",
    });

    items.forEach((item) => {
        column1.appendChild(item);
    });

    container.innerHTML = "";
    container.append(column1);
}
