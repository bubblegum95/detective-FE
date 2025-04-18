'use client';

import React, { memo } from 'react';

export interface PagenationProps {
  page: number;
  limit: number;
  total: number;
  handlePageChange: (newPage: number) => void;
}
const Pagenation: React.FC<PagenationProps> = ({
  page,
  limit,
  total,
  handlePageChange,
}) => {
  return (
    <div>
      <button onClick={() => handlePageChange(page - 1)} disabled={page === 1}>
        이전
      </button>
      <span>
        {page} / {Math.ceil(total / limit)}
      </span>
      <button
        onClick={() => handlePageChange(page + 1)}
        disabled={page === Math.ceil(total / limit)}
      >
        다음
      </button>
    </div>
  );
};

export default Pagenation;
