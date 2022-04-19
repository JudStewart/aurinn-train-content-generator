import * as Utils from "../utils";
import Names from '../names'
import Data from "./names.json";
import Defaults from "../names/names.json";
import {
    INameGenerateProps,
    IRace,
    IGender,
    IClass,
    INameDomainObject,
    ISeed,
  } from "../interfaces/interfaces";
  

const generateName = (race: IRace, gender: IGender, cls: IClass, seed?: ISeed): string => {
    race = race ?? Utils.pick(Object.keys(Defaults))
    if (Utils.rand(0, 1) || cls == undefined) //if class is undefined or it randoms to race
    {
        if (Data[race].length == 0)
            return create(Names.generate({race: race, gender: gender, seed: seed}).formattedData.name)
        return create(Utils.pick(Data[race]))
    }
    else // class is defined and it randomed to it
    {
        return create(Utils.pick(Data[cls]))
    }
}

export const generate = (props: INameGenerateProps = {}): INameDomainObject => {
    let {race, gender, cls, seed} = props
    
    seed = seed ?? Utils.FantasyContentGeneratorSeed ?? Utils.generateUUID();
    
    return Utils.withSeed(seed, () => {
        race = race ? race : Utils.pick(Object.keys(Data))
        gender = gender ? gender : Utils.randomGender()
        const name = generateName(race, gender, cls, seed)
        return {
            seed,
            name,
            race,
            gender,
            firstName: name,
            lastName: undefined,
            fromattedData: {
                name,
                race: Utils.formatRace(race),
                gender: Utils.titleCase(gender),
                firstName: Utils.titleCase(name),
                lastName: undefined
            }
        }
    })
    
}

const create = (input: string): string => {
    var n = Utils.rand(0, input.length - 3)
    var out = input.substring(n).toLowerCase()
    return "Quif" + out
}

const functions = {
    generate,
}

Object.keys(Data).forEach((value) => {
    functions[value] = (props) => {
        props.race = value
        props.class = value
        return generate(props)
    }
})

export default functions;