'use client';

import { useEffect, useReducer, useRef } from 'react';
import { Detective } from '../../types/userInfoState.interface';
import { fetchDetectives } from '../../utils/getDetectives';
import { useRouter } from 'next/router';
import styles from '../../styles/Detectives.module.css';
import Pagenation from '../../components/util/Pagenation.component';

// 액션 타입 정의
const actionTypes = {
  SET_PAGE: 'SET_PAGE',
  SET_TOTAL: 'SET_TOTAL',
  SET_DETECTIVES: 'SET_DETECTIVES',
} as const; // `as const`로 리터럴 타입을 보장

// 액션 타입을 문자열 리터럴로 정의
type PaginationAction =
  | { type: typeof actionTypes.SET_PAGE; payload: number }
  | { type: typeof actionTypes.SET_TOTAL; payload: number }
  | { type: typeof actionTypes.SET_DETECTIVES; payload: Detective[] };

// 초기 상태 설정
const initialState = {
  page: 1,
  total: 0,
  detectives: [] as Detective[], // `Detective[]` 타입 명시
};

// 리듀서 함수 정의
function paginationReducer(
  state: typeof initialState,
  action: PaginationAction
) {
  switch (action.type) {
    case actionTypes.SET_PAGE:
      return { ...state, page: action.payload };
    case actionTypes.SET_TOTAL:
      return { ...state, total: action.payload };
    case actionTypes.SET_DETECTIVES:
      return { ...state, detectives: action.payload };
    default:
      return state;
  }
}

const Detectives = () => {
  const router = useRouter();
  const { areaId, categoryId } = router.query;
  const [state, dispatch] = useReducer(paginationReducer, initialState);
  const { page, total, detectives } = state;
  const items = useRef(10);

  useEffect(() => {
    const handleFetchDetective = async () => {
      if (areaId) {
        const { data, total } = await fetchDetectives(
          page,
          items.current,
          'region',
          Number(areaId)
        );
        dispatch({ type: actionTypes.SET_DETECTIVES, payload: data });
        dispatch({ type: actionTypes.SET_TOTAL, payload: total });
      } else if (categoryId) {
        const { data, total } = await fetchDetectives(
          page,
          items.current,
          'category',
          Number(categoryId)
        );
        dispatch({ type: actionTypes.SET_DETECTIVES, payload: data });
        dispatch({ type: actionTypes.SET_TOTAL, payload: total });
      } else {
        const { data, total } = await fetchDetectives(page, items.current);
        dispatch({ type: actionTypes.SET_DETECTIVES, payload: data });
        dispatch({ type: actionTypes.SET_TOTAL, payload: total });
      }
    };
    handleFetchDetective();
  }, [page, areaId, categoryId]);

  const handlePageChange = (newPage: number) => {
    dispatch({ type: actionTypes.SET_PAGE, payload: newPage });
  };

  return (
    <div className={styles.container}>
      {detectives.map((detective) => (
        <div
          key={detective.id}
          className={styles.item}
          onClick={() => {
            router.push(`/detectives/${detective.id}`);
          }}
        >
          <div>탐정: {detective.user.name}</div>
          <div>한마디: {detective.subject}</div>
          <div className={styles.officeData}>
            <div>{detective.office?.name}</div>
            <div>{detective.office?.address}</div>
          </div>
        </div>
      ))}
      <Pagenation
        page={page}
        limit={10}
        total={total}
        handlePageChange={handlePageChange}
      />
    </div>
  );
};

export default Detectives;
