import { Consultation } from '../pages/dashboard/consultations';

export async function getDetectiveConsultations(
  token: string,
  page: number,
  limit: number
) {
  try {
    const url = process.env.BASE_URL;
    const res = await fetch(
      `${url}/consultations/detective?page=${page}&limit=${limit}`,
      {
        headers: { authorization: token },
      }
    );
    const data = await res.json();
    if (!res.ok || !data.success) {
      throw new Error(data.message);
    }
    const result = data.data as Consultation[];
    const total = data.total as number;
    console.log(result);

    return { consultations: result, total };
  } catch (error) {
    console.log(error);
    return { consultations: [], total: 0 };
  }
}
