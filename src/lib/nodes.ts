import { t } from "./i18n";
import icons from "./icons.json";
import { MapLocation } from "./locations";
import { getItem, setItem } from "./storage";

export type NodeType = {
  value: string;
  title: string;
  icon: string;
  src?: string;
  filter?: string | string[];
};

export function getTypes(onlyBaseTypes: boolean = false): NodeType[] {
  const baseTypes: NodeType[] = [
    baseBook,
    baseBlueprint,
    baseCamp,
    baseCamera,
    baseCrate,
    baseCaseU,
    baseCrateU,
    baseCookingPot,
    baseDocument,
    baseEmail,
    baseFlashlightAttachment,
    baseLake,
    baseLaptop,
    baseLargeBattery,
    baseOutfit,
    basePistol,
    basePutter,
    basePistolRail,
    basePOI,
    baseRadio,
    baseShotgunRail,
    baseSuppressor,
    baseSupply,
    baseSuitcaseDG,
    baseSuitcaseOr,
    baseSolarPanel,
    createNodeType({
      value: "unknown",
      title: t("Unknown"),
      icon: icons.unknown,
    }),
    {
      value: "artifact-a",
      title: t("Artifact"),
      icon: icons.poi,
      src: "/icons/artifact-a.webp",
      filter: ["artifact", "cave-loot"],
    },
    {
      value: "artifact-b",
      title: t("Artifact"),
      icon: icons.poi,
      src: "/icons/artifact-b.webp",
      filter: ["artifact", "cave-loot"],
    },
    {
      value: "artifact-c",
      title: t("Artifact"),
      icon: icons.poi,
      src: "/icons/artifact-c.webp",
      filter: ["artifact", "cave-loot"],
    },
    {
      value: "artifact-d",
      title: t("Artifact"),
      icon: icons.poi,
      src: "/icons/artifact-d.webp",
      filter: ["artifact", "cave-loot"],
    },
    {
      value: "artifact-e",
      title: t("Artifact"),
      icon: icons.poi,
      src: "/icons/artifact-e.webp",
      filter: ["artifact", "cave-loot"],
    },
    {
      value: "binoculars",
      title: t("Tool"),
      icon: icons.binoculars,
      src: "/icons/binoculars.webp",
      filter: "tools",
    },
    {
      value: "bunker-hatch",
      title: t("Bunker Hatch"),
      icon: icons["bunker-hatch"],
      src: "/icons/bunker-hatch.webp",
      filter: "bunker-hatch",
    },
    {
      value: "cross",
      title: t("Weapon"),
      icon: icons.cross,
      src: "/icons/cross.webp",
      filter: ["weapons", "bunker-loot"],
    },
    {
      value: "crossbow",
      title: t("Weapon"),
      icon: icons.crossbow,
      src: "/icons/crossbow.webp",
      filter: ["weapons", "bunker-loot"],
    },
    {
      value: "chainsaw",
      title: t("Tool"),
      icon: icons.chainsaw,
      src: "/icons/chainsaw.webp",
      filter: ["tools", "bunker-loot"],
    },
    {
      value: "compound-bow",
      title: t("Weapon"),
      icon: icons["compound-bow"],
      src: "/icons/compound-bow.webp",
      filter: ["weapons", "bunker-loot"],
    },
    {
      value: "cave",
      title: t("Cave"),
      icon: icons.cave,
      src: "/icons/cave.webp",
      filter: "cave",
    },
    {
      value: "can-opener",
      title: t("Tool"),
      icon: icons["can-opener"],
      src: "/icons/can-opener.webp",
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
      value: "firefighter-axe",
      title: t("Tool"),
      icon: icons["firefighter-axe"],
      src: "/icons/firefighter-axe.webp",
      filter: ["tools", "bunker-loot"],
    },
    {
      value: "final-bunker",
      title: t("Final Bunker"),
      icon: icons["final-bunker"],
      src: "/icons/final-bunker.webp",
      filter: "bunker-hatch",
    },
    {
      value: "guitar",
      title: t("Weapon"),
      icon: icons.guitar,
      src: "/icons/guitar.webp",
      filter: ["weapons", "bunker-loot"],
    },
    {
      value: "golden-armor",
      title: t("Player Gear"),
      icon: icons["golden-armor"],
      src: "/icons/golden-armor.webp",
      filter: ["outfits", "cave-loot"],
    },
    {
      value: "golden-mask",
      title: t("Player Gear"),
      icon: icons.outfit,
      src: "/icons/golden-mask.webp",
      filter: ["outfits", "bunker-loot"],
    },
    {
      value: "gps-locator",
      title: t("Tool"),
      icon: icons["gps-locator"],
      src: "/icons/gps-locator.webp",
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
      value: "grave",
      title: t("Grave"),
      icon: icons.poi,
      src: "/icons/grave.webp",
      filter: "poi",
    },
    {
      value: "helicopter",
      title: t("Point of Interest"),
      icon: icons.helicopter,
      src: "/icons/helicopter.webp",
      filter: "poi",
    },
    {
      value: "keycard",
      title: t("Keycard"),
      icon: icons.keycard,
      src: "/icons/keycard.webp",
      filter: ["tools", "bunker-loot"],
    },
    {
      value: "hang-glider",
      title: t("Aircarft"),
      icon: icons["hang-glider"],
      src: "/icons/hang-glider.webp",
      filter: "vehicle",
    },
    {
      value: "katana",
      title: t("Weapon"),
      icon: icons.katana,
      src: "/icons/katana.webp",
      filter: ["weapons", "bunker-loot"],
    },
    {
      value: "laser-attachment",
      title: t("Weapon Attachment"),
      icon: icons["laser-sight"],
      src: "/icons/laser-sight.webp",
      filter: ["attachments", "bunker-loot"],
    },
    {
      value: "modernAxe",
      title: t("Tool"),
      icon: icons["firefighter-axe"],
      src: "/icons/modern-axe.webp",
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
      value: "night-vision",
      title: t("Googles"),
      icon: icons["night-vision"],
      src: "/icons/night-vision.webp",
      filter: ["tools", "cave-loot"],
    },
    {
      value: "printer",
      title: t("3D Printer"),
      icon: icons.printer,
      src: "/icons/printer.webp",
      filter: ["printer", "bunker-loot"],
    },
    {
      value: "pamphlet",
      title: t("Pamphlet"),
      icon: icons.document,
      src: "/icons/pamphlet.webp",
      filter: "documents",
    },
    {
      value: "pickaxe",
      title: t("Tool"),
      icon: icons.poi,
      src: "/icons/pickaxe.webp",
      filter: ["tools", "cave-loot"],
    },
    {
      value: "rebreather",
      title: t("Tool"),
      icon: icons.rebreather,
      src: "/icons/rebreather.webp",
      filter: ["tools", "cave-loot"],
    },
    {
      value: "rope-gun",
      title: t("Tool"),
      icon: icons["rope-gun"],
      src: "/icons/rope-gun.webp",
      filter: ["tools", "cave-loot"],
    },
    {
      value: "revolver",
      title: t("Weapon"),
      icon: icons.revolver,
      src: "/icons/revolver.webp",
      filter: ["weapons", "bunker-loot"],
    },
    {
      value: "rifle",
      title: t("Ranged type of weapon"),
      icon: icons.shotgun,
      src: "/icons/rifle.webp",
      filter: ["weapons", "cave-loot"],
    },
    {
      value: "spawnPoint",
      title: t("Spawn Point"),
      icon: icons["spawn-point"],
      src: "/icons/spawn-point.webp",
      filter: "poi",
    },
    {
      value: "stun-baton",
      title: t("Weapon"),
      icon: icons["stun-baton"],
      src: "/icons/stun-baton.webp",
      filter: "weapons",
    },
    {
      value: "stun-gun",
      title: t("Weapon"),
      icon: icons["stun-gun"],
      src: "/icons/stun-gun.webp",
      filter: ["weapons", "cave-loot"],
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
      filter: ["tools", "cave-loot"],
    },
    {
      value: "shotgun",
      title: t("Rifle"),
      icon: icons.shotgun,
      src: "/icons/shotgun.webp",
      filter: "weapons",
    },
    {
      value: "unicycle",
      title: t("Unicycle"),
      icon: icons.unicycle,
      src: "/icons/knightv.webp",
      filter: "vehicle",
    },
    {
      value: "village",
      title: t("Cannibals living space"),
      icon: icons.village,
      src: "/icons/village.webp",
      filter: "village",
    },
    {
      value: "air-canister",
      title: t("Resources"),
      icon: icons.poi,
      src: "/icons/air-canister.webp",
      filter: "resources", 
    },
    {
      value: "herb",
      title: t("Herbs"),
      icon: icons.poi,
      src: "/icons/aloe-vera.webp",
      filter: "resources",
    },
  ];

  const extendedTypes: NodeType[] = [
    bunkerBook,
    caveBlueprint,
    camp,
    camera,
    bunkerCookingPot,
    bunkerCrate,
    caveCrate,
    bunkerCaseU,
    caveCaseU,
    bunkerCrateU,
    caveCrateU,
    bunkerDocument,
    caveDocument,
    bunkerEmail,
    caveEmail,
    bunkerFlashlightAttachment,
    caveFlashlightAttachment,
    fishingHut,
    laptop,
    bunkerLargeBattery,
    bunkerOutfit,
    caveOutfit,
    bunkerPistol,
    bunkerPutter,
    bunkerPistolRail,
    pond,
    bunkerPOI,
    cavePOI,
    bunkerRadio,
    bunkerShotgunRail,
    bunkerSuppressor,
    bunkerSupply,
    caveSupply,
    bunkerSuitcaseDG,
    caveSuitcaseDG,
    bunkerSuitcaseOr,
    caveSuitcaseOr,
    bunkerSolarPanel,
    waterfall,
  ]
  
  if (onlyBaseTypes) {
  return baseTypes;
  } else {
    return baseTypes.concat(extendedTypes);
  }
}

