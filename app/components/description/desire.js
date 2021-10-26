import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useSelector} from 'react-redux';
import {darkMode} from '../darkModeStyles';

const DesireScreenDescription = () => {
  const mode = useSelector(state => state.my.mode);
  return (
    <View style={styles.container}>
      <Text style={[styles.title, mode === 'dark' ? darkMode.font : null]}>
        대화하고 싶은 MBTI 유형과 성별은..
      </Text>
      <Text
        style={[
          styles.description,
          mode === 'dark' ? darkMode.descriptionFont : null,
        ]}>
        <Ionicons name="checkmark-done" size={17} />
        복수선택 가능 | 한번 더 누르면 선택 취소
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
    paddingHorizontal: 18,
  },
  title: {
    fontSize: 20,
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

export default DesireScreenDescription;
