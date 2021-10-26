import React, {useCallback, useState} from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useSelector} from 'react-redux';
import {timeManager} from '../chat/sendTime';
import {darkMode} from '../darkModeStyles';
import imageManager from '../imageManager';
import mbtiStyles from '../mbtiStyles';
import ChangeFriend from '../modal/ChangeFriend';

const FriendList = ({info, navigation}) => {
  const myId = useSelector(state => state.my.myId);
  const mode = useSelector(state => state.my.mode);
  const offBars = useSelector(state => state.friend.offBars);
  const [showModal, setShowModal] = useState(false);
  const onPressBar = useCallback(() => {
    navigation.navigate('bar', {
      info,
    });
  }, [navigation, info]);

  const onLongPressBar = useCallback(() => {
    setShowModal(true);
  }, []);

  return (
    <TouchableOpacity
      onPress={onPressBar}
      onLongPress={onLongPressBar}
      style={styles.container}>
      <ChangeFriend
        showModal={showModal}
        setShowModal={setShowModal}
        character={imageManager[info.Users[0].character]}
        nickname={info.Users[0].name}
        mbti={info.Users[0].mbti}
        barId={info.id}
        friendId={info.Users[0].id}
        isAlertOn={!offBars.includes(info.id)}
      />
      <Image
        style={styles.characterStyle}
        source={imageManager[info.Users[0].character]}
      />
      <View style={styles.infoContainer}>
        <Text style={[styles.name, mbtiStyles[`${info.Users[0].mbti}Text`]]}>
          {info.Users[0].name}
        </Text>
        <View style={styles.lastChatStyle}>
          <Text
            style={[
              styles.description,
              mode === 'dark' ? darkMode.descriptionFont : null,
            ]}>
            {info.lastChat?.length >= 14
              ? `${info.lastChat.substring(0, 13)}...`
              : info.lastChat}
          </Text>
          {info.Chats.filter(c => c.isReaded === 0 && c.UserId !== myId)
            .length === 0 ? null : (
            <View style={styles.unReads}>
              <Text
                style={[
                  styles.unReadsText,
                  mode === 'dark' ? darkMode.descriptionFont : null,
                ]}>
                {
                  info.Chats.filter(c => c.isReaded === 0 && c.UserId !== myId)
                    .length
                }
              </Text>
            </View>
          )}
        </View>
      </View>
      <View style={styles.extraInfo}>
        <Text style={styles.description}>{timeManager(info.updatedAt)}</Text>
        <Ionicons
          name={
            offBars.includes(info.id) ? 'notifications-off' : 'notifications'
          }
          size={17}
          color="#a9a9a9"
        />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 76,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  characterStyle: {
    width: 48,
    height: 48,
    resizeMode: 'contain',
  },
  infoContainer: {
    flex: 1,
    height: 48,
    marginLeft: 12,
    justifyContent: 'space-around',
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  lastChatStyle: {flexDirection: 'row', alignItems: 'center'},
  description: {fontSize: 14, color: 'gray'},
  unReads: {
    marginLeft: 8,
    backgroundColor: '#DD484C',
    borderRadius: 14,
    paddingHorizontal: 5,
    paddingVertical: 1,
  },
  unReadsText: {fontWeight: 'bold', fontSize: 13, color: 'white'},
  extraInfo: {
    height: 42,
    justifyContent: 'space-around',
    alignItems: 'center',
  },
});

export default FriendList;
