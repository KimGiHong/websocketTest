import { useCallback, useEffect, useState, useRef } from "react";

import NicknameForm from "./components/NicknameForm/NicknameForm";
import ChatRoom from "./components/ChatRoom/ChatRoom";
import { socket, SocketContext, SOCKET_EVENT } from "./service/socket";
import { GlobalStyle } from "./shared/GlobalStyle";
import styled from "@emotion/styled";

const Positioner = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  height: 100vh;
`;

const Container = styled.div`
  display: grid;
  justify-items: center;
  align-items: center;
  grid-template-rows: 220px;
  width: 22%;
  height: 100%;
  background-color: #ededed;
`;

function App() {
  const prevNickname = useRef(null);
  const [nickname, setNickname] = useState("김기홍");

  useEffect(() => {
    return () => {
      socket.disconnect();
    };
  }, []);

  useEffect(() => {
    if (prevNickname.current) {
      socket.emit(SOCKET_EVENT.UPDATE_NICKNAME, {
        prevNickname: prevNickname.current,
        nickname,
      });
    } else {
      socket.emit(SOCKET_EVENT.JOIN_ROOM, { nickname });
    }
  }, [nickname]);

  const handleSubmitNickname = useCallback(
    (newNickname) => {
      prevNickname.current = nickname;

      if (newNickname === "") {
        setNickname("김기홍");
      } else {
        setNickname(newNickname);
      }
    },
    [nickname]
  );

  return (
    <>
      <GlobalStyle />
      <SocketContext.Provider value={socket}>
        <Positioner>
          <Container>
            <NicknameForm handleSubmitNickname={handleSubmitNickname} />
            <ChatRoom nickname={nickname} />  
          </Container>
        </Positioner>
      </SocketContext.Provider>
    </>
  );
}

export default App;
