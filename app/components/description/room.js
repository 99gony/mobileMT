import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useSelector} from 'react-redux';
import {darkMode} from '../darkModeStyles';

const descriptions = [
  '네트워크 전환 시 상대방과 연결이 끊어집니다.',
  '방에서 나갈 시 대화 내용은 다시 볼 수 없습니다.',
  '타인을 향한 심한 욕설, 비방은 자제 부탁드립니다.',
];

const RoomDescription = () => {
  const mode = useSelector(state => state.my.mode);
  return (
    <View style={styles.container}>
      {descriptions.map((description, i) => (
        <View key={i} style={styles.description}>
          <Ionicons name="alert-circle-outline" size={16} color="gray" />
          <Text
            style={[
              styles.descriptionText,
              mode === 'dark' ? darkMode.descriptionFont : null,
            ]}>
            {description}
          </Text>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignSelf: 'center',
    alignItems: 'center',
  },
  description: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
  },
  descriptionText: {
    color: 'gray',
    fontSize: 13,
    marginLeft: 4,
    flexShrink: 1,
  },
});

export default RoomDescription;
