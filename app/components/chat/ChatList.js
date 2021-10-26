import React, {useCallback, useRef} from 'react';
import {FlatList, StyleSheet} from 'react-native';
import {useSelector} from 'react-redux';
import ChatItem from './ChatItem';
import ListFooter from './listFooter';
import ListHeader from './listHeader';

const ChatList = () => {
  const flatListRef = useRef();
  const chats = useSelector(state => state.room.chats);
  const renderItem = useCallback(({item}) => <ChatItem item={item} />, []);
  const listFooter = useCallback(<ListFooter />, []);
  const listHeader = useCallback(<ListHeader />, []);

  return (
    <FlatList
      ref={flatListRef}
      data={chats}
      inverted
      windowSize={3}
      ListFooterComponent={listFooter}
      ListHeaderComponent={listHeader}
      renderItem={renderItem}
      style={styles.container}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 0,
  },
});

export default ChatList;
