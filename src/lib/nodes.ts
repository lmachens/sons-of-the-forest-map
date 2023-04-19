import icons from "./icons.json";
import { MapLocation } from "./locations";
import { getItem, setItem } from "./storage";

export type NodeType = {
  value: string;
  title: string;
  icon: string;
  filter?: string;
};

export const types: NodeType[] = [
  {
    value: "unknown",
    title: "Unknown",
    icon: icons.unknown,
  },
  {
    value: "spawnPoint",
    title: "Spawn Point",
    icon: icons.teleport,
    filter: "poi",
  },
  {
    value: "modernAxe",
    title: "Tool",
    icon: icons["fire-axe"],
    filter: "tools",
  },
  {
    value: "flashlight",
    title: "Tool",
    icon: icons.flashlight,
    filter: "tools",
  },
  {
    value: "machete",
    title: "Weapon",
    icon: icons.machete,
    filter: "weapons",
  },
  {
    value: "stunBaton",
    title: "Weapon",
    icon: icons["telescopic-baton"],
    filter: "weapons",
  },
  {
    value: "pistol",
    title: "Gun",
    icon: icons["pistol-gun"],
    filter: "weapons",
  },
  {
    value: "stunGun",
    title: "Weapon",
    icon: icons["stun-gun"],
    filter: "weapons",
  },
  {
    value: "rebreather",
    title: "Player Gear",
    icon: icons.rebreather,
    filter: "gear",
  },
  {
    value: "cross",
    title: "Weapon",
    icon: icons["hasty-grave"],
    filter: "weapons",
  },
  {
    value: "ropeGun",
    title: "Tool",
    icon: icons["rope-dart"],
    filter: "tools",
  },
  {
    value: "slingshot",
    title: "Tool",
    icon: icons.slingshot,
    filter: "tools",
  },
  {
    value: "shovel",
    title: "Tool",
    icon: icons.spade,
    filter: "tools",
  },
  {
    value: "shotgun",
    title: "Rifle",
    icon: icons["sawed-off-shotgun"],
    filter: "weapons",
  },
  {
    value: "keycard",
    title: "Keycard",
    icon: icons.keycard,
    filter: "tools",
  },
  {
    value: "crossbow",
    title: "Weapon",
    icon: icons.crossbow,
    filter: "weapons",
  },
  {
    value: "fireAxe",
    title: "Tool",
    icon: icons["fire-axe"],
    filter: "tools",
  },
  {
    value: "guitar",
    title: "Weapon",
    icon: icons.guitar,
    filter: "weapons",
  },
  {
    value: "chainsaw",
    title: "Tool",
    icon: icons.chainsaw,
    filter: "tools",
  },
  {
    value: "compoundBow",
    title: "Weapon",
    icon: icons["high-shot"],
    filter: "weapons",
  },
  {
    value: "revolver",
    title: "Gun",
    icon: icons.revolver,
    filter: "weapons",
  },
  {
    value: "katana",
    title: "Weapon",
    icon: icons.katana,
    filter: "weapons",
  },
  {
    value: "goldenArmor",
    title: "Player Gear",
    icon: icons["abdominal-armor"],
    filter: "gear",
  },
  {
    value: "binoculars",
    title: "Tool",
    icon: icons.binoculars,
    filter: "tools",
  },
  {
    value: "finalBunker",
    title: "Final Bunker",
    icon: icons["final-bunker"],
    filter: "poi",
  },
  {
    value: "hatch",
    title: "Floor Hatch",
    icon: icons.hatch,
    filter: "hatch",
  },
  {
    value: "3Dprinter",
    title: "3D Printer",
    icon: icons.pc,
    filter: "3d",
  },
  {
    value: "cave",
    title: "Cave",
    icon: icons.cave,
    filter: "cave",
  },
  {
    value: "camp",
    title: "Point of Interest",
    icon: icons.camp,
    filter: "poi",
  },
  {
    value: "village",
    title: "Point of Interest",
    icon: icons.hut,
    filter: "poi",
  },
  {
    value: "cloth",
    title: "Cloth",
    icon: icons.hanger,
    filter: "clothes",
  },
  {
    value: "compass",
    title: "Compass",
    icon: icons.compass,
    filter: "tools",
  },
  {
    value: "book",
    title: "Book",
    icon: icons.book,
    filter: "docs",
  },
  {
    value: "document",
    title: "Document",
    icon: icons.document,
    filter: "docs",
  },
  {
    value: "hang-glider",
    title: "Aircarft",
    icon: icons["hang-glider"],
    filter: "vehicle",
  },
  {
    value: "putter",
    title: "Weapon",
    icon: icons.putter,
    filter: "weapons",
  },
  {
    value: "crate",
    title: "Crate",
    icon: icons.crate,
    filter: "loot",
  },
  {
    value: "supply",
    title: "Case",
    icon: icons.box,
    filter: "loot",
  },
  {
    value: "ammo",
    title: "Case",
    icon: icons.box,
    filter: "loot",
  },
  {
    value: "helicopter",
    title: "Point of Interest",
    icon: icons.helicopter,
    filter: "poi",
  },
  {
    value: "opener",
    title: "Tool",
    icon: icons.opener,
    filter: "tools",
  },
  {
    value: "flare",
    title: "Case",
    icon: icons.box,
    filter: "loot",
  },
  {
    value: "info",
    title: "Point of Interest",
    icon: icons.info,
    filter: "poi",
  },
  {
    value: "can",
    title: "Cannibal Camp",
    icon: icons.can,
    filter: "village",
  },
  {
    value: "door",
    title: "Locked Door",
    icon: icons.door,
    filter: "door",
  },
  {
    value: "zip",
    title: "Zip Line",
    icon: icons.zip,
    filter: "cave",
  },
  {
    value: "uni",
    title: "Unicycle",
    icon: icons.uni,
    filter: "vehicle",
  },
  {
    value: "vision",
    title: "Googles",
    icon: icons.vision,
    filter: "gear",
  },
  {
    value: "prail",
    title: "Weapon Attachment",
    icon: icons["pistol-rail"],
    filter: "mod",
  },
  {
    value: "srail",
    title: "Shotgun Rail",
    icon: icons["shotgun-rail"],
    filter: "mod",
  },
  {
    value: "light",
    title: "Weapon Attachment",
    icon: icons["flashlight-attachment"],
    filter: "mod",
  },
  {
    value: "suppressor",
    title: "Weapon Attachment",
    icon: icons.suppressor,
    filter: "mod",
  },
  {
    value: "laser",
    title: "Weapon Attachment",
    icon: icons["laser-sight"],
    filter: "mod",
  },
  {
    value: "lake",
    title: "Water Body",
    icon: icons.info,
    filter: "lake",
  },
];

