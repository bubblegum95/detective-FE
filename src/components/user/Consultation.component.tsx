'use client';
import { useEffect, useState } from 'react';
import { Consultation } from '../../pages/dashboard/consultations';
import { getConsultations } from '../../utils/getConsultations';
import Pagenation from '../util/Pagenation.component';
import ConsultingDetail from '../util/ConsultingDetail.component';
import styles from '../../styles/dashboard.module.css';

const ConsultationComponent = () => {
  const [page, setPage] = useState<number>(1);
  const [limit, setLimit] = useState<number>(10);
  const [total, setTotal] = useState<number>(0);
  const [consultations, setConsultations] = useState<Consultation[]>([]);
  const [selectedConsulting, setSelectedConsulting] = useState<number | null>();
  const [isOpen, setIsOpen] = useState<boolean>(false);

  useEffect(() => {
    const token = localStorage.getItem('authorization');

    if (!token) return;
    const limit = 10;
    const handleFetchConsultations = async () => {
      const { consultations, total } = await getConsultations(
        token,
        page,
        limit
      );
      setTotal(total);
      setConsultations(consultations);
    };

    handleFetchConsultations();
  }, [page]);

  return (
    <div>
      <div className={styles.consultationsContainer}>
        {consultations.map((consultation) => (
          <div
            key={consultation.id}
            onClick={() => {
              setSelectedConsulting(consultation.id);
              setIsOpen(!isOpen);
            }}
            className={styles.consultation}
          >
            <div>의뢰 제목: {consultation.subject}</div>
            <div>의뢰 유형: {consultation.category.name}</div>
            <div>피의뢰인: {consultation.detective.user.name}</div>
            <div>요청상태: {consultation.status}</div>
          </div>
        ))}
      </div>

      <Pagenation
        page={page}
        limit={limit}
        total={total}
        handlePageChange={setPage}
      />

      {selectedConsulting && isOpen && (
        <ConsultingDetail
          id={selectedConsulting}
          onClose={() => setIsOpen(false)}
        />
      )}
    </div>
  );
};

export default ConsultationComponent;
