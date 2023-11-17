import { createElement } from "../lib/elements";

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

  const compassToggle = document.querySelector<HTMLInputElement>("#compass_toggle")!;
  compassToggle.checked = localStorage.getItem("hide_compass") !== "true";
  if (compassToggle.checked) {
    compass.classList.remove("hidden");
  }

  compassToggle.onchange = () => {
    if (compassToggle.checked) {
      localStorage.removeItem("hide_compass");
      compass.classList.remove("hidden");
    } else {
      localStorage.setItem("hide_compass", "true");
      compass.classList.add("hidden");
    }
  }

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
