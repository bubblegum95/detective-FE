'use client';
import { useEffect, useState } from 'react';
import styles from '../../styles/ConsultingApp.module.css';
import { Category, Detective } from '../../types/userInfoState.interface';
import { createConsultingApp } from '../../utils/createConsultingApp';
import { getCategories } from '../../utils/getCategories';

interface CreateConsultingProps {
  detectiveId: Detective['id'];
}

const CreateConsulting: React.FC<CreateConsultingProps> = ({ detectiveId }) => {
  const [form, setForm] = useState({ subject: '', content: '' });
  const [selectedCategory, setSelectedCategory] = useState<Category['id']>();
  const [categories, setCategories] = useState<Category[]>();

  const handleGetCategories = async () => {
    const categories = await getCategories();
    setCategories(categories);
  };

  const handleCreateConsulting = async () => {
    const token = localStorage.getItem('authorization');
    if (!token || !detectiveId || !selectedCategory || !form) return;
    const result = await createConsultingApp(
      token,
      detectiveId,
      selectedCategory,
      form
    );
    if (result) {
      setForm({ subject: '', content: '' });
    }
  };

  useEffect(() => {
    handleGetCategories();
  }, []);

  return (
    <div>
      <h1>상담 신청하기</h1>

      <form action="" className={styles.form}>
        <label htmlFor="category" className={styles.label}>
          category
        </label>
        <br />
        <select
          id="category"
          className={styles.select}
          onChange={(e) => {
            setSelectedCategory(+e.target.value);
          }}
        >
          <option value="" key={'default'}>
            please select consult category!
          </option>
          {categories &&
            categories.map((category) => (
              <option value={category.id} key={category.id}>
                {category.name}
              </option>
            ))}
        </select>
        <br />
        <label htmlFor="subject" className={styles.label}>
          subject
        </label>
        <br />
        <input
          className={styles.subject}
          type="text"
          id="subject"
          value={form.subject}
          maxLength={30}
          onChange={(e) => {
            setForm((prev) => ({ ...prev, subject: e.target.value }));
          }}
        />
        <br />
        <label htmlFor="content" className={styles.label}>
          content
        </label>
        <br />
        <textarea
          name=""
          id=""
          cols={10}
          rows={10}
          className={styles.content}
          value={form.content}
          maxLength={300}
          onChange={(e) => {
            setForm((prev) => ({ ...prev, content: e.target.value }));
          }}
        ></textarea>
        <br />
        <button
          onClick={(e) => {
            e.preventDefault();
            if (!form.subject || !form.content || !selectedCategory) {
              alert('상담 제목과 내용, 카테고리를 입력해주세요.');
              return;
            }
            handleCreateConsulting();
          }}
        >
          신청완료
        </button>
      </form>
    </div>
  );
};

export default CreateConsulting;
