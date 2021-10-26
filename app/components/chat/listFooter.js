import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import anonymousImage from '../../assets/images/anonymous.png';
import LoadingDots from './LoadingDots';
import mbtiStyles from '../mbtiStyles';
import RoomDescription from '../description/room';
import {useSelector} from 'react-redux';
import imageManager from '../imageManager';
import {darkMode} from '../darkModeStyles';

const ListFooter = () => {
  const partnerInfo = useSelector(state => state.room.partnerInfo);
  const mode = useSelector(state => state.my.mode);
  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Image
          source={
            partnerInfo ? imageManager[partnerInfo.character] : anonymousImage
          }
          style={
            partnerInfo
              ? styles.characterImageStyle
              : styles.anonymousImageStyle
          }
        />
        {partnerInfo ? (
          <Text
            style={[styles.partnerMbti, mbtiStyles[`${partnerInfo.mbti}Text`]]}>
            {partnerInfo.mbti}
          </Text>
        ) : null}
        <Text
          style={[
            styles.descriptionText,
            mode === 'dark' ? darkMode.font : null,
          ]}>
          {partnerInfo ? '님을 만났습니다!' : '원하는 대상을 기다리고 있습니다'}
        </Text>
        {partnerInfo ? null : (
          <View style={styles.dotsWrapper}>
            <LoadingDots />
          </View>
        )}
      </View>
      <RoomDescription />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '90%',
    alignSelf: 'center',
    padding: 18,
    borderBottomWidth: 1,
    borderBottomColor: '#d9d9d9',
    marginBottom: 12,
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 12,
  },
  anonymousImageStyle: {
    width: 38,
    height: 38,
    resizeMode: 'contain',
  },
  characterImageStyle: {
    width: 40,
    height: 40,
    resizeMode: 'contain',
  },
  partnerMbti: {
    fontSize: 25,
    fontWeight: 'bold',
    letterSpacing: 2,
    marginLeft: 4,
  },
  descriptionText: {
    fontSize: 17,
    fontWeight: 'bold',
    color: '#242424',
    marginLeft: 4,
  },
  dotsWrapper: {
    position: 'relative',
    top: 4,
    width: 27,
    marginLeft: 5,
  },
});

export default ListFooter;
