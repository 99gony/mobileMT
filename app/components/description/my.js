import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useSelector} from 'react-redux';
import {darkMode} from '../darkModeStyles';

const MyScreenDescription = () => {
  const isAgreeEula = useSelector(state => state.my.isAgreeEula);
  const mode = useSelector(state => state.my.mode);
  return (
    <View style={styles.container}>
      <Text style={[styles.title, mode === 'dark' ? darkMode.font : null]}>
        {!isAgreeEula
          ? '나의 MBTI 유형과 성별은..'
          : '어떤 MBTI 유형으로 바뀌셨나요?'}
      </Text>
      <Text
        style={[
          styles.description,
          mode === 'dark' ? darkMode.descriptionFont : null,
        ]}>
        <Ionicons name="checkmark-sharp" size={18} />
        터치하여 선택
      </Text>
      <Text
        style={[
          styles.description,
          mode === 'dark' ? darkMode.descriptionFont : null,
        ]}>
        옆으로 밀어서 배너를 움직일 수 있어요.
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#d9d9d9',
    paddingBottom: 6,
    paddingHorizontal: 32,
  },
  title: {
    fontSize: 21,
    fontWeight: 'bold',
    marginBottom: 12,
    color: '#242424',
  },
  description: {
    fontSize: 14,
    color: 'gray',
    marginBottom: 3,
  },
});

export default MyScreenDescription;
