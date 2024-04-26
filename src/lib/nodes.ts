import { t } from "./i18n";
import icons from "./icons.json";
import { MapLocation } from "./locations";
import { getItem, setItem } from "./storage";

export interface NodeType {
  value: string;
  title: string;
  icon: string;
  src?: string;
  filter?: string[] | undefined;
  inBunker?: boolean;
  inCave?: boolean;
};

export interface NodeTypeOptions extends Partial<NodeType> {
  inCave?: boolean;
  inBunker?: boolean;
  additionalFilters?: string[];
}

const defaultUknown: NodeType = {
  value: "unknown",
  title: t("Unknown"),
  icon: icons.unknown,
}

const baseArtifactA: NodeType = {
  value: "artifact-a",
  title: t("Artifact"),
  icon: icons.poi,
  src: "/icons/artifact-a.webp",
  filter: ["artifact"],
}

const baseArtifactB: NodeType = {
  value: "artifact-b",
  title: t("Artifact"),
  icon: icons.poi,
  src: "/icons/artifact-b.webp",
  filter: ["artifact"],
}

const baseArtifactC: NodeType = {
  value: "artifact-c",
  title: t("Artifact"),
  icon: icons.poi,
  src: "/icons/artifact-c.webp",
  filter: ["artifact"],
}

const baseArtifactD: NodeType = {
  value: "artifact-d",
  title: t("Artifact"),
  icon: icons.poi,
  src: "/icons/artifact-d.webp",
  filter: ["artifact"],
}

const baseArtifactE: NodeType = {
  value: "artifact-e",
  title: t("Artifact"),
  icon: icons.poi,
  src: "/icons/artifact-e.webp",
  filter: ["artifact"],
}

const baseBook: NodeType = {
  value: "book",
  title: t("Book"),
  icon: icons.book,
  src: "/icons/book.webp",
  filter: ["documents"],
}

const baseBinoculars: NodeType = {
  value: "binoculars",
  title: t("Tool"),
  icon: icons.binoculars,
  src: "/icons/binoculars.webp",
  filter: ["tools"],
}

const baseBlueprint: NodeType = {
  value: "blueprint",
  title: t("Blueprint"),
  icon: icons.document,
  src: "/icons/document.webp",
  filter: ["blueprint"],
}

const baseBunkerHatch: NodeType = {
  value: "bunker-hatch",
  title: t("Bunker Hatch"),
  icon: icons["bunker-hatch"],
  src: "/icons/bunker-hatch.webp",
  filter: ["bunker-hatch"],
}

const baseFinalBunker: NodeType = {
  value: "final-bunker",
  title: t("Final Bunker"),
  icon: icons["final-bunker"],
  src: "/icons/final-bunker.webp",
  filter: ["bunker-hatch"],
}

const baseCamp: NodeType = {
  value: "abandoned-camp-y",
  title: t("With save point"),
  icon: icons["abandoned-camp"],
  src: "/icons/abandoned-camp.webp",
  filter: ["abandoned-camp"],
}

const camp = createNodeType(baseCamp, {
  value: "abandoned-camp-n",
  title: t("Without save point"),
  filter: ["abandoned-camp"],
})

const fishingHut = createNodeType(baseCamp, {
  value: "fishing-hut",
  title: t("Fishing Hut"),
  filter: ["abandoned-camp"],
})

const baseCamera: NodeType = {
  value: "action-camera",
  title: t("Watch pre-made videos"),
  icon: icons["action-camera"],
  src: "/icons/action-camera.webp",
  filter: ["tools"],
}

const baseCaseU: NodeType = {
  value: "utility-case",
  title: t("Utility Case"),
  icon: icons.case,
  src: "/icons/utility-case.webp",
  filter: ["loot"],
}

const baseCave: NodeType = {
  value: "cave",
  title: t("Cave"),
  icon: icons.cave,
  src: "/icons/cave.webp",
  filter: ["cave"],
}