export function getCustomNodes() {
  return getItem<MapLocation[]>("custom_nodes", []);
}

export function setCustomNodes(customNodes: MapLocation[]) {
  setItem("custom_nodes", customNodes);
}

export function getDiscoveredNodeIDs() {
  return getItem<number[]>("discovered_node_ids", []);
}

export function setDiscoveredNodeIDs(discoveredNodeIDs: number[]) {
  return setItem("discovered_node_ids", discoveredNodeIDs);
}

export type Filter = {
  value: string;
  title: string;
  color: string;
};

export const filters = [
  {
    value: "custom",
    title: "Custom",
    color: "rgb(200 200 200)",
  },
  {
    value: "poi",
    title: "Points of Interest",
    color: "rgb(152 251 152)",
  },
  {
    value: "cave",
    title: "Caves",
    color: "rgb(173 216 230)",
  },
  {
    value: "hatch",
    title: "Bunkers",
    color: "rgb(255 215 0)",
  },
  {
    value: "door",
    title: "Locked Doors",
    color: "rgb(176 196 222)",
  },
  {
    value: "3d",
    title: "3D Printers",
    color: "rgb(255 105 180)",
  },
  {
    value: "weapons",
    title: "Weapons",
    color: "rgb(195, 22, 22)",
  },
  {
    value: "mod",
    title: "Attachments",
    color: "rgb(255 182 193)",
  },
  {
    value: "gear",
    title: "Player Gear",
    color: "rgb(255 140 0)",
  },
  {
    value: "tools",
    title: "Tools",
    color: "rgb(144 238 144)",
  },
  {
    value: "clothes",
    title: "Clothes",
    color: "rgb(186 85 211)",
  },
  {
    value: "docs",
    title: "Documents",
    color: "rgb(240 125 138)",
  },
  {
    value: "loot",
    title: "Crates",
    color: "rgb(123 104 238)",
  },
  {
    value: "vehicle",
    title: "Transportation",
    color: "rgb(65 105 225)",
  },
  {
    value: "village",
    title: "Cannibal Camps",
    color: "rgb(255 0 0)",
  },
  {
    value: "lake",
    title: "Lakes",
    color: "rgb(29 222 255)",
  },
];

export function getDeselectedFilters() {
  return getItem<string[]>("deselected_filters", []);
}

export function setDeselectedFilters(deselectedFilters: string[]) {
  setItem("deselected_filters", deselectedFilters);
}
