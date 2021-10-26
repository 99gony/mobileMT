import axios from 'axios';
import React, {useCallback, useEffect, useState} from 'react';
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import ReactNativeModal from 'react-native-modal';
import {useSelector} from 'react-redux';
import {darkMode} from '../darkModeStyles';
import {serverAPI} from '../serverAPI';

const OnFriendRequest = ({socket}) => {
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const friendRequest = useSelector(state => state.room.friendRequest);
  const partnerInfo = useSelector(state => state.room.partnerInfo);
  const myId = useSelector(state => state.my.myId);
  const mode = useSelector(state => state.my.mode);

  useEffect(() => {
    if (friendRequest) {
      setShowModal(true);
    }
  }, [friendRequest]);

  const onPressCancel = useCallback(() => {
    setShowModal(false);
  }, []);

  const onModalHidden = useCallback(() => {
    setError(null);
  }, []);

  const onPressAccept = useCallback(async () => {
    if (partnerInfo) {
      setLoading(true);
      try {
        const newBarId = await axios.post(`${serverAPI}/user/friend`, {
          myId,
          friendId: partnerInfo.id,
        });
        if (newBarId.data) {
          socket.current.emit('friendDone', {
            newBarId: newBarId.data,
            myId,
            partnerId: partnerInfo.id,
          });
        }
        setLoading(false);
        setShowModal(false);
      } catch (err) {
        setLoading(false);
        setError(err.response.data);
      }
    }
  }, [partnerInfo, socket]);

  return (
    <ReactNativeModal
      isVisible={showModal}
      animationIn="fadeInDown"
      animationOut="fadeOutDown"
      onModalHide={onModalHidden}
      style={styles.modalStyle}>
      <View
        style={[
          styles.container,
          mode === 'dark' ? darkMode.impactBackground : null,
        ]}>
        <View style={styles.description}>
          {error ? (
            <Text
              style={[
                styles.descriptionTitle,
                mode === 'dark' ? darkMode.font : null,
              ]}>
              {error}
            </Text>
          ) : (
            <>
              <Text
                style={[
                  styles.descriptionTitle,
                  mode === 'dark' ? darkMode.font : null,
                ]}>
                친구 요청이 왔습니다.
              </Text>
              <Text
                style={[
                  styles.descriptionText,
                  mode === 'dark' ? darkMode.descriptionFont : null,
                ]}>
                상대방은 대화 종료 전까지
              </Text>
              <Text
                style={[
                  styles.descriptionText,
                  mode === 'dark' ? darkMode.descriptionFont : null,
                ]}>
                수락 여부를 알 수 없습니다.
              </Text>
            </>
          )}
        </View>
        <View style={styles.buttonContainer}>
          {loading ? (
            <ActivityIndicator size="small" />
          ) : error ? (
            <TouchableOpacity onPress={onPressCancel} style={styles.button}>
              <Text style={styles.sendButtonText}>확인</Text>
            </TouchableOpacity>
          ) : (
            <>
              <TouchableOpacity
                disabled={loading}
                onPress={onPressAccept}
                style={styles.button}>
                <Text style={styles.sendButtonText}>수락</Text>
              </TouchableOpacity>
              <View style={styles.divider} />
              <TouchableOpacity
                disabled={loading}
                onPress={onPressCancel}
                style={styles.button}>
                <Text style={styles.cancelButtonText}>거절</Text>
              </TouchableOpacity>
            </>
          )}
        </View>
      </View>
    </ReactNativeModal>
  );
};

const styles = StyleSheet.create({
  modalStyle: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ffffff',
    borderRadius: 24,
    width: 270,
    height: 160,
  },
  description: {
    flex: 5,
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
    paddingVertical: 8,
  },
  descriptionText: {fontSize: 13, color: 'gray', marginTop: 1},
  buttonContainer: {flex: 3, flexDirection: 'row', alignItems: 'center'},
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
  cancelButtonText: {fontSize: 17, fontWeight: 'bold', color: '#df7350'},
});

export default OnFriendRequest;
