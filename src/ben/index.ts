import * as Utils from "../utils";
import Data from "./names.json";
import Defaults from "../names/names.json";
import {
    INameGenerateProps,
    IRace,
    IGender,
    IClass,
    INameDomainObject,
  } from "../interfaces";
  

const generateName = (race: IRace, gender: IGender, cls: IClass): string => {
        
    if ((Utils.rand(0, 1) || race == null) && cls != null)
    {
        //choose by class
        return create(Utils.pick(Data[cls]))
    }
    else 
    {
        //choose by race
        if (Data[race].length == 0) //some races have no custom names
        {
            return create(Utils.pick(Defaults[race][gender]))
        }
        
        return create(Utils.pick(Data[race]))
    }
}

export const generate = (props: INameGenerateProps = {}): INameDomainObject => {
    let {race, gender, cls, seed} = props
    
    seed = seed || Utils.FantasyContentGeneratorSeed || Utils.generateUUID
    
    return Utils.withSeed(seed, () => {
        race = race ? race : Utils.pick(Object.keys(Data))
        gender = gender ? gender : Utils.randomGender()
        const name = generateName(race, gender, cls)
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
    var out = input.substring(n)
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