import {getDaysPassed, getRandomNumber} from "./utils/common.js";
import {createElement} from "./utils/render.js";

// TODO Actually need to think what to do with gearScore of newcomers. Specially if they are blue, cause once they become raiders they'll be first in line to get anything.
const Gear = {
  // BWL
  SS: {
    NAME: `Spineshatter`,
    LINK: `https://classic.wowhead.com/item=19335/spineshatter`,
    SCORE: 20,
  },
  MALA: {
    NAME: `Maladath, Runed Blade of the Black Flight`,
    LINK: `https://classic.wowhead.com/item=19351/maladath-runed-blade-of-the-black-flight`,
    SCORE: 40,
  },
  ASHK: {
    NAME: `Ashkandi, Greatsword of the Brotherhood`,
    LINK: `https://classic.wowhead.com/item=19364/ashkandi-greatsword-of-the-brotherhood`,
    SCORE: 10,
  },
  CRUL: {
    NAME: `Crul'shorukh, Edge of Chaos`,
    LINK: `https://classic.wowhead.com/item=19363/crulshorukh-edge-of-chaos`,
    SCORE: 20,
  },
  CF: {
    NAME: `Cloak of Firemaw`,
    LINK: `https://classic.wowhead.com/item=19398/cloak-of-firemaw`,
    SCORE: 15,
  },
  CTS: {
    NAME: `Chromatically Tempered Sword`,
    LINK: `https://classic.wowhead.com/item=19352/chromatically-tempered-sword`,
    SCORE: 100,
  },
  DFT: {
    NAME: `Drake Fang Talisman`,
    LINK: `https://classic.wowhead.com/item=19406/drake-fang-talisman`,
    SCORE: 95,
  },
  DTP: {
    NAME: `Drake Talon Pauldrons`,
    LINK: `https://classic.wowhead.com/item=19394/drake-talon-pauldrons`,
    SCORE: 50,
  },
  LFC: {
    NAME: `Legguards of the Fallen Crusader`,
    LINK: `https://classic.wowhead.com/item=19402/legguards-of-the-fallen-crusader`,
    SCORE: 50,
  },
  CB: {
    NAME: `Chromatic Boots`,
    LINK: `https://classic.wowhead.com/item=19387/chromatic-boots`,
    SCORE: 70,
  },
  CDM: {
    NAME: `Cloak of Draconic Might`,
    LINK: `https://classic.wowhead.com/item=19436/cloak-of-draconic-might`,
    SCORE: 40,
  },
  CAF: {
    NAME: `Circle of Applied Force`,
    LINK: `https://classic.wowhead.com/item=19432/circle-of-applied-force`,
    SCORE: 30,
  },
  // TODO fill MC/Ony gear
  VIS: {
    NAME: `Vis'kag the Bloodletter`,
    LINK: `https://classic.wowhead.com/item=17075/viskag-the-bloodletter`,
    SCORE: 60,
  },
  BB: {
    NAME: `Brutality Blade`,
    LINK: `https://classic.wowhead.com/item=18832/brutality-blade`,
    SCORE: 45,
  },
  SM: {
    NAME: `Striker's Mark`,
    LINK: `https://classic.wowhead.com/item=17069/strikers-mark`,
    SCORE: 25,
  },
  BL: {
    NAME: `Blastershot Launcher`,
    LINK: `https://classic.wowhead.com/item=17072/blastershot-launcher`,
    SCORE: 10,
  },
  WS: {
    NAME: `Wristguards of Stability`,
    LINK: `https://classic.wowhead.com/item=19146/wristguards-of-stability`,
    SCORE: 15,
  },
  FG: {
    NAME: `Flameguard Gauntlets`,
    LINK: `https://classic.wowhead.com/item=19143/flameguard-gauntlets`,
    SCORE: 35,
  },
  OG: {
    NAME: `Onslaught Girdle`,
    LINK: `https://classic.wowhead.com/item=19137/onslaught-girdle`,
    SCORE: 60,
  },
  QSR: {
    NAME: `Quick Strike Ring`,
    LINK: `https://classic.wowhead.com/item=18821/quick-strike-ring`,
    SCORE: 45,
  },
  ACC: {
    NAME: `Band of Accuria`,
    LINK: `https://classic.wowhead.com/item=17063/band-of-accuria`,
    SCORE: 40,
  },
  DB: {
    NAME: `Deathbringer`,
    LINK: `https://classic.wowhead.com/item=17068/deathbringer`,
    SCORE: 35,
  },
  PB: {
    NAME: `Perdition's Blade`,
    LINK: `https://classic.wowhead.com/item=18816/perditions-blade`,
    SCORE: 25,
  },
  CHT: {
    NAME: `Core Hound Tooth`,
    LINK: `https://classic.wowhead.com/item=18805/core-hound-tooth`,
    SCORE: 20,
  },
  DUMMY: {
    NAME: ``,
    LINK: ``,
    SCORE: 0,
  },
  // TODO check that values of offhands are about the same.
  // TODO BRE, SPINAL REAPER?
};

