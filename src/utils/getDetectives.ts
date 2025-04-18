export async function fetchDetectives(
  page: number,
  limit: number,
  key?: 'category' | 'region',
  value?: number
) {
  try {
    console.log('key:', key, value);
    const base_url = process.env.BASE_URL;
    const path = 'detectives';
    let url;
    if (key && value) {
      console.log;
      url = `${base_url}/${path}?page=${page}&limit=${limit}&key=${key}&value=${value}`;
    } else {
      url = `${base_url}/${path}?page=${page}&limit=${limit}`;
    }
    const req = await fetch(url);
    const res = await req.json();
    if (!res.success) {
      throw new Error(res.error);
    }
    console.log(res.data);
    return { data: res.data, total: res.total };
  } catch (error) {
    console.log(error);
    return { data: [], total: 0 };
  }
}
