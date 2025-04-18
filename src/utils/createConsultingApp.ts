export async function createConsultingApp(
  token: string,
  detectiveId: number,
  categoryId: number,
  dto: { subject: string; content: string }
) {
  try {
    const url = process.env.BASE_URL;
    const res = await fetch(
      `${url}/consultations/${detectiveId}?categoryId=${categoryId}`,
      {
        headers: {
          authorization: token,
          'Content-type': 'application/json',
        },
        method: 'POST',
        body: JSON.stringify(dto),
      }
    );

    const data = await res.json();
    if (!res.ok || !data.success) {
      throw new Error(data.error);
    }
    alert('상담 신청을 완료하였습니다.');
    return true;
  } catch (error) {
    alert(error);
    return false;
  }
}
