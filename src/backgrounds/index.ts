import * as Utils from "../utils/"
import Data from "./backgrounds.json"
import {
    IMorality,
    IIdealGenerateProps,
    IIdeal,
    IBond,
    IPersonalityTrait
} from "../interfaces/interfaces"
import { IPCBackground } from "../interfaces/interfaces"

export const random = () => {
    return Utils.pick(Data)
}

export const randomIdeal = (props: IIdealGenerateProps): IIdeal => {
    let {background, morality, adherence, seed } = props

    seed = seed || Utils.FantasyContentGeneratorSeed || Utils.generateUUID()

    return Utils.withSeed(seed, () => {
        let ideals = background["ideals"]
        let choices = []
        choices.push(...ideals["any"])
        if (morality != undefined && Object.keys(ideals).includes(morality))
        {
            choices.push(...ideals[morality])
        }
        if (adherence != undefined && Object.keys(ideals).includes(adherence))
        {
            choices.push(...ideals[adherence])
        }
        Utils.pick(choices)
    })
}

export const randomBond = (background: IPCBackground, seed?: ISeed = undefined): IBond => {
    seed = seed ?? Utils.FantasyContentGeneratorSeed ?? Utils.generateUUID()

    return Utils.withSeed(seed, () => {
        return Utils.pick(background["bonds"])
    })
}

export const randomFlaw = (background: IPCBackground, seed?: ISeed = undefined): IFlaw => {
    seed = seed ?? Utils.FantasyContentGeneratorSeed ?? Utils.generateUUID()

    return Utils.withSeed(seed, () => {
        return Utils.pick(background["flaws"])
    })
}

export const randomPersonalityTrait = (background: IPCBackground, seed?: ISeed = undefined): IPersonalityTrait => {
    seed = seed ?? Utils.FantasyContentGeneratorSeed ?? Utils.generateUUID()

    return Utils.withSeed(seed, () => {
        return Utils.pick(background["personality traits"])
    })
}

const functions = {
    random,
    randomIdeal,
    randomBond,
    randomFlaw,
    randomPersonalityTrait
};

export default functions;