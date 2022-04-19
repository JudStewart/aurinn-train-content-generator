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
    //if race and class are defined
    if (cls != undefined && race != undefined)
    {
        //choose one randomly and base the name on that
        if (Utils.rand(0, 3))
        {
            //class
            create(Utils.pick(Data[cls]))
        }
        //race
        if (Data[race].length == 0)
            return create(Names.generate({race: race, gender: gender, seed: seed}).formattedData.name)
        
        return create(Utils.pick(Data[race]))
    }
    //if class is undefined choose race (if undefined we randomize it)
    if (cls == undefined)
    {
        race = race != undefined ? race : Utils.pick(Object.keys(Defaults))
        if (Data[race] == undefined || Data[race].length == 0)
            return create(Names.generate({race: race, gender: gender, seed: seed}).formattedData.name)
        
        return create(Utils.pick(Data[race]))
    }
    //if race is undefined choose class (can't be undefined here)
    if (race == undefined)
    {
        return create(Utils.pick(Data[cls]))
    }
}

export const generate = (props: INameGenerateProps = {}): INameDomainObject => {
    let {race, gender, cls, seed} = props
    
    seed = seed ?? Utils.FantasyContentGeneratorSeed ?? Utils.generateUUID();
    
    return Utils.withSeed(seed, () => {
        //race = race ? race : Utils.pick(Object.keys(Data))
        //gender = gender ? gender : Utils.randomGender()
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
                race: race ? Utils.formatRace(race) : 'undefined',
                gender: gender ? Utils.titleCase(gender) : 'undefined',
                firstName: Utils.titleCase(name),
                lastName: undefined
            }
        }
    })
    
}

const create = (input: string): string => {
    var n = Utils.rand(1, input.length - 2)
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