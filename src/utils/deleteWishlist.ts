export async function deleteWishlist(wishlistId: number) {
  try {
    const token = localStorage.getItem('authorization');
    if (!token) return;
    const url = process.env.BASE_URL;
    const res = await fetch(`${url}/wishlist/${wishlistId}`, {
      headers: {
        authorization: token,
      },
      method: 'DELETE',
    });
    const data = await res.json();

    if (!res.ok || !data.success) {
      throw new Error(data.error);
    }
  } catch (error) {
    alert(error);
  }
}