function createNodeType(base: NodeType, extensions: Partial<NodeType> = {}): NodeType {
  return { ...base, ...extensions };
}

const baseBook: NodeType = {
  value: "book",
  title: t("Book"),
  icon: icons.book,
  src: "/icons/book.webp",
  filter: "documents",
}

const baseCrate: NodeType = {
  value: "wooden-crate",
  title: t("Crate"),
  icon: icons.crate,
  filter: "loot",
}

const bunkerCrate = createNodeType(baseCrate, {
  value: "wooden-crate-bunker",
  filter: ["loot", "bunker-loot"],
})

const caveCrate = createNodeType(baseCrate, {
  value: "wooden-crate-cave",
  filter: ["loot", "cave-loot"],
})

const baseCaseU: NodeType = {
  value: "utility-case",
  title: t("Utility Case"),
  icon: icons.case,
  src: "/icons/utility-case.webp",
  filter: "loot",
}

const bunkerCaseU = createNodeType(baseCaseU, {
  value: "utility-case-bunker",
  filter: ["loot", "bunker-loot"],
})

const caveCaseU = createNodeType(baseCaseU, {
  value: "utility-case-cave",
  filter: ["loot", "cave-loot"],
})

const baseCrateU: NodeType = {
  value: "utility-crate",
  title: t("Utility Crate"),
  icon: icons.case,
  src: "/icons/utility-crate.webp",
  filter: "loot",
}

