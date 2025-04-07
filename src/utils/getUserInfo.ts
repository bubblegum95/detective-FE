export default async function getUserInfo(token: string) {
  try {
    if (!token) {
      throw new Error('token이 없습니다.');
    }
    const url = process.env.BASE_URL;
    const path = process.env.MY_PAGE;
    const response = await fetch(`${url}/user/partial`, {
      headers: {
        'Content-type': 'application/json',
        authorization: `${token}`,
      },
    });
    const data = await response.json();

    if (!response.ok || !data.success) {
      console.log(data.error);
      throw new Error(data.message);
    }

    return data.data;
  } catch (e) {
    console.log(e);
  }
}
