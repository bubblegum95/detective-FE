'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function SignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const signIn = () => {
    console.log('로그인을 시도합니다.');
    fetch('http://127.0.0.1:3300/auth/signin', {
      method: 'POST',
      headers: { 'Content-type': 'application/json' },
      body: JSON.stringify({ email, password }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('서버의 응답이 없습니다.');
        }
        return response.json();
      })
      .then((data) => {
        console.log('fetch resolve: ', data);
        if (data.success) {
          alert(`로그인 성공`);
        } else {
          alert(`로그인 실패: ${data.message}`);
        }
      })
      .catch((e) => console.log('error: ', e));
  };

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
          onClick={(e) => {
            e.preventDefault(); // 폼 기본 동작 방지
            signIn();
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