const bunkerCrateU = createNodeType(baseCrateU, {
  value: "utility-crate-bunker",
  filter: ["loot", "bunker-loot"],
})

const caveCrateU = createNodeType(baseCrateU, {
  value: "utility-crate-cave",
  filter: ["loot", "cave-loot"],
})

const bunkerBook = createNodeType(baseBook, {
  value: "book-bunker",
  filter: ["documents", "bunker-loot"],
})

const baseDocument: NodeType = {
  value: "document",
  title: t("Document"),
  icon: icons.document,
  src: "/icons/document.webp",
  filter: "documents",
}

const bunkerDocument = createNodeType(baseDocument, {
  value: "document-bunker",
  filter: ["documents", "bunker-loot"],
})

const caveDocument = createNodeType(baseDocument, {
  value: "document-cave",
  filter: ["documents", "cave-loot"],
})

const baseLargeBattery: NodeType = {
  value: "large-battery",
  title: t("Electronics"),
  icon: icons.poi,
  src: "/icons/large-battery.webp",
  filter: "resources",
}

const bunkerLargeBattery = createNodeType(baseLargeBattery, {
  value: "large-battery-bunker",
  filter: ["resources", "bunker-loot"],
})

const baseOutfit: NodeType = {
  value: "outfit",
  title: t("Outfit"),
  icon: icons.outfit,
  src: "/icons/outfit.webp",
  filter: "outfits",
}

