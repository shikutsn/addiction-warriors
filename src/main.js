import {getDaysPassed} from "./utils/common.js";
import {createElement} from "./utils/render.js";
import {Gear} from "./data/loot-base.js";
import {Warriors} from "./data/warriors.js";
import {DFTowners, CTSowners} from "./data/important-loot.js";

// TODO publish it on github.io? so that everyone could check it

// TODO Actually need to think what to do with gearScore of newcomers. Specially if they are blue, cause once they become raiders they'll be first in line to get anything.

// General guidelines:
// Amongst those who want an item one with the least Gear Rating usually gets it. I reserve right to sometimes override it based on different unpredictable factors
// I value weapons and irreplacable items (such as DFT or chromatic boots or onslaught girdle) quite high
// Also, to prevent ppl just mindlessly needing on everything there is a "price" even if you get something for offspec
// that includes stuff like two handed weapons but doesnt include pure tanking oriented gear (sets, shields, trinkets etc)
// based on warcraftlogs performance every individual gets some modifier to his overall gear rating. The better that individual performs the less it becomes making your final gear rating less therefore making you to likely get an item
// then you get 2 weeks long increase to your gear rating after looting something. Value of it depends on quality of item you looted (?)
// should probably add increasing gear rating buff if you didnt get items for a while. Lets say 0.95**(noLootWeeksCouns)
// if you have edgemasters and are fine with axes/daggers - you also get permanent 0.9 modifier to gear score (making you more likely to get loot)

const GearMods = {
  // modifiers after you got something
  DURATION: 14, // how long it lasts
  MOD: 1.1, // mod to final gearscore
};


const getGearSum = (warrior) => {
  // returns sum of items scores
  return warrior.GEAR.reduce((total, it) => total + Gear[it.NAME].VALUE, 0);
};

const getScoreMod = (warrior) => {
  // returns combined score modifier (cause of penalties - checking if they are already obsolete and cause of gear)

  let targetMod = 1;
  // first, if item was obtained before GearMods.DURATION days passed, multiply its mod
  targetMod = warrior.GEAR.reduce((total, it) => (GearMods.DURATION > getDaysPassed(it.OBTAINED)) ? total * GearMods.MOD : total, targetMod);

  // second, penalties
  targetMod = warrior.PENALTIES.reduce((total, it) => (it.DURATION > getDaysPassed(it.ASSIGNED)) ? total * it.VALUE : total, targetMod);

  // third, personal modifier
  targetMod = targetMod * warrior.PERSONAL_MOD;

  // debug
  // console.log(`GEAR:`);
  // warrior.GEAR.map((it) => console.log(`${Gear[it.NAME].NAME} cost(s) ${Gear[it.NAME].VALUE}`));
  // warrior.PENALTIES.map((it) => console.log(`${it.REASON} for ${it.DURATION} day(s) with mod ${it.VALUE} on ${it.ASSIGNED}`));

  return Math.round(targetMod * 1000) / 1000;
};

const getGearScore = (warrior) => {
  return Math.round(getGearSum(warrior) * getScoreMod(warrior));
};

const getGearMarkup = (warrior) => {
  return warrior.GEAR.slice()
    .sort((a, b) => getDaysPassed(a.OBTAINED) - getDaysPassed(b.OBTAINED))
    .map((it) => `<li class="warrior__gearitem"><a href="${Gear[it.NAME].LINK}"></a> <span class="warrior__gearitemscore">[${Gear[it.NAME].VALUE}]</span> <span class="warrior__gearitemdays">${getDaysPassed(it.OBTAINED)}</span> day(s) ago</li>`)
    .join(`\n`);
};

