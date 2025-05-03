import { Category } from '../types/userInfoState.interface';

export async function getCategories() {
  try {
    const url = process.env.BASE_URL;
    const req = await fetch(`${url}/category`);
    const res = await req.json();
    return res.data as Category[];
  } catch (error) {
    return [];
  }
}
