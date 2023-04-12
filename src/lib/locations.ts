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
};

export function getMapLocations(): MapLocation[] {
  return mapLocations;
}

export function getMapLocationById(id: number): MapLocation | null {
  return mapLocations.find((mapLocation) => mapLocation.id === id) ?? null;
}
