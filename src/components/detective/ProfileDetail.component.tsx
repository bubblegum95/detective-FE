'use client';

import { useCallback, useState } from 'react';
import { Detective } from '../../types/userInfoState.interface';

export interface DetectiveInfo {
  subject: Detective['subject'] | null;
  intro: Detective['intro'] | null;
}

export async function updateDetectiveInfo(dao: {
  subject: Detective['subject'];
  intro: Detective['intro'];
}) {
  try {
    const token = localStorage.getItem('authorization');
    if (!token) return;

    const url = process.env.BASE_URL;
    const res = await fetch(`${url}/detectives/profile`, {
      headers: {
        authorization: token,
        'Content-type': 'application/json',
      },
      method: 'PATCH',
      body: JSON.stringify(dao),
    });

    const data = await res.json();
    if (!res.ok || !data.success) {
      throw new Error(data.error);
    }

    alert('성공적으로 수정을 완료하였습니다.');
    return true;
  } catch (error) {
    alert('수정을 완료할 수 없습니다.');
    return false;
  }
}

const DetectiveSubject: React.FC<DetectiveInfo> = ({ subject, intro }) => {
  const [info, setInfo] = useState<{
    subject: string;
    intro: string;
  }>({ subject: subject ? subject : '', intro: intro ? intro : '' });

  const memoHandleUpdate = useCallback(
    (data: { subject: Detective['subject']; intro: Detective['intro'] }) => {
      const handleUpdate = async () => {
        await updateDetectiveInfo(data);
      };

      handleUpdate();
    },
    []
  );

  return (
    <div>
      <form action="">
        <h3>
          <label htmlFor="">간단소개</label>
        </h3>
        <input
          type="text"
          value={info.subject}
          onChange={(e) =>
            setInfo((prev) => ({ ...prev, subject: e.target.value }))
          }
        />

        <h3>
          <label htmlFor="">자기소개</label>
        </h3>
        <textarea
          name=""
          id=""
          value={info.intro}
          onChange={(e) =>
            setInfo((prev) => ({ ...prev, intro: e.target.value }))
          }
        />
        <br />
        <button
          onClick={(e) => {
            e.preventDefault();
            memoHandleUpdate(info);
          }}
        >
          수정 완료
        </button>
      </form>
    </div>
  );
};

export default DetectiveSubject;
