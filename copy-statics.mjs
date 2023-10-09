import fs from "node:fs/promises";

import manifest from "./manifest.json" assert { type: "json" };

manifest.meta.name = manifest.meta.name.replace("-DEV", "");
delete manifest.data.windows.controller.debug_url;
manifest.data.windows.controller.block_top_window_navigation = true;
delete manifest.data.windows.desktop.debug_url;
manifest.data.windows.desktop.block_top_window_navigation = true;
delete manifest.data.windows.overlay.debug_url;
manifest.data.windows.overlay.block_top_window_navigation = true;

await fs.writeFile("./dist/manifest.json", JSON.stringify(manifest));
await fs.cp("./icons/", "./dist/icons/", { recursive: true });
