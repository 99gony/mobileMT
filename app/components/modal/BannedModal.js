import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import {useSelector} from 'react-redux';
import ModalManager from '.';
import sirenImage from '../../assets/images/siren.png';
import {darkMode} from '../darkModeStyles';

const BannedModal = ({showModal, setShowModal}) => {
  const mode = useSelector(state => state.my.mode);
  return (
    <ModalManager showModal={showModal} setShowModal={setShowModal}>
      <View
        style={[
          styles.container,
          mode === 'dark' ? darkMode.impactBackground : null,
        ]}>
        <Image source={sirenImage} style={styles.sirenImageStyle} />
        <Text style={styles.bannedTitle}>이용 제한 안내</Text>
        <Text
          style={[
            styles.bannedDescription,
            mode === 'dark' ? darkMode.font : null,
          ]}>
          많은 사용자로부터 신고가 접수되어{' '}
          <Text style={styles.bannedPeriod}>3일간</Text> 매칭 이용이 제한됩니다.
        </Text>
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
  bannedTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#DF6464',
    marginTop: 8,
  },
  bannedDescription: {
    textAlign: 'center',
    fontSize: 16,
    marginTop: 16,
    lineHeight: 24,
  },
  bannedPeriod: {
    fontSize: 17,
    fontWeight: 'bold',
    color: '#df6464',
  },
});

export default BannedModal;
