import React, {useCallback} from 'react';
import {StyleSheet} from 'react-native';
import Modal from 'react-native-modal';

const ModalManager = ({children, showModal, setShowModal}) => {
  const onCloseModal = useCallback(() => {
    setShowModal(false);
  }, []);
  return (
    <Modal
      isVisible={showModal}
      animationIn="fadeInDown"
      animationOut="fadeOutDown"
      onBackButtonPress={onCloseModal}
      onBackdropPress={onCloseModal}
      style={styles.modalStyle}>
      {children}
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalStyle: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default ModalManager;
