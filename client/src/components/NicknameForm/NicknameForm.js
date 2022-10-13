import React, { useCallback, useState } from 'react';
import * as S from "./style";

function NicknameForm({ handleSubmitNickname }) {
  const [nickname, setNickname] = useState("");

  const handleChangeNickname = useCallback(event => {
    setNickname(event.target.value);
  }, []);

  const handleSubmit = useCallback(() => {
    handleSubmitNickname(nickname);
    setNickname("");
  }, [handleSubmitNickname, nickname]);

  // const onKeyPress = (e) => {
  //   e.preventDefault();
  //   if(e.key === 'Enter'){
  //     handleSubmit();
  //   }
  // }

  return(
    <form>
      <S.Container>
        닉네임
        <S.Input 
          type="text" 
          maxLength={12}
          value={nickname}
          onChange={handleChangeNickname}
          // onKeyPress={onKeyPress}
        />
        <S.Button 
          type='button'
          value="변경"
          onClick={handleSubmit}
        />
      </S.Container>
    </form>
  )
}

export default NicknameForm;