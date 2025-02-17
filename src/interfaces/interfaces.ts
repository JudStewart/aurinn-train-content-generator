export const races = ["dragonborn",
  "dwarf",
  "elf",
  "gnome",
  "halfling",
  "human",
  "halfOrc",
  "halfElf",
  "tiefling",
  "aasimar",
  "orc",
  "leonin",
  "satyr",
  "fairy",
  "harengon",
  "owlin",
  "aarakocra",
  "genasi",
  "goliath",
  "bugbear",
  "firbolg",
  "goblin",
  "hobgoblin",
  "kenku",
  "kobold",
  "lizardfolk",
  "tabaxi",
  "triton",
  "yuan-ti",
  "feralTiefling",
  "tortle",
  "changeling",
  "kalashtar",
  "shifter",
  "warforged",
  "gith",
  "centaur",
  "loxodon",
  "minotaur",
  "simicHybrid",
  "vedalken",
  "verdan",
  "locathah",
  "grung"];
export type IRace = typeof races[number];
  
export const classes = [
  "barbarian",
  "bard",
  "cleric",
  "druid",
  "fighter",
  "monk",
  "paladin",
  "ranger",
  "rogue",
  "sorcerer",
  "warlock",
  "wizard",
  "artificer"
]
export type IClass = typeof classes[number];

export const backgrounds = [
  "acolyte",
  "anthropologist",
  "archaeologist",
  "athlete",
  "celebrity adventurer's scion",
  "charlatan",
  "city watch / investigator",
  "clan crafter",
  "cloistered scholar",
  "courtier",
  "criminal",
  "entertainer",
  "faceless",
  "failed merchant",
  "feylost",
  "fisher",
  "folk hero",
  "gambler",
  "gladiator",
  "guild artisan / guild merchant",
  "haunted one",
  "hermit",
  "inheritor",
  "investigator",
  "knight",
  "knight of the order",
  "marine",
  "mercenary veteran",
  "noble",
  "outlander",
  "pirate",
  "sage",
  "sailor",
  "shipwright",
  "smuggler",
  "soldier",
  "urban bounty hunter",
  "urchin",
  "astral drifter",
  "wildspacer"
]
export type IPCBackground = typeof backgrounds[number]

export const abilities = [
  "strength",
  "dexterity",
  "constitution",
  "intelligence",
  "wisdom",
  "charisma"
]
export type Ability = typeof abilities[number]

export const skills = [
  "athletics",
  "acrobatics",
  "sleight of hand",
  "stealth",
  "arcana",
  "history",
  "investigation",
  "nature",
  "religion",
  "animal handling",
  "insight",
  "medicine",
  "perception",
  "survival",
  "deception",
  "intimidation",
  "performance",
  "persuasion"
]
export type ISkill = typeof skills[number]

export const morality = [
  "good",
  "neutral",
  "evil"
]
export type IMorality = typeof morality[number]

export const adherence = [
  "lawful",
  "neutral",
  "chaotic"
]
export type IAdherence = typeof adherence[number]

export type IPersonalityTrait = string
export type IIdeal = string
export type IBond = string
export type IFlaw = string

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

export interface IBackgroundData {
  "name": string,
  "description": string,
  "skill proficiencies"?: string[],
  "tool proficiencies"?: string[],
  "languages": string[],
  "equipment": string[],
  "additional rolls"?: any,
  "feature": {
    "name": string,
    "description": string
  },
  "characteristics": string,
  "personality traits": string[],
  "ideals": any,
  "bonds": string[],
  "flaws": string[]
}

export interface INameGenerateProps {
  race?: IRace;
  gender?: IGender;
  cls?: IClass;
  seed?: ISeed;
}

export interface IIdealGenerateProps {
  background: IPCBackground;
  morality?: IMorality;
  adherence?: IAdherence;
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