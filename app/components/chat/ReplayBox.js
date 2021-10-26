import axios from 'axios';
import React, {useCallback, useState} from 'react';
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {roomSlice} from '../../store/reducers/room';
import BannedModal from '../modal/BannedModal';
import {serverAPI} from '../serverAPI';
import mbtiStyles from '../mbtiStyles';
import {darkMode} from '../darkModeStyles';

const ReplayBox = ({navigation}) => {
  const dispatch = useDispatch();
  const partnerInfo = useSelector(state => state.room.partnerInfo);
  const myId = useSelector(state => state.my.myId);
  const myIp = useSelector(state => state.my.myIp);
  const mode = useSelector(state => state.my.mode);
  const [showBannedModal, setShowBannedModal] = useState(false);
  const [loading, setLoading] = useState(false);

  const onPressReplay = useCallback(async () => {
    if (loading) {
      return;
    }
    setLoading(true);
    try {
      const isBanned = await axios.post(serverAPI + '/user/permission', {
        myId,
        myIp,
      });
      setLoading(false);
      if (isBanned.data) {
        setShowBannedModal(true);
      } else {
        dispatch(roomSlice.actions.resetRoom());
        dispatch(roomSlice.actions.triggerReplay());
      }
    } catch (err) {
      setLoading(false);
    }
  }, [loading, myId, myIp]);

  const onPressChangeDesire = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={[
          styles.button,
          mode === 'dark' ? darkMode.impactBackground : null,
        ]}
        onPress={onPressChangeDesire}>
        <Text
          style={[
            styles.changeDesireButtonText,
            mode === 'dark' ? darkMode.font : null,
          ]}>
          원하는 대상 설정 변경
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        disabled={loading}
        style={[
          styles.button,
          mode === 'dark' ? darkMode.impactBackground : null,
        ]}
        onPress={onPressReplay}>
        {loading ? (
          <ActivityIndicator
            size="small"
            color={mbtiStyles[partnerInfo.mbti].backgroundColor}
          />
        ) : (
          <Text
            style={[
              styles.replayButtonText,
              mbtiStyles[`${partnerInfo.mbti}Text`],
            ]}>
            그대로 다시 매칭!
          </Text>
        )}
      </TouchableOpacity>
      <BannedModal
        showModal={showBannedModal}
        setShowModal={setShowBannedModal}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 48,
    marginBottom: 14,
    marginTop: 6,
    paddingHorizontal: 12,
    flexDirection: 'row',
  },
  button: {
    flex: 1,
    borderRadius: 24,
    marginHorizontal: 8,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ffffff',

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
  },
  changeDesireButtonText: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#242424',
  },
  replayButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default ReplayBox;
