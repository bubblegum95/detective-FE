import { Consultation } from '../pages/dashboard/consultations';

export async function getConsultations(
  token: string,
  page: number,
  limit: number
) {
  try {
    const url = process.env.BASE_URL;
    const res = await fetch(
      `${url}/consultations/consumer?page=${page}&limit=${limit}`,
      {
        headers: {
          authorization: token,
        },
      }
    );

    const data = await res.json();
    if (!res.ok || !data.success) {
      throw new Error(data.error);
    }
    const consultations = data.data as Consultation[];
    const total = data.total as number;

    return { consultations, total };
  } catch (error) {
    console.error(error);
    return { consultations: [], total: 0 };
  }
}
