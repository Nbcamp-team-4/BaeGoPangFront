import { apiFetch } from './apiClient';

// 사용자 조회
export const getUser = async (id) => {
  return await apiFetch(`/api/users/${id}`, {
    method: 'GET'
  });
};
