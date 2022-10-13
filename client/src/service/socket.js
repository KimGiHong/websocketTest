import { createContext } from "react";
import socketIo from "socket.io-client";

export const socket = socketIo(String(process.env.REACT_APP_BACK_URL), {
  withCredentials: true,
});
export const SocketContext = createContext(socket);

export const SOCKET_EVENT = {
  JOIN_ROOM: "JOIN_ROOM",
  UPDATE_NICKNAME: "UPDATE_NICKNAME",
  SEND_MESSAGE: "SEND_MESSAGE",
  RECEIVE_MESSAGE: "RECEIVE_MESSAGE",
}

export const makeMessage = pongData => {
  const {prevNickname, nickname, content, type } = pongData;

  let nicknameLabel;
  let connectLabel = "";

  switch(type){
    case SOCKET_EVENT.JOIN_ROOM: {
      connectLabel = `${nickname}님이 입장하셨습니다.`;
      break;
    }
    case SOCKET_EVENT.UPDATE_NICKNAME: {
      connectLabel = `${prevNickname}님의 닉네임이 변경되었습니다.\n ${prevNickname} => ${nickname}`;
      break;
    }
    case SOCKET_EVENT.SEND_MESSAGE: {
      connectLabel = String(content);
      nicknameLabel = nickname;
      break;
    }
    default:
  }

  return{
    nickname: nicknameLabel,
    content: connectLabel,
  }
}

socket.on("connect", () => {
  console.log("socket server connected.");
});

socket.on("disconnect", () => {
  console.log("socket server disconnected.");
});

