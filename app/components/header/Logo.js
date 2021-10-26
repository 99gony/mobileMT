import React from 'react';
import {Image, View} from 'react-native';
import logoImage from '../../assets/images/logo.png';

const Logo = () => {
  return (
    <Image
      source={logoImage}
      style={{position: 'absolute', resizeMode: 'contain', height: 27}}
    />
  );
};

export default Logo;