const baseCanOpener: NodeType = {
  value: "can-opener",
  title: t("Tool"),
  icon: icons["can-opener"],
  src: "/icons/can-opener.webp",
  filter: ["tools"],
}

const baseCookingPot: NodeType = {
  value: "cooking-pot",
  title: t("Tool"),
  icon: icons.poi,
  src: "/icons/cooking-pot.webp",
  filter: ["tools"],
}

const baseCompoundBow: NodeType = {
  value: "compound-bow",
  title: t("Weapon"),
  icon: icons["compound-bow"],
  src: "/icons/compound-bow.webp",
  filter: ["weapons"],
}

const baseChainsaw: NodeType = {
  value: "chainsaw",
  title: t("Tool"),
  icon: icons.chainsaw,
  src: "/icons/chainsaw.webp",
  filter: ["tools"],
}

const baseCross: NodeType = {
  value: "cross",
  title: t("Weapon"),
  icon: icons.cross,
  src: "/icons/cross.webp",
  filter: ["weapons"],
}

const baseCrossbow: NodeType = {
  value: "crossbow",
  title: t("Weapon"),
  icon: icons.crossbow,
  src: "/icons/crossbow.webp",
  filter: ["weapons"],
}

const baseCrate: NodeType = {
  value: "wooden-crate",
  title: t("Crate"),
  icon: icons.crate,
  filter: ["loot"],
}

const baseCrateU: NodeType = {
  value: "utility-crate",
  title: t("Utility Crate"),
  icon: icons.case,
  src: "/icons/utility-crate.webp",
  filter: ["loot"],
}

const baseDocument: NodeType = {
  value: "document",
  title: t("Document"),
  icon: icons.document,
  src: "/icons/document.webp",
  filter: ["documents"],
}

const baseEmail: NodeType = {
  value: "email",
  title: t("Email"),
  icon: icons.document,
  src: "/icons/email.webp",
  filter: ["documents"],
}

const baseFirefighterAxe: NodeType = {
  value: "firefighter-axe",
  title: t("Tool"),
  icon: icons["firefighter-axe"],
  src: "/icons/firefighter-axe.webp",
  filter: ["tools"],
}

const baseFlashlight: NodeType = {
  value: "flashlight",
  title: t("Tool"),
  icon: icons.flashlight,
  src: "/icons/flashlight.webp",
  filter: ["tools"],
}

const baseFlashlightAttachment: NodeType = {
  value: "flashlight-attachment",
  title: t("Weapon Attachment"),
  icon: icons["flashlight-attachment"],
  src: "/icons/flashlight-attachment.webp",
  filter: ["attachments"],
}

const baseGrave: NodeType = {
  value: "grave",
  title: t("Grave"),
  icon: icons.poi,
  src: "/icons/grave.webp",
  filter: ["poi"],
}

const baseGoldenArmor: NodeType = {
  value: "golden-armor",
  title: t("Player Gear"),
  icon: icons["golden-armor"],
  src: "/icons/golden-armor.webp",
  filter: ["outfits"],
}

const baseGoldenMask: NodeType = {
  value: "golden-mask",
  title: t("Player Gear"),
  icon: icons.outfit,
  src: "/icons/golden-mask.webp",
  filter: ["outfits"],
}

const baseGolfCart: NodeType = {
  value: "golf-cart",
  title: t("Vehicle"),
  icon: icons.unicycle,
  src: "/icons/golf-cart.webp",
  filter: ["vehicle"],
}

const baseGPSLocator: NodeType = {
  value: "gps-locator",
  title: t("Tool"),
  icon: icons["gps-locator"],
  src: "/icons/gps-locator.webp",
  filter: ["tools"],
}

const baseGuitar: NodeType = {
  value: "guitar",
  title: t("Weapon"),
  icon: icons.guitar,
  src: "/icons/guitar.webp",
  filter: ["weapons"],
}

const baseHangGlider: NodeType = {
  value: "hang-glider",
  title: t("Aircarft"),
  icon: icons["hang-glider"],
  src: "/icons/hang-glider.webp",
  filter: ["vehicle"],
}

