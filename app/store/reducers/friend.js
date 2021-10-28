import {createSlice} from '@reduxjs/toolkit';
import {deleteFriend, getFriendList, offAlert, onAlert} from '../actions';

const initialState = {
  lastChatId: 0,
  list: [],
  notification: false,
  offBars: [],
};

export const friendSlice = createSlice({
  name: 'friend',
  initialState,
  reducers: {
    setNotification(state) {
      state.notification = true;
    },
    setFriendNickname(state, action) {
      const {barId, nickname} = action.payload;
      const target = state.list.find(b => b.id === barId).Users[0];
      target.name = nickname;
    },
    setChat(state, action) {
      const {BarId, message} = action.payload;
      const theBar = state.list.find(c => c.id === BarId);
      if (!theBar) {
        return;
      }
      theBar.Chats.unshift(action.payload);
      theBar.lastChat = message;
      theBar.updatedAt = Date.now();

      const sortList = (a, b) => {
        var dateA = new Date(a.updatedAt).getTime();
        var dateB = new Date(b.updatedAt).getTime();
        return dateA < dateB ? 1 : -1;
      };
      state.list.sort(sortList);
    },
    onReadChat(state, action) {
      const {barId, userId} = action.payload;
      const theBar = state.list.find(b => b.id === barId);
      if (!theBar) {
        return;
      }
      theBar.Chats.forEach(e => {
        if (e.isReaded === 0 && e.UserId !== userId) {
          e.isReaded += 1;
        }
      });
    },
    onNewFriend(state, action) {
      state.list.unshift(action.payload);
    },
    resetAll(state) {
      state = initialState;
      return state;
    },
  },
  extraReducers: builder => {
    builder.addCase(getFriendList.fulfilled, (state, action) => {
      // payload 에 어떤 룸에 왔는지 확인
      const newList = action.payload;
      if (newList.length === 0) {
        return;
      }
      const updatedBars = newList.filter(v => v.Chats.length !== 0);

      state.list.forEach(bar => {
        updatedBars.forEach(b => {
          if (bar.id === b.id) {
            const prevChats = bar.Chats.filter(c => c.id < state.lastChatId);
            bar.Chats = b.Chats.concat(prevChats);
            bar.lastChat = b.Chats[0].message;
            bar.updatedAt = b.updatedAt;
            bar.Users[0].character = b.Users[0].character;
            bar.Users[0].mbti = b.Users[0].mbti;
          }
        });
      });
      // 이러면 최근 채팅기록만 남게되니까 받아온거를 추가해야함
      const chats = updatedBars.map(b => b.Chats).flat();
      if (chats.length !== 0) {
        const unReadedChats = chats.filter(c => c.isReaded === 0);
        if (unReadedChats.length !== 0) {
          const chatsId = unReadedChats.map(c => c.id);
          const lastId = chatsId.reduce((p, c) => {
            return p > c ? c : p;
          });
          state.lastChatId = lastId;
        } else {
          const chatsId = chats.map(c => c.id);
          const lastId = chatsId.reduce((p, c) => {
            return p > c ? p : c;
          });
          state.lastChatId = lastId;
        }
      }
      const sortList = (a, b) => {
        var dateA = new Date(a.updatedAt).getTime();
        var dateB = new Date(b.updatedAt).getTime();
        return dateA < dateB ? 1 : -1;
      };
      state.list.sort(sortList);
    });
    builder.addCase(deleteFriend.fulfilled, (state, action) => {
      state.list = state.list.filter(b => b.id !== action.payload);
    });
    builder.addCase(offAlert.fulfilled, (state, action) => {
      state.offBars.push(action.payload);
    });
    builder.addCase(onAlert.fulfilled, (state, action) => {
      state.offBars = state.offBars.filter(b => b !== action.payload);
    });
  },
});
