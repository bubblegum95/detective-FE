'use client';

import React, { useEffect, useState } from 'react';
import { Detective, Review } from '../../types/userInfoState.interface';
import Pagenation from '../util/Pagenation.component';
import ReviewScore from './ReviewScore.component';

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
    console.log(reviews);
    return { reviews, total };
  } catch (error) {
    console.error(error);
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

    return data.data;
  } catch (error) {
    console.log(error);
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

  const handleSetReviewForm = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setReviewForm((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div>
      {
        <div>
          <h3>Leave a Review</h3>
          <form action="">
            <label htmlFor="">accuracy</label>
            <ReviewScore name="accuracy" range={5} onChange={handleScore} />
            <br />
            <label htmlFor="">completion</label>
            <ReviewScore name="completion" range={5} onChange={handleScore} />
            <br />
            <label htmlFor="">reliability</label>
            <ReviewScore name="reliability" range={5} onChange={handleScore} />
            <br />
            <label htmlFor="">speed</label>
            <ReviewScore name="speed" range={5} onChange={handleScore} />
            <br />
            <label htmlFor="">comment</label>
            <br />
            <input
              type="text"
              name="comment"
              value={reviewForm.comment}
              onChange={handleSetReviewForm}
            />
            <button
              onClick={(e) => {
                e.preventDefault();
                createReview(id, reviewForm);
              }}
            >
              작성완료
            </button>
          </form>
        </div>
      }

      <h3>Reviews</h3>
      {reviewsInfo &&
        reviewsInfo.reviews &&
        reviewsInfo.reviews.map((review) => (
          <div key={review.id}>
            <div>
              <h4>{review.consumer.nickname}</h4>
            </div>
            <div>
              <span>accuracy: {review.accuracy} 점</span>{' '}
              <span>completion: {review.completion} 점</span>{' '}
              <span>reliability: {review.reliability} 점</span>{' '}
              <span>speed: {review.speed} 점</span>
            </div>
            <div>{review.comment}</div>
            <div>{new Date(review.createdAt).toLocaleDateString()}</div>
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
  );
};

export default ReviewsComponent;
