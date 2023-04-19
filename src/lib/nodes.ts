import { t } from "./i18n";
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
    title: t("Unknown"),
    icon: icons.unknown,
  },
  {
    value: "spawnPoint",
    title: t("Spawn Point"),
    icon: icons.teleport,
    filter: "poi",
  },
  {
    value: "modernAxe",
    title: t("Tool"),
    icon: icons["fire-axe"],
    filter: "tools",
  },
  {
    value: "flashlight",
    title: t("Tool"),
    icon: icons.flashlight,
    filter: "tools",
  },
  {
    value: "machete",
    title: t("Weapon"),
    icon: icons.machete,
    filter: "weapons",
  },
  {
    value: "stunBaton",
    title: t("Weapon"),
    icon: icons["telescopic-baton"],
    filter: "weapons",
  },
  {
    value: "pistol",
    title: t("Gun"),
    icon: icons["pistol-gun"],
    filter: "weapons",
  },
  {
    value: "stunGun",
    title: t("Weapon"),
    icon: icons["stun-gun"],
    filter: "weapons",
  },
  {
    value: "rebreather",
    title: t("Player Gear"),
    icon: icons.rebreather,
    filter: "gear",
  },
  {
    value: "cross",
    title: t("Weapon"),
    icon: icons["hasty-grave"],
    filter: "weapons",
  },
  {
    value: "ropeGun",
    title: t("Tool"),
    icon: icons["rope-dart"],
    filter: "tools",
  },
  {
    value: "slingshot",
    title: t("Tool"),
    icon: icons.slingshot,
    filter: "tools",
  },
  {
    value: "shovel",
    title: t("Tool"),
    icon: icons.spade,
    filter: "tools",
  },
  {
    value: "shotgun",
    title: t("Rifle"),
    icon: icons["sawed-off-shotgun"],
    filter: "weapons",
  },
  {
    value: "keycard",
    title: t("Keycard"),
    icon: icons.keycard,
    filter: "tools",
  },
  {
    value: "crossbow",
    title: t("Weapon"),
    icon: icons.crossbow,
    filter: "weapons",
  },
  {
    value: "fireAxe",
    title: t("Tool"),
    icon: icons["fire-axe"],
    filter: "tools",
  },
  {
    value: "guitar",
    title: t("Weapon"),
    icon: icons.guitar,
    filter: "weapons",
  },
  {
    value: "chainsaw",
    title: t("Tool"),
    icon: icons.chainsaw,
    filter: "tools",
  },
  {
    value: "compoundBow",
    title: t("Weapon"),
    icon: icons["high-shot"],
    filter: "weapons",
  },
  {
    value: "revolver",
    title: t("Gun"),
    icon: icons.revolver,
    filter: "weapons",
  },
  {
    value: "katana",
    title: t("Weapon"),
    icon: icons.katana,
    filter: "weapons",
  },
  {
    value: "goldenArmor",
    title: t("Player Gear"),
    icon: icons["abdominal-armor"],
    filter: "gear",
  },
  {
    value: "binoculars",
    title: t("Tool"),
    icon: icons.binoculars,
    filter: "tools",
  },
  {
    value: "finalBunker",
    title: t("Final Bunker"),
    icon: icons["final-bunker"],
    filter: "poi",
  },
  {
    value: "hatch",
    title: t("Floor Hatch"),
    icon: icons.hatch,
    filter: "hatch",
  },
  {
    value: "3Dprinter",
    title: t("3D Printer"),
    icon: icons.pc,
    filter: "3d",
  },
  {
    value: "cave",
    title: t("Cave Entrance"),
    icon: icons.cave,
    filter: "cave",
  },
  {
    value: "camp",
    title: t("Point of Interest"),
    icon: icons.camp,
    filter: "poi",
  },
  {
    value: "village",
    title: t("Point of Interest"),
    icon: icons.hut,
    filter: "poi",
  },
  {
    value: "cloth",
    title: t("Clothes"),
    icon: icons.hanger,
    filter: "clothes",
  },
  {
    value: "compass",
    title: t("Compass"),
    icon: icons.compass,
    filter: "tools",
  },
  {
    value: "book",
    title: t("Book"),
    icon: icons.book,
    filter: "docs",
  },
  {
    value: "document",
    title: t("Document"),
    icon: icons.document,
    filter: "docs",
  },
  {
    value: "hang-glider",
    title: t("Player Gear"),
    icon: icons["hang-glider"],
    filter: "glider",
  },
  {
    value: "putter",
    title: t("Weapon"),
    icon: icons.putter,
    filter: "weapons",
  },
  {
    value: "crate",
    title: t("Loot"),
    icon: icons.crate,
    filter: "loot",
  },
  {
    value: "supply",
    title: t("Loot"),
    icon: icons.box,
    filter: "loot",
  },
  {
    value: "ammo",
    title: t("Loot"),
    icon: icons.box,
    filter: "loot",
  },
  {
    value: "helicopter",
    title: t("Point of Interest"),
    icon: icons.helicopter,
    filter: "poi",
  },
  {
    value: "opener",
    title: t("Tool"),
    icon: icons.opener,
    filter: "tools",
  },
  {
    value: "flare",
    title: t("Loot"),
    icon: icons.box,
    filter: "loot",
  },
  {
    value: "info",
    title: t("Point of Interest"),
    icon: icons.info,
    filter: "poi",
  },
  {
    value: "can",
    title: t("Cannibal Camps"),
    icon: icons.can,
    filter: "can",
  },
  {
    value: "mod",
    title: t("Weapon Attachment"),
    icon: icons.mod,
    filter: "mod",
  },
  {
    value: "door",
    title: t("Locked Door"),
    icon: icons.door,
    filter: "door",
  },
  {
    value: "zip",
    title: t("Zip Line"),
    icon: icons.zip,
    filter: "cave",
  },
  {
    value: "uni",
    title: t("Unicycle"),
    icon: icons.uni,
    filter: "gear",
  },
  {
    value: "vision",
    title: t("Googles"),
    icon: icons.vision,
    filter: "gear",
  },
  {
    value: "prail",
    title: t("Weapon Attachment"),
    icon: icons["pistol-rail"],
    filter: "mod",
  },
  {
    value: "srail",
    title: t("Shotgun Rail"),
    icon: icons["shotgun-rail"],
    filter: "mod",
  },
  {
    value: "lake",
    title: t("Water Body"),
    icon: icons.info,
    filter: "lake",
  },
  {
    value: "light",
    title: t("Weapon Attachment"),
    icon: icons["flashlight-attachment"],
    filter: "mod",
  },
  {
    value: "suppressor",
    title: t("Weapon Attachment"),
    icon: icons.suppressor,
    filter: "mod",
  },
  {
    value: "laser",
    title: t("Weapon Attachment"),
    icon: icons["laser-sight"],
    filter: "mod",
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
    title: t("Custom"),
    color: "rgb(200 200 200)",
  },
  {
    value: "poi",
    title: t("Points of Interest"),
    color: "rgb(152 251 152)",
  },
  {
    value: "cave",
    title: t("Cave Entrances"),
    color: "rgb(173 216 230)",
  },
  {
    value: "hatch",
    title: t("Bunker Entrances"),
    color: "rgb(255 215 0)",
  },
  {
    value: "door",
    title: t("Locked Doors"),
    color: "rgb(176 196 222)",
  },
  {
    value: "3d",
    title: t("3D Printers"),
    color: "rgb(255 105 180)",
  },
  {
    value: "weapons",
    title: t("Weapons"),
    color: "rgb(195, 22, 22)",
  },
  {
    value: "mod",
    title: t("Attachments"),
    color: "rgb(255 182 193)",
  },
  {
    value: "tools",
    title: t("Tools"),
    color: "rgb(144 238 144)",
  },
  {
    value: "clothes",
    title: t("Clothes"),
    color: "rgb(186 85 211)",
  },
  {
    value: "docs",
    title: t("Documents"),
    color: "rgb(240 125 138)",
  },
  {
    value: "gear",
    title: t("Player Gear"),
    color: "rgb(255 140 0)",
  },
  {
    value: "loot",
    title: t("Loot Crates"),
    color: "rgb(123 104 238)",
  },
  {
    value: "glider",
    title: t("Hang Gliders"),
    color: "rgb(65 105 225)",
  },
  {
    value: "can",
    title: t("Cannibal Camps"),
    color: "rgb(255 0 0)",
  },
  {
    value: "lake",
    title: t("Lakes"),
    color: "rgb(29 222 255)",
  },
];

export function getDeselectedFilters() {
  return getItem<string[]>("deselected_filters", []);
}

export function setDeselectedFilters(deselectedFilters: string[]) {
  setItem("deselected_filters", deselectedFilters);
}
