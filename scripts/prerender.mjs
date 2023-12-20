import async from "async";
import fs from "node:fs";
import path from "node:path";
import puppeteer from "puppeteer";
import { fileURLToPath } from "url";
import { createServer } from "vite";
import mapLocations from "../src/lib/locations.json" assert { type: "json" };

const __dirname = fileURLToPath(new URL(".", import.meta.url));
const toAbsolute = (p) => path.resolve(__dirname, p);

const server = await createServer({
  // any valid user config options, plus `mode` and `configFile`
  configFile: "vite-web.config.ts",
  root: toAbsolute("../"),
  mode: "production",
  server: {
    port: 1337,
  },
});
await server.listen();

const browser = await puppeteer.launch({ headless: "new" });
const page = await browser.newPage();
await page.setViewport({ width: 1200, height: 628 });

const template = fs.readFileSync(toAbsolute("../index.html"), "utf-8");

const indexMeta = generateMeta({
  title: "Sons Of The Forest Map",
  description:
    "Take your gaming to new heights with accurate tracking, richly detailed waypoints, and a sleek overlay for real-time progress.",
  url: "https://sotf.th.gl",
  image: "https://sotf.th.gl/index.webp",
});
const indexHTML = template.replace(`<!--PRELOAD_TEMPLATE-->`, indexMeta);
fs.writeFileSync(toAbsolute(`../out/index.html`), indexHTML);
await page.emulateMediaType("print");
await page.goto(`http://localhost:1337`, {
  waitUntil: "networkidle2",
});
await page.emulateMediaType("print");
await page.screenshot({ path: "./out/index.webp", fullPage: true });
await page.close();

// pre-render each route...
await async.eachLimit(mapLocations, 2, async (mapLocation) => {
  const locationPage = await browser.newPage();
  await locationPage.setViewport({ width: 1200, height: 628 });
  await locationPage.emulateMediaType("print");

  let meta = generateMeta({
    title: `${mapLocation.title} - Sons Of The Forest Map`,
    description:
      mapLocation.description ||
      "Take your gaming to new heights with accurate tracking, richly detailed waypoints, and a sleek overlay for real-time progress.",
    url: `https://sotf.th.gl/locations/${mapLocation.id}`,
    image: `https://sotf.th.gl/locations/${mapLocation.id}.webp`,
  });
  const html = template.replace(`<!--PRELOAD_TEMPLATE-->`, meta);

  fs.mkdirSync(toAbsolute(`../out/locations/${mapLocation.id}`), {
    recursive: true,
  });
  fs.writeFileSync(
    toAbsolute(`../out/locations/${mapLocation.id}/index.html`),
    html
  );
  await locationPage.goto(`http://localhost:1337/locations/${mapLocation.id}`, {
    waitUntil: "networkidle2",
  });
  await locationPage
    .screenshot({
      path: `./out/locations/${mapLocation.id}.webp`,
      fullPage: true,
    })
    .catch(() => {
      console.warn("failed to screenshot:", mapLocation.title);
    });

  await locationPage.close();
  console.log("pre-rendered:", mapLocation.title);
});

await browser.close();
await server.close();

function generateMeta({ title, description, image, url }) {
  return `
    <!-- Primary Meta Tags -->
    <title>${title}</title>
    <meta name="title" content="${title}">
    <meta name="description" content="${description}">

    <!-- Open Graph / Facebook -->
    <meta property="og:type" content="website">
    <meta property="og:url" content="${url}">
    <meta property="og:title" content="${title}">
    <meta property="og:description" content="${description}">
    <meta property="og:image" content="${image}">

    <!-- Twitter -->
    <meta property="twitter:card" content="summary_large_image">
    <meta property="twitter:url" content="${url}">
    <meta property="twitter:title" content="${title}">
    <meta property="twitter:description" content="${description}">
    <meta property="twitter:image" content="${image}">

    <!-- Canonical -->
    <link rel="canonical" href="${url}" />
`;
}

function generateSitemap() {
  let sitemap = `<?xml version="1.0" encoding="UTF-8"?>`;
  sitemap += `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`;

  sitemap += `<url><loc>https://sotf.th.gl/</loc></url>`;
  for (const mapLocation of mapLocations) {
    sitemap += `<url><loc>https://sotf.th.gl/locations/${mapLocation.id}</loc></url>`;
  }

  sitemap += `</urlset>`;
  fs.writeFileSync(toAbsolute(`../out/sitemap.xml`), sitemap);
}
generateSitemap();
