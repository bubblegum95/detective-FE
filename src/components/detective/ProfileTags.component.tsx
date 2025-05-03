'use client';

import React, { useEffect, useRef, useState } from 'react';
import { HasIdAndName, TagType } from '../../types/detectiveTags.interface';
import { addTag } from '../../utils/addTags';

export interface ProfileTagsProps<T extends HasIdAndName> {
  type: TagType;
  tags: T[];
  fetchFn: () => Promise<T[]>;
}

export async function removeTag(type: TagType, id: number) {
  try {
    const token = localStorage.getItem('authorization');
    if (!token) return;

    const url = process.env.BASE_URL;
    const res = await fetch(`${url}/detectives/${type}/${id}`, {
      headers: {
        authorization: token,
      },
      method: 'DELETE',
    });
    const data = await res.json();

    if (!res.ok || !data.success) {
      throw new Error(data.error);
    }

    return true;
  } catch (error) {
    alert(error);
    return false;
  }
}

const ProfileTags = <T extends HasIdAndName>({
  type,
  tags,
  fetchFn,
}: ProfileTagsProps<T>) => {
  const [items, setItems] = useState<T[]>(tags); // 상태로 관리
  const [isOpen, setIsOpen] = useState(false);
  const [options, setOptions] = useState<T[]>([]);
  const [selectedId, setSelectedId] = useState<T['id'] | null>(null);
  const tagsRef = useRef(null);

  useEffect(() => {
    const fetchOptions = async () => {
      try {
        const result = await fetchFn();
        setOptions(result);
      } catch (error) {
        alert(error);
      }
    };
    fetchOptions();
  }, [fetchFn]);

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const id = e.target.value;
    setSelectedId(+id);
  };

  const handleRemoveTag = async (type: TagType, id: number) => {
    const result = await removeTag(type, id);
    if (!result) return;

    setItems((prev) => prev.filter((tag) => tag.id !== id));
  };

  const handleAddTag = async () => {
    if (!selectedId) return;
    const result = await addTag(type, selectedId);

    if (!result) return;
  };

  return (
    <div>
      <div ref={tagsRef}>
        {items.map((item) => (
          <span key={item.id}>
            {item.name}{' '}
            <button
              onClick={() => {
                handleRemoveTag(type, item.id);
              }}
            >
              ❌
            </button>
          </span>
        ))}
      </div>

      <div>
        <button onClick={() => setIsOpen((prev) => !prev)}>﹢</button>
        {isOpen && (
          <div>
            <form action="">
              <select id={`tag-select-${type}`} onChange={handleChange}>
                <option value="">-------{type}-------</option>
                {options.map((item) => (
                  <option key={item.id} value={item.id}>
                    {item.name}
                  </option>
                ))}
              </select>
              <button
                onClick={async (e) => {
                  e.preventDefault();
                  if (!selectedId) return;

                  const result = await addTag(type, selectedId);
                  alert('태그를 추가하였습니다.');
                }}
              >
                추가하기
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfileTags;
