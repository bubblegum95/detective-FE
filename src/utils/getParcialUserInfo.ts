export default async function getParcialUserInfo(token: string) {
  try {
    const url = process.env.BASE_URL;
    const response = await fetch(`${url}/user/partial`, {
      headers: {
        'Content-type': 'application/json',
        authorization: `${token}`,
      },
    });
    const data = await response.json();

    if (!response.ok || !data.success) {
      throw new Error(data.message);
    }
    return data.data;
  } catch (e) {
    alert(e);
    return null;
  }
}
