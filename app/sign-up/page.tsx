'use client';

import { useCallback, useEffect, useState } from 'react';
import {
  comparePassword,
  passwordEngCheck,
  passwordLengthCheck,
  passwordNumSpcCheck,
  phoneNumberCheck,
} from '../../hooks/useValidationCheck';
import useDebounce from '../../hooks/useDebounce';

export default function SignUp() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [nickname, setNickname] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');

  const [existEn, setExistEn] = useState(false);
  const [existNum, setExistNum] = useState(false);
  const [suitableLen, setSuitableLen] = useState(false);
  const [existEnMsg, setExistEnMsg] = useState('');
  const [existNumMsg, setExistNumMsg] = useState('');
  const [suitableLenMsg, setSuitableLenMsg] = useState('');

  const [availableEmail, setAvailableEmail] = useState(false);
  const [emailCheckMsg, setEmailCheckMsg] = useState('');

  const [isCorrect, setIsCorrect] = useState(false);
  const [comparedPwMsg, setComparedPwMsg] = useState('');

  const [isCorrectPhone, setIsCorrectPhone] = useState(false);
  const [phoneNumCheckMsg, setPhoneNumCheckMsg] = useState('');

  const handlePasswordValiCheck = useCallback((password: string): void => {
    const enCheck = passwordEngCheck(password);
    if (enCheck) {
      setExistEn(() => true);
      setExistEnMsg('');
    } else {
      setExistEn(() => false);
      setExistEnMsg(() => '영어 소문자/대문자');
    }

    const numCheck = passwordNumSpcCheck(password);
    if (numCheck) {
      setExistNum(() => true);
      setExistNumMsg(() => '');
    } else {
      setExistNum(() => false);
      setExistNumMsg(() => '숫자/특수문자');
    }

    const lengthCheck = passwordLengthCheck(password);
    if (lengthCheck) {
      setSuitableLen(() => true);
      setSuitableLenMsg(() => '');
    } else {
      setSuitableLen(() => false);
      setSuitableLenMsg(() => '8 ~ 16자');
    }
  }, []);

  useEffect(() => {
    setAvailableEmail(false);
    setEmailCheckMsg('이메일 검증 미완료');
  }, [email]);

  useEffect(() => {
    const isCorrectPhoneNum = phoneNumberCheck(phoneNumber);
    setIsCorrectPhone(() => isCorrectPhoneNum);
  }, [phoneNumber]);

  useEffect(() => {
    isCorrectPhone
      ? setPhoneNumCheckMsg('')
      : setPhoneNumCheckMsg('번호만 입력해주세요.');
  }, [isCorrectPhone]);

  useEffect(() => {
    const cleanUp = useDebounce(password, 500, handlePasswordValiCheck);
    return cleanUp;
  }, [password]);

  useEffect(() => {
    const { isCompared, comparedMsg } = comparePassword(
      password,
      passwordConfirm
    );
    setIsCorrect(() => isCompared);
    setComparedPwMsg(() => comparedMsg);
  }, [passwordConfirm]);

  const foundEmail = () => {
    fetch('http://127.0.0.1:3300/auth/found-email', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify({
        email,
      }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('이메일을 찾을 수 없습니다.');
        }
        return response.json();
      })
      .then((data) => {
        console.log(data);

        if (!data.success) {
          throw new Error(`${data.message}`);
        }

        if (data.existingEmail) {
          throw new Error(`${data.message}`);
        } else {
          alert('사용가능한 이메일 입니다.');
          setAvailableEmail(true);
          setEmailCheckMsg('이메일 검증 완료');
        }
      })
      .catch((e) => {
        console.log(e);
        alert(e);
        setAvailableEmail(false);
        setEmailCheckMsg('이메일 검증 미완료');
      });
  };

  const consumerSignUp = () => {
    fetch('http://127.0.0.1:3300/auth/signup/consumer', {
      method: 'POST',
      headers: { 'Content-type': 'application/json' },
      body: JSON.stringify({
        name,
        email,
        nickname,
        phoneNumber,
        password,
        passwordConfirm,
      }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('회원가입 실패');
        }
        return response.json();
      })
      .then((data) => {
        console.log(data);
        alert(`회원가입 성공: ${data.message}`);
      })
      .catch((e) => {
        console.log(e);
        alert(`${e.message}`);
      });
  };

  return (
    <div>
      <h1>회원가입</h1>
      <form action="" className="signUpForm">
        <legend>name</legend>
        <input
          type="text"
          className="nameInput"
          value={name}
          onChange={(e) => setName(e.target.value)}
          minLength={2}
          maxLength={11}
        />
        <legend>email</legend>
        <input
          type="email"
          className="emailInput"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
          minLength={3}
          maxLength={40}
        />
        <button
          onClick={(e) => {
            e.preventDefault();
            foundEmail();
          }}
        >
          이메일 검증
        </button>
        <div>{emailCheckMsg}</div>
        <legend>nickname</legend>
        <input
          type="text"
          className="nicknameInput"
          value={nickname}
          onChange={(e) => setNickname(e.target.value)}
          minLength={2}
          maxLength={8}
        />
        <legend>phone</legend>
        <input
          type="text"
          className="phoneInput"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
          minLength={11}
          maxLength={11}
          pattern="[0-9]+"
        />
        <div>{phoneNumCheckMsg}</div>
        <legend>password</legend>
        <input
          type="password"
          className="passwordInput"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <div className="validationMsg">
          {existEnMsg && <div>{existEnMsg}</div>}
          {existNumMsg && <div>{existNumMsg}</div>}
          {suitableLenMsg && <div>{suitableLenMsg}</div>}
        </div>
        <legend>confirm password</legend>
        <input
          type="password"
          className="passwordConfirmInput"
          value={passwordConfirm}
          onChange={(e) => {
            setPasswordConfirm(() => e.target.value);
          }}
        />
        <div className="comparedPw">
          {comparedPwMsg && <div>{comparedPwMsg}</div>}
        </div>
        <button
          className="submitBtn"
          onClick={(e) => {
            e.preventDefault();
            if (
              existEn &&
              existNum &&
              suitableLen &&
              isCorrect &&
              availableEmail
            ) {
              consumerSignUp();
            }
          }}
        >
          submit
        </button>
      </form>
    </div>
  );
}
