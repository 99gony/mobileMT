import {Dimensions} from 'react-native';
import {getBottomSpace, getStatusBarHeight} from 'react-native-iphone-x-helper';

const extraHeight = getBottomSpace() + getStatusBarHeight() + 180;
const windowHeight = Dimensions.get('window').height - extraHeight;
const windowWidth = Dimensions.get('window').width;

export const getRandom = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};
export const getPipeSizePosPair = (addToPosX = 0) => {
  let yPosTop = -getRandom(300, windowHeight - 100);

  const pipeTop = {
    pos: {x: windowWidth + addToPosX, y: yPosTop},
    size: {height: windowHeight * 2.1, width: 60},
  };
  const pipeBottom = {
    pos: {x: windowWidth + addToPosX, y: windowHeight * 2 + 200 + yPosTop},
    size: {height: windowHeight * 2.1, width: 60},
  };

  return {pipeTop, pipeBottom};
};
