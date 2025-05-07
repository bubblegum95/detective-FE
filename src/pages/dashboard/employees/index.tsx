'use client';

import { useRouter } from 'next/router';
import { useEffect } from 'react';

export default function Employees() {
  const router = useRouter();
  const { token } = router.query;

  useEffect(() => {
    const authorization = localStorage.getItem('authorization');

    async function addEmployee() {
      if (typeof token !== 'string') {
        alert('요청 형식이 잘못되었습니다.');
        return;
      }

      if (!authorization) {
        alert('로그인을 진행해주세요.');
        router.push('/');
        return;
      }

      // token이 있을 경우, API 요청
      const BASE_URL = process.env.BASE_URL;
      const res = await fetch(`${BASE_URL}/offices/employee?token=${token}`, {
        method: 'POST',
        headers: {
          authorization: authorization,
        },
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        alert(data.message);
        alert(data.error);
        router.push('/');
        return;
      }

      alert('직원등록을 완료하였습니다.');
      router.push('/');
    }

    addEmployee();
  }, [token, router]);

  return <div></div>;
}
