import React, {useCallback, useEffect, useState} from 'react';
import {StyleSheet, TextInput, TouchableOpacity, View} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {useSelector} from 'react-redux';
import {darkMode} from '../darkModeStyles';
import mbtiStyles from '../mbtiStyles';

const BarInput = ({barInfo, appSocket}) => {
  const myId = useSelector(state => state.my.myId);
  const myMbti = useSelector(state => state.my.myMbti);
  const mode = useSelector(state => state.my.mode);
  const [value, setValue] = useState('');
  const [writing, setWriting] = useState(false);
  const [submitDisabled, setSubmitDisabled] = useState(true);

  useEffect(() => {
    if (!value.trim()) {
      return setSubmitDisabled(true);
    }
    setSubmitDisabled(false);
  }, [value]);
  // 타이핑 중
  useEffect(() => {
    if (!appSocket.current) {
      return;
    }
    if (!submitDisabled && value.length >= 3) {
      return setWriting('yes');
    }
    if (submitDisabled) {
      setWriting('no');
    }
  }, [value, submitDisabled]);

  useEffect(() => {
    if (writing === 'yes') {
      return appSocket.current?.emit('writing', {
        myId,
        myMbti,
        barId: barInfo.id,
        recipientId: barInfo.Users[0].id,
        isWriting: true,
      });
    }
    if (writing === 'no') {
      return appSocket.current?.emit('writing', {
        myId,
        myMbti,
        barId: barInfo.id,
        recipientId: barInfo.Users[0].id,
        isWriting: false,
      });
    }
  }, [writing]);
  // 글자바뀔때
  const onChangeValue = useCallback(text => {
    setValue(text);
  }, []);
  // 전송할때
  const onSubmitValue = useCallback(() => {
    if (submitDisabled || !value.trim()) {
      return;
    }
    appSocket.current?.emit('send', {
      message: value,
      myId,
      recipientId: barInfo.Users[0].id,
      barId: barInfo.id,
      mbti: myMbti,
    });
    setValue('');
  }, [value, submitDisabled, appSocket, barInfo, myId, myMbti]);

  return (
    <View style={styles.container}>
      <View
        style={[
          styles.inputWrapper,
          mode === 'dark'
            ? [darkMode.impactBackground, {borderWidth: 0}]
            : null,
        ]}>
        <TextInput
          style={[styles.input, mode === 'dark' ? darkMode.font : null]}
          multiline={true}
          placeholder="대화 입력"
          value={value}
          maxLength={200}
          onChangeText={onChangeValue}
          placeholderTextColor={
            mode === 'dark' ? darkMode.descriptionFont.color : '#c0c0c0'
          }
        />
      </View>
      <TouchableOpacity
        disabled={submitDisabled}
        onPress={onSubmitValue}
        style={styles.sendButton}>
        <FontAwesome
          name="send"
          size={24}
          color={
            !submitDisabled
              ? mbtiStyles[barInfo.Users[0].mbti].backgroundColor
              : mode === 'dark'
              ? darkMode.impactBackground.backgroundColor
              : 'lightgray'
          }
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingBottom: 10,
    paddingTop: 8,
  },
  inputWrapper: {
    flex: 1,
    marginHorizontal: 12,
    backgroundColor: '#ffffff',
    justifyContent: 'center',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 27,
    borderWidth: 1,
    borderColor: '#c0c0c0',
  },
  input: {
    padding: 0,
  },
  sendButton: {
    paddingVertical: 6,
    paddingRight: 16,
    paddingLeft: 4,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default BarInput;
