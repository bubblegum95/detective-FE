export async function addTag(
  type: 'category' | 'equipment' | 'region',
  id: number
) {
  try {
    const token = localStorage.getItem('authorization');
    if (!token) return;

    const url = process.env.BASE_URL;
    let path: string = '';

    switch (type) {
      case 'category':
        path = `detectives/category`;
        break;

      case 'equipment':
        path = `detectives/equipment`;
        break;

      case 'region':
        path = `detectives/region`;
        break;

      default:
        break;
    }

    const res = await fetch(`${url}/${path}/${id}`, {
      headers: {
        authorization: token,
      },
      method: 'POST',
    });
    const data = await res.json();
    if (!res.ok || !data.success) {
      throw new Error(data.error);
    }
    console.log(data);

    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
}
