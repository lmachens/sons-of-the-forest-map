import { GoogleTranslator } from "@translate-tools/core/translators/GoogleTranslator/index.js";
import { readFileSync, readdirSync, statSync, writeFileSync } from "fs";
import { convert } from "html-to-text";
import path from "node:path";
import { fileURLToPath } from "url";
import locations from "../src/lib/locations.json" assert { type: "json" };

const locales = ["de", "pl"];

const __dirname = fileURLToPath(new URL(".", import.meta.url));
const toAbsolute = (p) => path.resolve(__dirname, p);

const findStaticKeys = (filePath) => {
  const template = readFileSync(filePath, "utf-8");

  const text = convert(template, {
    wordwrap: null,
    baseElements: {
      selectors: ["[data-i18n]"],
    },
    selectors: [
      {
        selector: "*",
        format: "block",
      },
      {
        selector: "h2",
        format: "block",
      },
      {
        selector: "h3",
        format: "block",
      },
      {
        selector: "p",
        format: "block",
      },
      {
        selector: "a",
        format: "block",
      },
    ],
  });

  return text.split("\n").filter(Boolean);
};

const findDynamicKeys = function (dirPath, dynamicKeys = []) {
  const files = readdirSync(dirPath);

  files.forEach((file) => {
    if (statSync(dirPath + "/" + file).isDirectory()) {
      dynamicKeys = findDynamicKeys(dirPath + "/" + file, dynamicKeys);
    } else if (file.endsWith(".ts")) {
      const content = readFileSync(path.join(dirPath, "/", file), "utf-8");
      const matches = content.match(/\Wt\([.\n\s]*"(.+?)"[.\n\s]*\)/gm);
      if (matches) {
        matches.forEach((match) => {
          match = match.replace(/\Wt\([.\n\s]*"(.+?)"[.\n\s]*\)/gm, "$1");
          dynamicKeys.push(match);
        });
      }
    }
  });

  return dynamicKeys;
};

const appKeys = findStaticKeys(toAbsolute("../app.html"));
const webKeys = findStaticKeys(toAbsolute("../index.html"));
const dynamicKeys = findDynamicKeys(toAbsolute("../src/"));

const keys = [...appKeys, ...webKeys, ...dynamicKeys];

locations.forEach((location) => {
  if (location.title) {
    keys.push(location.title);
  }
  if (location.description) {
    keys.push(location.description);
  }
});

keys.filter((key, index) => keys.indexOf(key) === index);

const translator = new GoogleTranslator({
  headers: {
    "User-Agent":
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/94.0.4606.81 Safari/537.36",
  },
});

locales.forEach(async (locale) => {
  let dictionary;
  try {
    const fileContent = readFileSync(
      toAbsolute(`../src/locales/${locale}.json`),
      "utf-8"
    );
    dictionary = JSON.parse(fileContent);
  } catch (error) {
    dictionary = {};
  }
  Object.keys(dictionary).forEach((key) => {
    if (!keys.includes(key)) {
      delete dictionary[key];
    }
  });

  for (const key of keys) {
    if (!dictionary[key]) {
      dictionary[key] = await translator.translate(key, "en", locale);
    }
  }

  writeFileSync(
    toAbsolute(`../src/locales/${locale}.json`),
    JSON.stringify(dictionary, null, 2)
  );
});
