import icons from "./icons.json";

export type NodeType = {
  value: string;
  title: string;
  icon: string;
  filter?: string;
};

export type Node = {
  id?: number;
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
    title: "Modern Axe",
    icon: icons["fire-axe"],
    filter: "tools",
  },
  {
    value: "flashlight",
    title: "Flashlight",
    icon: icons.flashlight,
    filter: "tools",
  },
  {
    value: "machete",
    title: "Machete",
    icon: icons.machete,
    filter: "weapons",
  },
  {
    value: "stunBaton",
    title: "Stun Baton",
    icon: icons["telescopic-baton"],
    filter: "weapons",
  },
  {
    value: "pistol",
    title: "Pistol",
    icon: icons["pistol-gun"],
    filter: "weapons",
  },
  {
    value: "stunGun",
    title: "Stun Gun",
    icon: icons["ray-gun"],
    filter: "weapons",
  },
  {
    value: "rebreather",
    title: "Rebreather",
    icon: icons.rebreather,
    filter: "gear",
  },
  {
    value: "cross",
    title: "Cross",
    icon: icons["hasty-grave"],
    filter: "custom",
  },
  {
    value: "ropeGun",
    title: "Rope Gun",
    icon: icons["rope-dart"],
    filter: "tools",
  },
  {
    value: "slingshot",
    title: "Slingshot",
    icon: icons.slingshot,
    filter: "weapons",
  },
  {
    value: "shovel",
    title: "Shovel",
    icon: icons.spade,
    filter: "tools",
  },
  {
    value: "shotgun",
    title: "Shotgun",
    icon: icons["sawed-off-shotgun"],
    filter: "weapons",
  },
  {
    value: "maintenanceKeycard",
    title: "Maintenance Keycard",
    icon: icons["key-card"],
    filter: "collect",
  },
  {
    value: "vipKeycard",
    title: "VIP Keycard",
    icon: icons["key-card"],
    filter: "collect",
  },
  {
    value: "crossbow",
    title: "Crossbow",
    icon: icons.crossbow,
    filter: "weapons",
  },
  {
    value: "fireAxe",
    title: "Fire Axe",
    icon: icons["fire-axe"],
    filter: "tools",
  },
  {
    value: "guestKeycard",
    title: "Guest Keycard",
    icon: icons["key-card"],
    filter: "collect",
  },
  {
    value: "guitar",
    title: "Guitar",
    icon: icons.guitar,
    filter: "weapons",
  },
  {
    value: "chainsaw",
    title: "Chainsaw",
    icon: icons.chainsaw,
    filter: "tools",
  },
  {
    value: "compoundBow",
    title: "Compound Bow",
    icon: icons["high-shot"],
    filter: "weapons",
  },
  {
    value: "revolver",
    title: "Revolver",
    icon: icons.revolver,
    filter: "weapons",
  },
  {
    value: "katana",
    title: "Katana",
    icon: icons.katana,
    filter: "weapons",
  },
  {
    value: "goldenArmor",
    title: "Golden Armor",
    icon: icons["abdominal-armor"],
    filter: "gear",
  },
  {
    value: "binoculars",
    title: "Binoculars",
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
    title: "Cave Entrance",
    icon: icons.cave,
    filter: "cave",
  },
  {
    value: "camp",
    title: "Abandoned Camp",
    icon: icons.camp,
    filter: "poi",
  },
  {
    value: "village",
    title: "Abandoned Village",
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
    title: "Hang Glider",
    icon: icons["hang-glider"],
    filter: "glider",
  },
  {
    value: "putter",
    title: "Putter",
    icon: icons.putter,
    filter: "weapons",
  },
];

export function getCustomNodes() {
  let customNodes: Node[] = [];
  try {
    const item = localStorage.getItem("custom_nodes");
    if (item) {
      customNodes = JSON.parse(item);
    }
  } catch (error) {
    //
  }
  return customNodes;
}

export function setCustomNodes(customNodes: Node[]) {
  localStorage.setItem("custom_nodes", JSON.stringify(customNodes));
}

export const filters = [
  {
    value: "custom",
    title: "Custom",
  },
  {
    value: "poi",
    title: "Point of Interest",
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
    value: "glider",
    title: "Hang Gliders"
  },
];

export function getDeselectedFilters() {
  let deselectedFilters: string[] = [];
  try {
    const item = localStorage.getItem("deselected_filters");
    if (item) {
      deselectedFilters = JSON.parse(item);
    }
  } catch (error) {
    //
  }
  return deselectedFilters;
}

export function setDeselectedFilters(deselectedFilters: string[]) {
  localStorage.setItem("deselected_filters", JSON.stringify(deselectedFilters));
}