const baseHelicopter: NodeType = {
  value: "helicopter",
  title: t("Point of Interest"),
  icon: icons.helicopter,
  src: "/icons/helicopter.webp",
  filter: ["poi"],
}

const baseKatana: NodeType = {
  value: "katana",
  title: t("Weapon"),
  icon: icons.katana,
  src: "/icons/katana.webp",
  filter: ["weapons"],
}

const baseKeycard: NodeType = {
  value: "keycard",
  title: t("Keycard"),
  icon: icons.keycard,
  src: "/icons/keycard.webp",
  filter: ["tools"],
}

const baseLake: NodeType = {
  value: "lake",
  title: t("Water Body"),
  icon: icons.poi,
  src: "/icons/water.webp",
  filter: ["lake"],
}

const pond = createNodeType(baseLake, {
  value: "pond",
  title: t("Water Body"),
  filter: ["pond"],
})

const waterfall = createNodeType(baseLake, {
  value: "waterfall",
  title: t("Waterfall"),
  filter: ["lake"],
})

const baseLaptop: NodeType = {
  value: "laptop",
  title: t("Upload location to GPS Tracker"),
  icon: icons.laptop,
  src: "/icons/laptop.webp",
  filter: ["laptop"],
}

const baseLargeBattery: NodeType = {
  value: "large-battery",
  title: t("Electronics"),
  icon: icons.poi,
  src: "/icons/large-battery.webp",
  filter: ["electronics"],
}

const baseLaserAttachment: NodeType = {
  value: "laser-attachment",
  title: t("Weapon Attachment"),
  icon: icons["laser-sight"],
  src: "/icons/laser-sight.webp",
  filter: ["attachments"],
}

const baseMachete: NodeType = {
  value: "machete",
  title: t("Weapon"),
  icon: icons.machete,
  src: "/icons/machete.webp",
  filter: ["weapons"],
}

const baseModernAxe: NodeType = {
  value: "modern-axe",
  title: t("Tool"),
  icon: icons["firefighter-axe"],
  src: "/icons/modern-axe.webp",
  filter: ["tools"],
}

const baseNightVision: NodeType = {
  value: "night-vision",
  title: t("Goggles"),
  icon: icons["night-vision"],
  src: "/icons/night-vision.webp",
  filter: ["tools"],
}

const baseOutfit: NodeType = {
  value: "outfit",
  title: t("Outfit"),
  icon: icons.outfit,
  src: "/icons/outfit.webp",
  filter: ["outfits"],
}

const basePamphlet: NodeType = {
  value: "pamphlet",
  title: t("Pamphlet"),
  icon: icons.document,
  src: "/icons/pamphlet.webp",
  filter: ["documents"],
}

const basePistol: NodeType = {
  value: "pistol",
  title: t("Weapon"),
  icon: icons.pistol,
  src: "/icons/pistol.webp",
  filter: ["weapons"],
}

const basePistolRail: NodeType = {
  value: "pistol-rail",
  title: t("Weapon Attachment"),
  icon: icons["pistol-rail"],
  src: "/icons/pistol-rail.webp",
  filter: ["attachments"],
}

const basePickaxe: NodeType = {
  value: "pickaxe",
  title: t("Tool"),
  icon: icons.poi,
  src: "/icons/pickaxe.webp",
  filter: ["tools"],
}

const basePOI: NodeType = {
  value: "poi",
  title: t("Point of Interest"),
  icon: icons.poi,
  src: "/icons/poi.webp",
  filter: ["poi"],
}

const basePrinter: NodeType = {
  value: "printer",
  title: t("3D Printer"),
  icon: icons.printer,
  src: "/icons/printer.webp",
  filter: ["printer"],
}

const basePutter: NodeType = {
  value: "putter",
  title: t("Weapon"),
  icon: icons.putter,
  src: "/icons/putter.webp",
  filter: ["weapons"],
}

