import { apiFetch } from './apiClient';
import { saveSubmittedReview } from '../utils/reviewStorage';

const REVIEW_FALLBACK_STORAGE_KEY = 'baegopang:pending-reviews';

const savePendingReview = (review) => {
  const savedReviews = JSON.parse(localStorage.getItem(REVIEW_FALLBACK_STORAGE_KEY) || '[]');
  const nextReviews = [
    {
      id: `local-${Date.now()}`,
      createdAt: new Date().toISOString(),
      ...review
    },
    ...savedReviews
  ];

  localStorage.setItem(REVIEW_FALLBACK_STORAGE_KEY, JSON.stringify(nextReviews));
};

export const createReview = async ({ orderId, rating, content, storeName }) => {
  const reviewPayload = {
    orderId,
    rating,
    content,
    ...(storeName ? { storeName } : {})
  };

  let response;

  try {
    response = await apiFetch('/api/reviews', {
      method: 'POST',
      body: JSON.stringify(reviewPayload)
    });
  } catch (error) {
    if (import.meta.env.DEV) {
      savePendingReview(reviewPayload);
      saveSubmittedReview(reviewPayload);
      return {
        mocked: true,
        message: '백엔드 연결 실패로 로컬에 임시 저장했습니다.'
      };
    }

    throw error;
  }

  let data = null;
  const contentType = response.headers.get('content-type') || '';

  if (contentType.includes('application/json')) {
    data = await response.json();
  } else {
    const text = await response.text();
    data = text ? { message: text } : null;
  }

  if (!response.ok) {
    throw new Error(data?.message || '리뷰 등록에 실패했습니다.');
  }

  saveSubmittedReview(reviewPayload);

  return data;
};