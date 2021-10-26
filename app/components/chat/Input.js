import React, {useCallback, useEffect, useState} from 'react';
import {StyleSheet, TextInput, TouchableOpacity, View} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {useDispatch, useSelector} from 'react-redux';
import {roomSlice} from '../../store/reducers/room';
import {sendTimeManager} from './sendTime';
import mbtiStyles from '../mbtiStyles';
import {darkMode} from '../darkModeStyles';

const ChatInput = ({socket}) => {
  const dispatch = useDispatch();
  const partnerInfo = useSelector(state => state.room.partnerInfo);
  const isLeave = useSelector(state => state.room.isLeave);
  const mode = useSelector(state => state.my.mode);
  const [value, setValue] = useState('');
  const [writing, setWriting] = useState(null);
  const [submitDisabled, setSubmitDisabled] = useState(true);

  useEffect(() => {
    if (!value.trim() || !partnerInfo || isLeave) {
      return setSubmitDisabled(true);
    }
    setSubmitDisabled(false);
  }, [value, partnerInfo, isLeave]);

  useEffect(() => {
    if (!socket.current) {
      return;
    }
    if (!submitDisabled && value.length >= 3) {
      return setWriting('yes');
    }
    if (submitDisabled) {
      setWriting('no');
    }
  }, [socket, value, submitDisabled]);

  useEffect(() => {
    if (writing === 'yes') {
      return socket.current.emit('writing', true);
    } else if (writing === 'no') {
      socket.current.emit('writing', false);
    }
  }, [writing]);

  const onChangeValue = useCallback(text => {
    setValue(text);
  }, []);

  const onSubmitValue = useCallback(() => {
    if (submitDisabled || !partnerInfo || !value.trim()) {
      return;
    }
    setValue('');
    dispatch(
      roomSlice.actions.setChats({
        chat: value,
        isMine: true,
        time: sendTimeManager(),
      }),
    );
    socket.current.emit('send', value);
  }, [value, submitDisabled, partnerInfo, socket]);

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
              ? mbtiStyles[partnerInfo.mbti].backgroundColor
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

export default ChatInput;
