import React, {useCallback, useEffect, useState, useRef} from 'react';
import {
  Keyboard,
  KeyboardAvoidingView,
  SafeAreaView,
  ScrollView,
  StyleSheet,
} from 'react-native';
import {useSelector} from 'react-redux';
import MbtiCarousel from '../../components/carousel';
import CharacterPeeker from '../../components/Character';
import MyScreenDescription from '../../components/description/my';
import MyGenderPicker from '../../components/gender/my';
import Nickname from '../../components/Nickname';
import {getBottomSpace} from 'react-native-iphone-x-helper';
import axios from 'axios';
import {serverAPI} from '../../components/serverAPI';
import {darkMode} from '../../components/darkModeStyles';
const bottomSpace = getBottomSpace();

const MyScreen = ({navigation}) => {
  const {myId, myMbti, myGender, myCharacter, myName, isAgreeEula, mode} =
    useSelector(state => state.my);
  const [keyboardHeight, setKeyboardHeight] = useState(0);
  const scrollRef = useRef();

  useEffect(async () => {
    if (myMbti && myGender && myCharacter && myName) {
      if (myId) {
        try {
          await axios.post(`${serverAPI}/user/update`, {
            id: myId,
            name: myName,
            gender: myGender,
            mbti: myMbti,
            character: myCharacter,
          });
        } catch (err) {
          console.log(err);
        }
      }
      navigation.replace('main');
    }
  }, [myMbti, myGender, myCharacter, myName, myId]);

  useEffect(() => {
    const keyboardWillShow = Keyboard.addListener(
      'keyboardWillShow',
      _keyboardWillShow,
    );
    const keyboardDidShow = Keyboard.addListener(
      'keyboardDidShow',
      _keyboardDidShow,
    );
    const keyboardWillHide = Keyboard.addListener(
      'keyboardWillHide',
      _keyboardWillHide,
    );
    return () => {
      keyboardWillShow.remove();
      keyboardDidShow.remove();
      keyboardWillHide.remove();
    };
  }, []);

  const _keyboardWillShow = useCallback(e => {
    const height = e.endCoordinates.height - bottomSpace;
    setKeyboardHeight(height);
  }, []);
  const _keyboardDidShow = useCallback(() => {
    scrollRef.current.scrollToEnd();
  }, []);

  const _keyboardWillHide = useCallback(() => {
    setKeyboardHeight(0);
  }, []);

  if (!isAgreeEula) {
    return (
      <SafeAreaView style={[styles.safeAreaView]}>
        <KeyboardAvoidingView
          style={[styles.container, {paddingBottom: keyboardHeight}]}>
          <ScrollView
            ref={scrollRef}
            contentContainerStyle={styles.scrollViewStyle}>
            {myMbti && myGender ? (
              <>
                <CharacterPeeker />
                <Nickname />
              </>
            ) : (
              <>
                <MyScreenDescription />
                <MbtiCarousel isDesireScreen={false} />
                <MyGenderPicker />
              </>
            )}
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    );
  } else {
    return (
      <SafeAreaView
        style={[
          styles.safeAreaView,
          mode === 'dark' ? darkMode.background : null,
        ]}>
        <KeyboardAvoidingView
          style={[styles.container, {paddingBottom: keyboardHeight}]}>
          <ScrollView
            ref={scrollRef}
            contentContainerStyle={styles.scrollViewStyle}>
            {!myMbti ? (
              <>
                <MyScreenDescription />
                <MbtiCarousel isDesireScreen={false} />
              </>
            ) : null}
            {!myCharacter ? <CharacterPeeker /> : null}
            {!myName ? <Nickname /> : null}
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    );
  }
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
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default MyScreen;
