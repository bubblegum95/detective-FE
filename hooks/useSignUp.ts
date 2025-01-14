export async function signUp(
  url: string,
  form: { [key: string]: any },
  headers?: { [key: string]: string }
) {
  try {
    const response = await fetch(url, {
      method: 'POST',
      headers,
      body: JSON.stringify({
        ...form,
      }),
    });

    if (!response.ok) {
      throw new Error('서버 응답 없음');
    }

    const data = await response.json();

    if (!data.success) {
      throw new Error(data.message);
    }

    alert('회원가입 성공');
  } catch (e) {
    alert(`회원가입 실패: ${e}`);
  }
}
