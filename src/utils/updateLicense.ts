import { License } from '../types/userInfoState.interface';

export async function updateLicense(license: License) {
  try {
    const token = localStorage.getItem('authorization');
    if (!token) return;

    const url = process.env.BASE_URL;
    const res = await fetch(`${url}/license/${license.id}`, {
      headers: {
        authorization: token,
        'Content-type': 'application/json',
      },
      method: 'PATCH',
      body: JSON.stringify({
        title: license.title,
        issuedAt: license.issuedAt,
        issuedBy: license.issuedBy,
      }),
    });

    const data = await res.json();

    if (!res.ok || !data.success) {
      throw new Error(data.error);
    }

    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
}
