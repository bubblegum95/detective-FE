import { Career } from '../types/userInfoState.interface';

export async function updateCareer(career: Career) {
  try {
    const token = localStorage.getItem('authorization');
    if (!token) return;

    const url = process.env.BASE_URL;
    const res = await fetch(`${url}/careers/${career.id}`, {
      headers: {
        'Content-type': 'application/json',
        authorization: token,
      },
      method: 'PATCH',
      body: JSON.stringify(career),
    });

    const data = await res.json();

    if (!res.ok || !data.success) {
      throw new Error(data.error);
    }

    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
}
