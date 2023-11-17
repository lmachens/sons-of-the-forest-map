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
      icon: icons["spawn-point"],
      src: "/icons/spawn-point.webp",
      filter: "poi",
    },
    {
      value: "modernAxe",
      title: t("Tool"),
      icon: icons["firefighter-axe"],
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
      src: "/icons/machete.webp",
      filter: "weapons",
    },
    {
      value: "stun-baton",
      title: t("Weapon"),
      icon: icons["stun-baton"],
      src: "/icons/stun-baton.webp",
      filter: "weapons",
    },
    {
      value: "pistol",
      title: t("Weapon"),
      icon: icons.pistol,
      src: "/icons/pistol.webp",
      filter: "weapons",
    },
    {
      value: "stun-gun",
      title: t("Weapon"),
      icon: icons["stun-gun"],
      src: "/icons/stun-gun.webp",
      filter: "weapons",
    },
    {
      value: "rebreather",
      title: t("Tool"),
      icon: icons.rebreather,
      src: "/icons/rebreather.webp",
      filter: "tools",
    },
    {
      value: "cross",
      title: t("Weapon"),
      icon: icons.cross,
      src: "/icons/cross.webp",
      filter: "weapons",
    },
    {
      value: "rope-gun",
      title: t("Tool"),
      icon: icons["rope-gun"],
      src: "/icons/rope-gun.webp",
      filter: "tools",
    },
    {
      value: "slingshot",
      title: t("Tool"),
      icon: icons.slingshot,
      src: "/icons/slingshot.webp",
      filter: "tools",
    },
    {
      value: "shovel",
      title: t("Tool"),
      icon: icons.shovel,
      src: "/icons/shovel.webp",
      filter: "tools",
    },
    {
      value: "shotgun",
      title: t("Rifle"),
      icon: icons.shotgun,
      src: "/icons/shotgun.webp",
      filter: "weapons",
    },
    {
      value: "keycard",
      title: t("Keycard"),
      icon: icons.keycard,
      src: "/icons/keycard.webp",
      filter: "tools",
    },
    {
      value: "crossbow",
      title: t("Weapon"),
      icon: icons.crossbow,
      src: "/icons/crossbow.webp",
      filter: "weapons",
    },
    {
      value: "firefighter-axe",
      title: t("Tool"),
      icon: icons["firefighter-axe"],
      src: "/icons/firefighter-axe.webp",
      filter: "tools",
    },
    {
      value: "guitar",
      title: t("Weapon"),
      icon: icons.guitar,
      src: "/icons/guitar.webp",
      filter: "weapons",
    },
    {
      value: "chainsaw",
      title: t("Tool"),
      icon: icons.chainsaw,
      src: "/icons/chainsaw.webp",
      filter: "tools",
    },
    {
      value: "compound-bow",
      title: t("Weapon"),
      icon: icons["compound-bow"],
      src: "/icons/compound-bow.webp",
      filter: "weapons",
    },
    {
      value: "revolver",
      title: t("Weapon"),
      icon: icons.revolver,
      src: "/icons/revolver.webp",
      filter: "weapons",
    },
    {
      value: "katana",
      title: t("Weapon"),
      icon: icons.katana,
      src: "/icons/katana.webp",
      filter: "weapons",
    },
    {
      value: "golden-armor",
      title: t("Player Gear"),
      icon: icons["golden-armor"],
      src: "/icons/golden-armor.webp",
      filter: "outfits",
    },
    {
      value: "binoculars",
      title: t("Tool"),
      icon: icons.binoculars,
      src: "/icons/binoculars.webp",
      filter: "tools",
    },
    {
      value: "final-bunker",
      title: t("Final Bunker"),
      icon: icons["final-bunker"],
      src: "/icons/final-bunker.webp",
      filter: "bunker-hatch",
    },
    {
      value: "bunker-hatch",
      title: t("Bunker Hatch"),
      icon: icons["bunker-hatch"],
      src: "/icons/bunker-hatch.webp",
      filter: "bunker-hatch",
    },
    {
      value: "printer",
      title: t("3D Printer"),
      icon: icons.printer,
      src: "/icons/printer.webp",
      filter: "printer",
    },
    {
      value: "cave",
      title: t("Cave"),
      icon: icons.cave,
      src: "/icons/cave.webp",
      filter: "cave",
    },
    {
      value: "abandoned-camp",
      title: t("Point of Interest"),
      icon: icons["abandoned-camp"],
      src: "/icons/abandoned-camp.webp",
      filter: "abandoned-camp",
    },
    {
      value: "outfit",
      title: t("Outfit"),
      icon: icons.outfit,
      src: "/icons/outfit.webp",
      filter: "outfits",
    },
    {
      value: "gps-locator",
      title: t("Tool"),
      icon: icons["gps-locator"],
      src: "/icons/gps-locator.webp",
      filter: "tools",
    },
    {
      value: "book",
      title: t("Book"),
      icon: icons.book,
      src: "/icons/book.webp",
      filter: "documents",
    },
    {
      value: "document",
      title: t("Document"),
      icon: icons.document,
      src: "/icons/document.webp",
      filter: "documents",
    },
    {
      value: "email",
      title: t("Email"),
      icon: icons.document,
      src: "/icons/email.webp",
      filter: "documents",
    },
    {
      value: "pamphlet",
      title: t("Pamphlet"),
      icon: icons.document,
      src: "/icons/pamphlet.webp",
      filter: "documents",
    },
    {
      value: "hang-glider",
      title: t("Aircarft"),
      icon: icons["hang-glider"],
      src: "/icons/hang-glider.webp",
      filter: "vehicle",
    },
    {
      value: "putter",
      title: t("Weapon"),
      icon: icons.putter,
      src: "/icons/putter.webp",
      filter: "weapons",
    },
    {
      value: "wooden-crate",
      title: t("Crate"),
      icon: icons.crate,
      filter: "loot",
    },
    {
      value: "supply",
      title: t("Case"),
      icon: icons.case,
      filter: "loot",
    },
    {
      value: "dark-green-suitcase",
      title: t("Case"),
      icon: icons.case,
      src: "/icons/ammo-case.webp",
      filter: "loot",
    },
    {
      value: "orange-suitcase",
      title: t("Case"),
      icon: icons.case,
      src: "/icons/flare-case.webp",
      filter: "loot",
    },
    {
      value: "helicopter",
      title: t("Point of Interest"),
      icon: icons.helicopter,
      src: "/icons/helicopter.webp",
      filter: "poi",
    },
    {
      value: "can-opener",
      title: t("Tool"),
      icon: icons["can-opener"],
      src: "/icons/can-opener.webp",
      filter: "tools",
    },
    {
      value: "poi",
      title: t("Point of Interest"),
      icon: icons.poi,
      src: "/icons/poi.webp",
      filter: "poi",
    },
    {
      value: "cannibal-camp",
      title: t("Enemies"),
      icon: icons["cannibal-camp"],
      src: "/icons/cannibal-camp.webp",
      filter: "village",
    },
    {
      value: "unicycle",
      title: t("Unicycle"),
      icon: icons.unicycle,
      src: "/icons/knightv.webp",
      filter: "vehicle",
    },
    {
      value: "night-vision",
      title: t("Googles"),
      icon: icons["night-vision"],
      src: "/icons/night-vision.webp",
      filter: "tools",
    },
    {
      value: "pistol-rail",
      title: t("Weapon Attachment"),
      icon: icons["pistol-rail"],
      src: "/icons/pistol-rail.webp",
      filter: "attachments",
    },
    {
      value: "shotgun-rail",
      title: t("Weapon Attachment"),
      icon: icons["shotgun-rail"],
      src: "/icons/shotgun-rail.webp",
      filter: "attachments",
    },
    {
      value: "flashlight-attachment",
      title: t("Weapon Attachment"),
      icon: icons["flashlight-attachment"],
      src: "/icons/flashlight-attachment.webp",
      filter: "attachments",
    },
    {
      value: "suppressor",
      title: t("Weapon Attachment"),
      icon: icons.suppressor,
      src: "/icons/suppressor.webp",
      filter: "attachments",
    },
    {
      value: "laser-attachment",
      title: t("Weapon Attachment"),
      icon: icons["laser-sight"],
      src: "/icons/laser-sight.webp",
      filter: "attachments",
    },
    {
      value: "lake",
      title: t("Water Body"),
      icon: icons.poi,
      src: "/icons/lake.webp",
      filter: "lake",
    },
    {
      value: "laptop",
      title: t("Upload location to GPS Tracker"),
      icon: icons.laptop,
      src: "/icons/laptop.webp",
      filter: "laptop",
    },
    {
      value: "action-camera",
      title: t("Watch pre-made videos"),
      icon: icons["action-camera"],
      src: "/icons/action-camera.webp",
      filter: "tools",
    },
    {
      value: "golf-cart",
      title: t("Drive around the map"),
      icon: icons.unicycle,
      src: "/icons/golf-cart.webp",
      filter: "vehicle",
    },
    {
      value: "rifle",
      title: t("Ranged type of weapon"),
      icon: icons.shotgun,
      src: "/icons/rifle.webp",
      filter: "weapons",
    },
    {
      value: "waterfall",
      title: t("Waterfall"),
      icon: icons.poi,
      src: "/icons/waterfall.webp",
      filter: "lake",
    },
    {
      value: "cooking-pot",
      title: t("Tool"),
      icon: icons.poi,
      src: "/icons/cooking-pot.webp",
      filter: "tools",
    },
    {
      value: "large-battery",
      title: t("Electronics"),
      icon: icons.poi,
      src: "/icons/large-battery.webp",
      filter: "electronics",
    },
    {
      value: "pickaxe",
      title: t("Tool"),
      icon: icons.poi,
      src: "/icons/pickaxe.webp",
      filter: "tools",
    },
    {
      value: "pond",
      title: t("Water Body"),
      icon: icons.poi,
      src: "/icons/pond.webp",
      filter: "pond",
    },
    {
      value: "radio",
      title: t("Entertainment"),
      icon: icons.poi,
      src: "/icons/radio.webp",
      filter: "electronics",
    },
    {
      value: "solar-panel",
      title: t("Electronics"),
      icon: icons.poi,
      src: "/icons/solar-panel.webp",
      filter: "electronics",
    },
    {
      value: "blueprint",
      title: t("Blueprint"),
      icon: icons.document,
      src: "/icons/document.webp",
      filter: "blueprint",
    },
    {
      value: "fishing-hut",
      title: t("Abandoned"),
      icon: icons["fishing-hut"],
      src: "/icons/abandoned-camp.webp",
      filter: "fishing-hut",
    },
    {
      value: "artifact-a",
      title: t("Artifact"),
      icon: icons.poi,
      src: "/icons/artifact-a.webp",
      filter: "artifact",
    },
    {
      value: "artifact-b",
      title: t("Artifact"),
      icon: icons.poi,
      src: "/icons/artifact-b.webp",
      filter: "artifact",
    },
    {
      value: "artifact-c",
      title: t("Artifact"),
      icon: icons.poi,
      src: "/icons/artifact-c.webp",
      filter: "artifact",
    },
    {
      value: "artifact-d",
      title: t("Artifact"),
      icon: icons.poi,
      src: "/icons/artifact-d.webp",
      filter: "artifact",
    },
    {
      value: "artifact-e",
      title: t("Artifact"),
      icon: icons.poi,
      src: "/icons/artifact-d.webp",
      filter: "artifact",
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
      title: t("POI"),
      color: "rgb(152 251 152)",
    },
    {
      value: "cave",
      title: t("Caves"),
      color: "rgb(173 216 230)",
    },
    {
      value: "bunker-hatch",
      title: t("Bunkers"),
      color: "rgb(255 215 0)",
    },
    {
      value: "electronics",
      title: t("Electronics"),
      color: "rgb(176 196 222)",
    },
    {
      value: "printer",
      title: t("3D Printers"),
      color: "rgb(255 105 180)",
    },
    {
      value: "weapons",
      title: t("Weapons"),
      color: "rgb(195, 22, 22)",
    },
    {
      value: "attachments",
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
      color: "rgb(0, 128, 0)",
    },
    {
      value: "outfits",
      title: t("Outfits"),
      color: "rgb(186 85 211)",
    },
    {
      value: "documents",
      title: t("Documents"),
      color: "rgb(240 125 138)",
    },
    {
      value: "loot",
      title: t("Loot cases"),
      color: "rgb(123 104 238)",
    },
    {
      value: "blueprint",
      title: t("Blueprints"),
      color: "rgb(255 20 147)",
    },
    {
      value: "vehicle",
      title: t("Transportation"),
      color: "rgb(65 105 225)",
    },
    {
      value: "artifact",
      title: t("Artifacts"),
      color: "rgb(255 0 255)",
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
      value: "fishing-hut",
      title: t("Fishing Huts"),
      color: "rgb(152 251 152)",
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
