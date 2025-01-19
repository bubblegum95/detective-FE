'use client';
import Image from 'next/image';
import { useSelector } from 'react-redux';
import { RootState } from '../store';
import React, { useState } from 'react';

async function referUserInfo() {
  const url = process.env.BASE_URL;
  const path = process.env.MY_PAGE;
  const response = await fetch(`${url}${path}`);
  const data = await response.json();

  if (!response.ok || !data.success) {
    throw new Error(data.message);
  }
}

const UpdateUserInfo = () => {
  const userInfo = useSelector((state: RootState) => state.userInfo);
  const [formData, setFormData] = useState({
    name: userInfo.name,
    email: userInfo.email,
    nickname: userInfo.nickname,
    phoneNumber: userInfo.phoneNumber,
    password: '',
  });

  const handleChangeForm =
    (key: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
      setFormData((prev) => ({ ...prev, [key]: e.target.value }));
    };

  return (
    <div className="userInfo">
      <div className="image">
        <Image
          src={
            'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTQVBnzyBUCefWBzjFKnRTPiLetwlAkmY6cAw&s'
          }
          alt=""
          width={350}
          height={200}
        />
      </div>
      <div className="userInfoData">
        <div>
          <legend>이미지 업로드</legend>
          <input type="file" />
        </div>
        <div className="key-value" key={'name'}>
          <legend>이름</legend>
          <input
            type="text"
            placeholder="이름"
            value={formData.name}
            onChange={handleChangeForm('name')}
          />
        </div>
        <div className="key-value" key={'nickname'}>
          <legend>닉네임</legend>
          <input
            type="text"
            placeholder="nickname"
            value={formData.nickname}
            onChange={handleChangeForm('nickname')}
          />
        </div>
        <div className="key-value" key={'phoneNumber'}>
          <legend>연락처</legend>
          <input
            type="text"
            placeholder="phone number"
            value={formData.phoneNumber}
            onChange={handleChangeForm('phoneNumber')}
          />
        </div>
        <div className="key-value" key={'password'}>
          <legend>비밀번호</legend>
          <input
            type="password"
            placeholder="password"
            value={formData.password}
            onChange={handleChangeForm('password')}
          />
        </div>
        <button>수정완료</button>
      </div>
    </div>
  );
};

export default UpdateUserInfo;
