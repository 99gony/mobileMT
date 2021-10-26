import React, {useCallback, useRef} from 'react';
import {FlatList} from 'react-native';
import {useSelector} from 'react-redux';
import BarChatItem from './BarChatItem';
import BarTyping from './BarTyping';

const BarChatList = ({barId, partnerMbti}) => {
  const flatListRef = useRef();
  const list = useSelector(state => state.friend.list);
  const renderItem = useCallback(
    ({item}) => <BarChatItem item={item} partnerMbti={partnerMbti} />,
    [],
  );
  const listHeader = useCallback(<BarTyping />, []);

  const theBar = list.find(b => b.id === barId);

  return (
    <FlatList
      ref={flatListRef}
      data={theBar?.Chats}
      inverted
      windowSize={3}
      removeClippedSubviews={true}
      initialNumToRender={20}
      ListHeaderComponent={listHeader}
      renderItem={renderItem}
    />
  );
};

export default BarChatList;
