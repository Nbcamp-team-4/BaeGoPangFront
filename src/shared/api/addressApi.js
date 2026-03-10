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

  console.log('주소 전체 응답:', addressJson);

  const addressList = addressJson?.data?.content ?? addressJson?.content ?? addressJson?.data ?? [];

  console.log('파싱된 주소 목록:', addressList);

  if (!Array.isArray(addressList) || addressList.length === 0) {
    return null;
  }

  const defaultAddress =
    addressList.find((addr) => addr.isDefault === true) ??
    addressList.find((addr) => addr.isDefault === 'true') ??
    addressList.find((addr) => addr.default === true) ??
    addressList.find((addr) => addr.default === 'true') ??
    addressList[0];

  console.log('기본 주소:', defaultAddress);

  return defaultAddress;
};
