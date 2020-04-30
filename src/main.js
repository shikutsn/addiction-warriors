import {getDaysPassed} from "./utils/common.js";
//
// import FilmsTotalComponent from "./components/films-total.js";
// import MainNavigationComponent from "./components/main-navigation.js";
// import PageController from "./controllers/page.js";
// import UserRankComponent from "./components/user-rank.js";
// import {generateFilms} from "./mock/films.js";
// import {render} from "./utils/render.js";
//
//
// const FILMS_ALL_COUNT = 13;
//
//
// const films = generateFilms(FILMS_ALL_COUNT);
// const filmsTotal = films.length;
// const userFilmsWatched = films.reduce((total, it) => it.isWatched ? total + 1 : total, 0);
//
// const siteHeaderElement = document.querySelector(`.header`);
// render(siteHeaderElement, new UserRankComponent(userFilmsWatched));
//
// const siteMainElement = document.querySelector(`.main`);
// const siteMainNavigationComponent = new MainNavigationComponent();
// render(siteMainElement, siteMainNavigationComponent);
//
// const siteFilmsTotalElement = document.querySelector(`.footer__statistics`);
// render(siteFilmsTotalElement, new FilmsTotalComponent(filmsTotal));
//
// const pageController = new PageController(siteMainElement, films);
// pageController.render();

const Gear = {
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
};

const GearMods = {
  // modifiers after you got something
  DURATION: 14, // how long it lasts
  MOD: 1.2, // mod to final gear score
};

const Warriors = {
  Sintrix: {
    NAME: `Sintrix`,
    PENALTIES: [{
      REASON: `no world buffs`,
      ASSIGNED: `2020.04.25`,
      DURATION: 15, // days
      VALUE: 1.5, // multiplier to final GearScore
    },
    {
      REASON: `being cunt`,
      ASSIGNED: `2020.03.25`,
      DURATION: 45, // days
      VALUE: 2.5, // multiplier to final GearScore
    },
    ],
    GEAR: [{
      NAME: `CTS`,
      OBTAINED: `2020.04.15`,
    },
    {
      NAME: `LFC`,
      OBTAINED: `2020.02.15`,
    },
    ],
    PERSONAL_MOD: 1.1, // based on warcraftlogs perfomance - the better you do the less coeff is
  },
  Peoplekiller: {
    NAME: `Peoplekiller`,
    PENALTIES: [{
      REASON: `no world buffs`,
      ASSIGNED: `2020.03.21`,
      DURATION: 10, // days
      VALUE: 1.5, // multiplier to final GearScore
    },
    {
      REASON: `being laggy`,
      ASSIGNED: `2020.04.12`,
      DURATION: 15, // days
      VALUE: 1.2, // multiplier to final GearScore
    },
    ],
    GEAR: [{
      NAME: `CAF`,
      OBTAINED: `2020.03.15`,
    },
    ],
    PERSONAL_MOD: 1.4, // based on warcraftlogs perfomance - the better you do the less coeff is
  },
  TargetDummy: {
    NAME: `TargetDummy`,
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

  return targetMod;
};

// const tmp = [`12`, `12`, `12`];
// console.log(tmp);

for (let index in Warriors) {
  if (Warriors.hasOwnProperty(index)) {
    console.log(`GearScore of ${Warriors[index].NAME}: ${getGearSum(Warriors[index])}`);
    console.log(`Mod of ${Warriors[index].NAME}: ${getScoreMod(Warriors[index])}`);
  }
}

// console.log(getDaysPassed(`2020.04.23`));
