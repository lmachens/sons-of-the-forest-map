export type NodeType = {
  value: string;
  title: string;
  icon: string;
};

export type Node = {
  id?: number;
  title?: string;
  description?: string;
  type: string;
  x: number;
  y: number;
  z: number;
};

export const types = [
  {
    value: "unknown",
    title: "Unknown",
    icon: "/nodes/unknown.webp",
  },
  {
    value: "spawnPoint",
    title: "Spawn Point",
    icon: "/nodes/teleport.svg",
  },
  {
    value: "modernAxe",
    title: "Modern Axe",
    icon: "/nodes/fire-axe.svg",
  },
  {
    value: "flashlight",
    title: "Flashlight",
    icon: "/nodes/flashlight.svg",
  },
  {
    value: "machete",
    title: "Machete",
    icon: "/nodes/machete.svg",
  },
  {
    value: "stunBaton",
    title: "Stun Baton",
    icon: "/nodes/telescopic-baton.svg",
  },
  {
    value: "pistol",
    title: "Pistol",
    icon: "/nodes/pistol-gun.svg",
  },
  {
    value: "stunGun",
    title: "Stun Gun",
    icon: "/nodes/ray-gun.svg",
  },
  {
    value: "rebreather",
    title: "Rebreather",
    icon: "/nodes/lungs.svg",
  },
  {
    value: "cross",
    title: "Cross",
    icon: "/nodes/hasty-grave.svg",
  },
  {
    value: "ropeGun",
    title: "Rope Gun",
    icon: "/nodes/rope-dart.svg",
  },
  {
    value: "slingshot",
    title: "Slingshot",
    icon: "/nodes/slingshot.svg",
  },
  {
    value: "shovel",
    title: "Shovel",
    icon: "/nodes/spade.svg",
  },
  {
    value: "shotgun",
    title: "Shotgun",
    icon: "/nodes/sawed-off-shotgun.svg",
  },
  {
    value: "maintenanceKeycard",
    title: "Maintenance Keycard",
    icon: "/nodes/key-card.svg",
  },
  {
    value: "vipKeycard",
    title: "VIP Keycard",
    icon: "/nodes/key-card.svg",
  },
  {
    value: "crossbow",
    title: "Crossbow",
    icon: "/nodes/crossbow.svg",
  },
  {
    value: "fireAxe",
    title: "Fire Axe",
    icon: "/nodes/fire-axe.svg",
  },
  {
    value: "guestKeycard",
    title: "Guest Keycard",
    icon: "/nodes/key-card.svg",
  },
  {
    value: "guitar",
    title: "Guitar",
    icon: "/nodes/guitar.svg",
  },
  {
    value: "chainsaw",
    title: "Chainsaw",
    icon: "/nodes/chainsaw.svg",
  },
  {
    value: "compoundBow",
    title: "Compound Bow",
    icon: "/nodes/high-shot.svg",
  },
  {
    value: "revolver",
    title: "Revolver",
    icon: "/nodes/revolver.svg",
  },
  {
    value: "katana",
    title: "Katana",
    icon: "/nodes/katana.svg",
  },
  {
    value: "goldenArmor",
    title: "Golden Armor",
    icon: "/nodes/abdominal-armor.svg",
  },
  {
    value: "finalBunker",
    title: "Final Bunker",
    icon: "/nodes/bunker.svg",
  },
  {
    value: "3Dprinter",
    title: "3D Printer",
    icon: "/nodes/pc.svg",
  },
  {
    value: "cave",
    title: "Cave Entrance",
    icon: "/nodes/cave.svg",
  },
  {
    value: "camp",
    title: "Abandonden Camp",
    icon: "/nodes/camp.svg",
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
