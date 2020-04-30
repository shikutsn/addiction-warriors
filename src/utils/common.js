const getRandomNumber = (min, max) => {
  // случайное целое число из полуинтервала [min, max)
  return Math.floor(Math.random() * (max - min)) + min;
};

const getRandomArrayItem = (array) => {
  return array[getRandomNumber(0, array.length)];
};

const removeDuplicates = (array) => {
  return array.filter((item, position) => array.indexOf(item) === position);
};

const getDaysPassed = (date) => {
  // date YYYY.MM.DD
  // returns amount of days passed since date
  const oldDate = new Date(date);
  const currentDate = new Date();

  return Math.floor((currentDate - oldDate) / 1000 / 60 / 60 / 24);
};


export {getDaysPassed, getRandomNumber, getRandomArrayItem, removeDuplicates};
