import React, {useCallback} from 'react';
import {StyleSheet} from 'react-native';
import SwitchSelector from 'react-native-switch-selector';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useDispatch, useSelector} from 'react-redux';
import {mySlice} from '../../store/reducers/my';

const ModeChanger = () => {
  const dispatch = useDispatch();
  const mode = useSelector(state => state.my.mode);

  const onPressSwitch = useCallback(value => {
    dispatch(mySlice.actions.setMode(value));
  }, []);

  return (
    <SwitchSelector
      initial={mode === 'light' ? 0 : 1}
      style={[styles.container, mode === 'dark' ? {borderWidth: 0} : null]}
      disableValueChangeOnPress
      buttonMargin={3}
      onPress={onPressSwitch}
      height={24}
      buttonColor="white"
      backgroundColor={mode === 'light' ? 'rgb(221,242,240)' : 'black'}
      options={[
        {
          value: 'light',
          customIcon:
            mode === 'light' ? null : (
              <Ionicons name="moon" color="rgb(238,219,87)" size={19} />
            ),
        },
        {
          value: 'dark',
          customIcon:
            mode === 'dark' ? null : (
              <Ionicons name="sunny" color="rgb(228,140,0)" size={23} />
            ),
        },
      ]}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    width: 62,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#d9d9d9',
    borderRadius: 31,
  },
});

export default ModeChanger;
