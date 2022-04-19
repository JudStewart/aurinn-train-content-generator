import * as Utils from "../utils";
import Data from "./names.json";
import {
  INameGenerateProps,
  IRace,
  IGender,
  INameDomainObject,
} from "../interfaces/interfaces";

/**
 * generate a name for a race and gender.
 *
 * @param {string} props.race generate with a specific race
 * @param {string} props.gender generate with a specific gender
 */
const generateName = (race: IRace, gender: IGender): string => {
  const raceTemplates = Data[race].templates;

  if (!raceTemplates) {
    throw new Error(`could not find race templates for ${race}`);
  }

  const template = Utils.pick(raceTemplates);

  switch (race) {
    //races with template male/female first, last
    case "dragonborn":
    case "dwarf":
    case "elf":
    case "gnome":
    case "halfling":
    case "leonin":
    case "hobgoblin":
    case "triton":
    case "human":
      return Utils.parseTemplate(template, {
        first: Utils.pick(Data[race][gender]),
        last: Utils.pick(Data[race].last),
      });
    
    //races with agender first, last
    case "goliath":
      return Utils.parseTemplate(template, {
        first: Utils.pick(Data[race].agender),
        last: Utils.pick(Data[race].last)
      })
      
    //races with male/female first
    case "satyr":
    case "bugbear":
    case "centaur":
    case "loxodon":
    case "minotaur":
    case "vedalken":
      return Utils.parseTemplate(template, {
        name: Utils.pick(Data[race][gender])
      })
      
    //Races who just have human names
    case "genasi":
    case "herengon":
      return Utils.parseTemplate(template, {
        humanFirst: Utils.pick(Data.human[gender]),
        humanLast: Utils.pick(Data.human.last)
      })
      
    //Races with only agender first names
    case "goblin":
    case "kenku":
    case "kobold":
    case "lizardfolk":
    case "tabaxi":
    case "yuan-ti":
    case "tortle":
    case "changeling":
    case "kalashtar":
    case "shifter":
    case "warforged":
    case "gith":
    case "grung":
      return Utils.parseTemplate(template, {
        name: Utils.pick(Data[race].agender)
      })
    
    //Races with special cases
    case "locathah":
      return Utils.parseTemplate(template, {
        tritonName: Utils.pick(Data.triton[gender])
      })
    case "verdan":
      return Utils.parseTemplate(template, {
        goblinName: Utils.pick(Data.goblin.agender),
        hobgoblinName: Utils.pick(Data.hobgoblin[gender]),
        hobLast: Utils.pick(Data.hobgoblin.last)
      })
    case "simicHybrid":
      return Utils.parseTemplate(template, {
        humanFirst: Utils.pick(Data.human[gender]),
        humanLast: Utils.pick(Data.human.last),
        elfFirst: Utils.pick(Data.elf[gender]),
        elfLast: Utils.pick(Data.elf.last),
        vedalkenFirst: Utils.pick(Data.vedalken[gender])
      })
    case "feralTiefling":
      return Utils.parseTemplate(template, {
        tieflingName: Utils.pick(Data.tiefling[gender])
      })
    case "firbolg":
      return Utils.parseTemplate(template, {
        elfFirst: Utils.pick(Data.elf[gender]),
        elfLast: Utils.pick(Data.elf.last)
      })
    case "owlin":
      return Utils.parseTemplate(template, {
        owlinName: Utils.pick(Data.owlin[gender]),
        aarakocra: Utils.pick(Data.aarakocra.agender)
      })
    case "aarakocra":
      return Utils.parseTemplate(template, {
        aarakocra: Utils.pick(Data.aarakocra.agender)
      })
    case "fairy": 
      return Utils.parseTemplate(template, {
        elfFirst: Utils.pick(Data.elf[gender]),
        faeLast: Utils.pick(Data.fairy.last)
      })
    case "aasimar":
      return Utils.parseTemplate(template, {
        humanFirst: Utils.pick(Data.human[gender]),
        humanLast: Utils.pick(Data.human.last),
        aasimar: Utils.pick(Data[race].agender)
      })
    case "orc":
      return Utils.parseTemplate(template, {
        orcFirst: Utils.pick(Data.orc[gender]),
        halfOrcFirst: Utils.pick(Data.halfOrc[gender])
      })
    case "halfOrc":
      return Utils.parseTemplate(template, {
        humanFirst: Utils.pick(Data.human[gender]),
        humanLast: Utils.pick(Data.human.last),
        orcFirst: Utils.pick(Data.halfOrc[gender]),
      });
    case "halfElf":
      return Utils.parseTemplate(template, {
        humanFirst: Utils.pick(Data.human[gender]),
        humanLast: Utils.pick(Data.human.last),
        elfFirst: Utils.pick(Data.elf[gender]),
        elfLast: Utils.pick(Data.elf.last),
      });
    case "tiefling":
      return Utils.parseTemplate(template, {
        humanFirst: Utils.pick(Data.human[gender]),
        humanLast: Utils.pick(Data.human.last),
        tieflingFirst: Utils.pick(Data.tiefling[gender]),
      });
  }
};

export const generate = (props: INameGenerateProps = {}): INameDomainObject => {
  let { race, gender, seed } = props;

  // use the given seed, or one set by withSeed, or generate one
  seed = seed || Utils.FantasyContentGeneratorSeed || Utils.generateUUID();

  // use withSeed to ensure seeded output for all `picks`
  return Utils.withSeed(seed, () => {
    race = race ? race : Utils.pick(Object.keys(Data));

    gender = gender ? gender : Utils.randomGender();

    const name = generateName(race, gender);

    var [firstName, lastName] = ["",""]
    if (name.indexOf(" ") != -1) [firstName, lastName] = name.split(" ");
    else [firstName, lastName] = [name, ""];

    return {
      seed,
      name,
      race,
      gender,
      firstName,
      lastName,
      formattedData: {
        name,
        race: Utils.formatRace(race),
        gender: Utils.titleCase(gender),
        firstName: firstName ? Utils.titleCase(firstName) : undefined,
        lastName: lastName ? Utils.titleCase(lastName) : undefined,
      },
    };
  });
};

const functions = {
  generate,
};

// setup a function for each race
Object.keys(Data).forEach((race: IRace) => {
  functions[race] = (props) => {
    props.race = race;
    return generate(props);
  };
});

export default functions;
