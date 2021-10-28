import React, {useEffect} from 'react';
import {SafeAreaView, ScrollView, StyleSheet, Text, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import MbtiCarousel from '../../components/carousel';
import DesireScreenDescription from '../../components/description/desire';
import EulaModal from '../../components/modal/EulaModal';
import DesireGenderPicker from '../../components/gender/desire';
import SelectButton from '../../components/SelectButton';
import {indexSlice} from '../../store/reducers';
import {mySlice} from '../../store/reducers/my';
import {roomSlice} from '../../store/reducers/room';
import {darkMode} from '../../components/darkModeStyles';

const DesireScreen = ({navigation}) => {
  const dispatch = useDispatch();

  const {report, mode, myMbti, myGender, myCharacter, myName} = useSelector(
    state => state.my,
  );

  useEffect(() => {
    const resetting = navigation.addListener('focus', () => {
      dispatch(indexSlice.actions.resetDesire());
      dispatch(roomSlice.actions.resetRoom());
      if (report[0]?.time <= Date.now() - 24 * 60 * 60 * 1000) {
        dispatch(mySlice.actions.resetReport());
      }
    });
    return resetting;
  }, [navigation]);

  useEffect(() => {
    if (!myMbti && !myGender && !myCharacter && !myName) {
      navigation.reset({index: 0, routes: [{name: 'my'}]});
    }
  }, [navigation, myMbti, myGender, myCharacter, myName]);

  return (
    <SafeAreaView
      style={[
        styles.safeAreaView,
        mode === 'dark' ? darkMode.background : null,
      ]}>
      <ScrollView contentContainerStyle={styles.scrollViewStyle}>
        <EulaModal />
        <DesireScreenDescription />
        <MbtiCarousel isDesireScreen={navigation.isFocused} />
        <DesireGenderPicker />
        <SelectButton navigation={navigation} />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeAreaView: {
    flex: 1,
  },
  scrollViewStyle: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default DesireScreen;
