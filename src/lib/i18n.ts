export const locales = [
  {
    code: "de",
    name: "Deutsch",
  },
  {
    code: "en",
    name: "English",
  },
  {
    code: "pl",
    name: "Polski",
  },
];

export let locale = localStorage.getItem("locale") || "en";
export let dictionary: Record<string, string> = {};

export async function setLocale(newLocale: string) {
  locale = newLocale;
  await loadDictionary();
}

export async function loadDictionary() {
  try {
    dictionary = await import(`../locales/${locale}.json`).then(
      (m) => m.default
    );
  } catch (err) {
    dictionary = {};
  }
}

export function translateHTML() {
  const elements = document.querySelectorAll("[data-i18n]");
  elements.forEach((element) => {
    if (!element.textContent) {
      return;
    }
    const key = element.textContent
      .split("\n")
      .map((line) => line.trim())
      .filter(Boolean)
      .join(" ");
    if (dictionary[key]) {
      element.textContent = dictionary[key];
    }
  });
}

export function t(key: string) {
  return dictionary[key] || key;
}
