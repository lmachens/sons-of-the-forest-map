import icons from "./icons.json";
import { getItem, setItem } from "./storage";

export type NodeType = {
  value: string;
  title: string;
  icon: string;
  filter?: string;
};

export type Node = {
  id: number;
  title?: string;
  description?: string;
  type: string;
  x: number;
  y: number;
  z: number;
  color?: string;
};

export const types = [
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
    icon: icons["ray-gun"],
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
    filter: "collect",
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
    value: "bunker",
    title: "Bunker",
    icon: icons.bunker,
    filter: "poi",
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
    title: "Clothes",
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
    filter: "collect",
  },
  {
    value: "document",
    title: "Document",
    icon: icons.document,
    filter: "collect",
  },
  {
    value: "hang-glider",
    title: "Player Gear",
    icon: icons["hang-glider"],
    filter: "glider",
  },
  {
    value: "putter",
    title: "Weapon",
    icon: icons.putter,
    filter: "weapons",
  },
  {
    value: "crate",
    title: "Loot",
    icon: icons.crate,
    filter: "loot",
  },
  {
    value: "supply",
    title: "Loot",
    icon: icons.box,
    filter: "loot",
  },
  {
    value: "ammo",
    title: "Loot",
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
    title: "Loot",
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
    filter: "can",
  },
];

export function getCustomNodes() {
  return getItem<Node[]>("custom_nodes", []);
}

export function setCustomNodes(customNodes: Node[]) {
  setItem("custom_nodes", customNodes);
}

export function getDiscoveredNodeIDs() {
  return getItem<number[]>("discovered_node_ids", []);
}

export function setDiscoveredNodeIDs(discoveredNodeIDs: number[]) {
  return setItem("discovered_node_ids", discoveredNodeIDs);
}

export const filters = [
  {
    value: "custom",
    title: "Custom",
  },
  {
    value: "poi",
    title: "Points of Interest",
  },
  {
    value: "cave",
    title: "Cave Entrance",
  },
  {
    value: "3d",
    title: "3D Printer",
  },
  {
    value: "weapons",
    title: "Weapons",
  },
  {
    value: "tools",
    title: "Tools",
  },
  {
    value: "clothes",
    title: "Clothes",
  },
  {
    value: "collect",
    title: "Collectibles",
  },
  {
    value: "gear",
    title: "Player Gear",
  },
  {
    value: "loot",
    title: "Loot Crates",
  },
  {
    value: "glider",
    title: "Hang Gliders",
  },
  {
    value: "can",
    title: "Cannibal Camp",
  },
];

export function getDeselectedFilters() {
  return getItem<string[]>("deselected_filters", []);
}

export function setDeselectedFilters(deselectedFilters: string[]) {
  setItem("deselected_filters", deselectedFilters);
}
