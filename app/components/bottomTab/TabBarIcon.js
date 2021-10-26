import React from 'react';
import Icon from 'react-native-vector-icons/Ionicons';

const TabBottomIcon = (focused, name) => {
  let iconName, iconSize, iconColor;
  if (name === 'desire') {
    iconName = 'compass';
    iconSize = focused ? 32 : 27;
  } else if (name === 'list') {
    iconName = 'chatbubbles';
    iconSize = focused ? 26 : 23;
  }
  iconColor = focused ? '#DD484C' : 'lightgray';
  return <Icon name={iconName} size={iconSize} color={iconColor} />;
};

export default TabBottomIcon;
