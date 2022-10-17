import React from 'react'

function MessageItem({message}) {
  const { nickname, content, file, fileName } = message;
  console.log()
  return(
    <div>
      {nickname && <div>{nickname}: </div>}
      <div>{content}</div>
      {file.length !== 0 && file[0].includes("data:image") ? <img src={file}/> : <a href={file} download={fileName}>{fileName}</a>}
    </div>
  )
}

export default React.memo(MessageItem);