import { apiFetch } from './apiClient';

// 특정 가게의 상품 목록 조회
export const getProductsByStore = (storeId) => {
  return apiFetch(`/api/products?storeId=${storeId}`, {
    method: 'GET'
  });
};

// 상품 단건 상세 조회
export const getProductDetail = (productId) => {
  return apiFetch(`/api/products/${productId}`, {
    method: 'GET'
  });
};