const bunkerOutfit = createNodeType(baseOutfit, {
  value: "outfit-bunker",
  filter: ["outfits", "bunker-loot"],
})

const caveOutfit = createNodeType(baseOutfit, {
  value: "outfit-cave",
  filter: ["outfits", "cave-loot"],
})

const basePistol: NodeType = {
  value: "pistol",
  title: t("Weapon"),
  icon: icons.pistol,
  src: "/icons/pistol.webp",
  filter: "weapons",
};

const bunkerPistol = createNodeType(basePistol, {
  value: "pistol-bunker",
  filter: ["weapons", "bunker-loot"],
});

const basePutter: NodeType = {
  value: "putter",
  title: t("Weapon"),
  icon: icons.putter,
  src: "/icons/putter.webp",
  filter: "weapons",
}

const bunkerPutter = createNodeType(basePutter, {
  value: "putter-bunker",
  filter: ["weapons", "bunker-loot"],
})

const basePistolRail: NodeType = {
  value: "pistol-rail",
  title: t("Weapon Attachment"),
  icon: icons["pistol-rail"],
  src: "/icons/pistol-rail.webp",
  filter: "attachments",
}

const bunkerPistolRail = createNodeType(basePistolRail, {
  value: "pistol-rail-bunker",
  filter: ["attachments", "bunker-loot"],
})

const basePOI: NodeType = {
  value: "poi",
  title: t("Point of Interest"),
  icon: icons.poi,
  src: "/icons/poi.webp",
  filter: "poi",
}

const bunkerPOI = createNodeType(basePOI, {
  value: "poi-bunker",
  filter: ["poi", "bunker-loot"],
})

const cavePOI = createNodeType(basePOI, {
  value: "poi-cave",
  filter: ["poi", "cave-loot"],
})

const baseRadio: NodeType = {
  value: "radio",
  title: t("Entertainment"),
  icon: icons.poi,
  src: "/icons/radio.webp",
  filter: "resources",
}

const bunkerRadio = createNodeType(baseRadio, {
  value: "radio-bunker",
  filter: ["resources", "bunker-loot"],
})

const baseShotgunRail: NodeType = {
  value: "shotgun-rail",
  title: t("Weapon Attachment"),
  icon: icons["shotgun-rail"],
  src: "/icons/shotgun-rail.webp",
  filter: "attachments",
}

const bunkerShotgunRail = createNodeType(baseShotgunRail, {
  value: "shotgun-rail-bunker",
  filter: ["attachments", "bunker-loot"],
})

const baseSuitcaseDG: NodeType = {
  value: "dark-green-suitcase",
  title: t("Case"),
  icon: icons.case,
  src: "/icons/ammo-case.webp",
  filter: "loot",
}

const bunkerSuitcaseDG = createNodeType(baseSuitcaseDG, {
  value: "dark-green-suitcase-bunker",
  filter: ["loot", "bunker-loot"],
})

