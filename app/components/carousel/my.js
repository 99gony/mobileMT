import React, {useCallback} from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useDispatch, useSelector} from 'react-redux';
import {mySlice} from '../../store/reducers/my';
import {darkMode} from '../darkModeStyles';
import styles from './style';

const MyMbtiBox = ({mbti}) => {
  const dispatch = useDispatch();
  const myMbti = useSelector(state => state.my.myMbti);
  const mode = useSelector(state => state.my.mode);
  const onPressMyMbti = useCallback(
    title => () => {
      dispatch(mySlice.actions.setMyMbti(title));
    },
    [],
  );
  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={onPressMyMbti(mbti.title)}
        style={[
          styles.mbtiBox,
          styles[mbti.title],
          mode === 'dark' ? darkMode.impactBackground : null,
        ]}>
        <Text style={[styles.mbtiTitle, styles[mbti.title]]}>{mbti.title}</Text>
        <Text
          style={[
            styles.mbtiDescription,
            mode === 'dark' ? darkMode.descriptionFont : null,
          ]}>
          {mbti.description}
        </Text>
        {myMbti === mbti.title ? (
          <View style={styles.onSelected}>
            <Ionicons
              name="checkmark-sharp"
              size={32}
              style={styles[mbti.title]}
            />
          </View>
        ) : null}
      </TouchableOpacity>
    </View>
  );
};

export default MyMbtiBox;
