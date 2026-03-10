import { apiFetch } from './apiClient';

// 가게 상세 조회
export const getStoreDetail = (storeId) => {
  return apiFetch(`/api/stores/${storeId}`, {
    method: 'GET'
  });
};

// 전체 가게 조회
export const getStores = ({ page = 0, size = 10, categoryId }) => {
  const params = new URLSearchParams();

  if (page !== undefined && page !== null) params.append('page', page);
  if (size !== undefined && size !== null) params.append('size', size);
  if (categoryId) params.append('categoryId', categoryId);

  return apiFetch(`/api/stores/public?${params.toString()}`, {
    method: 'GET'
  });
};

// 내 주변 가게 조회
export const getNearbyStores = async ({ page = 0, size = 10, categoryId }) => {
  const params = new URLSearchParams();

  const addressRes = await getDefaultAddress();
  console.log('기본 주소 원본 응답:', addressRes);

  let addressId = null;

  if (addressRes instanceof Response) {
    if (!addressRes.ok) {
      const bodyText = await addressRes.text().catch(() => '');
      throw new Error(`default address request failed: ${addressRes.status} ${addressRes.statusText} ${bodyText}`);
    }

    const addressJson = await addressRes.json();
    console.log('기본 주소 JSON:', addressJson);

    const defaultAddress = addressJson?.data ?? addressJson;
    addressId = defaultAddress?.id;
  } else {
    addressId = addressRes?.data?.id ?? addressRes?.id ?? null;
  }

  if (!addressId) {
    throw new Error('기본 배송지 id를 찾을 수 없습니다.');
  }

  params.append('addressId', addressId);
  if (page !== undefined && page !== null) params.append('page', page);
  if (size !== undefined && size !== null) params.append('size', size);
  if (categoryId) params.append('categoryId', categoryId);

  console.log('nearby 최종 요청 쿼리:', params.toString());

  return await apiFetch(`/api/stores/nearby?${params.toString()}`, {
    method: 'GET'
  });
};
