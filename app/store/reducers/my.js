import {createSlice} from '@reduxjs/toolkit';
import {reportAction, sendToken} from '../actions';

const initialState = {
  myMbti: null,
  myGender: null,
  isAgreeEula: false,
  myCharacter: null,
  myIp: null,
  myId: null,
  myName: null,
  myToken: null,
  report: [],
  timer: [
    {type: 'mbti', timer: null},
    {type: 'character', timer: null},
    {type: 'nickname', timer: null},
  ],
  mode: 'light',
  reset: false,
};

export const mySlice = createSlice({
  name: 'my',
  initialState,
  reducers: {
    setMyMbti(state, action) {
      state.myMbti = action.payload;
    },
    setMyGender(state, action) {
      state.myGender = action.payload;
    },
    setMyCharacter(state, action) {
      state.myCharacter = action.payload;
    },
    setMyName(state, action) {
      state.myName = action.payload;
    },
    setMyId(state, action) {
      state.myId = action.payload;
    },
    setAgreeEula(state) {
      state.isAgreeEula = true;
    },
    resetMyMbti(state) {
      state.myMbti = initialState.myMbti;
    },
    resetMyCharacter(state) {
      state.myCharacter = initialState.myCharacter;
    },
    resetMyName(state) {
      state.myName = initialState.myName;
    },
    setMyIp(state, action) {
      state.myIp = action.payload;
    },
    resetReport(state) {
      state.report = initialState.report;
    },
    setTimer(state, action) {
      const target = state.timer.find(t => t.type === action.payload);
      target.timer = Date.now();
    },
    setMode(state, action) {
      state.mode = action.payload;
    },
    resetAll(state) {
      state.myMbti = initialState.myMbti;
      state.myGender = initialState.myGender;
      state.isAgreeEula = initialState.isAgreeEula;
      state.myCharacter = initialState.myCharacter;
      state.myIp = initialState.myIp;
      state.myId = initialState.myId;
      state.myName = initialState.myName;
      state.myToken = initialState.myToken;
      state.report = initialState.report;
      state.timer = initialState.timer;
      state.mode = initialState.mode;
      state.reset = true;
    },
  },
  extraReducers: builder => {
    // ??????
    builder.addCase(reportAction.fulfilled, (state, action) => {
      state.report.push({ip: action.payload, time: Date.now()});
    });
    builder.addCase(sendToken.fulfilled, (state, action) => {
      state.myToken = action.payload;
    });
  },
});
