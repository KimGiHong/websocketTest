import React, { useCallback, useContext, useState } from 'react'
import { SocketContext, SOCKET_EVENT } from '../../service/socket';

function MessageForm({nickname}){
  const [typingMessage, setTypingMessage] = useState("");
  const [file, setFile] = useState([]);
  const [fileName, setFileName] = useState("");
  const [test, setTest] = useState("")
  const socket = useContext(SocketContext);

  const handleChangeFile = (e) => {
    let reader = new FileReader();
    const target = e.target.files[0];
    target && setFileName(target.name);
    setTest(e.target.value)
    
    if(target.size > 2 * 1024 * 1024 || target.name.includes(".exe")){
      alert("용량이 너무 큽니다");
      setTest("")
      return;
    }
    
    reader.readAsDataURL(target);
    reader.onloadend = () => {
      const base64 = reader.result.toString();
      setFile(file => [...file, base64]);
    }
  };
  console.log(test)
  const handleChangeTypingMessage = useCallback(e => {
    setTypingMessage(e.target.value);
  }, []);

  const handleSendMessage = useCallback((e) => {
    e.preventDefault();
    const noContent = typingMessage.length === 0;
    const noFile = file.length === 0;

    if(noContent && noFile) {
      return;
    }

    socket.emit(SOCKET_EVENT.SEND_MESSAGE, {
      nickname,
      content: typingMessage,
      file,
      fileName
    });
    setTypingMessage("");
    setFile([])
    setTest("")
  }, [socket, nickname, typingMessage, file, test]);

  return(
    <form>
      <div>
        <textarea maxLength={400} autoFocus value={typingMessage} onChange={handleChangeTypingMessage} />
        <input type="file" onChange={handleChangeFile}/>
        <button onClick={handleSendMessage}>
           전송
        </button>
      </div>
    </form>
  )
}

export default MessageForm;