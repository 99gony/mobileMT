import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  // 상태 정보
  isLeave: false,
  isFinding: true,
  isWriting: false,
  //파트너 정보
  partnerInfo: null,
  // 채팅 정보
  chats: [],
  // 친구 요청
  sendFriend: false,
  friendRequest: false,
  //다시하기
  replayToggle: 0,
};

export const roomSlice = createSlice({
  name: 'room',
  initialState,
  reducers: {
    //상태 세팅
    setIsLeave(state, action) {
      state.isLeave = action.payload;
    },
    setIsFinding(state, action) {
      state.isFinding = action.payload;
    },
    setIsWriting(state, action) {
      state.isWriting = action.payload;
    },
    //파트너 정보 세팅
    setPartnerInfo(state, action) {
      state.partnerInfo = action.payload;
    },
    // 채팅 세팅
    setChats(state, action) {
      state.chats.unshift(action.payload);
    },
    //다시하기
    triggerReplay(state) {
      state.replayToggle += 1;
    },
    // 친구 요청
    onSendFriend(state) {
      state.sendFriend = true;
    },
    onFriendRequest(state) {
      state.friendRequest = true;
    },
    //리셋
    resetRoom(state) {
      state.isLeave = initialState.isLeave;
      state.isFinding = initialState.isFinding;
      state.isWriting = initialState.isWriting;
      state.partnerInfo = initialState.partnerInfo;
      state.chats = initialState.chats;
      state.sendFriend = initialState.sendFriend;
      state.friendRequest = initialState.friendRequest;
    },
  },
});
