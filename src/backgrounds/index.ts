import * as Utils from "../utils/"
import Data from "./backgrounds.json"
import {
    ISeed,
    IIdealGenerateProps,
    IIdeal,
    IBond,
    IPersonalityTrait,
    IFlaw
} from "../interfaces/interfaces"
import { IPCBackground } from "../interfaces/interfaces"

/** Template for backgrounds:
"background template": {
        "description": "",
        "skill proficiencies": [
            
        ],
        "tool proficiencies": [
            
        ],
        "languages": [
            
        ],
        "equipment": [
            
        ],
        "additional rolls": {
            
        },
        "feature": {
            "name": "",
            "description": ""
        },
        "characteristics": "",
        "personality traits": [
            
        ],
        "ideals": {
            
        },
        "bonds": [
            
        ],
        "flaws": [
            
        ]
    },
 */

export const getBackgroundData = (name: string) => {
    return Data[name]
}

export const random = () => {
    return Utils.pick(Object.keys(Data))
}

export const randomIdeal = (props: IIdealGenerateProps): IIdeal => {
    let {background, morality, adherence, seed } = props

    seed = seed || Utils.FantasyContentGeneratorSeed || Utils.generateUUID()

    return Utils.withSeed(seed, () => {
        let ideals = background["ideals"]
        let choices = []
        let neutralFlag = false
        if (Object.keys(ideals).includes("any")) 
            choices.push(...ideals["any"])
        if (morality != undefined && Object.keys(ideals).includes(morality))
        {
            choices.push(...ideals[morality])
            if (morality == "neutral") neutralFlag = true
        }
        if (adherence != undefined && Object.keys(ideals).includes(adherence))
        {
            if (adherence != "neutral" || !neutralFlag)
                choices.push(...ideals[adherence])
        }
        Utils.pick(choices)
    })
}

export const randomBond = (background: IPCBackground, seed: ISeed = undefined): IBond => {
    seed = seed ?? Utils.FantasyContentGeneratorSeed ?? Utils.generateUUID()

    return Utils.withSeed(seed, () => {
        return Utils.pick(background["bonds"])
    })
}

export const randomFlaw = (background: IPCBackground, seed: ISeed = undefined): IFlaw => {
    seed = seed ?? Utils.FantasyContentGeneratorSeed ?? Utils.generateUUID()

    return Utils.withSeed(seed, () => {
        return Utils.pick(background["flaws"])
    })
}

export const randomPersonalityTrait = (background: IPCBackground, seed: ISeed = undefined): IPersonalityTrait => {
    seed = seed ?? Utils.FantasyContentGeneratorSeed ?? Utils.generateUUID()

    return Utils.withSeed(seed, () => {
        return Utils.pick(background["personality traits"])
    })
}

export const parseSkillProficiencyList = (proficiency: string) => {
    proficiency.split("|")
}

const functions = {
    random,
    randomIdeal,
    randomBond,
    randomFlaw,
    randomPersonalityTrait,
    parseSkillProficiencyList
};

export default functions;