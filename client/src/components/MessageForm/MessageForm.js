import React, { useCallback, useContext, useState } from 'react'
import { SocketContext, SOCKET_EVENT } from '../../service/socket';

function MessageForm({nickname}){
  const [typingMessage, setTypingMessage] = useState("");
  const socket = useContext(SocketContext);

  const handleChangeTypingMessage = useCallback(e => {
    setTypingMessage(e.target.value);
  }, []);

  const handleSendMessage = useCallback((e) => {
    e.preventDefault();
    const noContent = typingMessage.trim() === "";

    if(noContent) {
      return;
    }

    socket.emit(SOCKET_EVENT.SEND_MESSAGE, {
      nickname,
      content: typingMessage
    });
    
    setTypingMessage("");
  }, [socket, nickname, typingMessage]);

  const upload = (files) => {
    console.log(files.target.files[0])
    socket.emit("upload", files.target.files[0], (status) => {
      console.log(status);
    })
  }

  return(
    <form>
      <div>
        <textarea maxLength={400} autoFocus value={typingMessage} onChange={handleChangeTypingMessage} />
        <input type="file" onChange={upload}/>
        <button onClick={handleSendMessage}>
           전송
        </button>
      </div>
    </form>
  )
}

export default MessageForm;