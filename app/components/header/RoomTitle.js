import React, {useCallback, useState} from 'react';
import {
  Dimensions,
  Image,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import FontAweSome from 'react-native-vector-icons/FontAwesome';
import {useSelector} from 'react-redux';
import sirenImage from '../../assets/images/siren.png';
import AlreadyReportModal from '../modal/AlreadyReport';
import BanModal from '../modal/BanModal';
import ReportLimit from '../modal/ReportLimit';
import ReportModal from '../modal/ReportModal';

const RoomTitle = () => {
  const [showBanModal, setShowBanModal] = useState(false);
  const [showReportModal, setShowReportModal] = useState(false);
  const [showAlreadyReportModal, setShowAlreadyReportModal] = useState(false);
  const [showReportLimit, setShowReportLimit] = useState(false);
  const partnerInfo = useSelector(state => state.room.partnerInfo);
  const banIp = useSelector(state => state.index.banIp);
  const report = useSelector(state => state.my.report);
  const onPressBan = useCallback(() => {
    setShowBanModal(true);
  }, []);

  const onPressReport = useCallback(() => {
    const reportIp = report.map(v => v.ip);
    if (reportIp?.includes(partnerInfo?.ip)) {
      return setShowAlreadyReportModal(true);
    }
    if (reportIp?.length >= 3) {
      return setShowReportLimit(true);
    }
    return setShowReportModal(true);
  }, [report, partnerInfo]);

  return (
    <View style={styles.container}>
      <TouchableOpacity
        disabled={!partnerInfo}
        onPress={onPressBan}
        style={styles.buttonWrapper}>
        <FontAweSome
          name="ban"
          size={27}
          color="#DF6464"
          style={!partnerInfo ? styles.disabledStyle : null}
        />
      </TouchableOpacity>
      <BanModal
        showModal={showBanModal}
        setShowModal={setShowBanModal}
        partnerInfo={partnerInfo}
        banIp={banIp}
      />
      <TouchableOpacity
        disabled={!partnerInfo}
        onPress={onPressReport}
        style={styles.buttonWrapper}>
        <Image
          source={sirenImage}
          style={[styles.siren, !partnerInfo ? styles.disabledStyle : null]}
        />
      </TouchableOpacity>
      <ReportModal
        showModal={showReportModal}
        setShowModal={setShowReportModal}
        partnerInfo={partnerInfo}
        banIp={banIp}
        report={report}
      />
      <AlreadyReportModal
        showModal={showAlreadyReportModal}
        setShowModal={setShowAlreadyReportModal}
      />
      <ReportLimit
        showModal={showReportLimit}
        setShowModal={setShowReportLimit}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: Dimensions.get('window').width / 2,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  buttonWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  siren: {
    height: 27,
    width: 27,
    resizeMode: 'contain',
  },
  disabledStyle: {
    opacity: 0.5,
  },
});

export default RoomTitle;
