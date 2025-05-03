'use client';

import { useEffect, useState } from 'react';
import { Consultation } from '../../pages/dashboard/consultations';
import Pagenation from '../util/Pagenation.component';
import ConsultingDetail from '../util/ConsultingDetail.component';
import { getDetectiveConsultations } from '../../utils/getConsultationsForDetective';
import ChatWindow from '../util/chatWindow.component';
import { useChat } from '../../context/chat.provider';
import styles from '../../styles/ConsultingLists.module.css';

export async function updateStatus(
  id: Consultation['id'],
  status: Consultation['status']
) {
  try {
    const token = localStorage.getItem('authorization');
    if (!token) return;

    const BASE_URL = process.env.BASE_URL;
    const res = await fetch(
      `${BASE_URL}/consultations/${id}/status?status=${status}`,
      {
        headers: {
          authorization: token,
        },
        method: 'PATCH',
      }
    );
    const data = await res.json();

    if (!res.ok || !data.success) {
      throw new Error(data.error);
    }

    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
}

export function namingStatus(status: Consultation['status']) {
  switch (status) {
    case 'pending':
      return '수락대기중';

    case 'accepted':
      return '수락 및 진행중';

    case 'rejected':
      return '거절';

    case 'completed':
      return '완료';

    default:
      return '';
  }
}

const ConsultationsForDetective = () => {
  const [consultingData, setConsultingData] = useState<{
    consultations: Consultation[];
    total: number;
  }>({ consultations: [], total: 0 });

  const [page, setPage] = useState<number>(1);
  const [limit, setLimit] = useState<number>(10);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [chatIsOpen, setChatIsOpen] = useState<boolean>(false);
  const [selected, setSelected] = useState<Consultation['id'] | undefined>();
  const { invite, join, leave, selectedRoom, me } = useChat();

  useEffect(() => {
    const handleDetectiveConsulting = async () => {
      const token = localStorage.getItem('authorization');
      if (!token) return;

      const result = await getDetectiveConsultations(token, page, limit);
      setConsultingData(result);
    };

    handleDetectiveConsulting();
  }, [page, limit]);

  useEffect(() => {
    if (!selectedRoom) return;

    setChatIsOpen(true);
    join(selectedRoom);
    const previousRoom = selectedRoom;

    return () => {
      leave(previousRoom);
    };
  }, [selectedRoom]);

  return (
    <div className={styles.container}>
      {consultingData.consultations.map((consultation) => (
        <div key={consultation.id} className={styles.item}>
          <div
            className={styles.itemBox}
            onClick={() => {
              setIsOpen(!isOpen);
              setSelected(consultation.id);
            }}
          >
            <div>의뢰 제목: {consultation.subject}</div>
            <div>의뢰 유형: {consultation.category.name}</div>
          </div>

          <div className={styles.consumerData}>
            <div>의뢰자: {consultation.consumer.nickname}</div>
            <button
              className={styles.btn}
              onClick={(e) => {
                e.preventDefault();
                invite(consultation.consumer.email);
              }}
            >
              채팅하기
            </button>
          </div>

          <div className={styles.consultationStatus}>
            <div>
              상태:{' '}
              <span className={styles.namedStatus}>
                {namingStatus(consultation.status)}
              </span>
            </div>

            {consultation.status === 'pending' && (
              <div>
                <button
                  className={styles.btn}
                  onClick={async (e) => {
                    e.preventDefault();
                    const result = await updateStatus(
                      consultation.id,
                      'accepted'
                    );
                    if (result) alert('의뢰를 수락하였습니다.');
                  }}
                >
                  의뢰수락
                </button>
                <button
                  className={styles.btn}
                  onClick={async (e) => {
                    e.preventDefault();
                    const result = await updateStatus(
                      consultation.id,
                      'rejected'
                    );
                    if (result) alert('의뢰를 거절하였습니다.');
                  }}
                >
                  의뢰거절
                </button>
              </div>
            )}

            {consultation.status === 'accepted' && (
              <div>
                <button
                  className={styles.btn}
                  onClick={async (e) => {
                    e.preventDefault();
                    const result = await updateStatus(
                      consultation.id,
                      'completed'
                    );
                    if (result) alert('의뢰를 완료하였습니다.');
                  }}
                >
                  의뢰완료
                </button>
              </div>
            )}
          </div>
        </div>
      ))}

      <Pagenation
        page={page}
        limit={limit}
        total={consultingData.total}
        handlePageChange={setPage}
      />

      {isOpen && selected && (
        <ConsultingDetail id={selected} onClose={() => setIsOpen(false)} />
      )}

      {chatIsOpen && selectedRoom && me && (
        <ChatWindow
          roomId={selectedRoom}
          me={me}
          onClose={() => setChatIsOpen(false)}
        />
      )}
    </div>
  );
};

export default ConsultationsForDetective;
