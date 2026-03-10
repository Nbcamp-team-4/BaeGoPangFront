import { apiFetch } from './apiClient';

export const getStoreReviews = async (storeId, page = 0, size = 10) => {
  return await apiFetch(`/api/reviews/stores/${storeId}?page=${page}&size=${size}`, {
    method: 'GET'
  });
};

export const createReview = async ({ orderId, userId, rating, content, files = [] }) => {
  const formData = new FormData();

  const requestData = {
    orderId,
    rating,
    content
  };

  formData.append(
    'request',
    new Blob([JSON.stringify(requestData)], {
      type: 'application/json'
    })
  );

  if (Array.isArray(files) && files.length > 0) {
    files.forEach((file) => {
      formData.append('images', file);
    });
  }

  return await apiFetch(`/api/reviews/orders/${orderId}`, {
    method: 'POST',
    headers: {
      'X-User-Id': String(userId).trim()
    },
    body: formData
  });
};

export const updateReview = async (reviewId, payload) => {
  return await apiFetch(`/api/reviews/${reviewId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(payload)
  });
};

export const deleteReview = async (reviewId, userId) => {
  return await apiFetch(`/api/reviews/${reviewId}`, {
    method: 'DELETE',
    headers: {
      'X-User-Id': String(userId).trim()
    }
  });
};
