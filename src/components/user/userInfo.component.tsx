'use client';

import Image from 'next/image';
import { User } from '../../types/userInfoState.interface';
import { useEffect, useState } from 'react';
import getUserInfo from '../../utils/getUserInfo';
import styles from '../../styles/UserInfo.module.css';

const UserInfo = () => {
  const [user, setUser] = useState<User>({
    name: '',
    email: '',
    nickname: '',
    phoneNumber: '',
    createdAt: '',
    profile: { id: 0, path: '' },
  });

  useEffect(() => {
    const handleGetUserInfo = async () => {
      const token = localStorage.getItem('authorization');
      if (token) {
        const data = await getUserInfo(token);
        setUser(data);
      }
    };
    handleGetUserInfo();
  }, []);

  const url = process.env.BASE_URL;
  const defaultImage =
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTQVBnzyBUCefWBzjFKnRTPiLetwlAkmY6cAw&s';
  const userImage = user.profile
    ? `${url}/public/images/${user.profile.path}`
    : defaultImage;

  return (
    <div className={styles.userInfo}>
      <div>
        <Image
          src={userImage}
          alt="user image"
          priority={false}
          layout="fixed"
          width={250}
          height={250}
          className={styles.image}
        />
      </div>
      <div className={styles.userInfoData}>
        <div key={'name'}>
          <ol>이름</ol>
          <ol>{user.name}</ol>
        </div>
        <div key={'email'}>
          <ol>이메일</ol>
          <ol>{user.email}</ol>
        </div>
        <div key={'nickname'}>
          <ol>닉네임</ol>
          <ol>{user.nickname}</ol>
        </div>
        <div key={'phoneNumber'}>
          <ol>연락처</ol>
          <ol>{user.phoneNumber}</ol>
        </div>
        <div key={'createdAt'}>
          <ol>회원가입일</ol>
          <ol>{user.createdAt}</ol>
        </div>
      </div>
    </div>
  );
};

export default UserInfo;
