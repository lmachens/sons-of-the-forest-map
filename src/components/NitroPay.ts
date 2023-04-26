import { createElement } from "../lib/elements";

export default function NitroPay() {
  const container = document.querySelector("#sotf-video")!;

  const script = createElement("script", {
    src: "https://s.nitropay.com/ads-1487.js",
    async: true,
  });
  script.setAttribute("data-cfasync", "false");

  const timeoutId = setTimeout(() => {
    container.classList.add("show-fallback");
  }, 1000);

  script.onload = () => {
    clearTimeout(timeoutId);
    container.classList.remove("show-fallback");
    // @ts-ignore
    window["nitroAds"].createAd("sotf-video", {
      format: "video-nc",
    });
  };

  script.onerror = () => {
    clearTimeout(timeoutId);
    container.classList.add("show-fallback");
  };

  document.body.append(script);
}
