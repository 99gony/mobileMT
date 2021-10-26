import React, {useState, useEffect, useRef} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {GameEngine} from 'react-native-game-engine';
import {useSelector} from 'react-redux';
import {darkMode} from '../darkModeStyles';
import entities from './entities';
import Physics from './physics';

export default function Game() {
  const mode = useSelector(state => state.my.mode);
  const [running, setRunning] = useState(false);
  const [first, setFirst] = useState(true);
  const gameEngine = useRef(null);
  const [currentPoints, setCurrentPoints] = useState(0);
  useEffect(() => {
    setRunning(false);
  }, []);
  return (
    <View style={styles.container}>
      {first ? null : (
        <Text
          style={[
            styles.score,
            mode === 'dark' ? darkMode.descriptionFont : null,
          ]}>
          {currentPoints}
        </Text>
      )}
      <GameEngine
        ref={gameEngine}
        systems={[Physics]}
        entities={entities()}
        running={running}
        style={styles.gameContainer}
        onEvent={e => {
          switch (e.type) {
            case 'game_over':
              setRunning(false);
              gameEngine.current.stop();
              gameEngine.current.swap(entities());
              break;
            case 'new_point':
              setCurrentPoints(currentPoints + 1);
              break;
          }
        }}
      />

      {!running ? (
        <View style={styles.startButtonWrapper}>
          <TouchableOpacity
            style={styles.startButton}
            onPress={() => {
              setCurrentPoints(0);
              setRunning(true);
              setFirst(false);
            }}>
            <Text
              style={[
                styles.startButtonText,
                mode === 'dark' ? darkMode.descriptionFont : null,
              ]}>
              터치!
            </Text>
          </TouchableOpacity>
        </View>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
    overflow: 'hidden',
  },
  gameContainer: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },
  score: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 20,
    textAlign: 'center',
    fontSize: 24,
    fontWeight: 'bold',
    color: '#5f5f5f',
  },
  startButtonWrapper: {flex: 1, justifyContent: 'center', alignItems: 'center'},
  startButton: {
    width: 70,
    height: 100,
  },
  startButtonText: {
    fontWeight: 'bold',
    color: 'gray',
    textAlign: 'center',
    fontSize: 15,
  },
});
