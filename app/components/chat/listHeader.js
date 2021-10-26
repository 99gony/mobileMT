import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {useSelector} from 'react-redux';
import LoadingDots from './LoadingDots';
import mbtiStyles from '../mbtiStyles';
import {darkMode} from '../darkModeStyles';

const ListHeader = () => {
  const {isWriting, isLeave, partnerInfo} = useSelector(state => state.room);
  const mode = useSelector(state => state.my.mode);
  return (
    <View style={styles.container}>
      {isWriting ? (
        <View
          style={[
            styles.typingBox,
            mbtiStyles[partnerInfo.mbti],
            mode === 'dark' ? {borderWidth: 0} : null,
          ]}>
          <View style={styles.dotsWrapper}>
            <LoadingDots colors={['#FFFFFF', '#FFFFFF', '#FFFFFF']} />
          </View>
        </View>
      ) : null}
      {isLeave ? (
        <View style={styles.description}>
          <Text
            style={[
              styles.descriptionText,
              mode === 'dark' ? darkMode.descriptionFont : null,
            ]}>
            대화가 종료되었습니다.
          </Text>
        </View>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  typingBox: {
    height: 36,
    width: 62,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 6,
    marginLeft: 12,
    marginBottom: 5,
    borderRadius: 21,
    borderWidth: 1.5,
    borderColor: '#e8e8e8',
    alignSelf: 'flex-start',
    borderBottomLeftRadius: 1,
  },
  dotsWrapper: {
    width: 27,
  },
  description: {
    width: '90%',
    paddingTop: 6,
    height: 56,
    alignItems: 'center',
    justifyContent: 'center',
    borderTopWidth: 1,
    borderTopColor: '#d9d9d9',
    marginTop: 12,
  },
  descriptionText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'gray',
  },
});

export default ListHeader;
