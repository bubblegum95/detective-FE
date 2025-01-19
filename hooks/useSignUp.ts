import { useRouter } from 'next/router';

export async function signUp(
  url: string,
  form: { [key: string]: any },
  headers?: { [key: string]: string }
) {
  try {
    const router = useRouter();
    const response = await fetch(url, {
      method: 'POST',
      headers: headers ?? { 'Content-type': 'application/json' },
      body: JSON.stringify({
        ...form,
      }),
    });

    if (!response.ok) {
      throw new Error('회원가입 할 수 없습니다.');
    }

    const data = await response.json();

    if (!data.success) {
      throw new Error(data.message);
    }

    alert('회원가입 성공');
    router.push('/');
  } catch (e) {
    alert(e);
  }
}