const getWarriorTemplate = (warrior, number) => {
  // generates html template for warrior with number
  const gearSum = getGearSum(warrior);
  const scoreMod = getScoreMod(warrior);
  const gearScore = getGearScore(warrior);
  const gearMarkup = getGearMarkup(warrior);

  const penaltiesCurrent = warrior.PENALTIES.filter((it) => getDaysPassed(it.ASSIGNED) < it.DURATION);
  const penaltiesPast = warrior.PENALTIES.filter((it) => getDaysPassed(it.ASSIGNED) >= it.DURATION);

  const penaltiesCurrentMarkup = penaltiesCurrent.slice()
    .sort((a, b) => getDaysPassed(b.OBTAINED) - getDaysPassed(a.OBTAINED))
    .map((it) => `<li>"${it.REASON}" at ${it.ASSIGNED} for ${it.DURATION} day(s). Expires in ${it.DURATION - getDaysPassed(it.ASSIGNED)} day(s). Value = ${it.VALUE}</li>`)
    .join(`\n`);
  const penaltiesPastMarkup = penaltiesPast.slice()
    .sort((a, b) => getDaysPassed(b.OBTAINED) - getDaysPassed(a.OBTAINED))
    .map((it) => `<li>"${it.REASON}" at ${it.ASSIGNED} for ${it.DURATION} day(s). Expired ${getDaysPassed(it.ASSIGNED) - it.DURATION - 1} day(s) ago. Value = ${it.VALUE}</li>`)
    .join(`\n`);

  let debugString = ``; // used not to get warning when debug section is commented
  // -------------------- debug ----------------------
  // checks if modifier to gear score is calculated correctly
  // let targetMod = 1;
  // let debugString = `debug: `;
  // // first, if item was obtained before GearMods.DURATION days passed, multiply its mod
  // targetMod = warrior.GEAR.reduce((total, it) => (GearMods.DURATION > getDaysPassed(it.OBTAINED)) ? total * GearMods.MOD : total, targetMod);
  // warrior.GEAR.forEach((it) => (GearMods.DURATION > getDaysPassed(it.OBTAINED)) ? debugString += `${GearMods.MOD}; ` : debugString);
  //
  // // second, penalties
  // targetMod = warrior.PENALTIES.reduce((total, it) => (it.DURATION > getDaysPassed(it.ASSIGNED)) ? total * it.VALUE : total, targetMod);
  // warrior.PENALTIES.forEach((it) => (it.DURATION > getDaysPassed(it.ASSIGNED)) ? debugString += `${it.VALUE}; ` : debugString);
  //
  // // third, personal modifier
  // targetMod = targetMod * warrior.PERSONAL_MOD;
  // debugString += `${warrior.PERSONAL_MOD}; `;
  // debugString += `total: ${Math.round(targetMod * 1000) / 1000}`;
  // -------------------------------------------------

  return (
    `<article class="warrior">
    <div class="warrior__caption-container">
      <span class="warrior__data">${number}) <span class="warrior__data--name">${warrior.NAME}</span></span>
      <span class="warrior__data warrior__data--rank">${warrior.RANK}</span>
      <span class="warrior__data">Gear Score: <span class="warrior__data--gearscore">${gearScore}</span></span>
      <span class="warrior__data warrior__data--gearsum">GearSum: ${gearSum}</span>
      <span class="warrior__data warrior__data--scoremod">ScoreMod: ${scoreMod}</span>
      ${debugString}
    </div>
    <ul class="warrior__gear">
      ${gearMarkup}
    </ul>
    <div class="warrior__penalties-container">
      <h2 class="warrior__penalties-caption">Penalties</h2>
      <div class="warrior__penalties-list-container">
        <ul class="warrior__penalties-list warrior__penalties-list--current">
          <h3 class="warrior__penalties-list-caption">Current:</h3>
          ${penaltiesCurrentMarkup}
        </ul>
        <ul class="warrior__penalties-list warrior__penalties-list--past">
          <h3 class="warrior__penalties-list-caption">Past:</h3>
          ${penaltiesPastMarkup}
        </ul>
      </div>
    </div>
  </article>`
  );
};

