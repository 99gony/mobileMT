import React, {useCallback, useEffect, useState} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import ReactNativeModal from 'react-native-modal';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useDispatch, useSelector} from 'react-redux';
import {friendSlice} from '../../store/reducers/friend';

const BarNotification = () => {
  const dispatch = useDispatch();
  const notification = useSelector(state => state.friend.notification);
  const [showModal, setShowModal] = useState(false);

  const onPressAgree = useCallback(() => {
    dispatch(friendSlice.actions.setNotification());
  }, []);

  useEffect(() => {
    if (!notification) {
      setShowModal(true);
    } else {
      setShowModal(false);
    }
  }, [notification]);

  return (
    <ReactNativeModal
      isVisible={showModal}
      animationIn="fadeInDown"
      animationOut="fadeOutDown"
      style={styles.modalStyle}>
      <View style={styles.container}>
        <View style={styles.descriptionContainer}>
          <Ionicons name="warning-outline" size={32} color="red" />
          <Text style={styles.description}>
            앱 삭제 및 업데이트 시 친구 목록이 삭제될 수 있습니다.
          </Text>
          <Text style={styles.description}>
            개인정보를 노출하지 마시고 각종 사칭, 사기에 주의해주시기를
            바랍니다.
          </Text>
        </View>
        <View style={styles.divider} />
        <TouchableOpacity onPress={onPressAgree} style={styles.agreeContainer}>
          <Text style={styles.agree}>확인</Text>
        </TouchableOpacity>
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
    width: 270,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ffffff',
    borderRadius: 27,
  },
  descriptionContainer: {
    padding: 21,
    alignItems: 'center',
    justifyContent: 'center',
  },
  description: {
    marginTop: 16,
    fontSize: 15,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#242424',
  },
  divider: {
    height: 1,
    width: '100%',
    backgroundColor: '#d9d9d9',
  },
  agreeContainer: {
    height: 60,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  agree: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'rgb(68, 146, 255)',
  },
});

export default BarNotification;
