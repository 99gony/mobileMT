import React from 'react';
import {Text, View} from 'react-native';
import {useSelector} from 'react-redux';
import ModalManager from '.';
import {darkMode} from '../darkModeStyles';
import {styles} from './BanModal';

const AlreadyReportModal = ({showModal, setShowModal}) => {
  const mode = useSelector(state => state.my.mode);
  return (
    <ModalManager showModal={showModal} setShowModal={setShowModal}>
      <View
        style={[
          styles.container,
          styles.banAlert,
          mode === 'dark' ? darkMode.impactBackground : null,
        ]}>
        <Text
          style={[
            styles.bannedDescription,
            mode === 'dark' ? darkMode.font : null,
          ]}>
          이미 신고한 상대입니다.
        </Text>
        <Text
          style={[
            styles.banAlertDescription,
            mode === 'dark' ? darkMode.descriptionFont : null,
          ]}>
          차단은 앱 종료 시 해제됩니다.
        </Text>
      </View>
    </ModalManager>
  );
};

export default AlreadyReportModal;
