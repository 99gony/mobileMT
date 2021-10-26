import React from 'react';
import {Dimensions, StyleSheet, View} from 'react-native';
import Carousel from 'react-native-snap-carousel';
import MbtiBox from './mbtiBox';
import {isTablet} from 'react-native-device-info';

const isTab = isTablet();

const mbtisInfo = [
  [
    {
      title: 'INTJ',
      description: '직관력이 뛰어나며 철두철미한 계획을 세우는 전략가',
    },
    {
      title: 'INFJ',
      description: '사람과 관련된 뛰어난 통찰력을 가지고 있는 사람',
    },
    {
      title: 'INTP',
      description: '끊임없이 지식에 목말라하는 사색가',
    },
    {
      title: 'INFP',
      description: '이상적인 세상을 만들어 가는 사람',
    },
  ],
  [
    {
      title: 'ISTJ',
      description: '한번 시작한 일은 끝까지 해내는 사람',
    },
    {
      title: 'ISFJ',
      description: '성실하고 온화하며 협조를 잘하는 사람',
    },
    {
      title: 'ISTP',
      description: '논리적이고 뛰어난 상황 적응력을 가지고 있는 사람',
    },
    {
      title: 'ISFP',
      description: '따뜻한 감성을 가진 융통성 있는 예술가',
    },
  ],
  [
    {
      title: 'ESTJ',
      description: '사무적, 실용적, 현실적으로 일을 많이하는 사람',
    },
    {
      title: 'ESFJ',
      description: '친절과 현실감을 바탕으로 타인에게 봉사하는 사람',
    },
    {
      title: 'ESTP',
      description: '친구, 운동, 음식 등 다양한 활동을 선호하는 사람',
    },
    {
      title: 'ESFP',
      description: '분위기를 고조시키는 우호적 사람',
    },
  ],
  [
    {
      title: 'ENTJ',
      description: '비전을 가지고 사람들을 활력적으로 이끌어가는 사람',
    },
    {
      title: 'ENFJ',
      description: '타인의 성장을 도모하고 협동하는 사람',
    },
    {
      title: 'ENTP',
      description: '풍부한 상상력을 가지고 새로운 것에 도전하는 사람',
    },
    {
      title: 'ENFP',
      description: '열정적으로 새로운 관계를 만드는 사람',
    },
  ],
];

const tabMbtiInfo = mbtisInfo.flat();

const fullWidth = Dimensions.get('window').width;

const MbtiCarousel = ({isDesireScreen}) => {
  return (
    <View style={styles.container}>
      {isTab ? (
        <MbtiBox item={tabMbtiInfo} isDesireScreen={isDesireScreen} />
      ) : (
        <Carousel
          data={mbtisInfo}
          contentContainerCustomStyle={styles.carouselStyle}
          sliderWidth={fullWidth}
          itemWidth={fullWidth / 1.3}
          renderItem={({item}) => (
            <MbtiBox item={item} isDesireScreen={isDesireScreen} />
          )}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: fullWidth / 1.3,
    marginVertical: 6,
    width: isTab ? fullWidth / 1.3 : fullWidth,
  },
  carouselStyle: {
    height: fullWidth / 1.3,
  },
});
export default MbtiCarousel;
