import React, {useCallback} from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {indexSlice} from '../../store/reducers';
import Ionicons from 'react-native-vector-icons/Ionicons';
import styles from './style';
import {darkMode} from '../darkModeStyles';

const DesireGenderPicker = () => {
  const dispatch = useDispatch();
  const desireGender = useSelector(state => state.index.desireGender);
  const mode = useSelector(state => state.my.mode);

  const onPressDesireGender = useCallback(
    gender => () => {
      dispatch(indexSlice.actions.setDesireGender([gender]));
    },
    [],
  );

  const onRemoveDesireGender = useCallback(
    gender => () => {
      dispatch(indexSlice.actions.removeDesireGender(gender));
    },
    [],
  );

  const onPressAnyGender = useCallback(() => {
    dispatch(indexSlice.actions.setDesireGender(['boy', 'girl']));
  }, []);

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={
          desireGender?.includes('boy')
            ? onRemoveDesireGender('boy')
            : onPressDesireGender('boy')
        }
        style={[
          styles.genderButton,
          styles.manButton,
          mode === 'dark' ? darkMode.impactBackground : null,
        ]}>
        <Text style={[styles.genderButtonText, styles.manButtonText]}>
          {desireGender?.includes('boy') ? (
            <Ionicons name="checkmark-sharp" size={18} />
          ) : null}
          남자
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={onPressAnyGender}
        style={[
          styles.genderButton,
          styles.anyGenderButton,
          mode === 'dark' ? darkMode.impactBackground : null,
        ]}>
        <Text style={[styles.genderButtonText, styles.anyGenderButtonText]}>
          상관 없음
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={
          desireGender?.includes('girl')
            ? onRemoveDesireGender('girl')
            : onPressDesireGender('girl')
        }
        style={[
          styles.genderButton,
          styles.womanButton,
          mode === 'dark' ? darkMode.impactBackground : null,
        ]}>
        <Text style={[styles.genderButtonText, styles.womanButtonText]}>
          {desireGender?.includes('girl') ? (
            <Ionicons name="checkmark-sharp" size={18} />
          ) : null}
          여자
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default DesireGenderPicker;
