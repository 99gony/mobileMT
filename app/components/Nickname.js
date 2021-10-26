import React, {useCallback, useEffect, useRef, useState} from 'react';
import {
  Animated,
  Dimensions,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {mySlice} from '../store/reducers/my';
import {darkMode} from './darkModeStyles';

const Nickname = () => {
  const dispatch = useDispatch();
  const mode = useSelector(state => state.my.mode);
  const [name, setName] = useState('');
  const [disabled, setDisabled] = useState(true);

  const animation = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(animation, {
      toValue: 1,
      duration: 1500,
      useNativeDriver: true,
    }).start();
  }, []);

  const onChangeName = useCallback(text => {
    if (text.trim().length >= 2 && text.trim().length <= 10) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
    setName(text);
  }, []);

  const onSelectName = useCallback(() => {
    if (name.trim().length && name.trim().length <= 10) {
      dispatch(mySlice.actions.setMyName(name.trim()));
    }
  }, [name]);

  return (
    <Animated.View style={[styles.container, {opacity: animation}]}>
      <Text
        style={[styles.description, mode === 'dark' ? darkMode.font : null]}>
        친구에게 보여질 닉네임을 설정해주세요.
      </Text>
      <View style={styles.nameInput}>
        <TextInput
          onChangeText={onChangeName}
          style={styles.textInputStyle}
          maxLength={10}
          placeholder="닉네임 입력"
        />
        <TouchableOpacity
          onPress={onSelectName}
          disabled={disabled}
          style={styles.selectButton}>
          <Text
            style={[
              styles.selectButtonText,
              disabled ? styles.disabledStyle : null,
            ]}>
            완료
          </Text>
        </TouchableOpacity>
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: Dimensions.get('window').width,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 36,
  },
  description: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#242424',
    marginBottom: 18,
  },
  nameInput: {
    width: '60%',
    flexDirection: 'row',
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#c0c0c0',
    height: 42,
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingLeft: 18,
    borderRadius: 21,
  },
  textInputStyle: {fontSize: 15, flex: 1, padding: 0},
  selectButton: {
    borderLeftWidth: 1,
    borderLeftColor: '#c0c0c0',
    paddingHorizontal: 12,
    paddingVertical: 4,
  },
  selectButtonText: {
    fontSize: 16,
    color: 'rgb(0, 149, 246)',
    fontWeight: 'bold',
  },
  disabledStyle: {
    opacity: 0.3,
  },
});
export default Nickname;
