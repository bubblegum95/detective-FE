'use client';

import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { getRegions } from '../../utils/getRegions';
import styles from '../../styles/CategoriesRegions.module.css';

const AreaList = () => {
  const [areas, setAreas] = useState<Array<{ id: number; name: string }>>([]);
  const router = useRouter();

  useEffect(() => {
    const handleFetchAreas = async () => {
      const fetched = await getRegions();
      setAreas(fetched);
    };
    handleFetchAreas();
  }, []);

  return (
    <div className={styles.searchKeyword}>
      <div>
        <h1 className={styles.title}>지역</h1>
      </div>
      <div className={styles.lists}>
        {areas.map((area) => (
          <span
            key={area.id}
            className="cursor-pointer hover:underline"
            onClick={() => {
              router.push(`/detectives?areaId=${area.id}`);
            }}
          >
            {area.name}
          </span>
        ))}
      </div>
    </div>
  );
};

export default AreaList;