const caveSuitcaseDG = createNodeType(baseSuitcaseDG, {
  value: "dark-green-suitcase-cave",
  filter: ["loot", "cave-loot"],
})

const baseSuitcaseOr: NodeType = {
  value: "orange-suitcase",
  title: t("Case"),
  icon: icons.case,
  src: "/icons/flare-case.webp",
  filter: "loot",
}

const bunkerSuitcaseOr = createNodeType(baseSuitcaseOr, {
  value: "orange-suitcase-bunker",
  filter: ["loot", "bunker-loot"],
})

const caveSuitcaseOr = createNodeType(baseSuitcaseOr, {
  value: "orange-suitcase-cave",
  filter: ["loot", "cave-loot"],
})

const baseSolarPanel: NodeType = {
  value: "solar-panel",
  title: t("Electronics"),
  icon: icons.poi,
  src: "/icons/solar-panel.webp",
  filter: "resources",
}

const bunkerSolarPanel = createNodeType(baseSolarPanel, {
  value: "solar-panel-bunker",
  filter: ["resources", "bunker-loot"],
})

const baseFlashlightAttachment: NodeType = {
  value: "flashlight-attachment",
  title: t("Weapon Attachment"),
  icon: icons["flashlight-attachment"],
  src: "/icons/flashlight-attachment.webp",
  filter: "attachments",
}

const bunkerFlashlightAttachment = createNodeType(baseFlashlightAttachment, {
  value: "flashlight-attachment-bunker",
  filter: ["attachments", "bunker-loot"],
})

const caveFlashlightAttachment = createNodeType(baseFlashlightAttachment, {
  value: "flashlight-attachment-cave",
  filter: ["attachments", "cave-loot"],
})

const baseSuppressor: NodeType = {
  value: "suppressor",
  title: t("Weapon Attachment"),
  icon: icons.suppressor,
  src: "/icons/suppressor.webp",
  filter: "attachments",
}

const bunkerSuppressor = createNodeType(baseSuppressor, {
  value: "suppressor-bunker",
  filter: ["attachments", "bunker-loot"],
})

const baseSupply: NodeType = {
  value: "supply",
  title: t("Supply"),
  icon: icons.case,
  filter: "loot",
}

const bunkerSupply = createNodeType(baseSupply, {
  value: "supply-bunker",
  filter: "loot",
})

const caveSupply = createNodeType(baseSupply, {
  value: "supply-cave",
  filter: "loot",
})

const baseLake: NodeType = {
  value: "lake",
  title: t("Water Body"),
  icon: icons.poi,
  src: "/icons/water.webp",
  filter: "lake",
}

const pond = createNodeType(baseLake, {
  value: "pond",
  title: t("Water Body"),
  filter: "pond",
})

const waterfall = createNodeType(baseLake, {
  value: "waterfall",
  title: t("Waterfall"),
  filter: "lake",
})

const baseCamp: NodeType = {
  value: "abandoned-camp-y",
  title: t("With save point"),
  icon: icons["abandoned-camp"],
  src: "/icons/abandoned-camp.webp",
  filter: "abandoned-camp",
}

const camp = createNodeType(baseCamp, {
  value: "abandoned-camp-n",
  title: t("Without save point"),
  filter: "abandoned-camp",
})

const fishingHut = createNodeType(baseCamp, {
  value: "fishing-hut",
  title: t("Fishing Hut"),
  filter: "abandoned-camp",
})

const baseLaptop: NodeType = {
  value: "laptop-cave",
  title: t("Upload location to GPS Tracker"),
  icon: icons.laptop,
  src: "/icons/laptop.webp",
  filter: "laptop",
}

const laptop = createNodeType(baseLaptop, {
  value: "laptop-bunker",
  filter: "laptop",
})

const baseCamera: NodeType = {
  value: "action-camera",
  title: t("Watch pre-made videos"),
  icon: icons["action-camera"],
  src: "/icons/action-camera.webp",
  filter: "tools",
}

