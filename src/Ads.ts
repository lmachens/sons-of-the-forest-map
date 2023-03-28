import type { OwAd } from "@overwolf/types/owads";
import { createElement } from "./lib/elements";

declare global {
  interface Window {
    OwAd?: typeof OwAd;
  }
}

export default function Ads(container: HTMLDivElement) {
  function setIsPLaying(isPlaying: boolean) {
    container.style.pointerEvents = isPlaying ? "all" : "none";
  }
  function onOwAdReady() {
    if (typeof window.OwAd === "undefined") {
      return;
    }

    const ad = new window.OwAd(container, {
      size: { width: 400, height: 300 },
    });

    ad.addEventListener("display_ad_loaded", () => {
      setIsPLaying(true);
    });

    ad.addEventListener("impression", () => {
      setIsPLaying(true);
    });

    ad.addEventListener("complete", () => {
      setIsPLaying(false);
    });
    ad.addEventListener("error", () => {
      setIsPLaying(false);
    });
  }
  setIsPLaying(false);
  const script = createElement("script", {
    src: "https://content.overwolf.com/libs/ads/latest/owads.min.js",
    async: true,
    onload: onOwAdReady,
  });
  document.body.append(script);
}
