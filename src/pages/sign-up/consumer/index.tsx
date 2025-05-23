'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import useDebounce from '../../../hooks/useDebounce';
import foundEmail from '../../../utils/foundEmail';
import {
  checkPhoneNumber,
  verifyPassword,
  comparePassword,
} from '../../../utils/validationCheck';
import { signUp } from '../../../utils/signUp';
import styles from '../../../styles/signUp.module.css';

const ConsumerSignUp = () => {
  const router = useRouter();
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    nickname: '',
    phoneNumber: '',
    password: '',
    passwordConfirm: '',
  });
  const debouncedPassword = useDebounce(formState.password, 500);

  const [emailState, setEmailState] = useState({
    isAvailable: false,
    message: '',
  });

  const [phoneState, setPhoneState] = useState({
    isAvailable: false,
    message: '',
  });

  const [passwordState, setPasswordState] = useState<Record<string, boolean>>({
    useEng: false,
    useNum: false,
    adjustLen: false,
  });

  const [passwordErrors, setPasswordErrors] = useState<Array<string>>([]);
  const [pwConfirmState, setPwConfirmState] = useState<
    Record<string, boolean | string>
  >({
    isAvailable: false,
    message: '',
  });

  function updateForm(key: string, value: any): void {
    setFormState((pre) => ({ ...pre, [key]: value }));
  }

  const handleUpdateForm =
    (input: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
      updateForm(input, e.target.value);
    };

  useEffect(() => {
    setEmailState({ isAvailable: false, message: '이메일 검증 미완료' });
  }, [formState.email]);

  useEffect(() => {
    const isCorrectPhoneNum = checkPhoneNumber(formState.phoneNumber);
    setPhoneState((pre) => ({ ...pre, isAvailable: isCorrectPhoneNum }));
  }, [formState.phoneNumber]);

  useEffect(() => {
    phoneState.isAvailable
      ? setPhoneState((pre) => ({ ...pre, message: '' }))
      : setPhoneState((pre) => ({ ...pre, message: '번호만 입력해주세요' }));
  }, [phoneState.isAvailable]);

  useEffect(() => {
    const { useEng, useNum, adjustLen, errors } =
      verifyPassword(debouncedPassword);
    setPasswordState({ useEng, useNum, adjustLen });
    setPasswordErrors(errors);
  }, [debouncedPassword]);

  useEffect(() => {
    const { isCompared, comparedMsg } = comparePassword(
      formState.password,
      formState.passwordConfirm
    );
    setPwConfirmState({ isAvailable: isCompared, message: comparedMsg });
  }, [formState.passwordConfirm, formState.password]);

  return (
    <div className={styles.signUp}>
      <h1>의뢰인 회원가입</h1>
      <form action="" className={styles.signUpForm}>
        <legend>name</legend>
        <input
          type="text"
          className="nameInput"
          value={formState.name}
          onChange={handleUpdateForm('name')}
          minLength={2}
          maxLength={11}
          placeholder="name"
        />
        <legend>email</legend>
        <input
          type="email"
          className="emailInput"
          value={formState.email}
          onChange={handleUpdateForm('email')}
          minLength={3}
          maxLength={40}
          placeholder="email"
        />
        <button
          onClick={async (e) => {
            e.preventDefault();
            const { isExistingEmail, foundEmailMsg } = await foundEmail(
              formState.email
            );
            setEmailState({
              isAvailable: isExistingEmail,
              message: foundEmailMsg,
            });
          }}
        >
          이메일 검증
        </button>
        <div className={styles.validationMsg}>
          <div>{emailState.message}</div>
        </div>
        <legend>nickname</legend>
        <input
          type="text"
          className="nicknameInput"
          value={formState.nickname}
          onChange={handleUpdateForm('nickname')}
          minLength={2}
          maxLength={8}
          placeholder="nickname"
        />
        <legend>phone</legend>
        <input
          type="text"
          className="phoneInput"
          value={formState.phoneNumber}
          onChange={handleUpdateForm('phoneNumber')}
          minLength={11}
          maxLength={11}
          placeholder="phone number"
        />
        <div className={styles.validationMsg}>
          <div>{phoneState.message}</div>
        </div>
        <legend>password</legend>
        <input
          type="password"
          className="passwordInput"
          value={formState.password}
          onChange={handleUpdateForm('password')}
          placeholder="password"
        />
        <div className={styles.validationMsg}>
          {passwordErrors.map((e, index) => (
            <div key={index}>{e}</div>
          ))}
        </div>
        <legend>confirm password</legend>
        <input
          type="password"
          className="passwordConfirmInput"
          value={formState.passwordConfirm}
          onChange={handleUpdateForm('passwordConfirm')}
          placeholder="password"
        />
        <div className={styles.validationMsg}>
          <div>{pwConfirmState.message}</div>
        </div>
        <button
          className="submitBtn"
          disabled={
            !emailState.isAvailable ||
            !phoneState.isAvailable ||
            !passwordState.useEng ||
            !passwordState.useNum ||
            !passwordState.adjustLen ||
            !pwConfirmState.isAvailable
          }
          onClick={async (e) => {
            e.preventDefault();
            await signUp('auth/signup/consumer', formState);
            // redirection
            router.push('/sign-in');
          }}
        >
          submit
        </button>
      </form>
    </div>
  );
};

export default ConsumerSignUp;
