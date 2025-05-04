export async function signUpForEmployer(form: { [key: string]: any }) {
  try {
    console.log('form', form);
    const newForm = new FormData();
    newForm.append('user', JSON.stringify(form.user));
    newForm.append('office', JSON.stringify(form.office));
    newForm.append('file', form.file);

    const BASE_URL = process.env.BASE_URL;
    const response = await fetch(`${BASE_URL}/auth/signup/employer`, {
      method: 'POST',
      body: newForm,
    });
    const data = await response.json();

    if (!response.ok || !data.success) {
      throw new Error(data.error);
    }

    alert('회원가입 성공');

    return true;
  } catch (e) {
    console.log(e);
    alert(e);
    return false;
  }
}
