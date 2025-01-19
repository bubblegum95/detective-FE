import { UserInfoState } from '../types/userInfoState.interface';

export default async function getUserInfo(): Promise<
  UserInfoState | undefined
> {
  try {
    const url = process.env.BASE_URL;
    const path = process.env.MY_PAGE;
    console.log(path);

    const response = await fetch(`${url}/user`, {
      credentials: 'include',
    });

    if (!response.ok) {
      throw new Error();
    }

    const data = await response.json();
    if (!data.success) {
      throw new Error(data.message);
    }

    console.log(data);
    return data.data as UserInfoState;
  } catch (e) {
    alert(e);
    console.log(e);
  }
}
