'use client';

import { useEffect, useState } from 'react';
import {
  Category,
  DetectiveProfile,
  Equipment,
  Region,
} from '../../types/userInfoState.interface';
import DetectiveSubject from './ProfileDetail.component';
import ProfileTags from './ProfileTags.component';
import { getCategories } from '../../utils/getCategories';
import { getEquipments } from '../../utils/getEquipments';
import { getRegions } from '../../utils/getRegions';
import ProfileLicenses from './ProfileLicenses.component';
import { getMyDetectiveProfile } from '../../utils/getMyDetectiveProfile';
import ProfileCareers from './ProfileCareers.component';
import ProfileImage from '../user/ProfileImage.component';
import { updateDetectiveProfileImage } from '../../utils/updateDetectiveProfileImage';
import styles from '../../styles/DetectiveProfile.module.css';

const DetectiveProfileComponent = () => {
  const [profile, setProfile] = useState<DetectiveProfile | undefined>();

  useEffect(() => {
    const handleGetProfile = async () => {
      const token = localStorage.getItem('authorization');
      if (!token) return;

      const profile = await getMyDetectiveProfile(token);
      console.log(profile);
      setProfile(profile);
    };

    handleGetProfile();
  }, []);

  if (!profile) return;

  const url = process.env.BASE_URL;
  const defaultImage =
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTQVBnzyBUCefWBzjFKnRTPiLetwlAkmY6cAw&s';
  const userImage = profile.profile
    ? `${url}/public/images/${profile.profile.path}`
    : defaultImage;

  return (
    <div className={styles.container}>
      <div>
        <ProfileImage
          path={userImage}
          width={200}
          height={200}
          patchFn={updateDetectiveProfileImage}
        />
      </div>

      <div className={styles.detail}>
        <div>
          <DetectiveSubject subject={profile.subject} intro={profile.intro} />
        </div>
        <div>
          <h3>
            <label htmlFor="">소속</label>
          </h3>

          {profile.office && (
            <div>
              <div>회사명: {profile.office.name}</div>
              <div>
                주소: {profile.office.address} {profile.office.addressDetail}
              </div>
            </div>
          )}
        </div>
        <div>
          <h3>
            <label htmlFor="">전문분야</label>
          </h3>
          <ProfileTags<Category>
            type="category"
            tags={profile.detectiveCategories.map(({ category }) => category)}
            fetchFn={getCategories}
          />
        </div>
        <div>
          <h3>
            <label htmlFor="">전문장비</label>
          </h3>
          <ProfileTags<Equipment>
            type="equipment"
            tags={profile.detectiveEquipments.map(({ equipment }) => equipment)}
            fetchFn={getEquipments}
          />
        </div>
        <div>
          <h3>
            <label htmlFor="">활동지역</label>
          </h3>
          <ProfileTags<Region>
            type="region"
            tags={profile.detectiveRegions.map(({ region }) => region)}
            fetchFn={getRegions}
          />
        </div>
        <div>
          <ProfileLicenses licenses={profile.licenses} />
        </div>
        <div>
          <ProfileCareers careers={profile.careers} />
        </div>
      </div>
    </div>
  );
};

export default DetectiveProfileComponent;
