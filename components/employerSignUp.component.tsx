'use client';

import React, { useCallback, useEffect, useState } from 'react';
import {
  comparePassword,
  numberVelidationCheck,
  passwordEngCheck,
  passwordLengthCheck,
  passwordNumSpcCheck,
} from '../hooks/useValidationCheck';
import useDebounce from '../hooks/useDebounce';
import foundEmail from '../hooks/useFoundEmail';
import SignUpProps from '../types/signUpProps.interface';
import { signUp } from '../hooks/useSignUp';

export default function ConsumerSignUp({ isActive }: SignUpProps) {
  const [formState, setFormState] = useState<{ [key: string]: any }>({
    name: '',
    email: '',
    nickname: '',
    phoneNumber: '',
    password: '',
    passwordConfirm: '',
    gender: '',
    company: '',
    address: '',
    founded: '',
    businessNumber: '',
    file: '',
  });

  const [emailState, setEmailState] = useState<{ [key: string]: any }>({
    isAvailable: false,
    message: '',
  });

  const [phoneState, setPhoneState] = useState<{ [key: string]: any }>({
    isAvailable: false,
    message: '',
  });

  const [passwordState, setPasswordState] = useState<{ [key: string]: any }>({
    useEng: false,
    useEngMsg: '',
    useNum: false,
    useNumMsg: '',
    adjustLen: false,
    adjustLenMsg: '',
  });

  const [passwordErrors, setPasswordErrors] = useState<string[]>([]);
  const [pwConfirmState, setPwConfirmState] = useState<{ [key: string]: any }>({
    isAvailable: false,
    message: '',
  });

  const handlePasswordValiCheck = useCallback((password: string): void => {
    const enCheck = passwordEngCheck(password);
    enCheck
      ? setPasswordState((pre) => ({ ...pre, useEng: true }))
      : setPasswordState((pre) => ({ ...pre, useEng: false }));

    const numCheck = passwordNumSpcCheck(password);
    numCheck
      ? setPasswordState((pre) => ({ ...pre, useNum: true }))
      : setPasswordState((pre) => ({ ...pre, useNum: false }));

    const lengthCheck = passwordLengthCheck(password);
    lengthCheck
      ? setPasswordState((pre) => ({ ...pre, adjustLen: true }))
      : setPasswordState((pre) => ({ ...pre, adjustLen: false }));
  }, []);

  function updateForm(key: string, value: any): void {
    setFormState((pre) => ({ ...pre, [key]: value }));
  }

  const handleUpdateForm =
    (input: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
      updateForm(input, e.target.value);
    };

  function validatePassword(password: string) {
    const errors = [];
    if (!passwordEngCheck(password)) errors.push('영어 소문자 / 대문자');
    if (!passwordNumSpcCheck(password)) errors.push('숫자 / 특수문자');
    if (!passwordLengthCheck(password)) errors.push('8 ~ 16자');
    return errors;
  }

  useEffect(() => {
    const errors = validatePassword(formState.password);
    setPasswordErrors(errors);
  }, [formState.password]);

  useEffect(() => {
    setEmailState({ isAvailable: false, message: '이메일 검증 미완료' });
  }, [formState.email]);

  useEffect(() => {
    const isCorrectPhoneNum = numberVelidationCheck(formState.phoneNumber);
    setPhoneState((pre) => ({ ...pre, isAvailable: isCorrectPhoneNum }));
  }, [formState.phoneNumber]);

  useEffect(() => {
    phoneState.isAvailable
      ? setPhoneState((pre) => ({ ...pre, message: '' }))
      : setPhoneState((pre) => ({ ...pre, message: '번호만 입력해주세요' }));
  }, [phoneState.isAvailable]);

  useEffect(() => {
    const cleanUp = useDebounce(
      formState.password,
      500,
      handlePasswordValiCheck
    );
    return cleanUp;
  }, [formState.password]);

  useEffect(() => {
    const { isCompared, comparedMsg } = comparePassword(
      formState.password,
      formState.passwordConfirm
    );
    setPwConfirmState({ isAvailable: isCompared, message: comparedMsg });
  }, [formState.passwordConfirm]);

  return (
    <div
      className="employeeSignUp"
      style={{ display: isActive ? 'block' : 'none' }}
    >
      <h1>사장님 회원가입</h1>
      <form action="" className="signUpForm">
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
        <div className="validationMsg">
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
        <div className="validationMsg">
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
        <div className="validationMsg">
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
        <div className="validationMsg">
          <div>{pwConfirmState.message}</div>
        </div>
        <fieldset>
          <legend>gender</legend>
          <input
            type="radio"
            value={formState.gender}
            name="male"
            onChange={handleUpdateForm('gender')}
          />
          남성
          <input
            type="radio"
            value={formState.gender}
            name="female"
            onChange={handleUpdateForm('gender')}
          />
          여성
        </fieldset>
        <legend>company</legend>
        <input
          type="text"
          placeholder="상호명"
          onChange={handleUpdateForm('company')}
          value={formState.company}
        />
        <legend>address</legend>
        <input
          type="text"
          placeholder="사업장 주소"
          onChange={handleUpdateForm('address')}
          value={formState.address}
        />
        <legend>founded</legend>
        <input
          type="text"
          placeholder="YYYYMMDD"
          onChange={handleUpdateForm('address')}
          value={formState.founded}
        />
        <legend>business number</legend>
        <input
          type="text"
          placeholder="0000000000"
          onChange={handleUpdateForm('address')}
          value={formState.businessNumber}
        />
        <legend>file</legend>
        <input
          type="file"
          accept="image/*"
          value={formState.file}
          onChange={handleUpdateForm('file')}
        />
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
            await signUp(
              'http://127.0.0.1:3300/auth/signup/employer',
              formState,
              { 'Content-type': 'mulipart/form-data' }
            );
          }}
        >
          submit
        </button>
      </form>
    </div>
  );
}
