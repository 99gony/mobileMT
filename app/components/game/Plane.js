import Matter from 'matter-js';
import React from 'react';
import {Image} from 'react-native';
import plane from '../../assets/images/paper_plane.png';

const Plane = props => {
  const widthBody = props.body.bounds.max.x - props.body.bounds.min.x;
  const heightBody = props.body.bounds.max.y - props.body.bounds.min.y;

  const xBody = props.body.position.x - widthBody / 2;
  const yBody = props.body.position.y - heightBody / 2;

  return (
    <Image
      style={{
        position: 'absolute',
        left: xBody,
        top: yBody,
        height: heightBody,
        width: widthBody,
        overflow: 'visible',
        resizeMode: 'cover',
      }}
      source={plane}
    />
  );
};

export default (world, color, pos, size) => {
  const initialPlane = Matter.Bodies.rectangle(
    pos.x,
    pos.y,
    size.width,
    size.height,
    {label: 'Plane'},
  );
  Matter.World.add(world, initialPlane);

  return {
    body: initialPlane,
    color,
    pos,
    renderer: <Plane />,
  };
};
