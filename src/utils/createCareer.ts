export interface CreateCareerType {
  company: string;
  position: string;
  job: string;
  start: string;
  end: string;
}

export async function createCareer(dto: CreateCareerType) {
  try {
    const token = localStorage.getItem('authorization');
    if (!token) return;

    const url = process.env.BASE_URL;
    const res = await fetch(`${url}/careers`, {
      headers: {
        'Content-type': 'application/json',
        authorization: token,
      },
      method: 'POST',
      body: JSON.stringify(dto),
    });
    const data = await res.json();

    if (!res.ok || !data.success) {
      throw new Error(data.error);
    }

    return true;
  } catch (error) {
    return false;
  }
}
