import { createElement } from "../lib/elements";
import { locale as currentLocale, locales } from "../lib/i18n";

export default function LocaleSelector() {
  const container = document.querySelector<HTMLDivElement>(".locale-selector")!;
  const options = locales.map((locale) =>
    createElement("option", {
      value: locale.code,
      innerText: locale.name,
      selected: locale.code === currentLocale,
    })
  );
  const localeSelector = createElement(
    "select",
    {
      onchange: () => {
        const newLocale = localeSelector.value;
        localStorage.setItem("locale", newLocale);
        window.location.reload();
      },
    },
    options
  );

  container.append(localeSelector);
}
