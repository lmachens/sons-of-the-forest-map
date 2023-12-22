import { promisifyOverwolf } from "./wrapper";

export function updateVersion() {
  const version = document.querySelector<HTMLElement>(".version")!;
  overwolf.extensions.current.getManifest((manifest) => {
    version.innerText += ` v${manifest.meta.version}`;
    promisifyOverwolf(overwolf.settings.getExtensionSettings)()
      .then((extensionSettings) => {
        version.innerText += `#${extensionSettings.settings.channel || "live"}`;
      })
      .catch(console.error);
  });
}
