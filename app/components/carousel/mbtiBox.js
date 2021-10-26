import React from 'react';
import {StyleSheet, View} from 'react-native';
import DesireMbtiBox from './desire';
import MyMbtiBox from './my';

const MbtiBox = ({item, isDesireScreen}) => {
  return (
    <View style={styles.container}>
      {item.map(v =>
        isDesireScreen ? (
          <DesireMbtiBox key={v.title} mbti={v} />
        ) : (
          <MyMbtiBox key={v.title} mbti={v} />
        ),
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
});

export default MbtiBox;
