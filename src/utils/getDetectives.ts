export async function fetchDetectives(
  page: number,
  limit: number,
  key?: 'category' | 'region',
  value?: number
) {
  try {
    const base_url = process.env.BASE_URL;
    const path = 'detectives';
    let url;
    if (key && value) {
      url = `${base_url}/${path}?page=${page}&limit=${limit}&key=${key}&value=${value}`;
    } else {
      url = `${base_url}/${path}?page=${page}&limit=${limit}`;
    }
    const req = await fetch(url);
    const res = await req.json();
    if (!res.success) {
      throw new Error(res.error);
    }
    return { data: res.data, total: res.total };
  } catch (error) {
    return { data: [], total: 0 };
  }
}