const baseRadio: NodeType = {
  value: "radio",
  title: t("Entertainment"),
  icon: icons.poi,
  src: "/icons/radio.webp",
  filter: ["electronics"],
}

const baseRebreather: NodeType = {
  value: "rebreather",
  title: t("Tool"),
  icon: icons.rebreather,
  src: "/icons/rebreather.webp",
  filter: ["tools"],
}

const baseRevolver: NodeType = {
  value: "revolver",
  title: t("Weapon"),
  icon: icons.revolver,
  src: "/icons/revolver.webp",
  filter: ["weapons"],
}

const baseRifle: NodeType = {
  value: "rifle",
  title: t("Weapon"),
  icon: icons.shotgun,
  src: "/icons/rifle.webp",
  filter: ["weapons"],
}

const baseRopeGun: NodeType = {
  value: "rope-gun",
  title: t("Tool"),
  icon: icons["rope-gun"],
  src: "/icons/rope-gun.webp",
  filter: ["tools"],
}

const baseShotgun: NodeType = {
  value: "shotgun",
  title: t("Weapon"),
  icon: icons.shotgun,
  src: "/icons/shotgun.webp",
  filter: ["weapons"],
}

const baseShotgunRail: NodeType = {
  value: "shotgun-rail",
  title: t("Weapon Attachment"),
  icon: icons["shotgun-rail"],
  src: "/icons/shotgun-rail.webp",
  filter: ["attachments"],
}

const baseShovel: NodeType = {
  value: "shovel",
  title: t("Tool"),
  icon: icons.shovel,
  src: "/icons/shovel.webp",
  filter: ["tools"],
}

const baseSlingshot: NodeType = {
  value: "slingshot",
  title: t("Weapon"),
  icon: icons.slingshot,
  src: "/icons/slingshot.webp",
  filter: ["weapons"],
}

const baseSpawnPoint: NodeType = {
  value: "spawn-point",
  title: t("Spawn Point"),
  icon: icons["spawn-point"],
  src: "/icons/spawn-point.webp",
  filter: ["poi"],
}

const baseStunBaton: NodeType = {
  value: "stun-baton",
  title: t("Weapon"),
  icon: icons["stun-baton"],
  src: "/icons/stun-baton.webp",
  filter: ["weapons"],
}

const baseStunGun: NodeType = {
  value: "stun-gun",
  title: t("Weapon"),
  icon: icons["stun-gun"],
  src: "/icons/stun-gun.webp",
  filter: ["weapons"],
}

const baseSolarPanel: NodeType = {
  value: "solar-panel",
  title: t("Electronics"),
  icon: icons.poi,
  src: "/icons/solar-panel.webp",
  filter: ["electronics"],
}

const baseSuppressor: NodeType = {
  value: "suppressor",
  title: t("Weapon Attachment"),
  icon: icons.suppressor,
  src: "/icons/suppressor.webp",
  filter: ["attachments"],
}

const baseSupply: NodeType = {
  value: "supply",
  title: t("Supply"),
  icon: icons.case,
  filter: ["loot"],
}

const baseSuitcaseDG: NodeType = {
  value: "dark-green-suitcase",
  title: t("Case"),
  icon: icons.case,
  src: "/icons/ammo-case.webp",
  filter: ["loot"],
}

const baseSuitcaseOr: NodeType = {
  value: "orange-suitcase",
  title: t("Case"),
  icon: icons.case,
  src: "/icons/flare-case.webp",
  filter: ["loot"],
}

const baseUnicycle: NodeType = {
  value: "unicycle",
  title: t("Unicycle"),
  icon: icons.unicycle,
  src: "/icons/knightv.webp",
  filter: ["vehicle"],
}

const baseVillage: NodeType = {
  value: "village",
  title: t("Village"),
  icon: icons.village,
  src: "/icons/village.webp",
  filter: ["village"],
}

