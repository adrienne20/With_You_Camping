/* eslint-disable jsx-a11y/interactive-supports-focus */
import styled from "styled-components";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { IoClose } from "react-icons/io5";
import Confirm from "../components/Confirm";
import KakaoLoginBtn from "../components/KakaoLoginBtn";
import GoogleLoginBtn from "../components/GoogleLoginBtn";
import NaverLoginBtn from "../components/NaverLoginBtn";

const ModalContainer = styled.div`
  position: fixed;
  display: grid;
  place-items: center;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  width: 100vw;
  height: 100vh;
  z-index: 800;
`;

const ModalBackdrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.3);
  z-index: 800;
`;

const ModalView = styled.div`
  position: relative;
  top: 20%;
  left: 40%;
  display: grid;
  place-items: center;
  background-color: white;
  width: 400px;
  height: 550px;
  border-radius: 15px;
  z-index: 800;
  span {
    color: black;
    outline: none;
    font-size: 15px;
    justify-content: center;
    margin: 10px 10px;
  }
  @media screen and (max-width: 600px) {
    position: relative;
    top: 25%;
    left: 10%;
    display: grid;
    place-items: center;
    background-color: white;
    width: 400px;
    height: 550px;
    border-radius: 15px;
    z-index: 999;
  }
`;

const InnerContainer = styled.div`
  position: relative;
  top: 50px;
  height: max-content;
`;

const InputContainer = styled.div`
  margin-bottom: 25px;
  form {
    position: relative;
    top: -25%;
    display: grid;
    place-items: center;
    input {
      position: relative;
      top: -60%;
      margin: 30px;
      padding: 15px 0px;
      font-size: 18px;
      margin-bottom: 20px;
      outline: none;
      border: none;
      border-bottom: 1px solid rgba(0, 0, 0, 0.2);
    }
    .button-container {
      display: flex;
      flex-direction: column;
      .login_button {
        margin-top: -30px;
        outline: none;
        border: none;
        border-radius: 10px;
        cursor: pointer;
        font-size: 22px;
        font-family: "Stylish", sans-serif;
        padding: 0.2rem 3rem;
        background: #12b886;
        color: white;
        margin-bottom: 5px;
      }
      /* .signup-button {
        display: flex;
        justify-content: center;
        align-items: center;
        background: #ffff;
        size: 30%
        font-size: 15px;
        font-family: "Stylish", sans-serif;
        padding: 0.2rem 1rem;
        border-radius: 10px;
        color: white;
        cursor: pointer;
        /* margin-bottom: 5px; */
      // } */
      .signup-select-area {
        margin-top: 0.4rem;
        margin-left: 1rem;
        font-size: 0.9rem;
        font-family: sans-serif;
        /* font-family: "Stylish", sans-serif; */
        span {
          cursor: pointer;
          margin-left: 1rem;
          font-weight: 500;
          /* color: $color-main-middle; */
          text-decoration: underline;

          text-underline-position: under;

        }
      }
      //버튼
      .signup-button {
        background-color: $color-main-middle;
        color: white;
        padding: 15px 30px;
        font-family: "Stylish", sans-serif;
        font-size: 15px;
        margin: 0.5rem;
        margin-top: 1.5rem;
      }
    }
  }
`;

const CloseBtn = styled.div`
  position: absolute;
  top: 30px;
  right: 30px;
  transition: 0.1s;
  cursor: pointer;
  &:hover {
    transform: translateY(-2px);
  }
`;

const Nofication = styled.h1`
  font-family: "Stylish", sans-serif;
  position: relative;
  top: -130%;
  right: 0%;
  font-size: 3rem; ;
`;

const Nofify = styled.div`
  font-family: "Stylish", sans-serif;
  position: relative;
  bottom: 500%;
  left: -12%;
  font-size: 0.8rem;
`;

const BtnContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-evenly;
  float: left;
  margin-bottom: 35px;
`;

function LoginModal({
  closeFn,
  setOpenSignupModal,
  setOpenLoginModal,
  confirmSignupModal,
  setConfirmSignupModal,
}) {
  const sessionStorage = window.sessionStorage;

  const serverPath = process.env.REACT_APP_SERVER_PATH;

  const navigate = useNavigate();
  const [loginInfo, setloginInfo] = useState({
    email: "",
    password: "",
  });
  // console.log(loginInfo);

  const [isFull, setIsFull] = useState(false);
  const [message, setMessage] = useState("");

  const handleInputValue = (key) => (e) => {
    setloginInfo({ ...loginInfo, [key]: e.target.value });
  };

  // 이메일 유효성 검사
  const validateEmail = (value) => {
    const emailRegex =
      /([\w-.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
    return emailRegex.test(value);
  };

  useEffect(() => {
    if (loginInfo.email && loginInfo.password) {
      setIsFull(true);
    } else {
      setIsFull(false);
    }
  }, [loginInfo]);

  useEffect(() => {
    if (confirmSignupModal === true) {
      setMessage("signup_success");
      setConfirmSignupModal(false);
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (isFull === false) {
        setMessage("loginInfo_blank");
      } else if (!validateEmail(loginInfo.email)) {
        setMessage("email_validate_fail");
      } else {
        const res = await axios.post(
          `${serverPath}/auth/login`,
          {
            email: loginInfo.email,
            password: loginInfo.password,
          },
          {
            "Content-Type": "application/json",
          }
        );
        if (res.status === 200) {
          // setMessage("login_success");
          setOpenSignupModal(false);
          setOpenLoginModal(false);
          setMessage("login_success");
          sessionStorage.setItem("userId", res.data.userId);
          sessionStorage.setItem("loginToken", res.data.accessToken);
          sessionStorage.setItem("nickname", res.data.nickname);
          sessionStorage.setItem("loginMethod", "common");
          // navigate('/');
          window.location.reload();
        }
      }
    } catch (err) {
      setMessage("login_failed");
    }
  };

  const resetMessage = () => {
    setMessage("");
  };

  const openSignup = () => {
    setOpenLoginModal(false);
    setOpenSignupModal(true);
  }; 

  return (
    <ModalContainer>
      <ModalBackdrop>
        {message ? (
          <Confirm message={message} handleMessage={resetMessage} />
        ) : null}
        <ModalView>
          <CloseBtn onClick={closeFn}>
            <IoClose size={"1.5rem"} />
          </CloseBtn>
          <InnerContainer>
            <InputContainer>
              <form onSubmit={handleSubmit}>
                <Nofication>WYC.</Nofication>
                <label htmlFor="user-email" />
                <input
                  id="user-email"
                  type="email"
                  placeholder="email"
                  onChange={handleInputValue("email")}
                />

                <label htmlFor="user-password" />
                <input
                  id="user-password"
                  type="password"
                  placeholder="password"
                  onChange={handleInputValue("password")}
                />
                <Nofify>이메일과 비밀번호를 확인해주세요</Nofify>
                <div className="button-container">
                  <button className="login_button" type="submit">
                    로그인
                  </button>
                  <div className="signup-select-area">
                    <label>회원이 아니신가요?</label>
                    <span onClick={openSignup}>회원가입 하러 가기</span>
                  </div>
                </div>
              </form>
            </InputContainer>
            <BtnContainer>
              <KakaoLoginBtn />
              <GoogleLoginBtn />
              <NaverLoginBtn />
            </BtnContainer>
          </InnerContainer>
        </ModalView>
      </ModalBackdrop>
    </ModalContainer>
  );
}

export default LoginModal;
