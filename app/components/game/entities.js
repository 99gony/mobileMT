import Matter from 'matter-js';
import Plane from './Plane';
import Floor from './Floor';
import Obstacle from './Obstacle';

import {Dimensions} from 'react-native';
import {getPipeSizePosPair} from './random';
import {getBottomSpace, getStatusBarHeight} from 'react-native-iphone-x-helper';

const extraHeight = getBottomSpace() + getStatusBarHeight() + 280;
const windowHeight = Dimensions.get('window').height - extraHeight;
const windowWidth = Dimensions.get('window').width;

export default restart => {
  if (restart) {
    Matter.Engine.clear(restart.physics.engine);
  }
  let engine = Matter.Engine.create({enableSleeping: false});

  let world = engine.world;

  engine.gravity.y = 0.3;

  const pipeSizePosA = getPipeSizePosPair(windowWidth);
  const pipeSizePosB = getPipeSizePosPair(windowWidth * 1.9);

  return {
    physics: {engine, world},

    Plane: Plane(
      world,
      'green',
      {x: windowWidth / 2, y: windowHeight / 2},
      {height: 30, width: 46},
    ),

    ObstacleTop1: Obstacle(
      world,
      'ObstacleTop1',
      'rgba(246,171,0,0.7)',
      pipeSizePosA.pipeTop.pos,
      pipeSizePosA.pipeTop.size,
    ),
    ObstacleBottom1: Obstacle(
      world,
      'ObstacleBottom1',
      'rgba(122,185,0,0.7)',
      pipeSizePosA.pipeBottom.pos,
      pipeSizePosA.pipeBottom.size,
    ),

    ObstacleTop2: Obstacle(
      world,
      'ObstacleTop2',
      'rgba(33, 128, 196,0.7)',
      pipeSizePosB.pipeTop.pos,
      pipeSizePosB.pipeTop.size,
    ),
    ObstacleBottom2: Obstacle(
      world,
      'ObstacleBottom2',
      'rgba(229, 0, 83,0.7)',
      pipeSizePosB.pipeBottom.pos,
      pipeSizePosB.pipeBottom.size,
    ),

    Floor: Floor(
      world,
      'none',
      {x: windowWidth / 2, y: windowHeight},
      {height: 1, width: windowWidth},
    ),
  };
};
