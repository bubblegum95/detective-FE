export async function signUp(
  path: string,
  form: { [key: string]: any },
  contentType?: string
) {
  try {
    const BASE_URL = process.env.BASE_URL;
    const response = await fetch(`${BASE_URL}/${path}`, {
      method: 'POST',
      headers: { 'Content-type': contentType ?? 'application/json' },
      body: JSON.stringify(form),
    });
    const data = await response.json();

    if (!response.ok || !data.success) {
      throw new Error(data.error);
    }

    alert('회원가입 성공');

    return true;
  } catch (e) {
    return false;
  }
}
