import { apiFetch } from './apiClient';

// 주소 전체 조회
export const getAddresses = async () => {
  return await apiFetch(`/api/address`, {
    method: 'GET'
  });
};
