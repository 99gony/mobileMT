import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import {useSelector} from 'react-redux';
import ModalManager from '.';
import sirenImage from '../../assets/images/siren.png';
import {darkMode} from '../darkModeStyles';

const ReportLimit = ({showModal, setShowModal}) => {
  const mode = useSelector(state => state.my.mode);
  return (
    <ModalManager showModal={showModal} setShowModal={setShowModal}>
      <View
        style={[
          styles.container,
          mode === 'dark' ? darkMode.impactBackground : null,
        ]}>
        <Image source={sirenImage} style={styles.sirenImageStyle} />
        <Text style={styles.title}>신고 한도 초과</Text>
        <View style={styles.description}>
          <Text
            style={[
              styles.descriptionText,
              mode === 'dark' ? darkMode.font : null,
            ]}>
            하루 가능한 신고 횟수를
          </Text>
          <Text
            style={[
              styles.descriptionText,
              mode === 'dark' ? darkMode.font : null,
            ]}>
            모두 채우셨군요!
          </Text>
        </View>
        <View style={styles.description}>
          <Text
            style={[
              styles.descriptionText,
              mode === 'dark' ? darkMode.font : null,
            ]}>
            클린한 채팅 분위기를 만드는 데
          </Text>
          <Text
            style={[
              styles.descriptionText,
              mode === 'dark' ? darkMode.font : null,
            ]}>
            힘써 주셔 감사합니다.
          </Text>
        </View>
      </View>
    </ModalManager>
  );
};

export const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ffffff',
    borderRadius: 24,
    padding: 24,
    width: 270,
  },
  sirenImageStyle: {
    width: 32,
    height: 32,
    resizeMode: 'contain',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#DF6464',
    marginVertical: 8,
  },
  description: {
    marginTop: 6,
  },
  descriptionText: {
    textAlign: 'center',
    fontSize: 15,
    lineHeight: 21,
  },
});

export default ReportLimit;
