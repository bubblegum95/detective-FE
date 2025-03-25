export async function getRegions() {
  try {
    const url = process.env.BASE_URL;
    const path = 'regions';
    const req = await fetch(`${url}/${path}`);
    const res = await req.json();
    if (!res.success) {
      throw new Error(res.error);
    }
    console.log(res.data);
    return res.data;
  } catch (error) {}
}
