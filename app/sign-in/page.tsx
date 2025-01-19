'use client';

import Link from 'next/link';
import { useState } from 'react';
import getUserInfo from '../../hooks/useGetUserInfo';
import { useDispatch } from 'react-redux';
import { setUserInfo } from '../../features/userInfoSlice';
import { useRouter } from 'next/navigation';

async function signIn(email: string, password: string, cb: () => Promise<any>) {
  try {
    const response = await fetch('http://127.0.0.1:3300/auth/signin', {
      method: 'POST',
      headers: { 'Content-type': 'application/json' },
      body: JSON.stringify({ email, password }),
      credentials: 'include',
    });

    if (!response.ok) {
      throw new Error('서버 응답 에러');
    }

    // const cookies = response.headers.getSetCookie();
    // if (!cookies.includes('authorization')) {
    //   throw new Error('토큰을 발급 받을 수 없습니다.');
    // }

    const data = await response.json();
    if (!data.success) {
      throw new Error(data.message);
    }

    alert('로그인 성공');
    return cb();
  } catch (e) {
    console.log(e);
    alert(e);
  }
}

export default function SignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
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
            e.preventDefault(); // 폼 기본 동작 방지
            const { name, nickname, phoneNumber, createdAt, detective } =
              await signIn(email, password, getUserInfo);
            dispatch(
              setUserInfo({
                name,
                email,
                nickname,
                phoneNumber,
                createdAt,
                detective,
              })
            );
            // redirection : home
            router.push('/');
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
