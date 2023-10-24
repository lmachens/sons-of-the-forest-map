import { t } from "./i18n";
import icons from "./icons.json";
import { MapLocation } from "./locations";
import { getItem, setItem } from "./storage";

export type NodeType = {
  value: string;
  title: string;
  icon: string;
  src?: string;
  filter?: string;
};

export function getTypes(): NodeType[] {
  return [
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
      src: "/icons/modern-axe.webp",
      filter: "tools",
    },
    {
      value: "flashlight",
      title: t("Tool"),
      icon: icons.flashlight,
      src: "/icons/flashlight.webp",
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
      title: t("Weapon"),
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
      title: t("Tool"),
      icon: icons.rebreather,
      filter: "tools",
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
      title: t("Weapon"),
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
      title: t("Cloth"),
      icon: icons["abdominal-armor"],
      filter: "clothes",
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
      filter: "hatch",
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
      title: t("Cave"),
      icon: icons.cave,
      filter: "cave",
    },
    {
      value: "camp",
      title: t("Point of Interest"),
      icon: icons.camp,
      filter: "abandoned-camp",
    },
    {
      value: "village",
      title: t("Point of Interest"),
      icon: icons.hut,
      filter: "poi",
    },
    {
      value: "cloth",
      title: t("Cloth"),
      icon: icons.hanger,
      filter: "clothes",
    },
    {
      value: "compass",
      title: t("Tool"),
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
      title: t("Aircarft"),
      icon: icons["hang-glider"],
      filter: "vehicle",
    },
    {
      value: "putter",
      title: t("Weapon"),
      icon: icons.putter,
      filter: "weapons",
    },
    {
      value: "crate",
      title: t("Crate"),
      icon: icons.crate,
      filter: "loot",
    },
    {
      value: "supply",
      title: t("Case"),
      icon: icons.box,
      filter: "loot",
    },
    {
      value: "ammo",
      title: t("Case"),
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
      title: t("Case"),
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
      title: t("Enemies"),
      icon: icons.can,
      filter: "village",
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
      filter: "vehicle",
    },
    {
      value: "vision",
      title: t("Googles"),
      icon: icons.vision,
      filter: "tools",
    },
    {
      value: "prail",
      title: t("Weapon Attachment"),
      icon: icons["pistol-rail"],
      src: "/icons/pistol-rail.webp",
      filter: "mod",
    },
    {
      value: "srail",
      title: t("Weapon Attachment"),
      icon: icons["shotgun-rail"],
      filter: "mod",
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
    {
      value: "lake",
      title: t("Water Body"),
      icon: icons.info,
      filter: "lake",
    },
    {
      value: "laptop",
      title: t("Upload location to GPS Tracker"),
      icon: icons.laptop,
      filter: "laptop",
    },
    {
      value: "go-pro",
      title: t("Watch pre-made videos"),
      icon: icons["go-pro"],
      filter: "tools",
    },
    {
      value: "golf-cart",
      title: t("Drive around the map"),
      icon: icons.uni,
      filter: "vehicle",
    },
    {
      value: "rifle",
      title: t("Ranged type of weapon"),
      icon: icons["sawed-off-shotgun"],
      filter: "weapons",
    },
    {
      value: "stream",
      title: t("River"),
      icon: icons.info,
      filter: "water",
    },
    {
      value: "waterfall",
      title: t("Waterfall"),
      icon: icons.info,
      filter: "lake",
    },
    {
      value: "cooking-pot",
      title: t("Tool"),
      icon: icons.info,
      filter: "tools",
    },
    {
      value: "large-battery",
      title: t("Electronics"),
      icon: icons.info,
      filter: "electronics",
    },
    {
      value: "pickaxe",
      title: t("Tool"),
      icon: icons.info,
      filter: "tools",
    },
    {
      value: "artifact",
      title: t("Artifact"),
      icon: icons.info,
      filter: "tools",
    },
    {
      value: "pond",
      title: t("Water Body"),
      icon: icons.info,
      filter: "pond",
    },
    {
      value: "radio",
      title: t("Tool"),
      icon: icons.info,
      filter: "tools",
    },
    {
      value: "solar-panel",
      title: t("Electronics"),
      icon: icons.info,
      filter: "electronics",
    },
  ];
}

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

export function getFilters(): Filter[] {
  return [
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
      title: t("Caves"),
      color: "rgb(173 216 230)",
    },
    {
      value: "hatch",
      title: t("Bunkers"),
      color: "rgb(255 215 0)",
    },
    {
      value: "electronics",
      title: t("Electronics"),
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
      value: "laptop",
      title: t("Laptops"),
      color: "rgb(255 140 0)",
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
      value: "loot",
      title: t("Crates"),
      color: "rgb(123 104 238)",
    },
    {
      value: "vehicle",
      title: t("Transportation"),
      color: "rgb(65 105 225)",
    },
    {
      value: "village",
      title: t("Cannibal Camps"),
      color: "rgb(255 0 0)",
    },
    {
      value: "abandoned-camp",
      title: t("Abandoned Camps"),
      color: "rgb(152 251 152)",
    },
    {
      value: "lake",
      title: t("Lakes"),
      color: "rgb(29 222 255)",
    },
    {
      value: "pond",
      title: t("Ponds"),
      color: "rgb(29 222 255)",
    },
  ];
}

export function getDeselectedFilters() {
  return getItem<string[]>("deselected_filters", []);
}

export function setDeselectedFilters(deselectedFilters: string[]) {
  setItem("deselected_filters", deselectedFilters);
}
