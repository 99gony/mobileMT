import React, {useCallback, useEffect, useRef, useState} from 'react';
import {
  KeyboardAvoidingView,
  SafeAreaView,
  StyleSheet,
  Keyboard,
  Platform,
  BackHandler,
  Alert,
  View,
} from 'react-native';
import {io} from 'socket.io-client';
import ChatList from '../../components/chat/ChatList';
import ChatInput from '../../components/chat/Input';
import {getBottomSpace} from 'react-native-iphone-x-helper';
import {useDispatch, useSelector} from 'react-redux';
import {roomSlice} from '../../store/reducers/room';
import {sendTimeManager} from '../../components/chat/sendTime';
import ReplayBox from '../../components/chat/ReplayBox';
import {useFocusEffect} from '@react-navigation/native';
import OnFriendRequest from '../../components/modal/OnFriendRequest';
import Game from '../../components/game';
import {friendSlice} from '../../store/reducers/friend';
import {darkMode} from '../../components/darkModeStyles';
import {BannerAd, BannerAdSize} from '@react-native-admob/admob';
import {serverAPI} from '../../components/serverAPI';

export const bottomSpace = getBottomSpace();

const adUnitId =
  Platform.OS === 'ios'
    ? 'ca-app-pub-6117064905510585/2598494282'
    : 'ca-app-pub-6117064905510585/6292566404';

const RoomScreen = ({navigation}) => {
  const dispatch = useDispatch();
  const socket = useRef();

  const [keyboardHeight, setKeyboardHeight] = useState(0);
  const {myMbti, myGender, myCharacter, myIp, myId, myName, mode} = useSelector(
    state => state.my,
  );
  const {desireMbti, desireGender, banIp} = useSelector(state => state.index);
  const isLeave = useSelector(state => state.room.isLeave);
  const isFinding = useSelector(state => state.room.isFinding);
  const sendFriend = useSelector(state => state.room.sendFriend);
  const replayToggle = useSelector(state => state.room.replayToggle);
  const bannerRef = useRef(null);

  useEffect(() => {
    bannerRef.current?.loadAd();
  }, []);

  // 소켓 이벤트
  useEffect(() => {
    if (
      !myMbti ||
      !myGender ||
      desireMbti.length === 0 ||
      desireGender.length === 0
    ) {
      return;
    }
    if (!socket.current) {
      socket.current = io(serverAPI + '/room', {
        path: '/socket.io',
        transports: ['websocket'],
      });
      socket.current.emit('join', {
        myMbti,
        myGender,
        myCharacter,
        desireMbti,
        desireGender,
        myIp,
        banIp,
        myId,
        myName,
      });
      socket.current.on('reply', message => {
        dispatch(roomSlice.actions.setIsWriting(false));
        dispatch(
          roomSlice.actions.setChats({
            chat: message,
            isMine: false,
            time: sendTimeManager(),
          }),
        );
      });
      socket.current.on('join', partner => {
        dispatch(roomSlice.actions.setIsFinding(false));
        dispatch(roomSlice.actions.setPartnerInfo(partner));
      });
      socket.current.on('writing', isWriting => {
        setTimeout(() => {
          dispatch(roomSlice.actions.setIsWriting(isWriting));
        }, 100);
      });
      socket.current.on('friend', () => {
        dispatch(roomSlice.actions.onFriendRequest());
      });
      socket.current.on('friendDone', result => {
        dispatch(friendSlice.actions.onNewFriend(result));
      });
      socket.current.on('leave', () => {
        dispatch(roomSlice.actions.setIsLeave(true));
        dispatch(roomSlice.actions.setIsWriting(false));
        socket.current.disconnect();
      });
    }

    return () => {
      socket.current.disconnect();
      socket.current = null;
    };
  }, [replayToggle]);

  useEffect(() => {
    if (isLeave) {
      socket.current.disconnect();
    }
  }, [isLeave, socket]);

  // 친구 요청 및 받을 시
  useEffect(() => {
    if (sendFriend) {
      socket.current.emit('friend');
    }
  }, [sendFriend]);

  // 뒤로가기 안내 이벤트
  useFocusEffect(
    useCallback(() => {
      const onBackPress = () => {
        if (isFinding || isLeave) {
          navigation.goBack('main');
        } else {
          Alert.alert(
            '잠깐!',
            '방에서 나갈 시 대화 중인 상대방과 연결이 끊어집니다. 정말 나가시겠습니까?',
            [
              {text: '네', onPress: () => navigation.goBack('main')},
              {
                text: '아니요',
                onPress: () => null,
                style: '아니요',
              },
            ],
          );
        }
        return true;
      };

      BackHandler.addEventListener('hardwareBackPress', onBackPress);

      return () =>
        BackHandler.removeEventListener('hardwareBackPress', onBackPress);
    }, [isFinding, isLeave]),
  );

  // 키보드 이벤트
  useEffect(() => {
    const keyboardWillShow = Keyboard.addListener(
      'keyboardWillShow',
      _keyboardWillShow,
    );
    const keyboardWillHide = Keyboard.addListener(
      'keyboardWillHide',
      _keyboardWillHide,
    );
    return () => {
      keyboardWillShow.remove();
      keyboardWillHide.remove();
    };
  }, []);

  const _keyboardWillShow = useCallback(e => {
    const height = e.endCoordinates.height - bottomSpace;
    setKeyboardHeight(height);
  }, []);

  const _keyboardWillHide = useCallback(() => {
    setKeyboardHeight(0);
  }, []);

  return (
    <SafeAreaView
      style={[
        styles.safeAreaView,
        mode === 'dark' ? darkMode.background : null,
      ]}>
      {isFinding ? null : (
        <View style={styles.adContainer}>
          <BannerAd
            size={BannerAdSize.BANNER}
            unitId={adUnitId}
            ref={bannerRef}
          />
        </View>
      )}
      <KeyboardAvoidingView
        style={{
          flex: 1,
          paddingBottom: keyboardHeight,
          justifyContent: 'flex-end',
        }}>
        {isFinding && keyboardHeight === 0 ? <Game /> : null}
        <ChatList />
        {isLeave ? (
          <ReplayBox navigation={navigation} />
        ) : (
          <ChatInput socket={socket} />
        )}
        <OnFriendRequest socket={socket} />
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeAreaView: {
    flex: 1,
  },
  adContainer: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default RoomScreen;
