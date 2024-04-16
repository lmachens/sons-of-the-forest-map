import { t } from "./i18n";
import _mapLocations from "./locations.json" assert { type: "json" };
export type MapLocation = {
  id: number;
  title: string;
  description?: string;
  type: string;
  x: number;
  y: number;
  color?: string;
  isUnderground?: boolean;
  inBunker?: boolean;
  inCave?: boolean;
  requirements?: number[];
  items?: number[];
  screenshot?: string;
  warning?: string;
  tp?: string;
  tg?: string;
  itemid?: string;
  wiki?: string;
};

const mapLocations = _mapLocations as MapLocation[];
export function getMapLocations(): MapLocation[] {
  return mapLocations.map((mapLocation) => ({
    ...mapLocation,
    title: t(mapLocation.title ?? ""),
    description: mapLocation.description && t(mapLocation.description),
    warning: mapLocation.warning && t(mapLocation.warning),
  }));
}

export function getMapLocationById(id: number): MapLocation | null {
  const mapLocation =
    mapLocations.find((mapLocation) => mapLocation.id === id) ?? null;
  if (mapLocation) {
    return {
      ...mapLocation,
      title: t(mapLocation.title ?? ""),
      description: mapLocation.description && t(mapLocation.description),
      warning: mapLocation.warning && t(mapLocation.warning),
    };
  }
  return null;
}

export function getClosestLocation(x: number, y: number): MapLocation | null {
  return mapLocations.reduce(
    (closest, mapLocation) => {
      const distance = Math.sqrt(
        Math.pow(mapLocation.x - x, 2) + Math.pow(mapLocation.y - y, 2)
      );
      if (distance < closest.distance) {
        return { mapLocation, distance };
      }
      return closest;
    },
    { mapLocation: null, distance: Infinity } as {
      mapLocation: MapLocation | null;
      distance: number;
    }
  ).mapLocation;
}
