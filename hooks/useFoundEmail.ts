'use client';

let isExistingEmail: boolean;
let foundEmailMsg: string;

export default async function foundEmail(
  email: string
): Promise<{ isExistingEmail: boolean; foundEmailMsg: string }> {
  try {
    if (!email) {
      throw new Error('이메일을 입력해주세요.');
    }

    const response = await fetch('http://127.0.0.1:3300/auth/found-email', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify({
        email,
      }),
    });

    if (!response.ok) {
      throw new Error('이메일을 찾을 수 없습니다.');
    }

    const data = await response.json();

    if (!data.success) {
      throw new Error(`${data.message}`);
    }

    if (data.existingEmail) {
      throw new Error('해당 이메일이 이미 존재합니다.');
    }
    alert('사용가능한 이메일 입니다.');
    isExistingEmail = true;
    foundEmailMsg = '이메일 검증 완료';

    return { isExistingEmail, foundEmailMsg };
  } catch (e) {
    alert(e);
    isExistingEmail = false;
    foundEmailMsg = '이메일 검증 미완료';
    return { isExistingEmail, foundEmailMsg };
  }
}
