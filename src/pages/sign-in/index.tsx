'use client';

import Link from 'next/link';
import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { signIn } from '../../utils/signIn';
import styles from '../../styles/signIn.module.css';

export default function SignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  return (
    <div className={styles.login}>
      <h1>로그인 페이지</h1>
      <form action="" acceptCharset="utf-8" className={styles.signInForm}>
        <legend>email</legend>
        <input
          type="email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
          placeholder="email"
          autoFocus
          className={styles.loginInput}
          maxLength={40}
          minLength={3}
        />
        <legend>password</legend>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="password"
          className={styles.loginInput}
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
            }
          }}
          className={styles.logInBtn}
        >
          로그인
        </button>
      </form>
      <div className={styles.btns}>
        <Link href={'/sign-up'} className={styles.btn}>
          <div className={styles.link}>회원가입</div>
        </Link>
      </div>
    </div>
  );
}
