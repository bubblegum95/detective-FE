'use client';

import Link from 'next/link';
import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { signIn } from '../../utils/signIn';

export default function SignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
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
