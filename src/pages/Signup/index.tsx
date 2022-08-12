import React, { useCallback, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import useInput from "@hooks/useInput";
import AlertModal from "@components/AlertModal";
import InputForm from "@components/InputForm";

const Signup = () => {
  const [email, onChangeEamil] = useInput("");
  const [password, onChangePassword] = useInput("");
  const [nickname, onChangeNickname] = useInput("");
  const [showAlertModal, setshowAlertModal] = useState(false);
  const [alertMsg, setAlertMsg] = useState("");

  const onShowModal = useCallback(() => {
    setshowAlertModal(true);
  }, [setshowAlertModal]);

  const onCloseModalHandler = useCallback(() => {
    setshowAlertModal(false);
  }, [setshowAlertModal]);

  const onSubmit = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      if (email.length === 0) {
        setAlertMsg("이메일");
        onShowModal();
        return;
      } else if (nickname.length === 0) {
        setAlertMsg("닉네임");
        onShowModal();
        return;
      } else if (password.length === 0) {
        setAlertMsg("비밀번호");
        onShowModal();
        return;
      }
    },
    [email, password, nickname, setAlertMsg, onShowModal]
  );

  if (true) {
    return <Navigate to="/channel" />;
  }

  return (
    <>
      <div className="center-item">
        <div className="signup--container">
          <div className="center-txt title">
            <h2 className="">계정 만들기</h2>
          </div>
          <form onSubmit={onSubmit}>
            <InputForm
              id="signupEmail"
              inputType="email"
              labelName="이메일"
              value={email}
              placeholder="이메일을 입력하세요."
              className="fullsize"
              onChangeHandler={onChangeEamil}
            />
            <InputForm
              id="signupNickname"
              inputType="text"
              labelName="닉네임"
              value={nickname}
              placeholder="닉네임을 입력하세요."
              className="fullsize"
              onChangeHandler={onChangeNickname}
            />
            <InputForm
              id="signupPassword"
              inputType="password"
              labelName="비밀번호"
              value={password}
              placeholder="비밀번호를 입력하세요."
              className="fullsize"
              onChangeHandler={onChangePassword}
            />
            <div className="mg-t20">
              <button type="submit" className="fullsize">
                계속하기
              </button>
              <p className="guide-msg">
                <Link to="/login"> 이미 계정이 있으신가요? </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
      {/* 입력 확인 모달 */}
      <AlertModal
        title="알림"
        footType="confirm"
        show={showAlertModal}
        content={`${alertMsg} (을)를 입력해주세요.`}
        onCloseModalHandler={onCloseModalHandler}
      />
    </>
  );
};

export default Signup;