const GearMods = {
  // modifiers after you got something
  DURATION: 14, // how long it lasts
  MOD: 1.2, // mod to final gear score
};

const Warriors = {
  Sintrix: {
    NAME: `Sintrix`,
    RANK: `Raider`,
    PENALTIES: [{
      REASON: `no world buffs DUMMY`,
      ASSIGNED: `2020.04.25`,
      DURATION: 15, // days
      VALUE: 1.0, // multiplier to final GearScore
    },
    {
      REASON: `being cunt NOT DUMMY =D`,
      ASSIGNED: `2020.03.25`,
      DURATION: 45, // days
      VALUE: 1.5, // multiplier to final GearScore
    },
    ],
    GEAR: [{
      NAME: `CTS`,
      OBTAINED: `2020.04.20`,
    },
    {
      NAME: `LFC`,
      OBTAINED: `2020.02.26`,
    },
    {
      NAME: `ACC`,
      OBTAINED: `2019.10.23`,
    },
    {
      NAME: `SM`,
      OBTAINED: `2020.01.02`,
    },
    ],
    PERSONAL_MOD: 0.9, // based on warcraftlogs perfomance - the better you do the less coeff is
  },

  Peoplekiller: {
    NAME: `Peoplekiller`,
    RANK: `Raider`,
    PENALTIES: [{
      REASON: `no world buffs- DUMMY`,
      ASSIGNED: `2020.03.21`,
      DURATION: 10, // days
      VALUE: 1.0, // multiplier to final GearScore
    },
    {
      REASON: `being laggy DUMMY`,
      ASSIGNED: `2020.04.12`,
      DURATION: 15, // days
      VALUE: 1.0, // multiplier to final GearScore
    },
    ],
    GEAR: [{
      NAME: `CAF`,
      OBTAINED: `2020.02.23`, // not sure - was pug so no RC history
    },
    {
      NAME: `OG`,
      OBTAINED: `2019.12.11`,
    },
    {
      NAME: `QSR`,
      OBTAINED: `2020.03.02`,
    },
    {
      NAME: `VIS`,
      OBTAINED: `2020.01.06`,
    },
    {
      NAME: `DB`,
      OBTAINED: `2019.11.11`,
    },
    ],
    PERSONAL_MOD: 1.4, // based on warcraftlogs perfomance - the better you do the less coeff is
  },

  Exet: {
    NAME: `Exet`,
    RANK: `Trial`,
    PENALTIES: [
    ],
    GEAR: [{
      NAME: `VIS`,
      OBTAINED: `2019.10.01`,
    },
    {
      NAME: `CRUL`,
      OBTAINED: `2019.10.01`,
    },
    ],
    PERSONAL_MOD: 1.4, // based on warcraftlogs perfomance - the better you do the less coeff is
  },

  Elitekoala: {
    NAME: `Elitekoala`,
    RANK: `Raider`,
    PENALTIES: [
    ],
    GEAR: [{
      NAME: `DTP`,
      OBTAINED: `2019.10.01`,
    },
    {
      NAME: `OG`,
      OBTAINED: `2020.03.30`,
    },
    {
      NAME: `LFC`,
      OBTAINED: `2020.04.01`,
    },
    {
      NAME: `CB`,
      OBTAINED: `2020.04.22`,
    },
    {
      NAME: `WS`,
      OBTAINED: `2019.10.01`,
    },
    {
      NAME: `FG`,
      OBTAINED: `2019.10.01`,
    },
    {
      NAME: `QSR`,
      OBTAINED: `2020.04.06`,
    },
    {
      NAME: `VIS`,
      OBTAINED: `2019.10.01`,
    },
    {
      NAME: `BB`,
      OBTAINED: `2019.10.01`,
    },
    {
      NAME: `SM`,
      OBTAINED: `2019.10.01`,
    },
    ],
    PERSONAL_MOD: 0.6, // based on warcraftlogs perfomance - the better you do the less coeff is
  },

  Ilith: {
    NAME: `Ilith`,
    RANK: `Raider`,
    PENALTIES: [
    ],
    GEAR: [{
      NAME: `DTP`,
      OBTAINED: `2020.03.25`,
    },
    {
      NAME: `OG`,
      OBTAINED: `2019.10.01`,
    },
    {
      NAME: `WS`,
      OBTAINED: `2019.10.01`,
    },
    {
      NAME: `QSR`,
      OBTAINED: `2020.04.27`,
    },
    {
      NAME: `CAF`,
      OBTAINED: `2020.04.08`,
    },
    {
      NAME: `DB`,
      OBTAINED: `2020.02.27`,
    },
    {
      NAME: `PB`,
      OBTAINED: `2019.10.01`,
    },
    {
      NAME: `SM`,
      OBTAINED: `2020.03.12`,
    },
    ],
    PERSONAL_MOD: 1.4, // based on warcraftlogs perfomance - the better you do the less coeff is
  },

  Sveredom: {
    NAME: `Sveredom`,
    RANK: `Raider`,
    PENALTIES: [
    ],
    GEAR: [{
      NAME: `OG`,
      OBTAINED: `2020.03.02`,
    },
    {
      NAME: `CB`,
      OBTAINED: `2020.02.27`,
    },
    {
      NAME: `QSR`,
      OBTAINED: `2020.02.20`,
    },
    {
      NAME: `DB`,
      OBTAINED: `2019.10.01`,
    },
    {
      NAME: `FG`,
      OBTAINED: `2020.03.02`,
    },
    {
      NAME: `PB`,
      OBTAINED: `2020.04.06`,
    },
    {
      NAME: `SM`,
      OBTAINED: `2019.11.27`,
    },
    {
      NAME: `CRUL`,
      OBTAINED: `2020.02.27`,
    },
    {
      NAME: `WS`,
      OBTAINED: `2020.01.22`,
    },
    ],
    PERSONAL_MOD: 1.4, // based on warcraftlogs perfomance - the better you do the less coeff is
  },

  Stanuubius: {
    NAME: `Stanuubius`,
    RANK: `Raider`,
    PENALTIES: [
    ],
    GEAR: [{
      NAME: `OG`,
      OBTAINED: `2019.10.01`,
    },
    {
      NAME: `LFC`,
      OBTAINED: `2019.10.01`,
    },
    {
      NAME: `QSR`,
      OBTAINED: `2020.04.27`,
    },
    {
      NAME: `CB`,
      OBTAINED: `2019.10.01`,
    },
    {
      NAME: `WS`,
      OBTAINED: `2019.10.01`,
    },
    {
      NAME: `BL`,
      OBTAINED: `2019.10.01`,
    },
    {
      NAME: `DB`,
      OBTAINED: `2019.10.01`,
    },
    {
      NAME: `CHT`,
      OBTAINED: `2019.10.01`,
    },
    {
      NAME: `DFT`,
      OBTAINED: `2020.04.29`,
    },
    ],
    PERSONAL_MOD: 1.4, // based on warcraftlogs perfomance - the better you do the less coeff is
  },

  Brooks: {
    NAME: `Brooks`,
    RANK: `Raider`,
    PENALTIES: [
    ],
    GEAR: [{
      NAME: `DTP`,
      OBTAINED: `2020.03.04`,
    },
    {
      NAME: `WS`,
      OBTAINED: `2019.12.11`,
    },
    {
      NAME: `FG`,
      OBTAINED: `2019.12.18`,
    },
    {
      NAME: `OG`,
      OBTAINED: `2020.01.22`,
    },
    {
      NAME: `QSR`,
      OBTAINED: `2020.01.02`,
    },
    {
      NAME: `DFT`,
      OBTAINED: `2020.02.13`,
    },
    {
      NAME: `SM`,
      OBTAINED: `2020.01.22`,
    },
    {
      NAME: `VIS`,
      OBTAINED: `2019.12.16`,
    },
    {
      NAME: `BB`,
      OBTAINED: `2020.02.13`,
    },
    ],
    PERSONAL_MOD: 0.5, // based on warcraftlogs perfomance - the better you do the less coeff is
  },
  // TODO Add tanks to the list


  TargetDummy: {
    NAME: `TargetDummy`,
    RANK: `Trial`,
    PENALTIES: [
    ],
    GEAR: [
    ],
    PERSONAL_MOD: 0.5, // based on warcraftlogs perfomance - the better you do the less coeff is
  },
};

