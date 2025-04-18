import { Wishlist } from '../types/userInfoState.interface';

export async function searchIsWish(detectiveId: number) {
  try {
    const token = localStorage.getItem('authorization');
    if (!token) return null;

    const url = process.env.BASE_URL;
    const res = await fetch(`${url}/wishlist/is-wish/${detectiveId}`, {
      headers: {
        authorization: token,
      },
    });

    const data = await res.json();
    if (!res.ok || !data.success) {
      throw new Error(data.error);
    }

    return data.data as Wishlist;
  } catch (error) {
    console.log(error);
    return null;
  }
}
