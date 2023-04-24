import { createElement } from "../lib/elements";
import { t } from "../lib/i18n";
import { getMapLocations } from "../lib/locations";
import { getTypes } from "../lib/nodes";

export default function Search({
  panToMarker,
}: {
  panToMarker: (id: number) => void;
}) {
  const searchInput =
    document.querySelector<HTMLInputElement>(".search > input")!;
  const searchResults =
    document.querySelector<HTMLDivElement>(".search-results")!;

  const locations = getMapLocations();
  const types = getTypes();

  searchInput.onfocus = () => {
    if (searchInput.value.trim().length > 0) {
      searchResults.classList.add("visible");
    }
  };
  document.body.onclick = (event) => {
    if (
      event.target !== searchInput &&
      !searchResults.contains(event.target as Node)
    ) {
      searchResults.classList.remove("visible");
    }
  };

  searchInput.oninput = () => {
    const search = searchInput.value.trim();
    if (search.length === 0) {
      searchResults.classList.remove("visible");
      return;
    }
    searchResults.classList.add("visible");

    const regExp = new RegExp(search, "i");

    const result = locations
      .filter((location) => location.title.match(regExp))
      .map((location) => {
        const type =
          types.find((type) => type.value === location.type) || types[0];

        return createElement(
          "a",
          {
            className: "search-result",
            href: `/locations/${location.id}`,
            onclick: (event) => {
              event.preventDefault();
              panToMarker(location.id);
              searchResults.classList.remove("visible");
              searchInput.value = "";
            },
          },
          [
            createElement("span", {
              className: "bold",
              innerText: location.title,
            }),
            createElement("span", {
              className: "italic",
              innerText: type.title,
            }),
          ]
        );
      })
      .slice(0, 10);
    searchResults.innerHTML = "";
    if (result.length === 0) {
      searchResults.append(
        createElement("div", {
          className: "search-result",
          innerText: t("No results"),
        })
      );
      return;
    }
    searchResults.append(...result);
  };
}
