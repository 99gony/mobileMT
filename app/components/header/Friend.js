import React, {useCallback, useEffect, useState} from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {useSelector} from 'react-redux';
import {darkMode} from '../darkModeStyles';
import FriendModal from '../modal/FriendModal';

const Friend = () => {
  const [showModal, setShowModal] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const mode = useSelector(state => state.my.mode);
  const sendFriend = useSelector(state => state.room.sendFriend);
  const isLeave = useSelector(state => state.room.isLeave);
  const isFinding = useSelector(state => state.room.isFinding);

  useEffect(() => {
    if (isLeave || isFinding || sendFriend) {
      setDisabled(true);
    } else {
      setDisabled(false);
    }
  }, [sendFriend, isLeave, isFinding]);

  const onPressFriend = useCallback(() => {
    setShowModal(true);
  }, []);
  return (
    <>
      <TouchableOpacity disabled={disabled} onPress={onPressFriend}>
        <FontAwesome
          style={disabled ? styles.disabled : null}
          name="handshake-o"
          size={24}
          color={mode === 'dark' ? darkMode.font.color : 'black'}
        />
      </TouchableOpacity>
      <FriendModal showModal={showModal} setShowModal={setShowModal} />
    </>
  );
};

const styles = StyleSheet.create({
  disabled: {
    opacity: 0.4,
  },
});

export default Friend;
