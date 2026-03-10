import { apiFetch } from './apiClient';

export const getMyCart = async () => {
  return await apiFetch('/api/carts', {
    method: 'GET'
  });
};

export const addCartItem = (payload) => {
  return apiFetch('/api/carts', {
    method: 'POST',
    body: JSON.stringify(payload)
  });
};

export const updateCartItem = (cartId, itemId, payload) => {
  return apiFetch(`/api/carts/${cartId}/items/${itemId}`, {
    method: 'PUT',
    body: JSON.stringify(payload)
  });
};

export const deleteCartItem = (itemId) => {
  return apiFetch(`/api/carts/items/${itemId}`, {
    method: 'DELETE'
  });
};

export const clearCart = () => {
  return apiFetch('/api/carts/items', {
    method: 'DELETE'
  });
};

export function normalizeCartResponse(raw) {
  const cart = raw?.data ?? raw;

  return {
    cartId: cart?.cartId ?? '',
    storeId: cart?.storeId ?? '',
    storeName: cart?.storeName ?? '장바구니',
    deliveryFee: Number(cart?.deliveryFee ?? 0),
    items: Array.isArray(cart?.items)
      ? cart.items.map((item) => ({
          id: item.itemId,
          productId: item.productId,
          name: item.productName,
          opt: Array.isArray(item.options)
            ? item.options.map((opt) => `${opt.optionName}: ${opt.optionItemName}`).join(', ')
            : '',
          unitPrice:
            Number(item.productPrice ?? 0) +
            (Array.isArray(item.options)
              ? item.options.reduce((sum, opt) => sum + Number(opt.additionalPrice ?? 0), 0)
              : 0),
          qty: Number(item.quantity ?? 1)
        }))
      : []
  };
}
