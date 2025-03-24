'use client';
import Link from 'next/link';

const SideBar = () => {
  return (
    <div className="sideBar">
      <div>
        <Link href={'/dashboard'}>대시보드</Link>
      </div>
      <div>
        <Link href={'/dashboard/profile'}>내 정보</Link>
      </div>
      <div>
        <Link href={'/dashboard/chats'}>내 채팅목록</Link>
      </div>
      <div>
        <Link href={'/dashboard/consultations'}>내 상담목록</Link>
      </div>
    </div>
  );
};

export default SideBar;
