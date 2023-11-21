import { createElement } from "../lib/elements";
import { useSettingsStore } from "../lib/stores/settings";

export default function Compass() {
  const main = document.querySelector<HTMLElement>(".main")!;
  const compassNeedle = createElement("div", {
    className: "compass-needle",
  });
  const compass = createElement(
    "div",
    {
      className: "compass hidden",
    },
    [compassNeedle]
  );
  main.append(compass);

  const settings = useSettingsStore.getState();
  const compassToggle =
    document.querySelector<HTMLInputElement>("#compass_toggle")!;
  compassToggle.checked = settings.showCompass;
  if (compassToggle.checked) {
    compass.classList.remove("hidden");
  }
  compassToggle.onchange = () => {
    if (compassToggle.checked) {
      settings.setValue("showCompass", true);
      compass.classList.remove("hidden");
    } else {
      settings.setValue("showCompass", false);
      compass.classList.add("hidden");
    }
  };

  return {
    updateRotation: (rotation: number) => {
      compassNeedle.style.backgroundPositionX = `calc(50% + ${rotationToX(
        rotation
      )}px)`;
    },
  };
}

const STEP_90 = 25 * 6;
const STEP = STEP_90 / 90;
const COMPASS_NEEDLE_EAST = 135;

function rotationToX(rotation: number) {
  const x = COMPASS_NEEDLE_EAST + rotation * STEP;
  return x.toFixed(0);
}
