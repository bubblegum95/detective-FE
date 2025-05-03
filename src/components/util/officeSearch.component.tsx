'use client';

import React, { useEffect, useState } from 'react';
import useDebounce from '../../hooks/useDebounce';
import { searchOffice } from '../../utils/searchOffice';
import styles from '../../styles/OfficeSearch.module.css';

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
        className={styles.officeInput}
        placeholder="탐정소 이름 검색"
        value={officeInput}
        onChange={(e) => {
          setOfficeInput(e.target.value);
          setIsDropdownVisible(true);
        }}
        onBlur={() => setTimeout(() => setIsDropdownVisible(false), 200)}
      />
      {isDropdownVisible && officeLists && (
        <ul className={styles.dropdown}>
          {officeLists.map((office) => (
            <li
              key={office.id}
              onClick={() => {
                onSelect(office);
                setOfficeInput(office.name);
                setIsDropdownVisible(false);
              }}
              className={styles.list}
            >
              <div className={styles.officeName}>{office.name}</div>
              <div className={styles.officeAddress}>
                {office.address} {office.addressDetail}
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default OfficeSearch;
