'use client';

import React, { memo, useCallback, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import DaumPostcodeButton from '../../../components/util/DaumPostcodeButton.component';
import useDebounce from '../../../hooks/useDebounce';
import foundEmail from '../../../utils/foundEmail';
import {
  verifyPassword,
  checkPhoneNumber,
  comparePassword,
} from '../../../utils/validationCheck';
import { signUpForEmployer } from '../../../utils/signUpForEmployer';
import styles from '../../../styles/signUp.module.css';

const EmployerSignUp = () => {
  const MemoDaum = memo(DaumPostcodeButton);
  const router = useRouter();
  const [formState, setFormState] = useState<{ [key: string]: any }>({
    user: { name: '', email: '', nickname: '', phoneNumber: '', password: '' },
    office: {
      name: '',
      address: '',
      addressDetail: '',
      founded: '',
      businessNum: '',
    },
    file: null,
  });
  const debouncedPassword = useDebounce(formState.user.password, 500);
  const [passwordConfirm, setPasswordConfirm] = useState('');
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
    useNum: false,
    adjustLen: false,
  });

  const [passwordErrors, setPasswordErrors] = useState<string[]>([]);
  const [pwConfirmState, setPwConfirmState] = useState<{ [key: string]: any }>({
    isAvailable: false,
    message: '',
  });

  const updateForm = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, dataset } = e.target;
    const category = dataset.category as string;

    setFormState((prev) => ({
      ...prev,
      [category]: { ...prev[category], [name]: value },
    }));
  }, []);

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

  return (
    <div className={styles.signUp}>
      <h1>사장님 회원가입</h1>
      <form
        action=""
        className={styles.signUpForm}
        encType="multipart/form-data"
      >
        <legend>name</legend>
        <input
          type="text"
          className="nameInput"
          value={formState.user.name}
          name="name"
          data-category="user"
          onChange={updateForm}
          minLength={2}
          maxLength={11}
          placeholder="name"
        />
        <legend>email</legend>
        <input
          type="email"
          className="emailInput"
          value={formState.user.email}
          name="email"
          data-category="user"
          onChange={updateForm}
          minLength={3}
          maxLength={40}
          placeholder="email"
        />
        <button
          onClick={async (e) => {
            e.preventDefault();
            const { isExistingEmail, foundEmailMsg } = await foundEmail(
              formState.user.email
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
          value={formState.user.nickname}
          name="nickname"
          data-category="user"
          onChange={updateForm}
          minLength={2}
          maxLength={8}
          placeholder="nickname"
        />
        <legend>phone</legend>
        <input
          type="text"
          className="phoneInput"
          value={formState.user.phoneNumber}
          name="phoneNumber"
          data-category="user"
          onChange={updateForm}
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
          value={formState.user.password}
          name="password"
          data-category="user"
          onChange={updateForm}
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
          value={passwordConfirm}
          onChange={(e) => setPasswordConfirm(e.target.value)}
          placeholder="password"
        />
        <div className={styles.validationMsg}>
          <div>{pwConfirmState.message}</div>
        </div>
        <legend>company</legend>
        <input
          type="text"
          placeholder="상호명"
          onChange={updateForm}
          value={formState.office.name}
          name="name"
          data-category="office"
        />
        <legend>address</legend>
        <input
          type="text"
          placeholder="사업장 주소"
          onChange={updateForm}
          value={formState.office.address}
          name="address"
          data-category="office"
        />
        <MemoDaum
          onComplete={(value: string) =>
            setFormState((prev) => ({
              ...prev,
              office: { ...prev.office, address: value },
            }))
          }
        />
        <legend>address detail</legend>
        <input
          type="text"
          placeholder="사업장 상세 주소"
          onChange={updateForm}
          value={formState.office.addressDetail}
          name="addressDetail"
          data-category="office"
        />
        <legend>founded</legend>
        <input
          type="text"
          placeholder="YYYYMMDD"
          onChange={updateForm}
          value={formState.office.founded}
          name="founded"
          data-category="office"
        />
        <legend>business number</legend>
        <input
          type="text"
          placeholder="0000000000"
          onChange={updateForm}
          value={formState.office.businessNum}
          name="businessNum"
          data-category="office"
        />
        <legend>file</legend>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => {
            setFormState((prev) => ({
              ...prev,
              file: e.target.files && e.target.files[0],
            }));
          }}
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
            const result = await signUpForEmployer(formState);
            if (!result) return;

            router.push('/sign-in');
          }}
        >
          submit
        </button>
      </form>
    </div>
  );
};

export default EmployerSignUp;
