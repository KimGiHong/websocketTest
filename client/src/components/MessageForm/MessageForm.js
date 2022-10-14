import React, { useCallback, useContext, useState } from 'react'
import { SocketContext, SOCKET_EVENT } from '../../service/socket';

function MessageForm({nickname}){
  const [typingMessage, setTypingMessage] = useState("");
  const socket = useContext(SocketContext);
  const [file, setFile] = useState("");
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
      content: typingMessage,
    });
    socket.emit(SOCKET_EVENT.SEND_FILE, file && file.target.files[0].toString("utf8"))
    setTypingMessage("");
  }, [socket, nickname, typingMessage]);

  return(
    <form>
      <div>
        <textarea maxLength={400} autoFocus value={typingMessage} onChange={handleChangeTypingMessage} />
        <input type="file" onChange={setFile}/>
        <button onClick={handleSendMessage}>
           전송
        </button>
      </div>
    </form>
  )
}

export default MessageForm;