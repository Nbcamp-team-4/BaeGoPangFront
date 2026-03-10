import { apiFetch } from './apiClient';
import { getAddresses } from './addressApi';

// 가게 상세 조회
export const getStoreDetail = (storeId) => {
  return apiFetch(`/api/stores/${storeId}`, {
    method: 'GET'
  });
};

// 가게 전체 조회
export const getStores = async (categoryId) => {
  const res = await getAddresses();

  if (!res.ok) {
    console.error('주소 조회 실패', res);
    return [];
  }
  console.log('주소 조회 응답:', res);

  const json = await res.json();
  const addresses = json?.content ?? json?.data?.content ?? json?.data ?? [];

  const addressId = addresses[0]?.id;

  if (!addressId) {
    console.error('기본 주소가 없습니다.');
    return [];
  }

  return apiFetch(`/api/stores/nearby?addressId=${addressId}&categoryId=${categoryId ?? ''}`, {
    method: 'GET'
  });
};
