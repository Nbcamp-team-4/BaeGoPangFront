import { apiFetch } from './apiClient';

// 가게 상세 조회
export const getStoreDetail = (storeId) => {
  return apiFetch(`/api/stores/${storeId}`, {
    method: 'GET'
  });
};
