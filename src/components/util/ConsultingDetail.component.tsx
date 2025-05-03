'use client';

import React, { memo, useEffect, useState } from 'react';
import { Consultation } from '../../pages/dashboard/consultations';
import { getConsultingDetail } from '../../utils/getConsultingDetail';
import styles from '../../styles/ConsultingDetail.module.css';
import { namingStatus } from '../user/ConsultationsForDetective';

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
        className={styles.xbtn}
        onClick={() => {
          onClose();
        }}
      >
        ❌
      </button>
      {consulting && (
        <div className={styles.content}>
          <h1 className={styles.title}>의뢰서</h1>
          <div>의뢰 제목: {consulting?.subject}</div>
          <div>의뢰 유형: {consulting?.category.name}</div>
          <div>
            의뢰일:{' '}
            {consulting.createdAt &&
              new Date(consulting.createdAt).toLocaleDateString()}
          </div>
          <div>
            의뢰인: {consulting?.consumer.nickname}({consulting?.consumer.email}
            )
          </div>
          <div>피의뢰인: {consulting?.detective.user.name}</div>
          <div>진행상태: {namingStatus(consulting.status)}</div>
          <div>의뢰내용:</div>
          <div className={styles.consultingTextArea}>{consulting?.content}</div>
        </div>
      )}
    </div>
  );
};

export default ConsultingDetail;
