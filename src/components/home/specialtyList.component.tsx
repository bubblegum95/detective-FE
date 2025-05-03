'use client';

import { useEffect, useState } from 'react';
import { Category } from '../../types/userInfoState.interface';
import { useRouter } from 'next/router';
import { getCategories } from '../../utils/getCategories';
import styles from '../../styles/CategoriesRegions.module.css';

const SpecialtyList = () => {
  const router = useRouter();
  const [categories, setCategories] = useState<Array<Category>>([]);

  useEffect(() => {
    const handleFetchCategories = async () => {
      const categories = await getCategories();
      setCategories(categories);
    };
    handleFetchCategories();
  }, []);

  return (
    <div className={styles.searchKeyword}>
      <div>
        <h1 className={styles.title}>전문분야</h1>
      </div>
      <div className={styles.lists}>
        {categories?.map((category) => (
          <span
            key={category.id}
            onClick={() => {
              router.push(`detectives?categoryId=${category.id}`);
            }}
          >
            {category.name}
          </span>
        ))}
      </div>
    </div>
  );
};

export default SpecialtyList;
