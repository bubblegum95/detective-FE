import { User } from '../types/userInfoState.interface';

export default async function getUserInfo() {
  try {
    const token = localStorage.getItem('authorization');
    if (!token) {
      return;
    }

    const url = process.env.BASE_URL;
    const response = await fetch(`${url}/user`, {
      headers: {
        'Content-type': 'application/json',
        authorization: `${token}`,
      },
    });
    const data = await response.json();

    if (!response.ok || !data.success) {
      throw new Error(data.message);
    }

    return data.data as User;
  } catch (e) {
    alert(e);
  }
}
