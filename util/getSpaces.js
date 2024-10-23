import {CONFIG} from "../config.js";

export const getSpaces = (countChar) => {
  if(countChar < 0){
    countChar = 0
  }
  return CONFIG.SPACE_CHAR.repeat(countChar);
}