const getGearSum = (warrior) => {
  // returns sum of items scores
  return warrior.GEAR.reduce((total, it) => total + Gear[it.NAME].SCORE, 0);
};

const getScoreMod = (warrior) => {
  // returns combined score modifier (cause of penalties - checking if they are already obsolete and cause of gear)

  let targetMod = 1;
  // first, if item was obtained before GearMods.DURATION days passed, multiply its mod
  targetMod = targetMod * warrior.GEAR.reduce((total, it) => (GearMods.DURATION > getDaysPassed(it.OBTAINED)) ? total * GearMods.MOD : total, targetMod);

  // second, penalties
  targetMod = targetMod * warrior.PENALTIES.reduce((total, it) => (it.DURATION > getDaysPassed(it.ASSIGNED)) ? total * it.VALUE : total, targetMod);

  // third, personal modifier
  targetMod = targetMod * warrior.PERSONAL_MOD;

  // debug
  console.log(`GEAR:`);
  warrior.GEAR.map((it) => console.log(`${Gear[it.NAME].NAME} cost(s) ${Gear[it.NAME].SCORE}`));
  warrior.PENALTIES.map((it) => console.log(`${it.REASON} for ${it.DURATION} day(s) with mod ${it.VALUE} on ${it.ASSIGNED}`));

  return Math.round(targetMod * 1000) / 1000;
};

