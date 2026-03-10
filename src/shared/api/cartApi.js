import { apiFetch } from './apiClient';

export const getMyCart = () => {
  return apiFetch('/api/carts', {
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
