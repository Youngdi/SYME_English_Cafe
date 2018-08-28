const { WORST, BEST, CORRECT, calculate, getPercentOverdue } = require('sm2-plus');

const DAY_IN_MINISECONDS = 24 * 60 * 60 * 1000;
const getDaysSinceEpoch = () => Math.round(new Date().getTime() / DAY_IN_MINISECONDS)


const TODAY = getDaysSinceEpoch();
console.log(TODAY);
const testWord = {
  word: 'test',
  update: TODAY -7,
  difficulty: 0.5,
  interval: 10
};
const testWord1 = {
  word: 'test',
  update: 17752,
  difficulty: 0.6070588235294118,
  interval: 2
};
console.info(calculate(testWord1, BEST, TODAY +3));
