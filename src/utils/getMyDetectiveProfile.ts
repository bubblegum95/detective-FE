import { DetectiveProfile } from '../types/userInfoState.interface';

export async function getMyDetectiveProfile(token: string) {
  try {
    const url = process.env.BASE_URL;
    const res = await fetch(`${url}/detectives/profile`, {
      headers: {
        authorization: token,
      },
    });
    const data = await res.json();
    if (!res.ok || !data.success) {
      throw new Error(data.error);
    }

    return data.data as DetectiveProfile;
  } catch (err) {
    console.log(err);
    return;
  }
}
