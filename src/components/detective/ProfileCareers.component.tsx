'use client';

import React, { useState } from 'react';
import { Career } from '../../types/userInfoState.interface';
import { updateCareer } from '../../utils/updateCareer';
import { deleteCareer } from '../../utils/deleteCareer';
import { createCareer } from '../../utils/createCareer';
import styles from '../../styles/ProfileLicenses.module.css';

interface ProfileCareerProps {
  career: Career;
}

interface ProfileCareersProps {
  careers: Career[];
}

export const ProfileCareer: React.FC<ProfileCareerProps> = ({ career }) => {
  const [careerForm, setCareerForm] = useState<Career>(career);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCareerForm((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div key={careerForm.id}>
      <form action="" className={styles.form}>
        <label htmlFor="">회사</label>
        <input
          type="text"
          value={careerForm.company}
          name="corporateName"
          onChange={handleChange}
        />
        <label htmlFor="">직책</label>
        <input
          type="text"
          value={careerForm.position}
          name="position"
          onChange={handleChange}
        />
        <label htmlFor="">직무</label>
        <input
          type="text"
          value={careerForm.job}
          name="businessDetails"
          onChange={handleChange}
        />
        <label htmlFor="">시작일</label>
        <input
          type="date"
          value={careerForm.start}
          name="startDate"
          onChange={handleChange}
        />
        <label htmlFor="">종료일</label>
        <input
          type="date"
          value={careerForm.end}
          name="endDate"
          onChange={handleChange}
        />
        <div>
          <button
            onClick={() => {
              updateCareer(careerForm);
            }}
          >
            수정하기
          </button>
          <button
            onClick={() => {
              deleteCareer(career.id);
            }}
          >
            삭제하기
          </button>
        </div>
      </form>
    </div>
  );
};

export const CreateCareer = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [carear, setCareer] = useState({
    company: '',
    position: '',
    job: '',
    start: '',
    end: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCareer((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div>
      <button
        onClick={() => {
          setIsOpen(!isOpen);
        }}
      >
        ﹢
      </button>

      {isOpen && (
        <div className="flex">
          <form action="" className={styles.form}>
            <label htmlFor="">회사</label>
            <input
              type="text"
              value={carear.company}
              name="company"
              placeholder="company"
              autoFocus
              onChange={handleChange}
            />
            <label htmlFor="">직책</label>
            <input
              type="text"
              value={carear.position}
              name="position"
              placeholder="position"
              onChange={handleChange}
            />
            <label htmlFor="">직무</label>
            <input
              type="text"
              value={carear.job}
              name="job"
              placeholder="job"
              onChange={handleChange}
            />
            <label htmlFor="">시작일</label>
            <input
              type="date"
              value={carear.start}
              name="start"
              placeholder="start"
              onChange={handleChange}
            />
            <label htmlFor="">종료일</label>
            <input
              type="date"
              value={carear.end}
              name="end"
              placeholder="end"
              onChange={handleChange}
            />
            <button
              onClick={async (e) => {
                e.preventDefault();
                const result = await createCareer(carear);
                if (result) alert('경력을 추가하였습니다.');
              }}
            >
              생성하기
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

const ProfileCareers: React.FC<ProfileCareersProps> = ({ careers }) => {
  return (
    <div>
      <h3>
        <label htmlFor="">경력/업무</label>
      </h3>
      {careers &&
        careers.map((career) => (
          <ProfileCareer career={career} key={career.id} />
        ))}
      <CreateCareer />
    </div>
  );
};

export default ProfileCareers;
