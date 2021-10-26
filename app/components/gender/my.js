import React, {useCallback} from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useDispatch, useSelector} from 'react-redux';
import {mySlice} from '../../store/reducers/my';
import styles from './style';

const MyGenderPicker = () => {
  const dispatch = useDispatch();
  const myGender = useSelector(state => state.my.myGender);

  const onPressGender = useCallback(
    gender => () => {
      dispatch(mySlice.actions.setMyGender(gender));
    },
    [],
  );

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={onPressGender('boy')}
        style={[styles.genderButton, styles.manButton]}>
        <Text style={[styles.genderButtonText, styles.manButtonText]}>
          {myGender === 'boy' ? (
            <Ionicons name="checkmark-sharp" size={18} />
          ) : null}
          남자
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={onPressGender('girl')}
        style={[styles.genderButton, styles.womanButton]}>
        <Text style={[styles.genderButtonText, styles.womanButtonText]}>
          {myGender === 'girl' ? (
            <Ionicons name="checkmark-sharp" size={18} />
          ) : null}
          여자
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default MyGenderPicker;
