import { getAccessToken, getRefreshToken, setAccessToken, setRefreshToken, clearTokens } from '../utils/token';

const API_BASE_URL = '';

export const apiFetch = async (url, options = {}) => {
  let accessToken = getAccessToken();

  const headers = {
    ...(accessToken && { Authorization: `Bearer ${accessToken}` }),
    ...options.headers
  };

  if (options.body) {
    headers['Content-Type'] = 'application/json';
  }

  // console.log('요청 URL', `${API_BASE_URL}${url}`);
  // console.log('accessToken', accessToken);

  let response = await fetch(`${API_BASE_URL}${url}`, {
    ...options,
    headers
  });

  if (response.status !== 401) {
    return response;
  }

  const refreshToken = getRefreshToken();

  if (!refreshToken) {
    clearTokens();
    window.location.href = '/auth/login';
    throw new Error('refreshToken 없음');
  }

  const reissueResponse = await fetch(`${API_BASE_URL}/api/auth/reissue`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Refresh-Token': refreshToken
    }
  });

  if (!reissueResponse.ok) {
    clearTokens();
    window.location.href = '/auth/login';
    throw new Error('토큰 재발급 실패');
  }

  const reissueData = await reissueResponse.json();

  const newAccessToken = reissueData.accessToken ?? reissueData.data?.accessToken;
  const newRefreshToken = reissueData.refreshToken ?? reissueData.data?.refreshToken;

  if (!newAccessToken) {
    clearTokens();
    window.location.href = '/auth/login';
    throw new Error('새 accessToken 없음');
  }

  setAccessToken(newAccessToken);

  if (newRefreshToken) {
    setRefreshToken(newRefreshToken);
  }

  const retryHeaders = {
    Authorization: `Bearer ${newAccessToken}`,
    ...options.headers
  };

  if (options.body) {
    retryHeaders['Content-Type'] = 'application/json';
  }

  response = await fetch(`${API_BASE_URL}${url}`, {
    ...options,
    headers: retryHeaders
  });

  return response;
};