type NodeTypeKey = 'unknown' | 'artifact-a' | 'artifact-b' | 'artifact-c' | 'artifact-d' | 'artifact-e' |
  'book' | 'binoculars' | 'blueprint' | 'bunker-hatch' | 'final-bunker' | 'camp-y' | 'camp-n' | 'fishing-hut' | 'camera' | 'caseu' | 'cave' | 
  'canopener' | 'cookingpot' | 'compoundbow' | 'chainsaw' | 'cross' | 'crossbow' | 'crate' | 'crateu' | 'document' | 
  'email' | 'firefighteraxe' | 'flashlight' | 'flashlight-attachment' | 'grave' | 'golden-armor' | 'golden-mask' | 
  'golf-cart' | 'gps-locator' | 'guitar' | 'hang-glider' | 'helicopter' | 'katana' | 'keycard' | 'lake' | 'pond' | 'waterfall' | 'laptop' | 
  'largebattery' | 'laser-attachment' | 'machete' | 'modern-axe' | 'night-vision' | 'outfit' | 'pamphlet' | 'pistol' | 
  'pistol-rail' | 'pickaxe' | 'poi' | 'printer' | 'putter' | 'radio' | 'rebreather' | 'revolver' | 'rifle' | 'rope-gun' | 
  'shotgun' | 'shotgun-rail' | 'shovel' | 'slingshot' | 'spawn-point' | 'stun-baton' | 'stun-gun' | 'solar-panel' | 
  'suppressor' | 'supply' | 'suitcase-dg' | 'suitcase-or' | 'unicycle' | 'village';

export function getBaseType(type: NodeTypeKey): NodeType {
  switch(type) {
    case 'unknown': return defaultUknown;
    case 'artifact-a': return baseArtifactA;
    case 'artifact-b': return baseArtifactB;
    case 'artifact-c': return baseArtifactC;
    case 'artifact-d': return baseArtifactD;
    case 'artifact-e': return baseArtifactE;
    case 'book' : return baseBook;
    case 'binoculars' : return baseBinoculars;
    case 'blueprint' : return baseBlueprint;
    case 'bunker-hatch' : return baseBunkerHatch;
    case 'final-bunker' : return baseFinalBunker;
    case 'camp-y' : return baseCamp;
    case 'camp-n' : return camp;
    case 'fishing-hut' : return fishingHut;
    case 'camera' : return baseCamera;
    case 'caseu' : return baseCaseU;
    case 'cave' : return baseCave;
    case 'canopener' : return baseCanOpener;
    case 'cookingpot' : return baseCookingPot;
    case 'compoundbow' : return baseCompoundBow;
    case 'chainsaw' : return baseChainsaw;
    case 'cross' : return baseCross;
    case 'crossbow' : return baseCrossbow;
    case 'crate' : return baseCrate;
    case 'crateu' : return baseCrateU;
    case 'document' : return baseDocument;
    case 'email' : return baseEmail;
    case 'firefighteraxe' : return baseFirefighterAxe;
    case 'flashlight' : return baseFlashlight;
    case 'flashlight-attachment' : return baseFlashlightAttachment;
    case 'grave' : return baseGrave;
    case 'golden-armor' : return baseGoldenArmor;
    case 'golden-mask' : return baseGoldenMask;
    case 'golf-cart' : return baseGolfCart;
    case 'gps-locator' : return baseGPSLocator;
    case 'guitar' : return baseGuitar;
    case 'hang-glider' : return baseHangGlider;
    case 'helicopter' : return baseHelicopter;
    case 'katana' : return baseKatana;
    case 'keycard' : return baseKeycard;
    case 'lake' : return baseLake;
    case 'pond' : return pond;
    case 'waterfall' : return waterfall;
    case 'laptop' : return baseLaptop;
    case 'largebattery' : return baseLargeBattery;
    case 'laser-attachment' : return baseLaserAttachment;
    case 'machete' : return baseMachete;
    case 'modern-axe' : return baseModernAxe;
    case 'night-vision' : return baseNightVision;
    case 'outfit' : return baseOutfit;
    case 'pamphlet' : return basePamphlet;
    case 'pistol' : return basePistol;
    case 'pistol-rail' : return basePistolRail;
    case 'pickaxe' : return basePickaxe;
    case 'poi' : return basePOI;
    case 'printer' : return basePrinter;
    case 'putter' : return basePutter;
    case 'radio' : return baseRadio;
    case 'rebreather' : return baseRebreather;
    case 'revolver' : return baseRevolver;
    case 'rifle' : return baseRifle;
    case 'rope-gun' : return baseRopeGun;
    case 'shotgun' : return baseShotgun;
    case 'shotgun-rail' : return baseShotgunRail;
    case 'shovel' : return baseShovel;
    case 'slingshot' : return baseSlingshot;
    case 'spawn-point' : return baseSpawnPoint;
    case 'stun-baton' : return baseStunBaton;
    case 'stun-gun' : return baseStunGun;
    case 'solar-panel' : return baseSolarPanel;
    case 'suppressor' : return baseSuppressor;
    case 'supply' : return baseSupply;
    case 'suitcase-dg' : return baseSuitcaseDG;
    case 'suitcase-or' : return baseSuitcaseOr;
    case 'unicycle' : return baseUnicycle;
    case 'village' : return baseVillage;

    default: return defaultUknown;
  }
}

