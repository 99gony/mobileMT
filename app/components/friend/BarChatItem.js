import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {useSelector} from 'react-redux';
import {timeManager} from '../chat/sendTime';
import {darkMode} from '../darkModeStyles';
import mbtiStyles from '../mbtiStyles';

const BarChatItem = ({item, partnerMbti}) => {
  const myId = useSelector(state => state.my.myId);
  const mode = useSelector(state => state.my.mode);
  return (
    <View
      style={[
        styles.container,
        item?.UserId === myId
          ? [styles.myChat, mode === 'dark' ? darkMode.impactBackground : null]
          : [styles.partnerChat, mbtiStyles[item.mbti]],
        mode === 'dark' ? {borderWidth: 0} : null,
      ]}>
      <Text
        selectable
        style={
          item?.UserId === myId
            ? [styles.myChatText, mode === 'dark' ? darkMode.font : null]
            : styles.partnerChatText
        }>
        {item?.message}
      </Text>
      <View
        style={[
          styles.chatTime,
          item?.UserId === myId ? styles.myChatTime : styles.partnerChatTime,
        ]}>
        {item?.UserId === myId && item.isReaded !== 0 ? (
          <FontAwesome
            name="check"
            size={10}
            color={
              mode === 'dark'
                ? darkMode.descriptionFont.color
                : mbtiStyles[partnerMbti].backgroundColor
            }
            style={styles.check}
          />
        ) : null}
        {/* flex-reverse 로 뒤집어서 어떻게 해도 적당한 위치에 반전되게하기 */}
        <Text
          style={[
            styles.chatTimeText,
            mode === 'dark' ? darkMode.descriptionFont : null,
          ]}>
          {timeManager(item?.createdAt)}
        </Text>
      </View>
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
    borderBottomLeftRadius: 2,
  },
  partnerChatText: {
    color: '#ffffff',
    fontWeight: '600',
  },
  chatTime: {
    position: 'absolute',
    width: 60,
    bottom: 3,
  },
  chatTimeText: {
    fontSize: 10,
    color: 'gray',
  },
  myChatTime: {
    left: 0,
    transform: [{translateX: -63}],
    alignItems: 'flex-end',
  },
  partnerChatTime: {
    right: 0,
    transform: [{translateX: 63}],
    alignItems: 'flex-start',
  },
  check: {
    marginBottom: 2,
  },
});

export default BarChatItem;
