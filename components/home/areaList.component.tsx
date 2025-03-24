'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

async function fetchAreas() {
  try {
    const url = process.env.BASE_URL;
    const path = 'regions';
    const req = await fetch(`${url}/${path}`);
    const res = await req.json();
    if (!res.success) {
      throw new Error(res.error);
    }
    console.log(res.data);
    return res.data;
  } catch (error) {}
}

const AreaList = () => {
  const [areas, setAreas] = useState<Array<{ id: number; name: string }>>([]);
  const router = useRouter();

  useEffect(() => {
    const handleFetchAreas = async () => {
      const fetched = await fetchAreas();
      setAreas(fetched);
    };
    handleFetchAreas();
  }, []);

  return (
    <div>
      <div>
        <h1 className="listTitle">지역</h1>
      </div>
      <div className="areaList list">
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
