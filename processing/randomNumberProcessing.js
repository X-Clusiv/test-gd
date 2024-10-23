import {positiveNegativeProcessing} from "./positiveNegativeProcessing.js";
import {dataLines} from "../data/dataLines.js";

export const randomNumberProcessing = (lineNum, number) => {
  const dataLine = dataLines[lineNum];
  if (dataLine.minValue > number) {
    dataLine.minValue = number;
  }
  positiveNegativeProcessing(lineNum, number);
}