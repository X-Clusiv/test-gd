import {dataLines} from "../data/dataLines.js";
import {CONFIG} from "../config.js";

export const positiveNegativeProcessing = (lineNum, number) => {
  const {MAX_NUM_REPEAT} = CONFIG
  const dataLine = dataLines[lineNum];
  if (number > 0) {
    if (dataLine.minPositiveValue > number) {
      dataLine.minPositiveValue = number;
    }
    if (dataLine.countNegativeNumbers >= MAX_NUM_REPEAT) {
      dataLine.countNegativeNumbersResult.push(dataLine.countNegativeNumbers);
    }
    dataLine.countNegativeNumbers = 0;
    dataLine.countPositiveNumbers += 1;
    return;
  }
  if (number < 0) {
    if (dataLine.countPositiveNumbers >= MAX_NUM_REPEAT) {
      dataLine.countPositiveNumbersResult.push(dataLine.countPositiveNumbers);
    }
    dataLine.countPositiveNumbers = 0;
    dataLine.countNegativeNumbers += 1;
    return;
  }
  if (dataLine.countNegativeNumbers >= MAX_NUM_REPEAT) {
    dataLine.countNegativeNumbersResult.push(dataLine.countNegativeNumbers);
  }
  if (dataLine.countPositiveNumbers >= MAX_NUM_REPEAT) {
    dataLine.countPositiveNumbersResult.push(dataLine.countPositiveNumbers);
  }
  dataLine.countPositiveNumbers = 0;
  dataLine.countNegativeNumbers = 0;
}