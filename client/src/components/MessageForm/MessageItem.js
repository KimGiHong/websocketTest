import React from 'react'

function MessageItem({message}) {
  const { nickname, content, fileTest } = message;

  return(
    <div>
      {nickname && <div>{nickname}: </div>}
      <div>{content}</div>
      <div>{fileTest}</div>
    </div>
  )
}

export default React.memo(MessageItem);