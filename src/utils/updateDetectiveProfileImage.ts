export async function updateDetectiveProfileImage(file: File) {
  try {
    const token = localStorage.getItem('authorization');
    if (!token) return;

    const url = process.env.BASE_URL;
    const formData = new FormData();
    formData.append('file', file);
    const res = await fetch(`${url}/detectives/profile/image`, {
      headers: {
        authorization: token,
      },
      method: 'POST',
      body: formData,
    });
    const data = await res.json();

    if (!res.ok || !data.success) {
      throw new Error(data.message);
    }

    return true;
  } catch (error) {
    return false;
  }
}
