import AsyncStorage from '@react-native-async-storage/async-storage';
import {createSlice, combineReducers} from '@reduxjs/toolkit';
import {persistReducer} from 'redux-persist';
import {friendSlice} from './friend';
import {mySlice} from './my';
import {roomSlice} from './room';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['my', 'friend'],
};

const initialState = {
  //mbti 관련
  desireMbti: [],
  //성별 관련
  desireGender: [],
  //밴한 ip
  banIp: [],
  //나 어딨게
  where: null,
  isWriting: false,
};

export const indexSlice = createSlice({
  name: 'index',
  initialState,
  reducers: {
    setDesireMbti(state, action) {
      const overlap = state.desireMbti.concat(action.payload);
      state.desireMbti = overlap.filter(
        (mbti, i) => overlap.indexOf(mbti) === i,
      );
    },
    removeDesireMbti(state, action) {
      state.desireMbti = state.desireMbti.filter(
        mbti => mbti !== action.payload,
      );
    },
    removeDesireGender(state, action) {
      state.desireGender = state.desireGender.filter(
        gender => gender !== action.payload,
      );
    },
    setDesireGender(state, action) {
      const overlap = state.desireGender.concat(action.payload);
      state.desireGender = overlap.filter(
        (gender, i) => overlap.indexOf(gender) === i,
      );
    },
    resetDesire(state) {
      state.desireGender = initialState.desireGender;
      state.desireMbti = initialState.desireMbti;
    },
    setBanIp(state, action) {
      state.banIp = state.banIp.concat(action.payload);
    },
    setWhere(state, action) {
      state.where = action.payload;
      if (!action.payload) {
        state.isWriting = false;
      }
    },
    setIsWriting(state, action) {
      const {isWriting, id, barId, mbti} = action.payload;
      if (barId !== state.where) {
        return;
      }
      if (isWriting) {
        state.isWriting = {id, barId, mbti};
      } else {
        if (state.isWriting?.id === id) {
          state.isWriting = false;
        }
      }
    },
  },
});

const rootReducer = combineReducers({
  index: indexSlice.reducer,
  my: mySlice.reducer,
  room: roomSlice.reducer,
  friend: friendSlice.reducer,
});

export default persistReducer(persistConfig, rootReducer);
