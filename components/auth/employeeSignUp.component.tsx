'use client';

import React, { useCallback, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import useDebounce from '../../hooks/useDebounce';
import SignUpProps from '../../types/signUpProps.interface';
import foundEmail from '../../utils/foundEmail';
import { signUp } from '../../utils/signUp';
import {
  checkPhoneNumber,
  comparePassword,
  verifyPassword,
} from '../../utils/validationCheck';
import { searchOffice } from '../../utils/searchOffice';
import OfficeSearch, { Office } from '../util/officeSearch.component';

const EmployeeSignUp = ({ isActive }: SignUpProps) => {
  const router = useRouter();
  const [formState, setFormState] = useState<Record<string, any>>({
    user: {
      name: '',
      email: '',
      nickname: '',
      phoneNumber: '',
      password: '',
      passwordConfirm: '',
      gender: '',
    },
    officeId: 0,
  });
  const [passwordConfirm, setPasswordConfirm] = useState<string>('');
  const debouncedPassword = useDebounce(formState.user.password, 500);
  const [emailState, setEmailState] = useState<{ [key: string]: any }>({
    isAvailable: false,
    message: '',
  });

  const [phoneState, setPhoneState] = useState<{ [key: string]: any }>({
    isAvailable: false,
    message: '',
  });

  const [passwordState, setPasswordState] = useState<Record<string, boolean>>({
    useEng: false,
    useNum: false,
    adjustLen: false,
  });

  const [passwordErrors, setPasswordErrors] = useState<string[]>([]);
  const [pwConfirmState, setPwConfirmState] = useState<{ [key: string]: any }>({
    isAvailable: false,
    message: '',
  });

  const [officeInput, setOfficeInput] = useState<string>('');
  const debouncedOfficeInput = useDebounce<string>(officeInput, 500);
  const [officeLists, setOfficeLists] = useState<
    Array<{
      id: number;
      name: string;
      address: string;
      addressDetail: string;
    }>
  >([]);
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);

  const updateForm = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormState((prev) => ({
      ...prev,
      user: { ...prev.user, [name]: value },
    }));
  }, []);

  const handleFindEmail = useCallback(
    async (e: React.MouseEvent<HTMLButtonElement>) => {
      e.preventDefault();
      const { isExistingEmail, foundEmailMsg } = await foundEmail(
        formState.user.email
      );
      setEmailState({
        isAvailable: isExistingEmail,
        message: foundEmailMsg,
      });
    },
    [formState.user.email]
  );

  useEffect(() => {
    const { useEng, useNum, adjustLen, errors } =
      verifyPassword(debouncedPassword);
    setPasswordState({ useEng, useNum, adjustLen });
    setPasswordErrors(errors);
  }, [debouncedPassword]);

  useEffect(() => {
    setEmailState({ isAvailable: false, message: '이메일 검증 미완료' });
  }, [formState.user.email]);

  useEffect(() => {
    const isCorrectPhoneNum = checkPhoneNumber(formState.user.phoneNumber);
    setPhoneState((pre) => ({ ...pre, isAvailable: isCorrectPhoneNum }));
  }, [formState.user.phoneNumber]);

  useEffect(() => {
    phoneState.isAvailable
      ? setPhoneState((pre) => ({ ...pre, message: '' }))
      : setPhoneState((pre) => ({ ...pre, message: '번호만 입력해주세요' }));
  }, [phoneState.isAvailable]);

  useEffect(() => {
    const { isCompared, comparedMsg } = comparePassword(
      formState.user.password,
      passwordConfirm
    );
    setPwConfirmState({ isAvailable: isCompared, message: comparedMsg });
  }, [passwordConfirm]);

  useEffect(() => {
    const fetchOffices = async () => {
      const offices = await searchOffice(debouncedOfficeInput, 1, 10);
      setOfficeLists(() => offices);
    };
    if (debouncedOfficeInput) {
      fetchOffices();
    }
  }, [debouncedOfficeInput]);

  // 항목 클릭 시 선택
  const handleSelectOffice = (office: Office) => {
    setFormState((prev) => ({ ...prev, officeId: office.id }));
  };

  return (
    <div
      className="employeeSignUp"
      style={{ display: isActive ? 'block' : 'none' }}
    >
      <h1>탐정 직원 회원가입</h1>
      <form action="" className="signUpForm">
        <legend>name</legend>
        <input
          type="text"
          className="nameInput"
          name="name"
          value={formState.user.name}
          onChange={(e) => updateForm(e)}
          minLength={2}
          maxLength={11}
          placeholder="name"
        />
        <legend>email</legend>
        <input
          type="email"
          className="emailInput"
          name="email"
          value={formState.user.email}
          onChange={(e) => updateForm(e)}
          minLength={3}
          maxLength={40}
          placeholder="email"
        />
        <button onClick={handleFindEmail}>이메일 검증</button>
        <div className="validationMsg">
          <div>{emailState.message}</div>
        </div>
        <legend>nickname</legend>
        <input
          type="text"
          className="nicknameInput"
          name="nickname"
          value={formState.user.nickname}
          onChange={(e) => updateForm(e)}
          minLength={2}
          maxLength={8}
          placeholder="nickname"
        />
        <legend>phone</legend>
        <input
          type="text"
          className="phoneInput"
          name="phoneNumber"
          value={formState.user.phoneNumber}
          onChange={(e) => updateForm(e)}
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
          name="password"
          value={formState.user.password}
          onChange={(e) => updateForm(e)}
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
          name="passwordConfirm"
          value={passwordConfirm}
          onChange={(e) => {
            setPasswordConfirm(() => e.target.value);
          }}
          placeholder="password"
        />
        <div className="validationMsg">
          <div>{pwConfirmState.message}</div>
        </div>
        <legend>직장</legend>
        <OfficeSearch onSelect={handleSelectOffice} />
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
              'http://127.0.0.1:3300/auth/signup/employee',
              formState
            );
            router.push('/sign-in');
          }}
        >
          submit
        </button>
      </form>
    </div>
  );
};

export default EmployeeSignUp;
