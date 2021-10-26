import React, {useCallback} from 'react';
import {Linking, Platform, StyleSheet, Text, View} from 'react-native';
import ReactNativeModal from 'react-native-modal';

const theLink =
  Platform.OS === 'ios'
    ? 'https://apps.apple.com/kr/app/mt-%EC%9B%90%ED%95%98%EB%8A%94-mbti-%EC%9C%A0%ED%98%95%EA%B3%BC-%EC%B1%84%ED%8C%85/id1584454598'
    : 'https://play.google.com/store/apps/details?id=com.MT.android';

const Update = () => {
  const onPressLink = useCallback(() => Linking.openURL(theLink), []);
  return (
    <ReactNativeModal isVisible={true}>
      <View style={styles.modalBox}>
        <Text style={styles.title}>업데이트 안내</Text>
        <Text style={styles.description}>
          변경사항이 많아 현재 버전은 이용할 수 없습니다.
        </Text>
        <Text style={styles.description}>
          계속 이용하시려면 업데이트를 하셔야 합니다.
        </Text>
        <Text style={styles.description}>감사합니다.</Text>
        <Text onPress={onPressLink} style={[styles.description, styles.link]}>
          업데이트 하러 가기
        </Text>
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
  link: {color: 'blue', fontSize: 16},
});

export default Update;
