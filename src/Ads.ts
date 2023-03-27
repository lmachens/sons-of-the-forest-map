import type { OwAd } from "@overwolf/types/owads";
import { createElement } from "./lib/elements";

declare global {
  interface Window {
    OwAd?: typeof OwAd;
  }
}

export default function Ads(container: HTMLDivElement) {
  function onOwAdReady() {
    if (typeof window.OwAd === "undefined") {
      return;
    }

    new window.OwAd(container, {
      size: { width: 400, height: 300 },
    });
  }
  const script = createElement("script", {
    src: "https://content.overwolf.com/libs/ads/latest/owads.min.js",
    async: true,
    onload: onOwAdReady,
  });
  document.body.append(script);
}
