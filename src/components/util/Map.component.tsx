'use client';

import { useEffect, useRef } from 'react';

interface MapProps {
  address: string;
  name: string;
}

export default function Map({ address, name }: MapProps) {
  const mapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mapRef.current) return;

    const KAKAO_APP_KEY = process.env.NEXT_PUBLIC_KAKAO_APP_KEY;
    const script = document.createElement('script');
    script.src = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=${KAKAO_APP_KEY}&libraries=services&autoload=false`;
    script.async = true;
    script.onload = () => {
      const kakaoMap = window.kakao.maps;

      kakaoMap.load(() => {
        const mapContainer = mapRef.current;
        const geocoder = new window.kakao.maps.services.Geocoder();

        geocoder.addressSearch(address, (result: any, status: any) => {
          if (status === kakaoMap.services.Status.OK) {
            const coords = new kakaoMap.LatLng(result[0].y, result[0].x);
            const mapOption = {
              center: coords, // 기본 중심 좌표
              level: 3,
            };
            const map = new kakaoMap.Map(mapContainer, mapOption);
            const marker = new kakaoMap.Marker({
              map,
              position: coords,
            });

            const infowindow = new kakaoMap.InfoWindow({
              content: `<div style="width:150px;text-align:center;padding:6px 0;color:black;">${name}</div>`,
            });
            infowindow.open(map, marker);
            map.setCenter(coords);
          } else {
            console.log('not ok');
          }
        });
      });
    };

    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, [address, name]);

  return (
    <section>
      <div
        ref={mapRef}
        style={{
          width: '100%',
          height: '400px',
          borderRadius: '5px',
          zIndex: -1,
        }}
      />
    </section>
  );
}
