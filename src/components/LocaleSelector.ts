import { createElement } from "../lib/elements";
import { locale as currentLocale, locales } from "../lib/i18n";

export default function LocaleSelector() {
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
      className: "locale-selector",
      onchange: () => {
        const newLocale = localeSelector.value;
        localStorage.setItem("locale", newLocale);
        window.location.reload();
      },
    },
    options
  );

  document.body.append(localeSelector);
}