const renderWarriors = (warriorsArray) => {
  // containerElement.innerHTML = ``;

  warriorsArray.forEach((it, i) => {
    const warriorElement = createElement(getWarriorTemplate(it, i + 1));
    containerElement.append(warriorElement);
    // debug
    // console.log(warriorElement);
  });
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
sortedWarriorsTrials.sort((a, b) => getGearScore(a) - getGearScore(b));
sortedWarriorsTanks.sort((a, b) => getGearScore(a) - getGearScore(b));
let sortedWarriors = [].concat(sortedWarriorsRaiders, sortedWarriorsTanks, sortedWarriorsTrials);
// sortedWarriors.sort((a, b) => getGearScore(a) - getGearScore(b));
renderWarriors(sortedWarriors);

// renderWarriors(sortedWarriorsRaiders);
// renderWarriors(sortedWarriorsTrials);
// renderWarriors(sortedWarriorsTanks);

// sortedWarriorsTrials.sort((a, b) => getGearScore(a) - getGearScore(b));
// sortedWarriorsTrials.forEach((it, i) => {
//   const warriorElement = createElement(getWarriorTemplate(it, i + 1));
//   containerElement.append(warriorElement);
// });
// TODO add active penalties as well as penalties history

// TODO doesnt work yet cuz wowhead links dont get updated
// const selectWarriorTypeElement = document.querySelector(`.warriors__type-choser`);
// selectWarriorTypeElement.addEventListener(`click`, (evt) => {
//   const selectedOption = evt.target.selectedOptions[0].label;
//   if (selectedOption === `Raider`) {
//     renderWarriors(sortedWarriorsRaiders);
//   } else if (selectedOption === `Trial`) {
//     renderWarriors(sortedWarriorsTrials);
//   } else if (selectedOption === `Tank`) {
//     renderWarriors(sortedWarriorsTanks);
//   }
// });
const getOwnersTemplate = (dft, cts) => {
  const getItemMarkup = (arr) => {
    // returns li of one person getting important item
    return arr
      .slice()
      .sort((a, b) => getDaysPassed(a.OBTAINED) - getDaysPassed(b.OBTAINED))
      .map((it) => `<li><span class="important-loot-list__${it.CLASS}-name">${it.NAME}</span> at ${it.OBTAINED}, ${getDaysPassed(it.OBTAINED)} day(s) ago</li>`)
      .join(`\n`);
  };

  const dftWarriorsMarkup = getItemMarkup(dft.filter((it) => it.CLASS === `warrior`));
  const dftRoguesMarkup = getItemMarkup(dft.filter((it) => it.CLASS === `rogue`));
  const ctsWarriorsMarkup = getItemMarkup(cts.filter((it) => it.CLASS === `warrior`));
  const ctsRoguesMarkup = getItemMarkup(cts.filter((it) => it.CLASS === `rogue`));

  return (
    `<section class="important-loot-list">
      <article class="important-loot-list__dft">
        <h2 class="important-loot-list__dft-caption">DFT owners [what to do with leavers?] (<a href="https://classic.wowhead.com/item=19406/drake-fang-talisman"></a>)</h2>
        <div class="important-loot-list__container">
          <ul class="important-loot-list__list important-loot-list__dft-warriors">
            ${dftWarriorsMarkup}
          </ul>
          <ul class="important-loot-list__list important-loot-list__dft-rogues">
            ${dftRoguesMarkup}
          </ul>
        </div>
      </article>
      <article class="important-loot-list__cts">
        <h2 class="important-loot-list__cts-caption">CTS owners (<a href="https://classic.wowhead.com/item=19352/chromatically-tempered-sword"></a>)</h2>
        <div class="important-loot-list__container">
          <ul class="important-loot-list__list important-loot-list__cts-warriors">
            ${ctsWarriorsMarkup}
          </ul>
          <ul class="important-loot-list__list important-loot-list__cts-rogues">
            ${ctsRoguesMarkup}
          </ul>
        </div
      </article>
    </section>`
  );
};

const mainElement = document.querySelector(`.main`);

// console.log(getOwnersTemplate(DFTowners, CTSowners));
// console.log(createElement(getOwnersTemplate(DFTowners, CTSowners)))
// mainElement.prepend(createElement(getOwnersTemplate(DFTowners, CTSowners)));

const tmp = getOwnersTemplate(DFTowners, CTSowners);
// console.log(tmp);
// console.log(`--` + createElement(tmp) + `--`);
mainElement.prepend(createElement(tmp));
