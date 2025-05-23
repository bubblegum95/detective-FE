'use client';

import React, { useCallback, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import OfficeSearch from '../../../components/util/officeSearch.component';
import useDebounce from '../../../hooks/useDebounce';
import foundEmail from '../../../utils/foundEmail';
import { searchOffice } from '../../../utils/searchOffice';
import {
  verifyPassword,
  checkPhoneNumber,
  comparePassword,
} from '../../../utils/validationCheck';
import { signUp } from '../../../utils/signUp';
import styles from '../../../styles/signUp.module.css';

const EmployeeSignUp = () => {
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
  }, [passwordConfirm, formState.user.password]);

  useEffect(() => {
    const fetchOffices = async () => {
      const offices = await searchOffice(debouncedOfficeInput, 1, 10);
      setOfficeLists(() => offices);
    };
    if (debouncedOfficeInput) {
      fetchOffices();
    }
  }, [debouncedOfficeInput]);

  return (
    <div className={styles.signUp}>
      <h1>탐정 직원 회원가입</h1>
      <form action="" className={styles.signUpForm}>
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
        <div className={styles.validationMsg}>
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
        <div className={styles.validationMsg}>
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
        <div className={styles.validationMsg}>
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
        <div className={styles.validationMsg}>
          <div>{pwConfirmState.message}</div>
        </div>
        <legend>직장</legend>
        <OfficeSearch
          onSelect={(office) => {
            setFormState((prev) => ({ ...prev, officeId: office.id }));
          }}
        />
        <button
          className={styles.submitBtn}
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
            await signUp('auth/signup/employee', formState);
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
