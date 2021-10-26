import {StyleSheet} from 'react-native';
import {isTablet} from 'react-native-device-info';

const isTab = isTablet();

const carouselStyles = StyleSheet.create({
  container: {
    width: isTab ? '25%' : '50%',
    height: isTab ? '25%' : '50%',
    padding: 7,
  },
  mbtiBox: {
    width: '100%',
    height: '100%',
    position: 'relative',
    alignItems: 'center',
    borderWidth: 3.5,
    borderRadius: 36,
    padding: 12,
    backgroundColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 4,
  },
  mbtiTitle: {
    fontSize: 21,
    fontWeight: 'bold',
    letterSpacing: 1.5,
    marginTop: 3,
    marginBottom: 9,
  },
  mbtiDescription: {
    fontSize: 13,
    color: 'gray',
    textAlign: 'center',
  },
  onSelected: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(255,255,255,.5)',
    borderRadius: 32.16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  ISTJ: {
    borderColor: '#73804e',
    color: '#73804e',
  },
  ISFJ: {
    borderColor: '#249d89',
    color: '#249d89',
  },
  INFJ: {
    borderColor: '#f2664f',
    color: '#f2664f',
  },
  INTJ: {
    borderColor: '#9ab93b',
    color: '#9ab93b',
  },
  ISTP: {
    borderColor: '#72509a',
    color: '#72509a',
  },
  ISFP: {
    borderColor: '#c4121a',
    color: '#c4121a',
  },
  INFP: {
    borderColor: '#00aeef',
    color: '#00aeef',
  },
  INTP: {
    borderColor: '#f47921',
    color: '#f47921',
  },
  ESTP: {
    borderColor: '#e4a922',
    color: '#e4a922',
  },
  ESFP: {
    borderColor: '#dd5827',
    color: '#dd5827',
  },
  ENFP: {
    borderColor: '#77236c',
    color: '#77236c',
  },
  ENTP: {
    borderColor: '#0b6976',
    color: '#0b6976',
  },
  ESTJ: {
    borderColor: '#a6c539',
    color: '#a6c539',
  },
  ESFJ: {
    borderColor: '#d91a5b',
    color: '#d91a5b',
  },
  ENFJ: {
    borderColor: '#163561',
    color: '#163561',
  },
  ENTJ: {
    borderColor: '#158f44',
    color: '#158f44',
  },
});

export default carouselStyles;
