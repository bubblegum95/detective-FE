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
    const BASE_URL = process.env.BASE_URL;
    const response = await fetch(`${BASE_URL}/auth/found-email`, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify({
        email,
      }),
    });
    const data = await response.json();

    if (!response.ok || !data.success) {
      throw new Error(data);
    }

    if (data.existingEmail) {
      throw new Error('해당 이메일이 이미 존재합니다.');
    }

    alert('사용가능한 이메일 입니다.');
    isExistingEmail = true;
    foundEmailMsg = '✅ 이메일 검증 완료';

    return { isExistingEmail, foundEmailMsg };
  } catch (e) {
    console.log(e);
    isExistingEmail = false;
    foundEmailMsg = '❌ 이메일 검증 미완료';
    return { isExistingEmail, foundEmailMsg };
  }
}
