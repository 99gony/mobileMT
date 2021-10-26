import React, {useCallback} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {indexSlice} from '../../store/reducers';
import ModalManager from '.';
import {roomSlice} from '../../store/reducers/room';
import {darkMode} from '../darkModeStyles';

const BanModal = ({showModal, setShowModal, partnerInfo, banIp}) => {
  const dispatch = useDispatch();
  const mode = useSelector(state => state.my.mode);

  const onPressCancel = useCallback(() => {
    setShowModal(false);
  }, []);

  const onPressBan = useCallback(() => {
    if (partnerInfo) {
      dispatch(indexSlice.actions.setBanIp(partnerInfo.ip));
      dispatch(roomSlice.actions.setIsLeave(true));
      dispatch(roomSlice.actions.setIsWriting(false));
    }
  }, [partnerInfo]);
  // 차단 시 모달 닫고 나가기 구현

  return (
    <ModalManager showModal={showModal} setShowModal={setShowModal}>
      {banIp.includes(partnerInfo?.ip) ? (
        <View
          style={[
            styles.container,
            styles.banAlert,
            mode === 'dark' ? darkMode.impactBackground : null,
          ]}>
          <Text
            style={[
              styles.bannedDescription,
              mode === 'dark' ? darkMode.font : null,
            ]}>
            상대방을 차단하였습니다.
          </Text>
          <Text
            style={[
              styles.banAlertDescription,
              mode === 'dark' ? darkMode.descriptionFont : null,
            ]}>
            앱 종료시 차단 목록이 초기화 됩니다.
          </Text>
        </View>
      ) : (
        <View
          style={[
            styles.container,
            mode === 'dark' ? darkMode.impactBackground : null,
          ]}>
          <View style={styles.description}>
            <Text
              style={[
                styles.descriptionText,
                mode === 'dark' ? darkMode.font : null,
              ]}>
              상대방을 차단하시겠습니까?
            </Text>
            <Text
              style={[
                styles.banAlertDescription,
                mode === 'dark' ? darkMode.descriptionFont : null,
              ]}>
              앱 종료시 차단 목록이 초기화 됩니다.
            </Text>
          </View>
          <View style={styles.buttonContainer}>
            <TouchableOpacity onPress={onPressBan} style={styles.button}>
              <Text style={[styles.buttonText, styles.banButtonText]}>
                차단
              </Text>
            </TouchableOpacity>
            <View style={styles.divider} />
            <TouchableOpacity onPress={onPressCancel} style={styles.button}>
              <Text
                style={[
                  styles.buttonText,
                  mode === 'dark' ? darkMode.font : null,
                ]}>
                취소
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </ModalManager>
  );
};

export const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ffffff',
    borderRadius: 24,
    width: 270,
    height: 140,
  },
  description: {
    flex: 3,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomColor: '#c9c9c9',
    borderBottomWidth: 1,
  },
  descriptionText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#242424',
    paddingTop: 8,
  },
  buttonContainer: {
    flex: 2,
    flexDirection: 'row',
  },
  button: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    fontSize: 17,
    fontWeight: 'bold',
    color: '#242424',
  },
  banButtonText: {
    color: 'red',
  },
  divider: {
    width: 1,
    height: '100%',
    backgroundColor: '#c9c9c9',
  },
  banAlert: {
    height: 80,
    justifyContent: 'center',
    alignItems: 'center',
  },
  banAlertDescription: {
    fontSize: 14,
    color: 'gray',
    marginTop: 8,
  },
  bannedDescription: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#242424',
  },
});

export default BanModal;
