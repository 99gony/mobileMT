import React, {useCallback} from 'react';
import {useNavigation} from '@react-navigation/native';
import {TouchableOpacity} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {roomSlice} from '../../store/reducers/room';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {darkMode} from '../darkModeStyles';

const Quit = () => {
  const dispatch = useDispatch();
  const isLeave = useSelector(state => state.room.isLeave);
  const isFinding = useSelector(state => state.room.isFinding);
  const mode = useSelector(state => state.my.mode);
  const navigation = useNavigation();
  const onPressQuit = useCallback(() => {
    if (isLeave || isFinding) {
      return navigation.goBack();
    }
    dispatch(roomSlice.actions.setIsWriting(false));
    dispatch(roomSlice.actions.setIsLeave(true));
  }, [isLeave, isFinding]);

  return (
    <TouchableOpacity onPress={onPressQuit}>
      <FontAwesome5
        name="door-open"
        size={24}
        color={mode === 'dark' ? darkMode.font.color : '#242424'}
      />
    </TouchableOpacity>
  );
};

export default Quit;
