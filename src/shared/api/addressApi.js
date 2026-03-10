import { apiFetch } from './apiClient';

// 주소 전체 조회
export const getAddresses = async () => {
  return await apiFetch(`/api/address`, {
    method: 'GET'
  });
};

// 디폴트 주소 조회
export const getDefaultAddress = async () => {
  const addressRes = await getAddresses();
  const addressJson = await addressRes.json();
  const addressList = addressJson?.content ?? addressJson?.data?.content ?? [];

  const defaultAddress = addressList.find((addr) => addr.isDefault === true);
  return defaultAddress || null;
};
