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
    filter: "weapons",
  },
  {
    value: "flashlight",
    title: "Flashlight",
    icon: icons.flashlight,
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
    icon: icons.lungs,
  },
  {
    value: "cross",
    title: "Cross",
    icon: icons["hasty-grave"],
  },
  {
    value: "ropeGun",
    title: "Rope Gun",
    icon: icons["rope-dart"],
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
  },
  {
    value: "vipKeycard",
    title: "VIP Keycard",
    icon: icons["key-card"],
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
    filter: "weapons",
  },
  {
    value: "guestKeycard",
    title: "Guest Keycard",
    icon: icons["key-card"],
  },
  {
    value: "guitar",
    title: "Guitar",
    icon: icons.guitar,
  },
  {
    value: "chainsaw",
    title: "Chainsaw",
    icon: icons.chainsaw,
    filter: "weapons",
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
  },
  {
    value: "binoculars",
    title: "Binoculars",
    icon: icons.binoculars,
  },
  {
    value: "finalBunker",
    title: "Final Bunker",
    icon: icons.bunker,
  },
  {
    value: "3Dprinter",
    title: "3D Printer",
    icon: icons.pc,
  },
  {
    value: "cave",
    title: "Cave Entrance",
    icon: icons.cave,
  },
  {
    value: "camp",
    title: "Abandonden Camp",
    icon: icons.camp,
  },
  {
    value: "village",
    title: "Abandoned Village",
    icon: icons.hut,
  },
  {
    value: "cloth",
    title: "Clothes",
    icon: icons.hanger,
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
    value: "weapons",
    title: "Weapons",
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
