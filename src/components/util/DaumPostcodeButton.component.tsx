'use client';
import React, { useCallback, useEffect } from 'react';

interface DaumPostcodeButtonProps {
  onComplete: (address: string) => void;
}

export default function DaumPostcodeButton({
  onComplete,
}: DaumPostcodeButtonProps) {
  useEffect(() => {
    const script = document.createElement('script');
    script.src =
      '//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js';
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const handleClick = useCallback(() => {
    new window.daum.Postcode({
      oncomplete: function (data: any) {
        onComplete(data.roadAddress);
        window.close();
      },
    }).open();
  }, [onComplete]);

  return (
    <button
      onClick={(e) => {
        e.preventDefault();
        handleClick();
      }}
      style={{ cursor: 'pointer' }}
    >
      주소 검색
    </button>
  );
}
