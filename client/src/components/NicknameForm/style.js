import styled from "@emotion/styled";

export const Container = styled.div`
  width: 300px;
  border: 2px solid gray;
  border-radius: 10px;
  padding: 10px;
`;

export const Input = styled.input`
  width: 150px;
  height: 30px;
  border: 0;
  margin: 0 10px;
  background: none;
  :focus{
    border: 0;
    outline: 0;
  }
`;

export const Button = styled.input`
  width: 50px;
  height: 30px;
  border: 0;
  background-color: #72f7b5;
  border-radius: 10px;
  color: #FFFFFF;
`;