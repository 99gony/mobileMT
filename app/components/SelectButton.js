import axios from 'axios';
import React, {useCallback, useEffect, useState} from 'react';
import {
  ActivityIndicator,
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {indexSlice} from '../store/reducers';
import {darkMode} from './darkModeStyles';
import BannedModal from './modal/BannedModal';
import {serverAPI} from './serverAPI';

const allMbtis = [
  'ISTJ',
  'ISFJ',
  'INFJ',
  'INTJ',
  'ISTP',
  'ISFP',
  'INFP',
  'INTP',
  'ESTP',
  'ESFP',
  'ENFP',
  'ENTP',
  'ESTJ',
  'ESFJ',
  'ENFJ',
  'ENTJ',
];

const SelectButton = ({navigation}) => {
  const dispatch = useDispatch();
  const {myMbti, myGender, myId, myIp, mode} = useSelector(state => state.my);
  const {desireMbti, desireGender} = useSelector(state => state.index);
  const [disabled, setDisabled] = useState(true);
  const [loading, setLoading] = useState(false);
  const [showBannedModal, setShowBannedModal] = useState(false);

  useEffect(() => {
    if (
      desireGender.length !== 0 &&
      desireMbti.length !== 0 &&
      myMbti &&
      myGender &&
      !loading
    ) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }, [desireGender, desireMbti, myMbti, myGender, loading]);

  const onPressAnybody = useCallback(() => {
    dispatch(indexSlice.actions.setDesireMbti(allMbtis));
    dispatch(indexSlice.actions.setDesireGender(['boy', 'girl']));
  }, []);

  const onPressCancelAll = useCallback(() => {
    dispatch(indexSlice.actions.resetDesire());
  }, []);

  const onPressSelectDone = useCallback(async () => {
    if (
      desireGender.length === 0 ||
      desireMbti.length === 0 ||
      !myMbti ||
      !myGender ||
      loading
    ) {
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
        navigation.navigate('room');
      }
    } catch (err) {
      setLoading(false);
    }
  }, [desireGender, desireMbti, myMbti, myGender, myId, myIp, loading]);

  return (
    <View style={styles.container}>
      {desireMbti?.length === 16 && desireGender?.length === 2 ? (
        <TouchableOpacity
          onPress={onPressCancelAll}
          style={[
            styles.button,
            styles.selectAllButton,
            mode === 'dark' ? darkMode.impactBackground : null,
          ]}>
          <Text
            style={[
              styles.selectAllButtonText,
              ,
              mode === 'dark' ? darkMode.font : null,
            ]}>
            선택 취소
          </Text>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity
          onPress={onPressAnybody}
          style={[
            styles.button,
            styles.selectAllButton,
            mode === 'dark' ? darkMode.impactBackground : null,
          ]}>
          <Text
            style={[
              styles.selectAllButtonText,
              ,
              mode === 'dark' ? darkMode.font : null,
            ]}>
            아무나!
          </Text>
        </TouchableOpacity>
      )}
      <TouchableOpacity
        onPress={onPressSelectDone}
        disabled={disabled}
        style={
          disabled
            ? [
                styles.button,
                styles.selectDoneButton,
                styles.disabledStyle,
                mode === 'dark' ? darkMode.impactBackground : null,
              ]
            : [
                styles.button,
                styles.selectDoneButton,
                mode === 'dark' ? darkMode.impactBackground : null,
              ]
        }>
        {loading ? (
          <ActivityIndicator size="small" color="rgb(0, 149, 246)" />
        ) : (
          <Text style={styles.selectDoneButtonText}>매칭 시작!</Text>
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
    width: Dimensions.get('window').width / 1.3,
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 7,
    height: 62,
    marginTop: 8,
  },
  button: {
    flex: 1,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 12,
    borderColor: '#c0c0c0',
    backgroundColor: '#FFFFFF',
  },
  selectAllButton: {
    marginRight: 12,
  },
  selectDoneButton: {
    marginLeft: 12,
  },
  selectAllButtonText: {
    fontSize: 15,
    fontWeight: 'bold',
  },
  selectDoneButtonText: {
    fontSize: 15,
    fontWeight: 'bold',
    color: 'rgb(0, 149, 246)',
  },
  disabledStyle: {
    opacity: 0.3,
  },
});

export default SelectButton;
