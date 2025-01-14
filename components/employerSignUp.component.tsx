'use client';

import React, { useCallback, useEffect, useState } from 'react';
import {
  comparePassword,
  passwordEngCheck,
  passwordLengthCheck,
  passwordNumSpcCheck,
  phoneNumberCheck,
} from '../hooks/useValidationCheck';
import useDebounce from '../hooks/useDebounce';
import foundEmail from '../hooks/useFoundEmail';
import SignUpProps from '../types/signUpProps.interface';
import { signUp } from '../hooks/useSignUp';

export default function EmployerSignUp({ isActive }: SignUpProps) {
  const [formState, setFormState] = useState<{ [key: string]: any }>({
    name: '',
    email: '',
    nickname: '',
    phoneNumber: '',
    password: '',
    passwordConfirm: '',
    gender: '',
    address: '',
    businessNumber: '',
    founded: '',
    company: '',
    file: '',
  });

  const [availableEmail, setAvailableEmail] = useState<boolean>(false);
  const [emailCheckMsg, setEmailCheckMsg] = useState<string>('');

  const [isCorrectPhone, setIsCorrectPhone] = useState<boolean>(false);
  const [phoneNumCheckMsg, setPhoneNumCheckMsg] = useState<string>('');

  const [existEn, setExistEn] = useState<boolean>(false);
  const [existNum, setExistNum] = useState<boolean>(false);
  const [suitableLen, setSuitableLen] = useState<boolean>(false);
  const [passwordErrors, setPasswordErrors] = useState<string[]>([]);

  const [comparedPw, setComparedPw] = useState<boolean>(false);
  const [comparedPwMsg, setComparedPwMsg] = useState<string>('');

  const handlePasswordValiCheck = useCallback((password: string): void => {
    const enCheck = passwordEngCheck(password);
    enCheck ? setExistEn(() => true) : setExistEn(() => false);

    const numCheck = passwordNumSpcCheck(password);
    numCheck ? setExistNum(() => true) : setExistNum(() => false);

    const lengthCheck = passwordLengthCheck(password);
    lengthCheck ? setSuitableLen(() => true) : setSuitableLen(() => false);
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
    setAvailableEmail(false);
    setEmailCheckMsg('이메일 검증 미완료');
  }, [formState.email]);

  useEffect(() => {
    const isCorrectPhoneNum = phoneNumberCheck(formState.phoneNumber);
    setIsCorrectPhone(() => isCorrectPhoneNum);
  }, [formState.phoneNumber]);

  useEffect(() => {
    isCorrectPhone
      ? setPhoneNumCheckMsg('')
      : setPhoneNumCheckMsg('번호만 입력해주세요.');
  }, [isCorrectPhone]);

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
    setComparedPw(() => isCompared);
    setComparedPwMsg(() => comparedMsg);
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
          onChange={(e) => {
            handleUpdateForm('email');
          }}
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
            setAvailableEmail(isExistingEmail);
            setEmailCheckMsg(foundEmailMsg);
          }}
        >
          이메일 검증
        </button>
        <div className="validationMsg">
          <div>{emailCheckMsg}</div>
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
          <div>{phoneNumCheckMsg}</div>
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
          <div>{comparedPwMsg}</div>
        </div>
        <fieldset>
          <legend>gender</legend>
          <input
            type="radio"
            name="gender"
            value={'male'}
            onChange={handleUpdateForm('gender')}
          />
          남성
          <input
            type="radio"
            name="gender"
            value={'female'}
            onChange={handleUpdateForm('gender')}
          />
          여성
        </fieldset>
        <legend>address</legend>
        <input
          type="text"
          value={formState.address}
          onChange={handleUpdateForm('gender')}
        />
        <legend>business number</legend>
        <input
          type="text"
          value={formState.businessNumber}
          onChange={handleUpdateForm('businessNumber')}
        />
        <legend>founded</legend>
        <input
          type="text"
          value={formState.founded}
          onChange={handleUpdateForm('founded')}
        />
        <legend>company</legend>
        <input
          type="text"
          value={formState.company}
          onChange={handleUpdateForm('company')}
        />
        <legend>file</legend>
        <input
          type="file"
          value={formState.file}
          onChange={handleUpdateForm('file')}
        />
        <button
          className="submitBtn"
          disabled={
            !existEn ||
            !existNum ||
            !suitableLen ||
            !comparedPw ||
            !availableEmail
          }
          onClick={async (e) => {
            e.preventDefault();
            await signUp(
              'http://127.0.0.1:3300/auth/signup/employer',
              formState,
              { 'Content-type': 'multipart/form-data' }
            );
          }}
        >
          submit
        </button>
      </form>
    </div>
  );
}
