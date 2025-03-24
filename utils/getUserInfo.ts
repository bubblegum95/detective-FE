export default async function getUserInfo(token: string) {
  try {
    const url = process.env.BASE_URL;
    const path = process.env.MY_PAGE;
    const response = await fetch(`${url}/user`, {
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

    console.log(data.data);
    return data.data;
  } catch (e) {
    console.log(e);
  }
}
