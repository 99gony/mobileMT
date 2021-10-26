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
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useDispatch, useSelector} from 'react-redux';
import {mySlice} from '../../store/reducers/my';
import {serverAPI} from '../serverAPI';
import {isTablet} from 'react-native-device-info';

const isTab = isTablet();

const EulaModal = () => {
  const dispatch = useDispatch();
  const {isAgreeEula, myMbti, myGender, myCharacter, myName} = useSelector(
    state => state.my,
  );
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!isAgreeEula) {
      setShowModal(true);
    } else {
      setShowModal(false);
    }
  }, [isAgreeEula]);

  const onPressAgree = useCallback(async () => {
    setLoading(true);
    try {
      const myId = await axios.post(`${serverAPI}/user/agreeEula`, {
        name: myName,
        gender: myGender,
        mbti: myMbti,
        character: myCharacter,
      });
      if (myId.data) {
        dispatch(mySlice.actions.setAgreeEula());
        dispatch(mySlice.actions.setMyId(myId.data));
        setLoading(false);
      }
    } catch (err) {
      console.log(err);
    }
  }, [myMbti, myGender, myCharacter, myName]);

  return (
    <ReactNativeModal
      isVisible={showModal}
      animationIn="fadeInDown"
      animationOut="fadeOutDown"
      style={styles.modalStyle}>
      <View style={styles.container}>
        <View style={styles.descriptionContainer}>
          <Ionicons name="warning-outline" size={32} color="red" />
          <View style={styles.description}>
            <Text>
              타인에게 불쾌한 콘텐츠 공유, 욕설, 비방, 성희롱 등을 자제해 주시기
              바랍니다.
            </Text>
          </View>
          <View style={styles.description}>
            <Text>
              본 서비스는 사용자의 개인정보를 수집하지도 저장하지도 유포하지도
              않습니다.
            </Text>
          </View>
          <View style={styles.description}>
            <Text>관리자는 사용자에게 개인정보를 절대 물어보지 않습니다.</Text>
          </View>
          <View style={styles.description}>
            <Text>
              개인정보를 노출하지 마시고 각종 사칭, 사기에 주의해주시기를
              바랍니다.
            </Text>
          </View>
          <Text style={styles.lastDescription}>
            계속 진행하시려면 이용약관 및
            <Text
              onPress={() => {
                Linking.openURL('http://mbtitalk.co.kr/privacy');
              }}>
              {' '}
              개인정보처리방침에{' '}
            </Text>
            동의하셔야 합니다.
          </Text>
        </View>
        <View style={styles.divider} />
        <TouchableOpacity
          disabled={loading}
          onPress={onPressAgree}
          style={styles.agreeContainer}>
          {loading ? (
            <ActivityIndicator size="small" color="black" />
          ) : (
            <Text style={styles.agree}>동의하고 시작하기</Text>
          )}
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
    width: isTab ? '50%' : '100%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ffffff',
    borderRadius: 27,
  },
  descriptionContainer: {
    paddingTop: 32,
    paddingHorizontal: 32,
    paddingBottom: 21,
    alignItems: 'center',
    justifyContent: 'center',
  },
  description: {
    marginTop: 12,
  },
  lastDescription: {
    marginTop: 18,
    textAlign: 'center',
    color: 'gray',
    fontSize: 13,
  },
  agreeContainer: {
    height: 60,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  agree: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  divider: {
    height: 1,
    width: '100%',
    backgroundColor: '#d9d9d9',
  },
});

export default EulaModal;
