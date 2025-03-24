'use client';
import React, { memo } from 'react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose }) => {
  return (
    <div
      className="modal-overlay"
      style={{ display: isOpen ? 'block' : 'none' }}
    >
      <div className="modal-content">
        <p>모달</p>
        <button onClick={onClose}>닫기</button>
      </div>
    </div>
  );
};

export default memo(Modal);