const getGearScore = (warrior) => {
  return Math.round(getGearSum(warrior) * getScoreMod(warrior));
};

const getGearMarkup = (warrior) => {
  return warrior.GEAR.slice()
    .sort((a, b) => getDaysPassed(a.OBTAINED) - getDaysPassed(b.OBTAINED))
    .map((it) => `<li class="warrior__gearitem"><a href="${Gear[it.NAME].LINK}"></a> ${getDaysPassed(it.OBTAINED)} day(s) ago</li>`)
    .join(`\n`);
};

const getWarriorTemplate = (warrior, number) => {
  // generates html template for warrior with number
  // TODO add sorting by slot (one more map which describes what items go into what slot)
  const gearSum = getGearSum(warrior);
  const scoreMod = getScoreMod(warrior);
  const gearScore = getGearScore(warrior);
  const gearMarkup = getGearMarkup(warrior);

  return (`<article class="warrior">
    <div class="warrior__caption-container">
      <span class="warrior__data warrior__data--name">${number}) ${warrior.NAME}</span>
      <span class="warrior__data warrior__data--rank">${warrior.RANK}</span>
      <span class="warrior__data">Gear Score: <span class="warrior__data--gearscore"${gearScore}</span></span>
      <span class="warrior__data warrior__data--gearsum">GearSum: ${gearSum}</span>
      <span class="warrior__data warrior__data--scoremod">ScoreMod: ${scoreMod}</span>
    </div>
    <ul class="warrior__gear">
      ${gearMarkup}
    </ul>
  </article>`);
};

const containerElement = document.querySelector(`.warriors-list`);

let sortedWarriorsRaiders = [];
let sortedWarriorsTrials = [];
let sortedWarriorsTanks = [];

// makes new array with added gear scores to be able to sort it
for (let index in Warriors) {
  if (Warriors.hasOwnProperty(index)) {
    // prepares new and updated entry
    const newWarrior = Object.assign({}, Warriors[index], {
      GEAR_SUM: getGearSum(Warriors[index]),
      SCORE_MOD: getScoreMod(Warriors[index]),
      GEAR_SCORE: getGearScore(Warriors[index]),
    });

    if (Warriors[index].RANK === `Raider`) {
      sortedWarriorsRaiders.push(newWarrior);
    } else if (Warriors[index].RANK === `Trial`) {
      sortedWarriorsTrials.push(newWarrior);
    } else if (Warriors[index].RANK === `Tank`) {
      sortedWarriorsTanks.push(newWarrior);
    }
  }
}

// lets now actually sort it and add to html
// TODO refactor this
sortedWarriorsRaiders.sort((a, b) => getGearScore(a) - getGearScore(b));
sortedWarriorsRaiders.forEach((it, i) => {
  const warriorElement = createElement(getWarriorTemplate(it, i + 1));
  containerElement.append(warriorElement);
});
sortedWarriorsTrials.sort((a, b) => getGearScore(a) - getGearScore(b));
sortedWarriorsTrials.forEach((it, i) => {
  const warriorElement = createElement(getWarriorTemplate(it, i + 1));
  containerElement.append(warriorElement);
});
// TODO add active penalties as well as penalties history
