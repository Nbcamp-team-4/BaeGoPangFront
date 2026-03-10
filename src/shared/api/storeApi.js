import { apiFetch } from './apiClient';
import { getDefaultAddress } from './addressApi';

// 가게 상세 조회
export const getStoreDetail = (storeId) => {
  return apiFetch(`/api/stores/${storeId}`, {
    method: 'GET'
  });
};

// 내 주변 가게 조회
export const getNearbyStores = async ({ page = 0, size = 10, categoryId }) => {
  const params = new URLSearchParams();

  const defaultAddress = await getDefaultAddress();
  if (defaultAddress) {
    params.append('addressId', defaultAddress.id);
  }
  if (page !== undefined && page !== null) params.append('page', page);
  if (size !== undefined && size !== null) params.append('size', size);
  if (categoryId) params.append('categoryId', categoryId);

  return await apiFetch(`/api/stores/nearby?${params.toString()}`, {
    method: 'GET'
  });
};
