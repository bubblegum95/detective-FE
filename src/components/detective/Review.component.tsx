'use client';

import React, { useEffect, useState } from 'react';
import { Detective, Review } from '../../types/userInfoState.interface';
import Pagenation from '../util/Pagenation.component';
import ReviewScore from './ReviewScore.component';
import styles from '../../styles/Review.module.css';

interface ReviewProps {
  id: Detective['id'];
}

export async function getReviews(
  detectiveId: Detective['id'],
  page: number,
  limit: number
) {
  try {
    const url = process.env.BASE_URL;
    const res = await fetch(
      `${url}/reviews/${detectiveId}?page=${page}&limit=${limit}`
    );
    const data = await res.json();

    if (!res.ok || !data.success) {
      throw new Error(data.message);
    }

    const reviews = data.data as Review[];
    const total = data.total;
    return { reviews, total };
  } catch (error) {
    return { reviews: [], total: 0 };
  }
}

export async function createReview(
  id: Detective['id'],
  form: {
    accuracy: number;
    completion: number;
    reliability: number;
    speed: number;
    comment: string;
  }
) {
  try {
    const token = localStorage.getItem('authorization');
    if (!token) return;

    const url = process.env.BASE_URL;
    const res = await fetch(`${url}/reviews/${id}`, {
      headers: {
        'Content-type': 'application/json',
        authorization: token,
      },
      method: 'POST',
      body: JSON.stringify(form),
    });
    const data = await res.json();

    if (!res.ok || !data.success) {
      throw new Error(data.message);
    }

    return true;
  } catch (error) {
    alert(error);
    return false;
  }
}

const ReviewsComponent: React.FC<ReviewProps> = ({ id }) => {
  if (!id) return;
  const [reviewsInfo, setReviewsInfo] = useState<{
    reviews: Review[];
    total: number;
  }>();
  const [page, setPage] = useState<number>(1);
  const [limit, setLimit] = useState<number>(10);
  const [reviewForm, setReviewForm] = useState({
    accuracy: 0,
    completion: 0,
    reliability: 0,
    speed: 0,
    comment: '',
  });

  useEffect(() => {
    const handleGetReviews = async () => {
      const result = await getReviews(id, page, limit);
      setReviewsInfo(result);
    };

    handleGetReviews();
  }, [id]);

  const handleScore = (name: string, value: number) => {
    setReviewForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSetReviewForm = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setReviewForm((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className={styles.container}>
      <div className={styles.leaveReviewContainer}>
        <form action="" className={styles.leaveReviewForm}>
          <div className={styles.evaluation}>
            <label htmlFor="">정확도</label>
            <ReviewScore name="accuracy" range={5} onChange={handleScore} />
          </div>

          <div className={styles.evaluation}>
            <label htmlFor="">완성도</label>
            <ReviewScore name="completion" range={5} onChange={handleScore} />
          </div>

          <div className={styles.evaluation}>
            <label htmlFor="">신뢰도</label>
            <ReviewScore name="reliability" range={5} onChange={handleScore} />
          </div>

          <div className={styles.evaluation}>
            <label htmlFor="">속도</label>
            <ReviewScore name="speed" range={5} onChange={handleScore} />
          </div>

          <textarea
            name="comment"
            value={reviewForm.comment}
            placeholder="comment..."
            onChange={handleSetReviewForm}
            className={styles.textarea}
          />

          <button
            className={styles.btn}
            onClick={(e) => {
              const result = createReview(id, reviewForm);
              if (!result) {
                e.preventDefault();
              }
              alert('댓글 작성을 완료하였습니다.');
            }}
          >
            Submit
          </button>
        </form>
      </div>

      <div className={styles.reviewsContainer}>
        {reviewsInfo &&
          reviewsInfo.reviews &&
          reviewsInfo.reviews.map((review) => (
            <div key={review.id} className={styles.review}>
              <div className={styles.reviewer}>
                {review.consumer.nickname} (
                {new Date(review.createdAt).toLocaleDateString()})
              </div>

              <div>
                <span>정확도: {review.accuracy} 점</span>{' '}
                <span>완성도: {review.completion} 점</span>{' '}
                <span>신뢰도: {review.reliability} 점</span>{' '}
                <span>속도: {review.speed} 점</span>
              </div>

              <div>{review.comment}</div>
            </div>
          ))}

        {reviewsInfo && reviewsInfo.total !== 0 && (
          <div>
            <Pagenation
              page={page}
              limit={limit}
              total={reviewsInfo.total}
              handlePageChange={setPage}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default ReviewsComponent;
