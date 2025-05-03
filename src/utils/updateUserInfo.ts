export async function fetchUserInfo(
  type: 'nickname' | 'password' | 'file',
  dto: Record<string, any>
) {
  try {
    const url = process.env.BASE_URL;
    const path = process.env.USER_UPDATE;
    const token = localStorage.getItem('authorization');
    let formData = new FormData();

    switch (type) {
      case 'file':
        formData.append('file', dto.file);
        break;

      case 'nickname':
        formData.append('nickname', dto.nickname);
        break;

      case 'password':
        formData.append('password', dto.password);
        formData.append('newPassword', dto.newPassword);
        formData.append('passwordConfirm', dto.passwordConfirm);
        break;

      default:
        break;
    }

    const response = await fetch(`${url}/user?type=${type}`, {
      method: 'PATCH',
      headers: {
        authorization: `${token}`,
      },
      body: formData,
    });
    const data = await response.json();
    if (!response.ok || !data.success) {
      throw new Error(data.message);
    }
    alert(data.message);
  } catch (e) {
    alert(e);
  }
}
