import fs from "node:fs";
import path from "node:path";
import url from "node:url";
import mapLocations from "./src/lib/locations.json" assert { type: "json" };

const __dirname = path.dirname(url.fileURLToPath(import.meta.url));
const toAbsolute = (p) => path.resolve(__dirname, p);
const template = fs.readFileSync(toAbsolute("out/index.html"), "utf-8");

const indexMeta = `<title>Sons Of The Forest Map</title>\n    <meta name="description" content="Stay on top of your game with real-time position tracking, nodes of weapons & points of interest, and overlay mode for seamless progress tracking." />`;
const indexHTML = template.replace(`<!--PRELOAD_TEMPLATE-->`, indexMeta);
fs.writeFileSync(toAbsolute(`out/index.html`), indexHTML);

// pre-render each route...
for (const mapLocation of mapLocations) {
  let meta = `<title>${mapLocation.title} - Sons Of The Forest Map</title>`;
  if (mapLocation.description) {
    meta += `\n    <meta name="description" content="${mapLocation.description}">`;
  }
  const html = template.replace(`<!--PRELOAD_TEMPLATE-->`, meta);

  fs.mkdirSync(toAbsolute(`out/locations/${mapLocation.id}`), {
    recursive: true,
  });
  fs.writeFileSync(
    toAbsolute(`out/locations/${mapLocation.id}/index.html`),
    html
  );
  console.log("pre-rendered:", mapLocation.title);
}
