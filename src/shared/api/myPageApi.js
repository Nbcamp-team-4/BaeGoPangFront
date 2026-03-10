const BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080/api';

const MOCK_MY_PAGE = {
  name: '홍길동',
  nick: 'user123',
  phone: '010-1234-5678',
  role: 'CUSTOMER',
  orderCount: 28,
  reviewCount: 12,
  favoriteStoreCount: 3,
  point: 1200,
  notificationEnabled: true
};

async function request(url, options = {}) {
  const response = await fetch(url, {
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      ...(options.headers || {})
    },
    ...options
  });

  if (!response.ok) {
    throw new Error(`API 요청 실패: ${response.status}`);
  }

  if (response.status === 204) {
    return null;
  }

  const data = await response.json();
  return data?.data ?? data?.result ?? data;
}

export async function getMyPage() {
  try {
    return await request(`${BASE_URL}/users/me`, {
      method: 'GET'
    });
  } catch (error) {
    console.error('[getMyPage] mock fallback 사용', error);
    return MOCK_MY_PAGE;
  }
}

export async function updateMyProfile(payload) {
  try {
    return await request(`${BASE_URL}/users/me`, {
      method: 'PUT',
      body: JSON.stringify({
        name: payload.name,
        nick: payload.nick,
        phone: payload.phone
      })
    });
  } catch (error) {
    console.error('[updateMyProfile] mock fallback 사용', error);
    return {
      ...MOCK_MY_PAGE,
      ...payload
    };
  }
}

export async function updateNotification(enabled) {
  try {
    return await request(`${BASE_URL}/users/me/notification`, {
      method: 'PUT',
      body: JSON.stringify({
        notificationEnabled: enabled
      })
    });
  } catch (error) {
    console.error('[updateNotification] mock fallback 사용', error);
    return {
      notificationEnabled: enabled
    };
  }
}

export async function logout() {
  try {
    return await request(`${BASE_URL}/auth/logout`, {
      method: 'POST'
    });
  } catch (error) {
    console.error('[logout] mock fallback 사용', error);
    return { success: true };
  }
}
