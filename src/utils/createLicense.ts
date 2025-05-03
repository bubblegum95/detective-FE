export async function createLicense(dao: {
  title: string;
  issuedAt: string;
  issuedBy: string;
}) {
  try {
    const token = localStorage.getItem('authorization');
    if (!token) return;

    const url = process.env.BASE_URL;
    const res = await fetch(`${url}/licenses`, {
      headers: {
        authorization: token,
        'Content-type': 'application/json',
      },
      method: 'POST',
      body: JSON.stringify(dao),
    });

    const data = await res.json();

    if (!res.ok || !data.success) {
      throw new Error(data.error);
    }

    return true;
  } catch (error) {
    alert(error);
    return false;
  }
}
