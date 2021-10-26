import React, {useCallback, useEffect, useRef} from 'react';
import {
  Animated,
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import man10 from '../assets/images/man10.png';
import man20_1 from '../assets/images/man20_1.png';
import man20_2 from '../assets/images/man20_2.png';
import man20_3 from '../assets/images/man20_3.png';
import man30 from '../assets/images/man30.png';
import maskMan from '../assets/images/maskMan.png';
import woman10 from '../assets/images/woman10.png';
import woman20_1 from '../assets/images/woman20_1.png';
import woman20_2 from '../assets/images/woman20_2.png';
import woman20_3 from '../assets/images/woman20_3.png';
import woman30 from '../assets/images/woman30.png';
import maskWoman from '../assets/images/maskWoman.png';
import {useDispatch, useSelector} from 'react-redux';
import {mySlice} from '../store/reducers/my';
import {darkMode} from './darkModeStyles';

const mans = [
  {title: 'man10', src: man10},
  {title: 'man20_1', src: man20_1},
  {title: 'man20_2', src: man20_2},
  {title: 'man20_3', src: man20_3},
  {title: 'man30', src: man30},
  {title: 'maskMan', src: maskMan},
];
const womans = [
  {title: 'woman10', src: woman10},
  {title: 'woman20_1', src: woman20_1},
  {title: 'woman20_2', src: woman20_2},
  {title: 'woman20_3', src: woman20_3},
  {title: 'woman30', src: woman30},
  {title: 'maskWoman', src: maskWoman},
];
const CharacterPeeker = () => {
  const dispatch = useDispatch();
  const {myGender, myCharacter, mode} = useSelector(state => state.my);
  const animation = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(animation, {
      toValue: 1,
      duration: 1500,
      useNativeDriver: true,
    }).start();
  }, []);

  const onPressCharacter = useCallback(
    title => () => {
      dispatch(mySlice.actions.setMyCharacter(title));
    },
    [],
  );

  return (
    <Animated.View style={[styles.container, {opacity: animation}]}>
      <Text
        style={[styles.description, mode === 'dark' ? darkMode.font : null]}>
        상대방에게 보여질 나의 캐릭터를 골라주세요.
      </Text>
      <View style={styles.charactersContainer}>
        {myGender === 'boy'
          ? mans.map((man, i) => (
              <TouchableOpacity
                key={i}
                onPress={onPressCharacter(man.title)}
                style={styles.characterWrapper}>
                <Image
                  style={[
                    styles.character,
                    myCharacter && myCharacter !== man.title
                      ? styles.unselected
                      : null,
                  ]}
                  source={man.src}
                />
              </TouchableOpacity>
            ))
          : womans.map((woman, i) => (
              <TouchableOpacity
                key={i}
                onPress={onPressCharacter(woman.title)}
                style={styles.characterWrapper}>
                <Image
                  style={[
                    styles.character,
                    myCharacter && myCharacter !== woman.title
                      ? styles.unselected
                      : null,
                  ]}
                  source={woman.src}
                />
              </TouchableOpacity>
            ))}
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: Dimensions.get('window').width,
    alignItems: 'center',
    marginTop: 6,
  },
  charactersContainer: {
    width: '100%',
    paddingHorizontal: 12,
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
  },
  description: {
    color: '#242424',
    fontWeight: 'bold',
    fontSize: 18,
    marginBottom: 12,
  },
  characterWrapper: {
    width: '33%',
    height: 100,
    padding: 6,
    alignItems: 'center',
    justifyContent: 'center',
  },
  character: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
  unselected: {
    opacity: 0.3,
  },
});

export default CharacterPeeker;
