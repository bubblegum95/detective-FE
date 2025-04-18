'use client';

import { useEffect, useState } from 'react';
import { Consultation } from '../../pages/dashboard/consultations';
import Pagenation from '../util/Pagenation.component';
import ConsultingDetail from '../util/ConsultingDetail.component';
import { getDetectiveConsultations } from '../../utils/getConsultationsForDetective';

const ConsultationsForDetective = () => {
  const [consultingData, setConsultingData] = useState<{
    consultations: Consultation[];
    total: number;
  }>({ consultations: [], total: 0 });

  const [page, setPage] = useState<number>(1);
  const [limit, setLimit] = useState<number>(10);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [selected, setSelected] = useState<Consultation['id'] | undefined>();

  useEffect(() => {
    const handleDetectiveConsulting = async () => {
      const token = localStorage.getItem('authorization');
      if (!token) return;

      const result = await getDetectiveConsultations(token, page, limit);
      setConsultingData(result);
    };

    handleDetectiveConsulting();
  }, [page, limit]);

  return (
    <div>
      {consultingData.consultations.map((consultation) => (
        <div
          key={consultation.id}
          onClick={() => {
            setIsOpen(!isOpen);
            setSelected(consultation.id);
          }}
        >
          <div>상담 제목: {consultation.subject}</div>
          <div>상담 유형:{consultation.category.name}</div>
          <div>요청자: {consultation.consumer.nickname}</div>
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
    </div>
  );
};

export default ConsultationsForDetective;
