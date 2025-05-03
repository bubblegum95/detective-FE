export async function searchOffice(name: string, page: number, limit: number) {
  try {
    const BASE_URL = process.env.BASE_URL;
    const url = `${BASE_URL}/offices?name=${name}&page=${page}&limit=${limit}`;
    const request = await fetch(url);
    const response = await request.json();
    return response.data;
  } catch (error) {
    alert(error);
  }
}
