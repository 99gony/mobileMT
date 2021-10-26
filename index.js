import React, {useEffect} from 'react';
import {AppRegistry} from 'react-native';
import App from './app/App';
import {name as appName} from './app.json';
import {persistor, store} from './app/store';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import messaging from '@react-native-firebase/messaging';
import SplashScreen from 'react-native-splash-screen';

const AppWrapper = () => {
  useEffect(() => {
    setTimeout(() => {
      SplashScreen.hide();
    }, 500);
  }, []);

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <App />
      </PersistGate>
    </Provider>
  );
};

messaging().setBackgroundMessageHandler(async remoteMessage => {
  console.log('Message handled in the background!', remoteMessage);
});

AppRegistry.registerComponent(appName, () => AppWrapper);
