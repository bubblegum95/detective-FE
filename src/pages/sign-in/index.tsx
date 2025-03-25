'use client';

import Link from 'next/link';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/navigation';
import getUserInfo from '../../utils/getUserInfo';
import { UserInfoState } from '../../types/userInfoState.interface';
import { setUserInfo } from '../../features/userInfoSlice';

async function signIn(email: string, password: string) {
  try {
    const url = process.env.BASE_URL;
    const path = process.env.SIGN_IN;
    const response = await fetch(`${url}/auth/signin`, {
      method: 'POST',
      headers: { 'Content-type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      throw new Error('서버 응답 에러');
    }

    const data = await response.json();
    if (!data.success) {
      throw new Error(data.message);
    }
    const token = data.token;
    localStorage.setItem('authorization', `Bearer ${token}`);
    return true;
  } catch (e) {
    console.log(e);
    alert(e);
  }
}

export default function SignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [token, setToken] = useState('');
  const dispatch = useDispatch();
  const router = useRouter();

  return (
    <div>
      <h1>로그인 페이지</h1>
      <form action="" acceptCharset="utf-8" className="signInForm">
        <legend>email</legend>
        <input
          type="email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
          placeholder="email"
          autoFocus
          className="loginInput email"
          maxLength={40}
          minLength={3}
        />
        <legend>password</legend>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="password"
          className="loginInput password"
        />
        <br />
        <button
          onClick={async (e) => {
            try {
              e.preventDefault(); // 폼 기본 동작 방지
              const result = await signIn(email, password);
              if (result) {
                const token = localStorage.getItem('authorization');
                if (!token) return;
                const userInfo = (await getUserInfo(token)) as UserInfoState;
                dispatch(setUserInfo({ ...userInfo }));
                router.push('/');
              }
            } catch (error) {
              alert(error);
              console.log(error);
            }
          }}
          className="btn"
        >
          로그인
        </button>
      </form>
      <div className="btns">
        <span>
          <button>이메일 찾기</button>
        </span>
        <span>
          <button>비밀번호 찾기</button>
        </span>
        <span>
          <Link href={'/sign-up'}>회원가입</Link>
        </span>
      </div>
    </div>
  );
}
