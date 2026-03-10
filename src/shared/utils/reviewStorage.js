const SUBMITTED_REVIEWS_STORAGE_KEY = 'baegopang:submitted-reviews';

const readSubmittedReviews = () => {
  try {
    const rawValue = localStorage.getItem(SUBMITTED_REVIEWS_STORAGE_KEY);
    return rawValue ? JSON.parse(rawValue) : [];
  } catch {
    return [];
  }
};

export const getSubmittedReviews = () => readSubmittedReviews();

export const getSubmittedReviewByOrderId = (orderId) => {
  return readSubmittedReviews().find((review) => review.orderId === orderId) || null;
};

export const hasSubmittedReview = (orderId) => {
  return !!getSubmittedReviewByOrderId(orderId);
};

export const saveSubmittedReview = (review) => {
  const existingReviews = readSubmittedReviews().filter((item) => item.orderId !== review.orderId);
  const nextReviews = [
    {
      savedAt: new Date().toISOString(),
      ...review
    },
    ...existingReviews
  ];

  localStorage.setItem(SUBMITTED_REVIEWS_STORAGE_KEY, JSON.stringify(nextReviews));
};