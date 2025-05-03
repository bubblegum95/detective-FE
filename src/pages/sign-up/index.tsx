'use client';

import React, { memo } from 'react';
import Link from 'next/link';
import styles from '../../styles/signUp.module.css';

const SignUp = () => {
  return (
    <div className={styles.signUpLinks}>
      <Link href={'sign-up/consumer'} className={styles.signUpLink}>
        <div>의뢰인 회원가입</div>
      </Link>
      <Link href={'/sign-up/employee'} className={styles.signUpLink}>
        <div>탐정 직원 회원가입</div>
      </Link>
      <Link href={'/sign-up/employer'} className={styles.signUpLink}>
        <div>탐정 사무소 회원가입</div>
      </Link>
    </div>
  );
};

export default memo(SignUp);
