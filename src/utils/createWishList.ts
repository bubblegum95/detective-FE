import { Wishlist } from '../types/userInfoState.interface';

export async function createWishlist(detectiveId: number) {
  try {
    const token = localStorage.getItem('authorization');
    if (!token) return null;

    const url = process.env.BASE_URL;
    const res = await fetch(`${url}/wishlist/${detectiveId}`, {
      headers: {
        authorization: token,
      },
      method: 'POST',
    });
    const data = await res.json();

    if (!res.ok || !data.success) {
      throw new Error(data.error);
    }

    console.log('result:', data.data);

    return data.data as Wishlist;
  } catch (error) {
    console.log(error);
    return false;
  }
}
