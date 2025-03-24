'use client';

import React, { useEffect, useState } from 'react';
import { searchOffice } from '../../utils/searchOffice';
import useDebounce from '../../hooks/useDebounce';

export interface Office {
  id: number;
  name: string;
  address: string;
  addressDetail: string;
}

export interface OfficeSearchProps {
  onSelect: (office: Office) => void;
}

const OfficeSearch: React.FC<OfficeSearchProps> = ({ onSelect }) => {
  const [officeInput, setOfficeInput] = useState('');
  const debouncedOfficeInput = useDebounce(officeInput, 500);
  const [officeLists, setOfficeLists] = useState<Office[]>([]);
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);

  useEffect(() => {
    const fetchOffices = async () => {
      const offices = await searchOffice(debouncedOfficeInput, 1, 10);
      setOfficeLists(offices);
    };
    if (debouncedOfficeInput) {
      fetchOffices();
    }
  }, [debouncedOfficeInput]);

  return (
    <div>
      <input
        type="text"
        className="officeInput"
        placeholder="탐정소 이름 검색"
        value={officeInput}
        onChange={(e) => {
          setOfficeInput(e.target.value);
          setIsDropdownVisible(true);
        }}
        onBlur={() => setTimeout(() => setIsDropdownVisible(false), 200)}
      />
      {isDropdownVisible && officeLists.length > 0 && (
        <ul className="dropdown">
          {officeLists.map((office) => (
            <li
              key={office.id}
              onClick={() => {
                onSelect(office);
                setOfficeInput(office.name);
                setIsDropdownVisible(false);
              }}
            >
              {office.name}: {office.address} {office.addressDetail}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default OfficeSearch;