const camera = createNodeType(baseCamera, {
  value: "action-camera-bunker",
  filter: ["tools", "bunker-loot"],
})

const baseBlueprint: NodeType = {
  value: "blueprint",
  title: t("Blueprint"),
  icon: icons.document,
  src: "/icons/document.webp",
  filter: "blueprint",
}

const caveBlueprint = createNodeType(baseBlueprint, {
  value: "blueprint-cave",
  filter: ["blueprint", "cave-loot"],
})

const baseCookingPot: NodeType = {
  value: "cooking-pot",
  title: t("Tool"),
  icon: icons.poi,
  src: "/icons/cooking-pot.webp",
  filter: "tools",
}

const bunkerCookingPot = createNodeType(baseCookingPot, {
  value: "cooking-pot-bunker",
  filter: ["tools", "bunker-loot"],
})

const baseEmail: NodeType = {
  value: "email",
  title: t("Email"),
  icon: icons.document,
  src: "/icons/email.webp",
  filter: "documents",
}

const bunkerEmail = createNodeType(baseEmail, {
  value: "email-bunker",
  filter: ["documents", "bunker-loot"],
})

const caveEmail = createNodeType(baseEmail, {
  value: "email-cave",
  filter: ["documents", "cave-loot"],
})

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
      color: "rgb(153, 201, 210)",
    },
    {
      value: "vehicle",
      title: t("Transportation"),
      color: "rgb(192, 192, 255)",
    },
    {
      value: "cave",
      title: t("Caves"),
      color: "rgb(191, 230, 255)",
    },
    {
      value: "weapons",
      title: t("Weapons"),
      color: "rgb(136, 55, 156)",
    },
    {
      value: "cave-loot",
      title: t("Cave Loot"),
      color: "rgb(173 216 230)",
    },
    {
      value: "attachments",
      title: t("Attachments"),
      color: "rgb(186, 85, 236)",
    },
    {
      value: "bunker-hatch",
      title: t("Bunkers"),
      color: "rgb(191, 230, 255)",
    },
    {
      value: "outfits",
      title: t("Outfits"),
      color: "rgb(206, 105, 231)",
    },
    {
      value: "bunker-loot",
      title: t("Bunker Loot"),
      color: "rgb(173, 216, 230)",
    },
    {
      value: "tools",
      title: t("Tools"),
      color: "rgb(96, 160, 96)",
    },
    {
      value: "village",
      title: t("Villages"),
      color: "rgb(255, 0, 0)",
    },
    {
      value: "resources",
      title: t("Resources"),
      color: "rgb(92, 177, 59)",
    },
    {
      value: "abandoned-camp",
      title: t("Campsites"),
      color: "rgb(152, 251, 152)",
    },
    {
      value: "laptop",
      title: t("Laptops"),
      color: "rgb(153, 230, 153)",
    },
    {
      value: "pond",
      title: t("Ponds"),
      color: "rgb(44, 44, 255)",
    },
    {
      value: "printer",
      title: t("3D Printers"),
      color: "rgb(179, 255, 179)",
    },
    {
      value: "lake",
      title: t("Lakes"),
      color: "rgb(44, 44, 175)",
    },
    {
      value: "blueprint",
      title: t("Blueprints"),
      color: "rgb(255, 180, 0)",
    },
    {
      value: "loot",
      title: t("Loot Cases"),
      color: "rgb(170, 120, 70)",
    },
    {
      value: "artifact",
      title: t("Artifacts"),
      color: "rgb(255, 150, 0)",
    },
    {
      value: "documents",
      title: t("Documents"),
      color: "rgb(255, 210, 0)",
    },
  ];
}

export function getDeselectedFilters() {
  return getItem<string[]>("deselected_filters", []);
}

export function setDeselectedFilters(deselectedFilters: string[]) {
  setItem("deselected_filters", deselectedFilters);
}
