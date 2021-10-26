import {Dimensions, StyleSheet} from 'react-native';

const genderStyles = StyleSheet.create({
  container: {
    width: Dimensions.get('window').width / 1.3,
    marginVertical: 8,
    height: 58,
    padding: 7,
    flexDirection: 'row',
  },
  genderButton: {
    flex: 1,
    backgroundColor: '#ffffff',
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  manButton: {
    borderLeftColor: 'rgb(0, 149, 246)',
    borderTopColor: 'rgb(0, 149, 246)',
    borderBottomColor: 'rgb(0, 149, 246)',
    borderRightWidth: 1,
    borderRightColor: '#d9d9d9',
    borderTopLeftRadius: 21,
    borderBottomLeftRadius: 21,
  },
  womanButton: {
    borderRightColor: '#ff4d4f',
    borderTopColor: '#ff4d4f',
    borderBottomColor: '#ff4d4f',
    borderLeftWidth: 1,
    borderLeftColor: '#d9d9d9',
    borderTopRightRadius: 21,
    borderBottomRightRadius: 21,
  },
  genderButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  manButtonText: {
    color: 'rgb(0, 149, 246)',
  },
  womanButtonText: {
    color: '#ff4d4f',
  },
  anyGenderButton: {
    borderTopColor: 'rgb(153, 0, 153)',
    borderBottomColor: 'rgb(153, 0, 153)',
    borderLeftWidth: 0,
    borderRightWidth: 0,
  },
  anyGenderButtonText: {
    color: 'rgb(153, 0, 153)',
  },
});

export default genderStyles;
