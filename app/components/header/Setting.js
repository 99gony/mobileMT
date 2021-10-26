import React, {useCallback, useState} from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useNavigation} from '@react-navigation/native';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {mySlice} from '../../store/reducers/my';
import Modal from 'react-native-modal';
import {darkMode} from '../darkModeStyles';

const Setting = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [showModal, setShowModal] = useState(false);
  const [showLimiter, setShowLimiter] = useState(false);
  const timer = useSelector(state => state.my.timer);
  const mode = useSelector(state => state.my.mode);

  const onCloseModal = useCallback(() => {
    setShowModal(false);
  }, []);

  const onHideModal = useCallback(() => {
    setShowLimiter(false);
  }, []);

  const onResetMyMbti = useCallback(() => {
    if (
      timer.find(t => t.type === 'mbti').timer >
      Date.now() - 1000 * 60 * 60 * 24 * 7
    ) {
      return setShowLimiter(true);
    }
    dispatch(mySlice.actions.resetMyMbti());
    navigation.reset({index: 0, routes: [{name: 'my'}]});
    dispatch(mySlice.actions.setTimer('mbti'));
  }, [timer]);

  const onResetMyCharacter = useCallback(() => {
    if (
      timer.find(t => t.type === 'character').timer >
      Date.now() - 1000 * 60 * 60 * 24 * 7
    ) {
      return setShowLimiter(true);
    }
    dispatch(mySlice.actions.resetMyCharacter());
    navigation.reset({index: 0, routes: [{name: 'my'}]});
    dispatch(mySlice.actions.setTimer('character'));
  }, [timer]);

  const onResetMyName = useCallback(() => {
    if (
      timer.find(t => t.type === 'nickname').timer >
      Date.now() - 1000 * 60 * 60 * 24 * 7
    ) {
      return setShowLimiter(true);
    }
    dispatch(mySlice.actions.resetMyName());
    navigation.reset({index: 0, routes: [{name: 'my'}]});
    dispatch(mySlice.actions.setTimer('nickname'));
  }, [timer]);

  const onShowModal = useCallback(() => {
    setShowModal(true);
  }, []);

  return (
    <View>
      <TouchableOpacity onPress={onShowModal}>
        <Ionicons
          name="settings-outline"
          size={24}
          color={mode === 'dark' ? darkMode.font.color : 'black'}
        />
      </TouchableOpacity>
      <Modal
        isVisible={showModal}
        animationIn="fadeInDown"
        animationOut="fadeOutDown"
        onBackButtonPress={onCloseModal}
        onBackdropPress={onCloseModal}
        onModalHide={onHideModal}
        style={styles.modalStyle}>
        <View
          style={[
            styles.container,
            mode === 'dark' ? darkMode.impactBackground : null,
          ]}>
          {showLimiter ? (
            <View style={styles.limiter}>
              <Text
                style={[
                  styles.limiterText,
                  mode === 'dark' ? darkMode.font : null,
                ]}>
                각 항목당
              </Text>
              <Text
                style={[
                  styles.limiterText,
                  mode === 'dark' ? darkMode.font : null,
                ]}>
                일주일에 한 번씩만
              </Text>
              <Text
                style={[
                  styles.limiterText,
                  mode === 'dark' ? darkMode.font : null,
                ]}>
                변경할 수 있습니다.
              </Text>
            </View>
          ) : (
            <>
              <TouchableOpacity onPress={onResetMyMbti} style={styles.button}>
                <Text
                  style={[
                    styles.buttonText,
                    mode === 'dark' ? darkMode.font : null,
                  ]}>
                  MBTI 유형 변경
                </Text>
              </TouchableOpacity>
              <View style={styles.divider} />
              <TouchableOpacity
                onPress={onResetMyCharacter}
                style={styles.button}>
                <Text
                  style={[
                    styles.buttonText,
                    mode === 'dark' ? darkMode.font : null,
                  ]}>
                  캐릭터 변경
                </Text>
              </TouchableOpacity>
              <View style={styles.divider} />
              <TouchableOpacity onPress={onResetMyName} style={styles.button}>
                <Text
                  style={[
                    styles.buttonText,
                    mode === 'dark' ? darkMode.font : null,
                  ]}>
                  닉네임 변경
                </Text>
              </TouchableOpacity>
            </>
          )}
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  modalStyle: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  container: {
    backgroundColor: '#ffffff',
    borderRadius: 24,
    width: 200,
  },
  button: {
    height: 66,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  divider: {
    width: '100%',
    height: 1,
    backgroundColor: '#c9c9c9',
  },
  limiter: {
    padding: 21,
    alignItems: 'center',
  },
  limiterText: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 3,
    color: '#242424',
  },
});

export default Setting;
