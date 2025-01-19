'use client';

import { useEffect, useState } from 'react';
import UserInfo from './userInfo.component';
import UpdateUserInfo from './updateUserInfo.component';

const MyPage = () => {
  const [toUpdate, setToUpdate] = useState(false);
  const [btnName, setBtnName] = useState('내정보 수정하기');

  useEffect(() => {
    toUpdate ? setBtnName('수정 취소하기') : setBtnName('내정보 수정하기');
  }, [toUpdate]);

  return (
    <div className="myPage">
      <h1>My Page</h1>
      <button
        onClick={() => {
          toUpdate ? setToUpdate(false) : setToUpdate(true);
        }}
      >
        {btnName}
      </button>
      <div
        className="userData"
        style={{ display: toUpdate ? 'none' : 'block' }}
      >
        <UserInfo />
      </div>
      <div
        className="userInfoUpdateForm"
        style={{ display: toUpdate ? 'block' : 'none' }}
      >
        <UpdateUserInfo />
      </div>
    </div>
  );
};

export default MyPage;
