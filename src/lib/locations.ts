import { t } from "./i18n";
import mapLocations from "./locations.json" assert { type: "json" };

export type MapLocation = {
  id: number;
  title: string;
  description?: string;
  type: string;
  x: number;
  y: number;
  color?: string;
  isUnderground?: boolean;
  requirements?: number[];
  items?: number[];
  screenshot?: string;
  warning?: string;
  tp?: string;
  tg?: string;
  itemid?: string;
  wiki?: string;
};

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
