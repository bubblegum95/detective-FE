'use client';

import { useEffect, useReducer, useRef } from 'react';
import { Detective } from '../../types/userInfoState.interface';
import { fetchDetectives } from '../../utils/getDetectives';
import { useRouter } from 'next/router';

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
          Number(areaId)
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
    <div>
      {detectives.map((detective) => (
        <div
          key={detective.id}
          className="detectiveItem"
          onClick={() => {
            router.push(`/detectives/${detective.id}`);
          }}
        >
          <div>
            {detective.user.name} {detective.subject}
          </div>
          <div>
            {detective.office?.name} {detective.office?.address}
          </div>
        </div>
      ))}
      <div>
        <button
          onClick={() => handlePageChange(page - 1)}
          disabled={page === 1}
        >
          이전
        </button>
        <span>
          {page} / {Math.ceil(total / 10)}
        </span>
        <button
          onClick={() => handlePageChange(page + 1)}
          disabled={page === Math.ceil(total / 10)}
        >
          다음
        </button>
      </div>
    </div>
  );
};

export default Detectives;
