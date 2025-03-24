export async function signUp(
  url: string,
  form: { [key: string]: any },
  headers?: { [key: string]: string }
) {
  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: headers ?? { 'Content-type': 'application/json' },
      body: JSON.stringify(form),
    });
    const data = await response.json();

    if (!response.ok || !data.success) {
      throw new Error(data.message);
    }

    alert('회원가입 성공');
  } catch (e) {
    alert(e);
  }
}