export function getAllNodeTypes(): NodeType[] {
  return [
    defaultUknown, baseArtifactA, baseArtifactB, baseArtifactC, baseArtifactD, baseArtifactE, baseBook,
    baseBinoculars, baseBlueprint, baseBunkerHatch, baseFinalBunker, baseCamp, camp, fishingHut, baseCamera, 
    baseCaseU, baseCave, baseCanOpener, baseCookingPot, baseCompoundBow, baseChainsaw, baseCross, baseCrossbow,
    baseCrate, baseCrateU, baseDocument, baseEmail, baseFirefighterAxe, baseFlashlight,
    baseFlashlightAttachment, baseGrave, baseGoldenArmor, baseGoldenMask, baseGolfCart, baseGPSLocator,
    baseGuitar, baseHangGlider, baseHelicopter, baseKatana, baseKeycard, baseLake, pond, waterfall, baseLaptop,
    baseLargeBattery, baseLaserAttachment, baseMachete, baseModernAxe, baseNightVision, baseOutfit,
    basePamphlet, basePistol, basePistolRail, basePickaxe, basePOI, basePrinter, basePutter,
    baseRadio, baseRebreather, baseRevolver, baseRifle, baseRopeGun, baseShotgun, baseShotgunRail,
    baseShovel, baseSlingshot, baseSpawnPoint, baseStunBaton, baseStunGun, baseSolarPanel,
    baseSuppressor, baseSupply, baseSuitcaseDG, baseSuitcaseOr, baseUnicycle, baseVillage
  ];
}

export function loadTypes(data: any[]): NodeType[] {
    return data.map((loc) => {
      const baseType = getBaseType(loc.type as NodeTypeKey);
      const filters = baseType.filter ? [...baseType.filter] : [];

      if (loc.inCave) {
        filters.push("cave-loot");
      }
      if (loc.inBunker) {
        filters.push("bunker-loot");
      }

      return createNodeType(baseType, {
        ...loc,
        filter: filters,
      });
    });
  }
  export function createNodeType(base: NodeType, options: NodeTypeOptions = {}): NodeType {
    const { inCave = false, inBunker = false, additionalFilters = [], ...extensions } = options;
    let filters = [...(base.filter || []), ...additionalFilters];
  
    if (inCave) {
      filters.push("cave-loot");
    }
    if (inBunker) {
      filters.push("bunker-loot");
    }

      return { ...base, ...extensions, filter: filters };
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
      color: "rgb(173 216 230)",
    },
    {
      value: "tools",
      title: t("Tools"),
      color: "rgb(96, 160, 96)",
    },
    {
      value: "village",
      title: t("Villages"),
      color: "rgb(255 0 0)",
    },
    {
      value: "electronics",
      title: t("Electronics"),
      color: "rgb(128, 200, 128)",
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
