import React, {useEffect, useRef} from 'react';
import {
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import FriendList from '../../components/friend/list';
import BarNotification from '../../components/modal/BarNotification';
import messaging from '@react-native-firebase/messaging';
import {sendToken} from '../../store/actions';
import {darkMode} from '../../components/darkModeStyles';
import {BannerAd, BannerAdSize} from '@react-native-admob/admob';

const adUnitId =
  Platform.OS === 'ios'
    ? 'ca-app-pub-6117064905510585/1946901361'
    : 'ca-app-pub-6117064905510585/4893416291';

const FriendsListScreen = ({navigation}) => {
  const dispatch = useDispatch();
  const list = useSelector(state => state.friend.list);
  const myId = useSelector(state => state.my.myId);
  const mode = useSelector(state => state.my.mode);
  const notification = useSelector(state => state.friend.notification);
  const bannerRef = useRef(null);

  useEffect(async () => {
    if (notification) {
      try {
        const token = await messaging().getToken();
        const authStatus = await messaging().requestPermission();
        const enabled =
          authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
          authStatus === messaging.AuthorizationStatus.PROVISIONAL;

        if (enabled) {
          dispatch(sendToken({myId, token}));
        }
      } catch (err) {
        console.log(err);
      }
    }
  }, [notification]);

  useEffect(() => {
    bannerRef.current?.loadAd();
  }, []);

  return (
    <SafeAreaView
      style={[
        styles.safeAreaView,
        mode === 'dark' ? darkMode.background : null,
      ]}>
      <View style={styles.adContainer}>
        <BannerAd
          size={BannerAdSize.BANNER}
          unitId={adUnitId}
          onAdLoaded={() => console.log('Banner Ad loaded!')}
          onAdFailedToLoad={error => console.log(error)}
          ref={bannerRef}
        />
      </View>
      {list.length === 0 ? (
        <View style={styles.description}>
          <Text
            style={[
              styles.descriptionText,
              mode === 'dark' ? darkMode.descriptionFont : null,
            ]}>
            아직 친구가 없어요!
          </Text>
        </View>
      ) : (
        <ScrollView>
          {list.map((v, i) => (
            <FriendList key={i} info={v} navigation={navigation} />
          ))}
        </ScrollView>
      )}
      {!notification ? <BarNotification /> : null}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeAreaView: {
    flex: 1,
  },
  description: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  descriptionText: {
    fontSize: 17,
    fontWeight: 'bold',
    color: 'gray',
  },
  adContainer: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default FriendsListScreen;
