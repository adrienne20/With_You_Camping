import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const Container = styled.section`
  position: relative;
  display: grid;
  grid-template-columns: repeat(12, 1fr);

  width: 1200px;
  height: max-content;
`;

const InnerContainer = styled.div`
  grid-column: 3 / 11;

  display: flex;
  flex-direction: column;

  min-height: max-content;

  align-items: center;
`;

const UserInfo = styled.div`
  height: 140px;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  margin: 4rem;
`;

const Nickname = styled.div`
  font-weight: bold;
  font-size: 2rem;
  margin-bottom: 10px;
`;

const EmailInfo = styled.div`
  margin-bottom: 10px;
`;

const ModifyInfo = styled.button`
  padding: 0.5rem;
  width: 8rem;

  background: #12b886;
  border-radius: 15px;
  color: white;
  border: none;
  cursor: pointer;
`;

const ImageList = styled.div`
  height: 30px;
  width: 800px;
  border-bottom: 2px solid rgb(240, 240, 240);
  display: flex;
  justify-content: center;

  div {
    margin: 0px 20px;
  }
`;

function Mypage() {
  const navigate = useNavigate();
  return (
    <Container>
      <InnerContainer>
        <UserInfo>
          <Nickname>방구석</Nickname>
          <EmailInfo>dlfwnd@gmail.com</EmailInfo>
          <ModifyInfo onClick={() => navigate("/modifymyinfo")}>
            회원정보 수정
          </ModifyInfo>
        </UserInfo>
        <ImageList>
          <div className="user-posts">게시글</div>
          <div className="like-posts">좋아요</div>
        </ImageList>
      </InnerContainer>
    </Container>
  );
}

export default Mypage;
