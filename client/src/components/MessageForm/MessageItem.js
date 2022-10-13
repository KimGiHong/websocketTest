import React from 'react'

function MessageItem({message}) {
  const { nickname, content } = message;

  return(
    <div>
      {nickname && <div>{nickname}: </div>}
      <div>{content}</div>
    </div>
  )
}

export default React.memo(MessageItem);