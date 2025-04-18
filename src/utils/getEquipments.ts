import { Equipment } from '../types/userInfoState.interface';

export async function getEquipments() {
  try {
    const url = process.env.BASE_URL;
    const res = await fetch(`${url}/equipments`);
    const data = await res.json();
    if (!res.ok || !data.success) {
      throw new Error(data.error);
    }
    return data.data as Equipment[];
  } catch (error) {
    return [];
  }
}
