import React from 'react';
import MessageForm from '../MessageForm/MessageForm';
import MessageList from '../MessageForm/MessageList';
import * as S from './style';

function ChatRoom({nickname}) {
  return(
    <S.ChatContainer>
      <div>
        <span>{nickname}</span>님 환영합니다!
      </div>
      <MessageList />
      <MessageForm nickname={nickname} />
    </S.ChatContainer>
  )
}

export default ChatRoom;