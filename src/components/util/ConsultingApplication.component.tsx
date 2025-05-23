'use client';

import React, { useState } from 'react';
import { Detective } from '../../types/userInfoState.interface';
import styles from '../../styles/ConsultingApp.module.css';
import CreateConsulting from './CreateConsulting.component';

export interface ConsultingApplicationProps {
  detectiveId: Detective['id'];
}

const ConsultingApplication: React.FC<ConsultingApplicationProps> = ({
  detectiveId,
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <div>
      <button
        className={styles.btn}
        onClick={(e) => {
          e.preventDefault();
          setIsOpen(!isOpen);
        }}
      >
        의뢰하기
      </button>

      {isOpen && (
        <div className={styles.modalWrap}>
          <div className={styles.container}>
            <button
              onClick={(e) => {
                e.preventDefault();
                setIsOpen(!isOpen);
              }}
            >
              ❌
            </button>
            <CreateConsulting detectiveId={detectiveId} />
          </div>
        </div>
      )}
    </div>
  );
};

export default ConsultingApplication;
