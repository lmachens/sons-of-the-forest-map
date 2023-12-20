import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import manifest from "../manifest.json" assert { type: "json" };

const __dirname = fileURLToPath(new URL(".", import.meta.url));
const toAbsolute = (p) => path.resolve(__dirname, p);

manifest.meta.name = manifest.meta.name.replace("-DEV", "");
delete manifest.data.windows.controller.debug_url;
manifest.data.windows.controller.block_top_window_navigation = true;
delete manifest.data.windows.desktop.debug_url;
manifest.data.windows.desktop.block_top_window_navigation = true;
delete manifest.data.windows.overlay.debug_url;
manifest.data.windows.overlay.block_top_window_navigation = true;

await fs.writeFile(
  toAbsolute("../dist/manifest.json"),
  JSON.stringify(manifest)
);
await fs.cp(toAbsolute("../icons/"), toAbsolute("../dist/icons/"), {
  recursive: true,
});
await fs.cp(toAbsolute("../plugins/"), toAbsolute("../dist/plugins/"), {
  recursive: true,
});
