import { Consultation } from '../pages/dashboard/consultations';

export async function getConsultingDetail(
  id: Consultation['id'],
  token: string
) {
  try {
    const url = process.env.BASE_URL;
    const res = await fetch(`${url}/consultations/${id}`, {
      headers: {
        authorization: token,
      },
    });
    const data = await res.json();

    if (!res.ok || !data.success) {
      throw new Error(data.message);
    }

    const result = data.data as Consultation;
    return result;
  } catch (error) {
    console.error(error);
  }
}
