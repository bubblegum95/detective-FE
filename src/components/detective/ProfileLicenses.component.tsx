'use client';

import React, { useState } from 'react';
import { License } from '../../types/userInfoState.interface';
import { createLicense } from '../../utils/createLicense';
import { updateLicense } from '../../utils/updateLicense';
import { deleteLicense } from '../../utils/deleteLicense';
import styles from '../../styles/ProfileLicenses.module.css';

export interface ProfileLicensesProps {
  licenses: License[];
}

export interface ProfileLisenceProps {
  license: License;
}

export const CreateLicense = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [licenseForm, setLicenseForm] = useState({
    title: '',
    issuedAt: '',
    issuedBy: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLicenseForm((prev) => ({ ...prev, [name]: value }));
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
        <div>
          <form action="" className={styles.form}>
            <label htmlFor="">자격증명</label>
            <input
              type="text"
              value={licenseForm.title}
              name="title"
              placeholder="자격증명"
              onChange={handleChange}
            />
            <label htmlFor="">발행기관</label>
            <input
              type="text"
              value={licenseForm.issuedBy}
              name="issuedBy"
              placeholder="발행기관"
              onChange={handleChange}
            />
            <label htmlFor="">발행일자</label>
            <input
              type="date"
              value={licenseForm.issuedAt}
              name="issuedAt"
              placeholder="발행일자"
              onChange={handleChange}
            />
            <button
              onClick={async (e) => {
                e.preventDefault();
                const result = await createLicense(licenseForm);
                if (result) alert('자격증을 추가하였습니다.');
              }}
            >
              추가하기
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export const ProfileLicense: React.FC<ProfileLisenceProps> = ({ license }) => {
  const [licenseForm, setLicenseForm] = useState(license);

  const handleLicenseForm = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLicenseForm((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div key={licenseForm.id}>
      <form action="" className={styles.form}>
        <label htmlFor="">자격증명</label>
        <input
          type="text"
          value={licenseForm.title}
          name="title"
          onChange={handleLicenseForm}
        />
        <label htmlFor="">발행기관</label>
        <input
          type="text"
          value={licenseForm.issuedBy}
          name="issuedBy"
          onChange={handleLicenseForm}
        />
        <label htmlFor="">발행일자</label>
        <input
          type="date"
          value={licenseForm.issuedAt}
          name="issuedAt"
          onChange={handleLicenseForm}
        />
        <div>
          <button
            onClick={async (e) => {
              e.preventDefault();
              await updateLicense(licenseForm);
            }}
          >
            수정하기
          </button>
          <button
            onClick={async (e) => {
              e.preventDefault();
              await deleteLicense(licenseForm.id);
            }}
          >
            삭제하기
          </button>
        </div>
      </form>
    </div>
  );
};

const ProfileLicenses: React.FC<ProfileLicensesProps> = ({ licenses }) => {
  return (
    <div>
      <h3>
        <label htmlFor="">자격증</label>
      </h3>
      {licenses.map((license) => (
        <ProfileLicense license={license} />
      ))}

      <CreateLicense />
    </div>
  );
};

export default ProfileLicenses;
