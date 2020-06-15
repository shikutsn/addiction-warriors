const Warriors = {
  // TODO add note field like `note: has edgemasters and goes for axes/daggers`
  // TODO write a post on discord about what to bring to speed runs / usualy runs
  // TODO write a post on discord about buffs list andwhat to blacklist
  // TODO need to actually discuss politics of tank gearing?
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
      REASON: `oversleeping MC splits`,
      ASSIGNED: `2020.05.13`,
      DURATION: 21, // days
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
    {
      NAME: `WS`,
      OBTAINED: `2020.05.04`,
    },
    {
      NAME: `QSR`,
      OBTAINED: `2020.05.04`,
    },
    {
      NAME: `BWL`,
      OBTAINED: `2020.05.12`,
    },
    {
      NAME: `BB`,
      OBTAINED: `2020.06.01`,
    },
    {
      NAME: `OG`,
      OBTAINED: `2020.06.01`,
    },
    {
      NAME: `CAF`,
      OBTAINED: `2020.06.08`,
    },
    ],
    PERSONAL_MOD: 0.9, // based on warcraftlogs perfomance - the better you do the less coeff is
  },

  Peoplekiller: {
    NAME: `Peoplekiller (has edgies and DB + CHT, doesnt want FG)`,
    RANK: `Raider`,
    PENALTIES: [{
      REASON: `No Flask while BWL speedrun`,
      ASSIGNED: `2020.05.07`,
      DURATION: 15, // days
      VALUE: 1.5, // multiplier to final GearScore
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
    {
      NAME: `CHT`,
      OBTAINED: `2020.05.04`,
    },
    {
      NAME: `WS`,
      OBTAINED: `2020.05.13`,
    },
    ],
    PERSONAL_MOD: 1.4, // based on warcraftlogs perfomance - the better you do the less coeff is
  },

  Exet: {
    NAME: `Exet (doesnt want FG, has edgies)`,
    RANK: `Raider`,
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
    {
      NAME: `QSR`,
      OBTAINED: `2020.05.11`,
    },
    {
      NAME: `OG`,
      OBTAINED: `2020.05.11`,
    },
    {
      NAME: `WS`,
      OBTAINED: `2020.05.13`,
    },
    {
      NAME: `LFC`,
      OBTAINED: `2020.05.27`,
    },
    ],
    PERSONAL_MOD: 1.4, // based on warcraftlogs perfomance - the better you do the less coeff is
  },

  Elitekoala: {
    NAME: `Elitekoala (wants CTS over DFT, wants DFT as last prio, fucks around with alts - lower his prios)`,
    RANK: `Raider`,
    PENALTIES: [
      {
        REASON: `Refused to go ZG speedrun at 2020.06.11`,
        ASSIGNED: `2020.06.11`,
        DURATION: 30, // days
        VALUE: 1.5, // multiplier to final GearScore
      },
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
    {
      NAME: `CDM`,
      OBTAINED: `2020.05.18`,
    },
    {
      NAME: `CTS`,
      OBTAINED: `2020.06.15`,
    },
    ],
    PERSONAL_MOD: 1, // based on warcraftlogs perfomance - the better you do the less coeff is
  },

  Ilith: {
    NAME: `Ilith (wants cts+crul or crul+perd, has edgies, wants CAF)`,
    RANK: `Raider`,
    PENALTIES: [
      {
        REASON: `No Flask while BWL speedrun`,
        ASSIGNED: `2020.06.08`,
        DURATION: 15, // days
        VALUE: 1.5, // multiplier to final GearScore
      },
      {
        REASON: `Refused to go ZG speedrun at 2020.06.11`,
        ASSIGNED: `2020.06.11`,
        DURATION: 30, // days
        VALUE: 1.5, // multiplier to final GearScore
      },
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
    {
      NAME: `LFC`,
      OBTAINED: `2020.05.18`,
    },
    {
      NAME: `BL`,
      OBTAINED: `2020.06.01`,
    },
    {
      NAME: `FG`,
      OBTAINED: `2020.06.03`,
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
    {
      NAME: `BB`,
      OBTAINED: `2020.05.04`,
    },
    ],
    PERSONAL_MOD: 1.4, // based on warcraftlogs perfomance - the better you do the less coeff is
  },

  Stanuubius: {
    NAME: `Stanuubius - wants crul/bb, has edgies - move it to note?`,
    RANK: `Raider`,
    PENALTIES: [
      {
        REASON: `Refused to go ZG speedrun at 2020.06.11`,
        ASSIGNED: `2020.06.11`,
        DURATION: 30, // days
        VALUE: 1.5, // multiplier to final GearScore
      },
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
    {
      NAME: `CF`,
      OBTAINED: `2019.10.10`,
    },
    {
      NAME: `CAF`,
      OBTAINED: `2020.06.15`,
    },
    ],
    PERSONAL_MOD: 1.4, // based on warcraftlogs perfomance - the better you do the less coeff is
  },

  Brooks: {
    NAME: `Brooks`,
    RANK: `Raider`,
    PENALTIES: [{
      REASON: `no world buffs DUMMY`,
      ASSIGNED: `2020.04.25`,
      DURATION: 7, // days
      VALUE: 1.3, // multiplier to final GearScore
    },
    {
      REASON: `DUMMY`,
      ASSIGNED: `2020.04.26`,
      DURATION: 7, // days
      VALUE: 1.4, // multiplier to final GearScore
    },
    {
      REASON: `Y - DUMMY`,
      ASSIGNED: `2020.04.28`,
      DURATION: 7, // days
      VALUE: 1.6, // multiplier to final GearScore
    },
    {
      REASON: `being cunt NOT DUMMY =D`,
      ASSIGNED: `2020.04.25`,
      DURATION: 5, // days
      VALUE: 1.5, // multiplier to final GearScore
    },
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
    {
      NAME: `CDM`,
      OBTAINED: `2020.05.20`,
    },
    {
      NAME: `CTS`,
      OBTAINED: `2020.05.27`,
    },
    ],
    PERSONAL_MOD: 0.5, // based on warcraftlogs perfomance - the better you do the less coeff is
  },
  // TODO Add tanks to the list
  Zeewarrior: {
    NAME: `Zeewarrior`,
    RANK: `Tank`,
    PENALTIES: [
    ],
    GEAR: [{
      NAME: `CHT`,
      OBTAINED: `2020.03.30`,
    },
    {
      NAME: `DTP`,
      OBTAINED: `2020.03.25`,
    },
    {
      NAME: `OG`,
      OBTAINED: `2020.02.23`,
    },
    {
      NAME: `CB`,
      OBTAINED: `2020.02.26`,
    },
    {
      NAME: `PB`,
      OBTAINED: `2020.01.22`,
    },
    ],
    PERSONAL_MOD: 1.0, // based on warcraftlogs perfomance - the better you do the less coeff is
  },

  Samra: {
    NAME: `Samra`,
    RANK: `Tank`,
    PENALTIES: [
    ],
    GEAR: [{
      NAME: `LFC`,
      OBTAINED: `2020.04.29`,
    },
    {
      NAME: `DTP`,
      OBTAINED: `2020.04.29`,
    },
    {
      NAME: `SS`,
      OBTAINED: `2020.02.26`,
    },
    {
      NAME: `PB`,
      OBTAINED: `2020.01.29`,
    },
    {
      NAME: `BWR`,
      OBTAINED: `2019.10.01`,
    },
    {
      NAME: `FG`,
      OBTAINED: `2020.05.13`,
    },
    ],
    PERSONAL_MOD: 1.0, // based on warcraftlogs perfomance - the better you do the less coeff is
  },

  Oneforce: {
    NAME: `Oneforce`,
    RANK: `Trial`,
    PENALTIES: [{
      REASON: `No WB MC splits`,
      ASSIGNED: `2020.05.13`,
      DURATION: 15, // days
      VALUE: 1.5, // multiplier to final GearScore
    },
    ],
    GEAR: [
      {
        NAME: `FG`,
        OBTAINED: `2020.06.01`,
      },
    ],
    PERSONAL_MOD: 1, // based on warcraftlogs perfomance - the better you do the less coeff is
  },

  Savante: {
    NAME: `Savante (dwarf with edgies)`,
    RANK: `Tank`,
    PENALTIES: [{
      REASON: `No Flask while BWL speedrun`,
      ASSIGNED: `2020.05.07`,
      DURATION: 15, // days
      VALUE: 1.5, // multiplier to final GearScore
    },
    ],
    GEAR: [
      {
        NAME: `OG`,
        OBTAINED: `2020.06.10`,
      },
    ],
    PERSONAL_MOD: 1, // based on warcraftlogs perfomance - the better you do the less coeff is
  },

  Legabis: {
    NAME: `Legabis (has edgies)`,
    RANK: `Trial`,
    PENALTIES: [{
      REASON: `Didnt show up for 2nd BWL split (spontaneous family visit)`,
      ASSIGNED: `2020.05.17`,
      DURATION: 14, // days
      VALUE: 1.5, // multiplier to final GearScore
    },
    {
      REASON: `No sunders on BWL bosses during speedrun 2020.06.08`,
      ASSIGNED: `2020.06.08`,
      DURATION: 14, // days
      VALUE: 1.5, // multiplier to final GearScore
    },
    ],
    GEAR: [{
      NAME: `DTP`,
      OBTAINED: `2019.10.01`,
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
      NAME: `DB`,
      OBTAINED: `2019.10.01`,
    },
    {
      NAME: `CRUL`,
      OBTAINED: `2019.10.01`,
    },
    {
      NAME: `PB`,
      OBTAINED: `2019.10.01`,
    },
    {
      NAME: `SM`,
      OBTAINED: `2020.06.01`,
    },
    ],
    PERSONAL_MOD: 1.0, // based on warcraftlogs perfomance - the better you do the less coeff is
  },

  Everyday: {
    NAME: `Everyday`,
    RANK: `Trial`,
    PENALTIES: [
    ],
    GEAR: [{
      NAME: `DTP`,
      OBTAINED: `2019.10.01`,
    },
    {
      NAME: `FG`,
      OBTAINED: `2019.10.01`,
    },
    {
      NAME: `QSR`,
      OBTAINED: `2019.10.01`,
    },
    {
      NAME: `DFT`,
      OBTAINED: `2019.10.01`,
    },
    {
      NAME: `SM`,
      OBTAINED: `2019.10.01`,
    },
    {
      NAME: `VIS`,
      OBTAINED: `2019.10.01`,
    },
    {
      NAME: `BB`,
      OBTAINED: `2019.10.01`,
    },
    ],
    PERSONAL_MOD: 1.0, // based on warcraftlogs perfomance - the better you do the less coeff is
  },

};

export {Warriors};
