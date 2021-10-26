import React, {useCallback, useRef, useState} from 'react';
import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import ReactNativeModal from 'react-native-modal';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {useDispatch, useSelector} from 'react-redux';
import {deleteFriend, offAlert, onAlert} from '../../store/actions';
import {friendSlice} from '../../store/reducers/friend';
import {darkMode} from '../darkModeStyles';
import mbtiStyles from '../mbtiStyles';

const ChangeFriend = ({
  showModal,
  setShowModal,
  character,
  isAlertOn,
  nickname,
  mbti,
  barId,
  friendId,
}) => {
  const dispatch = useDispatch();
  const myId = useSelector(state => state.my.myId);
  const mode = useSelector(state => state.my.mode);
  const [editable, setEditable] = useState(false);
  const [newName, setNewName] = useState(nickname);
  const [isdeleteMode, setdeleteMode] = useState(false);
  const [confirm, setConfirm] = useState(false);
  const inputRef = useRef();
  // 이름수정관련
  const onChangeText = useCallback(text => {
    setNewName(text);
  }, []);
  const onPressEdit = useCallback(() => {
    if (!editable) {
      setEditable(true);
      setTimeout(() => {
        inputRef.current.focus();
      }, 100);
    } else {
      setEditable(false);
      setNewName(newName.trim());
      dispatch(
        friendSlice.actions.setFriendNickname({
          barId,
          nickname: newName.trim(),
        }),
      );
    }
  }, [editable, inputRef, barId, newName]);

  // 푸시알림관련
  const onPressAlert = useCallback(() => {
    if (isAlertOn) {
      dispatch(offAlert({barId, myId}));
    } else {
      dispatch(onAlert({barId, myId}));
    }
    setShowModal(false);
  }, [barId, myId, isAlertOn]);

  // 삭제관련
  const onPressDeleteMode = useCallback(() => {
    setdeleteMode(true);
  }, []);

  const onPressDelete = useCallback(() => {
    setConfirm(true);
    setShowModal(false);
  }, []);

  const onCloseModal = useCallback(() => {
    setShowModal(false);
  }, []);

  const onModalHide = useCallback(() => {
    setEditable(false);
    setdeleteMode(false);
    if (confirm) {
      dispatch(
        deleteFriend({
          myId,
          barId,
          friendId,
        }),
      );
      setConfirm(false);
    }
  }, [confirm, myId, barId, friendId]);

  return (
    <ReactNativeModal
      isVisible={showModal}
      onBackButtonPress={onCloseModal}
      onBackdropPress={onCloseModal}
      onModalHide={onModalHide}
      animationIn="fadeInDown"
      animationOut="fadeOutDown"
      style={styles.modalStyle}>
      <View
        style={[
          styles.container,
          mode === 'dark' ? darkMode.impactBackground : null,
        ]}>
        {isdeleteMode ? (
          <>
            <View style={styles.confirmContainer}>
              <View style={styles.confirmTitleWrapper}>
                <Text
                  style={[
                    styles.confirmTitle,
                    mode === 'dark' ? darkMode.font : null,
                  ]}>
                  친구를 삭제하시겠습니까?
                </Text>
              </View>
              <View style={styles.confirmDescription}>
                <Text
                  style={[
                    styles.confirmDescriptionText,
                    mode === 'dark' ? darkMode.descriptionFont : null,
                  ]}>
                  상대방은 삭제 여부를 알지 못합니다.
                </Text>
                <Text
                  style={[
                    styles.confirmDescriptionText,
                    mode === 'dark' ? darkMode.descriptionFont : null,
                  ]}>
                  상대방이 친구목록에서 삭제됩니다.
                </Text>
              </View>
            </View>
            <View style={styles.divider} />
            <View style={styles.confirmButtonContainer}>
              <TouchableOpacity
                onPress={onPressDelete}
                style={styles.confirmButton}>
                <Text style={styles.deleteButton}>삭제</Text>
              </TouchableOpacity>
              <View style={styles.verticalDivider} />
              <TouchableOpacity
                onPress={onCloseModal}
                style={styles.confirmButton}>
                <Text
                  style={[
                    styles.cancelButton,
                    mode === 'dark' ? darkMode.font : null,
                  ]}>
                  취소
                </Text>
              </TouchableOpacity>
            </View>
          </>
        ) : (
          <>
            <View style={styles.editName}>
              <Image style={styles.characterStyle} source={character} />
              <View style={styles.nameContainer}>
                <TextInput
                  ref={inputRef}
                  editable={editable}
                  style={[
                    styles.nameText,
                    {color: mbtiStyles[mbti].backgroundColor},
                  ]}
                  defaultValue={nickname}
                  value={newName}
                  onChangeText={onChangeText}
                  maxLength={10}
                />
                <TouchableOpacity
                  style={styles.editButton}
                  onPress={onPressEdit}>
                  {!editable ? (
                    <FontAwesome
                      name="pencil"
                      size={17}
                      color={
                        mode === 'dark'
                          ? darkMode.descriptionFont.color
                          : '#5f5f5f'
                      }
                    />
                  ) : (
                    <Text style={styles.editDoneButton}>완료</Text>
                  )}
                </TouchableOpacity>
              </View>
            </View>
            <View style={styles.divider} />
            <TouchableOpacity onPress={onPressAlert} style={styles.button}>
              <Text
                style={[
                  styles.buttonText,
                  mode === 'dark' ? darkMode.font : null,
                ]}>
                {isAlertOn ? '알림 끄기' : '알림 켜기'}
              </Text>
            </TouchableOpacity>
            <View style={styles.divider} />
            <TouchableOpacity onPress={onPressDeleteMode} style={styles.button}>
              <Text
                style={[
                  styles.buttonText,
                  mode === 'dark' ? darkMode.font : null,
                ]}>
                친구 삭제
              </Text>
            </TouchableOpacity>
          </>
        )}
      </View>
    </ReactNativeModal>
  );
};

const styles = StyleSheet.create({
  modalStyle: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ffffff',
    borderRadius: 24,
    width: 270,
    height: 200,
  },
  characterStyle: {
    width: 48,
    height: 48,
    resizeMode: 'contain',
  },
  nameContainer: {flexDirection: 'row', marginLeft: 8},
  nameText: {fontSize: 18, fontWeight: 'bold', padding: 0},
  editButton: {padding: 8},
  editDoneButton: {
    fontWeight: 'bold',
    fontSize: 16,
    color: 'rgb(0, 149, 246)',
    marginLeft: 4,
  },
  editName: {
    flex: 4,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    flex: 3,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    fontSize: 17,
    fontWeight: 'bold',
  },
  divider: {
    height: 1,
    width: '100%',
    backgroundColor: '#d9d9d9',
  },
  confirmContainer: {flex: 2, alignItems: 'center', justifyContent: 'center'},
  confirmTitleWrapper: {
    flex: 4,
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  confirmTitle: {fontSize: 17, fontWeight: 'bold'},
  confirmDescription: {
    flex: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  confirmDescriptionText: {fontSize: 14, color: 'gray', marginBottom: 6},
  confirmButtonContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  confirmButton: {
    flex: 1,
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  deleteButton: {fontSize: 17, fontWeight: 'bold', color: 'red'},
  verticalDivider: {width: 1, height: '100%', backgroundColor: '#d9d9d9'},
  cancelButton: {fontSize: 17, fontWeight: 'bold'},
});

export default ChangeFriend;
