import React, {useCallback} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import ModalManager from '.';
import {roomSlice} from '../../store/reducers/room';
import {darkMode} from '../darkModeStyles';

const FriendModal = ({showModal, setShowModal}) => {
  const dispatch = useDispatch();
  const mode = useSelector(state => state.my.mode);
  const onPressFriend = useCallback(() => {
    dispatch(roomSlice.actions.onSendFriend());
    setShowModal(false);
  }, []);

  const onPressCancel = useCallback(() => {
    setShowModal(false);
  }, []);

  return (
    <ModalManager showModal={showModal} setShowModal={setShowModal}>
      <View
        style={[
          styles.container,
          mode === 'dark' ? darkMode.impactBackground : null,
        ]}>
        <View style={styles.description}>
          <Text
            style={[
              styles.descriptionTitle,
              mode === 'dark' ? darkMode.font : null,
            ]}>
            친구 요청을 보내시겠습니까?
          </Text>
          <Text
            style={[
              styles.descriptionText,
              mode === 'dark' ? darkMode.descriptionFont : null,
            ]}>
            매칭마다 한 번만 보낼 수 있습니다.
          </Text>
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity onPress={onPressFriend} style={styles.button}>
            <Text style={styles.sendButtonText}>보내기</Text>
          </TouchableOpacity>
          <View style={styles.divider} />
          <TouchableOpacity onPress={onPressCancel} style={styles.button}>
            <Text
              style={[
                styles.cancelButtonText,
                mode === 'dark' ? darkMode.font : null,
              ]}>
              취소
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </ModalManager>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ffffff',
    borderRadius: 24,
    width: 270,
    height: 140,
  },
  description: {
    flex: 3,
    borderBottomWidth: 1,
    borderBottomColor: '#c9c9c9',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  descriptionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#242424',
    paddingTop: 8,
  },
  descriptionText: {fontSize: 14, color: 'gray', marginTop: 8},
  buttonContainer: {flex: 2, flexDirection: 'row', alignItems: 'center'},
  button: {
    flex: 1,
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  sendButtonText: {
    fontSize: 17,
    color: 'rgb(0, 149, 246)',
    fontWeight: 'bold',
  },
  divider: {height: '100%', backgroundColor: '#c9c9c9', width: 1},
  cancelButtonText: {fontSize: 17, fontWeight: 'bold', color: '#242424'},
});

export default FriendModal;
