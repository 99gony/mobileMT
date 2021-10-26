import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import ReactNativeModal from 'react-native-modal';
import colorcon from '../../assets/images/fixing.png';

const Fixing = () => {
  return (
    <ReactNativeModal isVisible={true}>
      <View style={styles.modalBox}>
        <Image style={styles.colorconStyle} source={colorcon} />
        <Text style={styles.title}>점검중입니다.</Text>
        <Text style={styles.description}>
          서비스 이용에 불편을 끼쳐드려 죄송합니다.
        </Text>
        <Text style={styles.description}>
          시스템 안정화를 위한 점검을 진행하고 있습니다.
        </Text>
        <Text style={styles.description}>
          빠른 시간 내에 이용하실 수 있도록 최선을 다하겠습니다.
        </Text>
        <Text style={styles.description}>감사합니다.</Text>
      </View>
    </ReactNativeModal>
  );
};

const styles = StyleSheet.create({
  modalBox: {
    backgroundColor: '#ffffff',
    borderRadius: 27,
    padding: 27,
  },
  colorconStyle: {
    height: 80,
    resizeMode: 'contain',
  },
  title: {
    marginTop: 12,
    textAlign: 'center',
    fontSize: 24,
    fontWeight: 'bold',
  },
  description: {
    marginTop: 12,
    textAlign: 'center',
  },
});

export default Fixing;
