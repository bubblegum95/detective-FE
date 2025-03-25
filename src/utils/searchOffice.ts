export async function searchOffice(name: string, page: number, limit: number) {
  try {
    const url = `http://127.0.0.1:3300/offices?name=${name}&page=${page}&limit=${limit}`;
    const request = await fetch(url);
    const response = await request.json();
    console.log(name, response.data);
    return response.data;
  } catch (error) {
    throw error;
  }
}
