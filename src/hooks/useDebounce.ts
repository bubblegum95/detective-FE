'use client';

import { useEffect, useState } from 'react';

export default function useDebounce<V>(value: V, deley: number) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const timerId = setTimeout(() => {
      setDebouncedValue(value);
    }, deley);

    return () => {
      clearTimeout(timerId);
    };
  }, [value, deley]);

  return debouncedValue;
}
