import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {useSelector} from 'react-redux';
import {darkMode} from '../darkModeStyles';
import mbtiStyles from '../mbtiStyles';

const ChatItem = ({item}) => {
  const partnerInfo = useSelector(state => state.room.partnerInfo);
  const mode = useSelector(state => state.my.mode);
  return (
    <View
      style={[
        styles.container,
        item?.isMine
          ? [styles.myChat, mode === 'dark' ? darkMode.impactBackground : null]
          : [styles.partnerChat, mbtiStyles[partnerInfo.mbti]],
        mode === 'dark' ? {borderWidth: 0} : null,
      ]}>
      <Text
        selectable
        style={
          item?.isMine
            ? [styles.myChatText, mode === 'dark' ? darkMode.font : null]
            : styles.partnerChatText
        }>
        {item?.chat}
      </Text>
      <Text
        style={[
          styles.chatTime,
          item?.isMine ? styles.myChatTime : styles.partnerChatTime,
          mode === 'dark' ? darkMode.descriptionFont : null,
        ]}>
        {item?.time}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    maxWidth: '65%',
    minHeight: 36,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 6,
    marginBottom: 5,
    marginHorizontal: 12,
    borderRadius: 21,
    borderWidth: 1.5,
    borderColor: '#e8e8e8',
  },
  myChat: {
    alignSelf: 'flex-end',
    backgroundColor: '#ffffff',
    borderBottomRightRadius: 2,
  },
  myChatText: {
    color: 'black',
  },
  partnerChat: {
    alignSelf: 'flex-start',
    backgroundColor: 'skyblue',
    borderBottomLeftRadius: 2,
  },
  partnerChatText: {
    color: '#ffffff',
    fontWeight: '600',
  },
  chatTime: {
    position: 'absolute',
    bottom: 3,
    fontSize: 10,
    color: 'gray',
  },
  myChatTime: {
    left: 0,
    transform: [{translateX: -38}],
  },
  partnerChatTime: {
    right: 0,
    transform: [{translateX: 38}],
  },
});

export default ChatItem;
