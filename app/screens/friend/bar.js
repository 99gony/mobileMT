import {BannerAd, BannerAdSize} from '@react-native-admob/admob';
import React, {useCallback, useEffect, useRef, useState} from 'react';
import {
  AppState,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  StyleSheet,
  View,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {darkMode} from '../../components/darkModeStyles';
import BarChatList from '../../components/friend/BarChatList';
import BarInput from '../../components/friend/barInput';
import {indexSlice} from '../../store/reducers';
import {friendSlice} from '../../store/reducers/friend';
import {bottomSpace} from '../main/room';

const adUnitId =
  Platform.OS === 'ios'
    ? 'ca-app-pub-6117064905510585/3225111401'
    : 'ca-app-pub-6117064905510585/2485516478';

const BarScreen = ({navigation, route, appSocket}) => {
  const dispatch = useDispatch();
  const myId = useSelector(state => state.my.myId);
  const mode = useSelector(state => state.my.mode);
  const myMbti = useSelector(state => state.my.myMbti);
  const [keyboardHeight, setKeyboardHeight] = useState(0);
  const bannerRef = useRef(null);

  useEffect(() => {
    bannerRef.current?.loadAd();
  }, []);

  // 현재 접속중인 바
  useEffect(() => {
    const setWhere = navigation.addListener('focus', () => {
      dispatch(indexSlice.actions.setWhere(route.params.info.id));
      dispatch(
        friendSlice.actions.onReadChat({
          barId: route.params.info.id,
          userId: myId,
        }),
      );
      appSocket.current?.emit('readChat', {
        myId,
        barId: route.params.info.id,
        recipientId: route.params.info.Users[0].id,
      });
      appSocket.current?.emit('inBar', {
        barId: route.params.info.id,
      });
    });
    return setWhere;
  }, [navigation]);
  //바에서 나갈때
  useEffect(() => {
    const onBlur = navigation.addListener('beforeRemove', () => {
      appSocket.current?.emit('writing', {
        myId,
        myMbti,
        barId: route.params.info.id,
        recipientId: route.params.info.Users[0].id,
        isWriting: false,
      });
      appSocket.current?.emit('leaveBar');
      dispatch(indexSlice.actions.setWhere(null));
    });
    return onBlur;
  }, [navigation]);

  // when go to background
  useEffect(() => {
    const appStateManager = AppState.addEventListener(
      'change',
      _handleAppStateChange,
    );

    return () => {
      appStateManager.remove();
    };
  }, []);

  const _handleAppStateChange = useCallback(
    nextAppState => {
      if (nextAppState === 'active') {
        appSocket.current?.emit('readChat', {
          myId,
          barId: route.params.info.id,
          recipientId: route.params.info.Users[0].id,
        });
        appSocket.current?.emit('inBar', {barId: route.params.info.id});
        dispatch(
          friendSlice.actions.onReadChat({
            barId: route.params.info.id,
            userId: myId,
          }),
        );
      } else {
        appSocket.current?.emit('writing', {
          myId,
          myMbti,
          barId: route.params.info.id,
          recipientId: route.params.info.Users[0].id,
          isWriting: false,
        });
        appSocket.current?.emit('leaveBar');
      }
    },
    [appSocket, route, myId, myMbti],
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
      <KeyboardAvoidingView style={{flex: 1, paddingBottom: keyboardHeight}}>
        <View style={styles.adContainer}>
          <BannerAd
            size={BannerAdSize.BANNER}
            unitId={adUnitId}
            onAdFailedToLoad={error => console.log(error)}
            ref={bannerRef}
          />
        </View>
        <BarChatList
          partnerMbti={route.params.info.Users[0].mbti}
          barId={route.params.info.id}
        />
        <BarInput barInfo={route.params.info} appSocket={appSocket} />
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

export default BarScreen;
