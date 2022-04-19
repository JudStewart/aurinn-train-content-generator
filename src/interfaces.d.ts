export type IRace =
  | "dragonborn"
  | "dwarf"
  | "elf"
  | "gnome"
  | "halfling"
  | "human"
  | "halfOrc"
  | "halfElf"
  | "tiefling"
  | "aasimar"
  | "orc"
  | "leonin"
  | "satyr"
  | "fairy"
  | "herengon"
  | "owlin"
  | "aarakocra"
  | "genasi"
  | "goliath"
  | "bugbear"
  | "firbolg"
  | "goblin"
  | "hobgoblin"
  | "kenku"
  | "kobold"
  | "lizardfolk"
  | "tabaxi"
  | "triton"
  | "yuan-ti"
  | "feralTiefling"
  | "tortle"
  | "changeling"
  | "kalashtar"
  | "shifter"
  | "warforged"
  | "gith"
  | "centaur"
  | "loxodon"
  | "minotaur"
  | "simicHybrid"
  | "vedalken"
  | "verdan"
  | "locathah"
  | "grung";
  
export type IClass = 
  | "barbarian"
  | "bard"
  | "cleric"
  | "druid"
  | "fighter"
  | "monk"
  | "paladin"
  | "ranger"
  | "rogue"
  | "sorcerer"
  | "warlock"
  | "wizard"
  | "artificer"

export type IEstablishmentType =
  | "general_store"
  | "stable"
  | "inn"
  | "tavern"
  | "armoursmith"
  | "weaponsmith"
  | "carpenter"
  | "leatherworker"
  | "tanner"
  | "cobbler"
  | "bakery";

export type IGender = "male" | "female";

export type ISeed = string | number;

export interface INameGenerateProps {
  race?: IRace;
  gender?: IGender;
  cls?: IClass;
  seed?: ISeed;
}

export interface INameDomainObject {
  seed: string;
  name: string;
  race: IRace;
  gender: IGender;
  firstName: string;
  lastName: string;
  formattedData: {
    name: string;
    race: string;
    gender: string;
    firstName: string;
    lastName: string;
  };
}

export interface INPCGenerateProps {
  race?: IRace;
  gender?: IGender;
  seed?: ISeed;
  shouldGenerateRelations?: boolean;
}

export interface INPCRelationObject {
  relationTitle: string;
  npc: INameDomainObject;
}

export interface INPCDomainObject {
  seed: ISeed;
  nameObject: INameDomainObject;
  gender: IGender;
  race: IRace;
  traits: string[];
  desires: string[];
  formattedData: {
    name: string;
    firstName: string;
    lastName: string;
    gender: string;
    race: string;
    traits: string[];
    desires: string[];
    relations: INPCRelationObject[];
    vocation?: string;
  };
  relations: INPCRelationObject[];
  vocation?: string;
}

export interface ISettlementGenerateProps {
  type?: string;
  seed?: ISeed;
}

export interface ISettlementDomainObject {
  seed: ISeed;
  type: string;
  population: string;
}

export interface IStoryhookGenerateProps {
  seed?: ISeed;
  storyhookBank?: eStoryhookBanks;
}

export enum eStoryhookBanks {
  NPC_ACTS = "NPC_ACTS",
  PC_RELATED = "PC_RELATED",
  LOCATION_BASED_URBAN = "LOCATION_BASED_URBAN",
  LOCATION_BASED_WILDERNESS = "LOCATION_BASED_WILDERNESS",
}

export interface IStoryhookDomainObject {
  seed: ISeed;
  storyhook: string;
  storyhookBank: eStoryhookBanks;
}

export interface IMagicItemGenerateProps {
  seed?: ISeed;
  type?: string;
  powerLevel?: string;
  schoolOfMagic?: string;
  effects?: string[];
  subtype?: string;
}

export interface IMagicItemDomainObject {
  type: string;
  subtype: string;
  powerLevel: string;
  schoolOfMagic: string;
  effects: string[];
  formattedData: {
    title: any;
    owner: any;
    tagline: any;
  };
}

export interface ILootGenerateProps {
  source?: string;
  seed?: string;
  quantity?: number;
}

export interface ILootDomainObject {
  seed: string;
  source: string;
  lootItems: string[];
  quantity: number;
  formattedData: {
    lootItems: string[];
    quantity: number;
    label: string;
  };
}

export interface IEstablishmentGenerateProps {
  seed?: ISeed;
  type?: IEstablishmentType;
}

export interface IEstablishmentDomainObject {
  seed: ISeed;
  type: string;
  name: string;
  npcs: INPCDomainObject[];
  secret: string;
  formattedData: {
    name: string;
    type: string;
    secret: string;
    npcs: INPCDomainObject[];
  };
}

export interface IMonsterGenerateProps {
  type?: string;
  seed?: ISeed;
}

export interface IMonsterDomainObject {
  seed: ISeed;
  type: string;
  formattedDescription: string;
}
