import React, {useCallback} from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useDispatch, useSelector} from 'react-redux';
import {indexSlice} from '../../store/reducers';
import {darkMode} from '../darkModeStyles';
import styles from './style';

const DesireMbtiBox = ({mbti}) => {
  const dispatch = useDispatch();
  const desireMbti = useSelector(state => state.index.desireMbti);
  const mode = useSelector(state => state.my.mode);

  const onPressDesireMbti = useCallback(
    title => () => {
      dispatch(indexSlice.actions.setDesireMbti([title]));
    },
    [],
  );

  const onRemoveDesireMbti = useCallback(
    title => () => {
      dispatch(indexSlice.actions.removeDesireMbti(title));
    },
    [],
  );
  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={
          desireMbti.includes(mbti.title)
            ? onRemoveDesireMbti(mbti.title)
            : onPressDesireMbti(mbti.title)
        }
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
        {desireMbti.includes(mbti.title) ? (
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

export default DesireMbtiBox;
