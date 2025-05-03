export async function signIn(email: string, password: string) {
  try {
    const url = process.env.BASE_URL;
    const path = process.env.SIGN_IN;
    const response = await fetch(`${url}/auth/signin`, {
      method: 'POST',
      headers: { 'Content-type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      throw new Error('서버 응답 에러');
    }

    const data = await response.json();
    if (!data.success) {
      throw new Error(data.message);
    }
    const token = data.token;
    localStorage.setItem('authorization', `Bearer ${token}`);
    return true;
  } catch (e) {
    alert(e);
  }
}
