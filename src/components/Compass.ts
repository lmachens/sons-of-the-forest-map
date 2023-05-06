import { createElement } from "../lib/elements";

export default function Compass() {
  const main = document.querySelector<HTMLElement>(".main")!;
  const compassNeedle = createElement("div", {
    className: "compass-needle",
  });
  const compass = createElement(
    "div",
    {
      className: "compass",
    },
    [compassNeedle]
  );
  main.append(compass);

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
  console.log(x, rotation, rotation * STEP);
  return x.toFixed(0);
}
