'use client';

import Image from 'next/image';
import { Profile } from '../../types/userInfoState.interface';
import { useState } from 'react';

interface ProfileImageProps {
  path: Profile['path'];
  width: number;
  height: number;
  patchFn: (file: File) => void;
}

const ProfileImage: React.FC<ProfileImageProps> = ({
  path,
  width,
  height,
  patchFn,
}) => {
  const [selected, setSelected] = useState(path);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [image, setImage] = useState<File | null>();
  return (
    <div>
      <Image
        src={selected}
        alt=""
        layout="fixed"
        priority={false}
        width={width}
        height={height}
        style={{ objectFit: 'cover', borderRadius: '50%' }}
      />

      <button onClick={() => setIsOpen(!isOpen)}>수정하기</button>

      {isOpen && (
        <div>
          <form action="">
            <input
              type="file"
              accept="image/*"
              onChange={(e) => {
                const file = e.target.files;
                if (!file) return;

                const previewUrl = URL.createObjectURL(file[0]);
                setSelected(previewUrl);
                setImage(file[0]);
              }}
            />
            <button
              onClick={(e) => {
                image && patchFn(image);
              }}
            >
              수정완료
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default ProfileImage;
