'use client';

import React, { memo, useEffect, useState } from 'react';
import { Consultation } from '../../pages/dashboard/consultations';
import { getConsultingDetail } from '../../utils/getConsultingDetail';
import styles from '../../styles/ConsultingDetail.module.css';

export interface ConsultingDetailProps {
  id: Consultation['id'];
  onClose: () => void;
}

const ConsultingDetail: React.FC<ConsultingDetailProps> = ({ id, onClose }) => {
  const [consulting, setConsulting] = useState<Consultation | null>();

  useEffect(() => {
    const handleSetConsulting = async () => {
      const token = localStorage.getItem('authorization');
      if (!token) return;

      const data = await getConsultingDetail(id, token);
      setConsulting(data);
    };

    handleSetConsulting();
  }, [id]);

  if (!consulting) return;

  return (
    <div className={styles.container}>
      <button
        onClick={() => {
          onClose();
        }}
      >
        ❌
      </button>
      {consulting && (
        <div className={styles.content}>
          <h1>상담신청내역</h1>
          <div>
            신청인: {consulting?.consumer.nickname}({consulting?.consumer.email}
            )
          </div>
          <div>상담자: {consulting?.detective.user.name}</div>
          <div>상담 제목: {consulting?.subject}</div>
          <div>상담 유형: {consulting?.category.name}</div>
          <div>
            상담 신청일시:{' '}
            {consulting.createdAt &&
              new Date(consulting.createdAt).toLocaleDateString()}
          </div>
          <div>상담 진행 상태: {consulting?.status}</div>
          <div>상담 내용:</div>
          <div>{consulting?.content}</div>
        </div>
      )}
    </div>
  );
};

export default ConsultingDetail;
