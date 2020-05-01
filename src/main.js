import {getDaysPassed, getRandomNumber} from "./utils/common.js";
import {createElement} from "./utils/render.js";
import {Gear} from "./data/loot-base.js";
import {Warriors} from "./data/warriors.js";

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

const GearMods = {
  // modifiers after you got something
  DURATION: 14, // how long it lasts
  MOD: 1.2, // mod to final gear
};


const getGearSum = (warrior) => {
  // returns sum of items scores
  return warrior.GEAR.reduce((total, it) => total + Gear[it.NAME].VALUE, 0);
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
    .map((it) => `<li class="warrior__gearitem"><a href="${Gear[it.NAME].LINK}"></a> <span class="warrior__gearitemscore">[${Gear[it.NAME].VALUE}]</span> ${getDaysPassed(it.OBTAINED)} day(s) ago</li>`)
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
      <span class="warrior__data">Gear Score: <span class="warrior__data--gearscore">${gearScore}</span></span>
      <span class="warrior__data warrior__data--gearsum">GearSum: ${gearSum}</span>
      <span class="warrior__data warrior__data--scoremod">ScoreMod: ${scoreMod}</span>
    </div>
    <ul class="warrior__gear">
      ${gearMarkup}
    </ul>
  </article>`);
};

const renderWarriors = (warriorsArray) => {
  // containerElement.innerHTML = ``;

  warriorsArray.forEach((it, i) => {
    const warriorElement = createElement(getWarriorTemplate(it, i + 1));
    containerElement.append(warriorElement);
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
