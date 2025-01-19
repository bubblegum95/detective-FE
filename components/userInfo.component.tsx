'use client';
import Image from 'next/image';
import { useSelector } from 'react-redux';
import { RootState } from '../store';

const UserInfo = () => {
  const userInfo = useSelector((state: RootState) => state.userInfo);

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
        <div className="key-value" key={'name'}>
          <ol>이름</ol>
          <ol>{userInfo.name}</ol>
        </div>
        <div className="key-value" key={'email'}>
          <ol>이메일</ol>
          <ol>{userInfo.email}</ol>
        </div>
        <div className="key-value" key={'nickname'}>
          <ol>닉네임</ol>
          <ol>{userInfo.nickname}</ol>
        </div>
        <div className="key-value" key={'phoneNumber'}>
          <ol>연락처</ol>
          <ol>{userInfo.phoneNumber}</ol>
        </div>
        <div className="key-value" key={'createdAt'}>
          <ol>회원가입일</ol>
          <ol>{userInfo.createdAt}</ol>
        </div>
      </div>
    </div>
  );
};

export default UserInfo;
