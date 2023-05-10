import type { LatLngBoundsExpression } from "leaflet";

export const GAME_CLASS_ID = 22638; // SONS_OF_THE_FOREST_CLASS_ID
export const WINDOWS = {
  CONTROLLER: "controller",
  DESKTOP: "desktop",
  OVERLAY: "overlay",
};
export const BOUNDS: LatLngBoundsExpression = [
  [-2000, -2000],
  [2000, 2000],
];
export const MAX_BOUNDS: LatLngBoundsExpression = [
  [-3000, -3000],
  [3000, 3000],
];

export const INTERESTED_IN_FEATURES = ["match_info", "location"];
