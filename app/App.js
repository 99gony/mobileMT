import {NavigationContainer} from '@react-navigation/native';
import React, {useCallback, useEffect, useRef, useState} from 'react';
import {AppState, Platform, StatusBar} from 'react-native';
import AppRoutes from './routes';
import {io} from 'socket.io-client';
import {useDispatch, useSelector} from 'react-redux';
import {mySlice} from './store/reducers/my';
import {getFriendList} from './store/actions';
import {friendSlice} from './store/reducers/friend';
import {indexSlice} from './store/reducers';
import {darkMode} from './components/darkModeStyles';
import {requestTrackingPermission} from 'react-native-tracking-transparency';
import AdMob from '@react-native-admob/admob';
import Fixing from './components/modal/Fixing';
import Update from './components/modal/Update';
import {serverAPI} from './components/serverAPI';

const App = () => {
  const dispatch = useDispatch();
  const [isFixing, setIsFixing] = useState(false);
  const [isUpdate, setIsUpdate] = useState(false);
  const myId = useSelector(state => state.my.myId);
  const mode = useSelector(state => state.my.mode);
  const reset = useSelector(state => state.my.reset);
  const lastChatId = useSelector(state => state.friend.lastChatId);
  const appSocket = useRef();
  const appState = useRef(AppState.currentState);

  useEffect(() => {
    const listener = AppState.addEventListener('change', async status => {
      if (Platform.OS === 'ios' && status === 'active') {
        try {
          await requestTrackingPermission();
        } catch (err) {
          console.log(err);
        }
      }
    });

    return listener.remove;
  }, []);

  useEffect(() => {
    const init = async () => {
      try {
        await AdMob.initialize();
      } catch (err) {
        console.log(err);
      }
    };

    init();
  }, []);

  useEffect(() => {
    if (!reset) {
      dispatch(mySlice.actions.resetAll());
      dispatch(friendSlice.actions.resetAll());
    }
  }, [reset]);

  useEffect(() => {
    appSocket.current = io(serverAPI, {
      path: '/socket.io',
      transports: ['websocket'],
    });
    appSocket.current.on('myIp', ({ip, version, fixing}) => {
      // ?????? ?????? ?????? ??????
      if (version !== 3) {
        return setIsUpdate(true);
      }
      if (fixing) {
        return setIsFixing(true);
      }
      dispatch(mySlice.actions.setMyIp(ip));
    });
    appSocket.current.on('readChat', data => {
      dispatch(friendSlice.actions.onReadChat(data));
    });
    appSocket.current.on('writing', data => {
      setTimeout(() => {
        dispatch(indexSlice.actions.setIsWriting(data));
      }, 100);
    });
    appSocket.current.on('message', chat => {
      dispatch(friendSlice.actions.setChat(chat));
      dispatch(
        indexSlice.actions.setIsWriting({
          barId: chat.BarId,
          isWriting: false,
          id: chat.UserId,
        }),
      );
    });
    if (myId) {
      appSocket.current.emit('login', {uid: myId});
      dispatch(getFriendList({myId, lastChatId}));
    }
    return () => {
      appSocket.current.disconnect();
      appSocket.current = null;
    };
  }, [myId]);
  // ??????????????? ???????????? ??????

  useEffect(() => {
    const keeper = AppState.addEventListener('change', _handleAppStateChange);

    return () => {
      keeper.remove();
    };
  }, []);

  const _handleAppStateChange = useCallback(
    nextAppState => {
      if (nextAppState === 'active') {
        if (!appSocket.current.connected && myId) {
          appSocket.current?.emit('login', {uid: myId});
          dispatch(getFriendList({myId, lastChatId}));
        }
      }
    },
    [appState, appSocket, myId, lastChatId],
  );

  return (
    <NavigationContainer>
      <StatusBar
        barStyle={mode === 'dark' ? 'light-content' : 'dark-content'}
        backgroundColor={
          mode === 'dark'
            ? darkMode.impactBackground.backgroundColor
            : '#ffffff'
        }
      />
      {isUpdate ? <Update /> : null}
      {isFixing ? <Fixing /> : null}
      <AppRoutes appSocket={appSocket} />
    </NavigationContainer>
  );
};

export default App;
