import {positiveNegativeProcessing} from "./processing/positiveNegativeProcessing.js";
import {dataLines} from "./data/dataLines.js";
import {randomNumberProcessing} from "./processing/randomNumberProcessing.js";
import {getSpaces} from "./util/getSpaces.js";
import {getRandomNumber} from "./util/getRandomNumber.js";
import {CONFIG} from "./config.js";

export const main = ()=>{
  console.log('CONFIG:')
  console.log(CONFIG)
  const {WITH_ARRAY, HEIGHT_ARRAY, MIN_VALUE, MAX_VALUE, SPACE_CHAR, START_SPACE_COUNT, MAX_NUM_REPEAT} = CONFIG

  const resultArray = [];
  let lineNum = -1;
  let minNumber = MAX_VALUE;
  for (let i = 0; i <= WITH_ARRAY * HEIGHT_ARRAY; i++) {
    if (i % WITH_ARRAY === 0) {
      if (lineNum > -1) {
        positiveNegativeProcessing(lineNum, 0);
      }
      lineNum++;
      dataLines[lineNum] = {
        minValue: MAX_VALUE,
        minPositiveValue: MAX_VALUE,
        countNegativeNumbers: 0,
        countPositiveNumbers: 0,
        countNegativeNumbersResult: [],
        countPositiveNumbersResult: [],
        isMinimumNumber: false,
      };
      resultArray.push([]);
    }
    const randomNumber = getRandomNumber(MIN_VALUE, MAX_VALUE);
    if (minNumber > randomNumber) {
      minNumber = randomNumber;
    }
    resultArray[lineNum].push(randomNumber);
    randomNumberProcessing(lineNum, randomNumber);
  }

  resultArray.forEach((_, lineNum) => {
    const dataLine = dataLines[lineNum];
    if (dataLine.minValue === minNumber) {
      dataLine.isMinimumNumber = true;
    }
  });

  const spacesCount = ((MIN_VALUE < 0 ? MIN_VALUE : MAX_VALUE) + '').length;//Находим максимально возможную длинну числа
  const startSpaceCount = START_SPACE_COUNT;
  let headerStr = getSpaces(startSpaceCount);
//Формируем титульную строку
  for (let i = 0; i < WITH_ARRAY; i++) {
    headerStr += i + getSpaces((spacesCount + 1) - ((i + '').length - 1));
  }
  headerStr += 'MinV' + getSpaces(2) + 'MinPV' + getSpaces(2) + 'MinRP' + getSpaces(2) + 'MinRN';
  console.log(headerStr);

//Формируем строки массивов
  resultArray.forEach((arrayNums, lineNum) => {
    const dataLine = dataLines[lineNum];
    const isMinimumNumberRow = dataLine.isMinimumNumber;
    const MinRP = dataLine.countPositiveNumbersResult.reduce((countNumbersForReplace, maxPositiveTotal) => {
      countNumbersForReplace += Math.floor(maxPositiveTotal / MAX_NUM_REPEAT);
      return countNumbersForReplace
    }, 0);
    const MinRN = dataLine.countNegativeNumbersResult.reduce((countNumbersForReplace, maxNegativeTotal) => {
      countNumbersForReplace += Math.floor(maxNegativeTotal / MAX_NUM_REPEAT);
      return countNumbersForReplace
    }, 0);
    const MinV = (isMinimumNumberRow ? '*' : '');
    const MinPV = dataLine.minPositiveValue;
    // Формируем основную информацию из массива(его эллементы)
    let str = lineNum + getSpaces(startSpaceCount - ((lineNum + '').length) - 1);
    arrayNums.forEach((num, index) => {
      num = num >= 0 ? SPACE_CHAR + num : num;
      const countSpaces = spacesCount - ((num + '').length) + 2;
      str += num + getSpaces(countSpaces);
    });
    // Формируем дополнительную инфонмацию о строке массива(MinV&MinPV&MinRP&MinRN)
    let partStr = getSpaces(3) + MinV + getSpaces(3 - (isMinimumNumberRow ? 1 : 0));

    partStr += getSpaces(3) + MinPV + getSpaces(spacesCount - 1 - (dataLine.minPositiveValue + '').length) + getSpaces(4);

    partStr += MinRP + getSpaces(4);

    partStr += getSpaces(2) + MinRN;

    console.log(str + partStr);
  });

  console.log('')
  console.log('MinV = Minimum value of all rows')
  console.log('MinPV = Minimum positive value of row')
  console.log('MinRP = the minimum number of numbers required for replacement so that there are no 3 positive numbers in a row')
  console.log('MinRN = the minimum number of numbers required for replacement so that there are no 3 negative numbers in a row')

  return resultArray
}

main();