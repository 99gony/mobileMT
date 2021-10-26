import React, {useCallback} from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {indexSlice} from '../../store/reducers';
import ModalManager from '.';
import {roomSlice} from '../../store/reducers/room';
import {styles} from './BanModal';
import {reportAction} from '../../store/actions';
import {darkMode} from '../darkModeStyles';

const ReportModal = ({showModal, setShowModal, partnerInfo, report}) => {
  const dispatch = useDispatch();
  const mode = useSelector(state => state.my.mode);
  const reportIp = report.map(v => v.ip);

  const onPressCancel = useCallback(() => {
    setShowModal(false);
  }, []);

  const onPressReport = useCallback(() => {
    if (reportIp.length >= 3) {
      return;
    }
    if (partnerInfo) {
      dispatch(
        reportAction({
          reportedIp: partnerInfo.ip,
          reportedId: partnerInfo.id,
        }),
      );
      dispatch(indexSlice.actions.setBanIp(partnerInfo.ip));
      dispatch(roomSlice.actions.setIsLeave(true));
      dispatch(roomSlice.actions.setIsWriting(false));
    }
  }, [partnerInfo, reportIp]);
  // 차단 시 모달 닫고 나가기 구현

  return (
    <ModalManager showModal={showModal} setShowModal={setShowModal}>
      {reportIp?.includes(partnerInfo?.ip) ? (
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
            상대방을 신고하였습니다.
          </Text>
          <Text
            style={[
              styles.banAlertDescription,
              mode === 'dark' ? darkMode.descriptionFont : null,
            ]}>
            자동으로 차단까지 하였습니다.
          </Text>
        </View>
      ) : (
        <View
          style={[
            styles.container,
            mode === 'dark' ? darkMode.impactBackground : null,
          ]}>
          <View style={styles.description}>
            <Text
              style={[
                styles.descriptionText,
                mode === 'dark' ? darkMode.font : null,
              ]}>
              상대방을 신고하시겠습니까?
            </Text>
            <Text
              style={[
                styles.banAlertDescription,
                mode === 'dark' ? darkMode.descriptionFont : null,
              ]}>
              하루에 3회 가능합니다 ({3 - reportIp?.length}회 남음)
            </Text>
          </View>
          <View style={styles.buttonContainer}>
            <TouchableOpacity onPress={onPressReport} style={styles.button}>
              <Text style={[styles.buttonText, styles.banButtonText]}>
                신고
              </Text>
            </TouchableOpacity>
            <View style={styles.divider} />
            <TouchableOpacity onPress={onPressCancel} style={styles.button}>
              <Text
                style={[
                  styles.buttonText,
                  mode === 'dark' ? darkMode.descriptionFont : null,
                ]}>
                취소
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </ModalManager>
  );
};

export default ReportModal;
