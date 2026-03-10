import { apiFetch } from './apiClient';
<<<<<<< HEAD
import { getMyCart } from './cartApi';
import { getAddresses } from './addressApi';
export const getTotalPrice = async () => {
  const cartRes = await getMyCart();
  const cartJson = await cartRes.json();
  const cartData = cartJson?.data ?? cartJson;

  if (!Array.isArray(cartData?.items) || cartData.items.length === 0) {
    return 0;
  }

  return cartData.items.reduce((cartSum, item) => {
    const basePrice = Number(item.productPrice ?? item.unitPrice ?? 0);
    const quantity = Number(item.quantity ?? 1);

    const optionTotal = Array.isArray(item.options)
      ? item.options.reduce((optionSum, opt) => {
          return optionSum + Number(opt.additionalPrice ?? opt.extraPrice ?? 0);
        }, 0)
      : 0;

    return cartSum + (basePrice + optionTotal) * quantity;
  }, 0);
};
// 주문 생성 payload 만들기
export const buildOrderPayload = (cartRaw, defaultAddress, requestMemo = '') => {
  const cart = cartRaw?.data ?? cartRaw;

  if (!cart?.storeId) {
    throw new Error('장바구니의 storeId가 없습니다.');
  }

  if (!defaultAddress?.id) {
    throw new Error('기본 배송지가 없습니다.');
  }

  if (!Array.isArray(cart?.items) || cart.items.length === 0) {
    throw new Error('장바구니가 비어 있습니다.');
  }

  return {
    storeId: cart.storeId,
    deliveryAddressId: defaultAddress.id,
    requestMemo,
    items: cart.items.map((item) => ({
      productId: item.productId,
      productName: item.productName,
      unitPrice: Number(item.productPrice ?? item.unitPrice ?? 0),
      quantity: Number(item.quantity ?? 1),
      options: Array.isArray(item.options)
        ? item.options.map((opt) => ({
            optionName: opt.optionName,
            optionItemName: opt.optionItemName,
            extraPrice: Number(opt.additionalPrice ?? opt.extraPrice ?? 0)
          }))
        : []
    }))
  };
};

// payload 받아서 주문 생성
export const postOrder = async (payload) => {
  return await apiFetch('/api/orders', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(payload)
  });
};

// 장바구니 + 기본 주소 조회해서 바로 주문 생성
export const createOrderFromCart = async (requestMemo = '') => {
  const cartRes = await getMyCart();
  const cartJson = await cartRes.json();
  const cartData = cartJson?.data ?? cartJson;

  const addressRes = await getAddresses();
  const addressJson = await addressRes.json();
  const addressList = addressJson?.content ?? addressJson?.data?.content ?? [];

  const defaultAddress = addressList.find((addr) => addr.isDefault === true);

  if (!defaultAddress) {
    throw new Error('기본 배송지가 없습니다.');
  }

  const payload = buildOrderPayload(cartData, defaultAddress, requestMemo);
  alert(JSON.stringify(payload));

  return await postOrder(payload);
};

export const getOrder = async (orderId) => {
  return await apiFetch(`/api/orders/${orderId}`);
};

export const cancelOrder = async (orderId, reason) => {
  return await apiFetch(`/api/orders/${orderId}/cancel`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(reason)
  });
=======

export const getOrderDetail = async (orderId) => {
  const response = await apiFetch(`/api/orders/${orderId}`, {
    method: 'GET'
  });

  if (!response.ok) {
    throw new Error('주문 정보를 불러올 수 없습니다.');
  }

  const data = await response.json();
  return data;
};

export const getOrderDetailMock = (orderId) => {
  const mockData = {
    'ORD-001': {
      orderId: 'ORD-001',
      storeName: '맛있는 한식당',
      menuItems: ['김치찌개', '불고기 정식']
    },
    'ORD-002': {
      orderId: 'ORD-002',
      storeName: '황금 중식당',
      menuItems: ['마라탕', '쌀국수']
    },
    'ORD-016': {
      orderId: 'ORD-016',
      storeName: '엄마손 분식',
      menuItems: ['떡볶이', '순대']
    }
  };

  return mockData[orderId] || null;
>>>>>>> 221c319 (feat: review frontend)
};
