import React, { useCallback, useState } from "react";
import { Link } from "react-router-dom";
import useInput from "@hooks/useInput";
import Modal from "@components/Modal";

const Login = () => {
  const [email, onChangeEamil] = useInput("");
  const [password, onChangePassword] = useInput("");
  const [show, setShow] = useState(false);

  const onSubmit = useCallback((e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("submit");
  }, []);

  const onShowModal = useCallback(() => {
    setShow(true);
  }, [setShow]);

  const onCloseModalHandler = useCallback(() => {
    setShow(false);
  }, [setShow]);

  return (
    <>
      <div className="center-item">
        <div className="login--container">
          <div className="center-txt title">
            <h2 className="">돌아오신 것을 환영해요!</h2>
            <h3 className="">다시 만나다니 너무 반가워요!</h3>
          </div>
          <form onSubmit={onSubmit}>
            <div>
              <label htmlFor="loginEmail">이메일 또는 전화번호</label>
              <input
                type="email"
                id="loginEmail"
                className="fullsize"
                placeholder="이메일을 입력하세요"
                value={email}
                onChange={onChangeEamil}
              />
            </div>
            <div>
              <label htmlFor="loginPassword">비밀번호</label>
              <input
                type="password"
                id="loginPassword"
                className="fullsize"
                placeholder="비밀번호를 입력하세요"
                value={password}
                onChange={onChangePassword}
              />
              <p className="guide-msg">
                <button type="button" className="link" onClick={onShowModal}>
                  비밀번호를 잊으셨나요?
                </button>
              </p>
            </div>
            <div>
              <button type="submit" className="fullsize">
                로그인
              </button>
              <p className="guide-msg">
                계정이 필요한가요? <Link to="/signup">가입하기</Link>
              </p>
            </div>
          </form>
        </div>
      </div>
      {/* 비밀번호 찾기 모달 */}
      <Modal
        title="이메일 전송 완료"
        footType="confirm"
        show={show}
        content={`비밀번호 변경 방법을 ${email}(으)로 보냈어요. 받은 편지함 또는 스팸함을 확인해주세요.`}
        onCloseModalHandler={onCloseModalHandler}
      />
    </>
  );
};

export default Login;
