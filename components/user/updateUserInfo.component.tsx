'use client';

import React, { useEffect, useState } from 'react';
import useDebounce from '../../hooks/useDebounce';
import {
  comparePassword,
  verifyPassword,
  veryfiyNickname,
} from '../../utils/validationCheck';
import { fetchUserInfo } from '../../utils/updateUserInfo';

const UpdateUserInfo = () => {
  const defaultImage =
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTQVBnzyBUCefWBzjFKnRTPiLetwlAkmY6cAw&s';
  const [file, setFile] = useState<File>();
  const [loadedFile, setLoadedFile] = useState<string>('');
  const [nickname, setNickname] = useState('');
  const debouncedNickname = useDebounce(nickname, 500);
  const [nicknameState, setNicknameState] = useState({
    useSpecial: false,
    isWhite: false,
  });
  const [nicknameCheckMsg, setNicknameCheckMsg] = useState<Array<string>>([]);
  const [passwordState, setPasswordState] = useState({
    password: '',
    newPassword: '',
    passwordConfirm: '',
  });
  const debouncedNewPw = useDebounce(passwordState.newPassword, 500);
  const debouncedPwConfirm = useDebounce(passwordState.passwordConfirm, 500);
  const [pwErr, setPwErr] = useState({
    useEng: true,
    useNum: true,
    adjustLen: true,
  });
  const [pwErrMsg, setPwErrMsg] = useState<Array<string>>([]);
  const [pwCompared, setPwCompared] = useState<
    Record<string, boolean | string>
  >({ isCompared: false, comparedMsg: '' });

  useEffect(() => {
    const { useSpecial, isWhite, errors } = veryfiyNickname(debouncedNickname);
    setNicknameState({ useSpecial, isWhite });
    setNicknameCheckMsg(errors);
  }, [debouncedNickname]);

  const handleChangeForm =
    (key: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
      setPasswordState((prev) => ({ ...prev, [key]: e.target.value }));
    };

  function handleFileUpload(e: React.ChangeEvent<HTMLInputElement>) {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]); // 파일 객체 저장
    }
  }

  function handleFileLoaded() {
    const reader = new FileReader();
    if (!file) return;
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      if (typeof reader.result === 'string') {
        setLoadedFile(reader.result);
      }

      return () => {
        reader.onloadend = null; // 메모리 누수 방지
      };
    };
  }

  useEffect(() => {
    handleFileLoaded();
  }, [file]);

  useEffect(() => {
    const { useEng, useNum, adjustLen, errors } =
      verifyPassword(debouncedNewPw);
    setPwErr({ useEng, useNum, adjustLen });
    setPwErrMsg(errors);
  }, [debouncedNewPw]);

  useEffect(() => {
    const newPw = passwordState.newPassword;
    const { isCompared, comparedMsg } = comparePassword(
      newPw,
      debouncedPwConfirm
    );
    setPwCompared({ isCompared, comparedMsg });
  }, [debouncedPwConfirm]);

  return (
    <div className="userInfo">
      <div className="userInfoData">
        <img src={loadedFile ? loadedFile : defaultImage} width={200} />
        <div>
          <legend>이미지 업로드</legend>
          <input type="file" accept="image/*" onChange={handleFileUpload} />
          <button
            className="uploadBtn"
            onClick={() => fetchUserInfo('file', { file })}
          >
            수정
          </button>
        </div>
        <div className="key-value" key={'nickname'}>
          <legend>닉네임</legend>
          <input
            type="text"
            placeholder="nickname"
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
          />
          <button
            className="uploadBtn"
            onClick={() => fetchUserInfo('nickname', { nickname })}
            disabled={nicknameState.useSpecial || nicknameState.isWhite}
          >
            수정
          </button>
          <div>{nicknameCheckMsg}</div>
        </div>
        <div className="key-value" key={'password'}>
          <fieldset>
            <legend>비밀번호 변경</legend>
            <legend>현재 비밀번호</legend>
            <input
              type="password"
              placeholder="password"
              value={passwordState.password}
              onChange={handleChangeForm('password')}
            />
            <legend>변경하실 비밀번호</legend>
            <input
              type="password"
              placeholder="new password"
              value={passwordState.newPassword}
              onChange={handleChangeForm('newPassword')}
            />
            <div>
              {pwErrMsg.map((err, index) => (
                <div key={index}>{err}</div>
              ))}
            </div>
            <legend>변경하실 비밀번호 재확인</legend>
            <input
              type="password"
              placeholder="new password"
              value={passwordState.passwordConfirm}
              onChange={handleChangeForm('passwordConfirm')}
            />
            <div>{pwCompared.comparedMsg}</div>
            <button
              className="uploadBtn"
              disabled={
                !pwErr.useEng ||
                !pwErr.useNum ||
                !pwErr.adjustLen ||
                !pwCompared.isCompared
              }
              onClick={() => fetchUserInfo('password', passwordState)}
            >
              수정
            </button>
          </fieldset>
        </div>
      </div>
    </div>
  );
};

export default UpdateUserInfo;
