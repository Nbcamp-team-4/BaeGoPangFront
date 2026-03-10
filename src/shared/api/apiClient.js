import { getAccessToken, getRefreshToken, setAccessToken, setRefreshToken, clearTokens } from '../utils/token';

const API_BASE_URL = '';

export const apiFetch = async (url, options = {}) => {
  let accessToken = getAccessToken();
  const isFormData = options.body instanceof FormData;

  const headers = {
    ...(accessToken && { Authorization: `Bearer ${accessToken}` }),
    ...options.headers
  };

  // FormData가 아닐 때만 application/json 지정
  if (options.body && !isFormData && !headers['Content-Type']) {
    headers['Content-Type'] = 'application/json';
  }

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

  // 재요청 때도 동일하게 FormData 예외 처리
  if (options.body && !isFormData && !retryHeaders['Content-Type']) {
    retryHeaders['Content-Type'] = 'application/json';
  }

  response = await fetch(`${API_BASE_URL}${url}`, {
    ...options,
    headers: retryHeaders
  });

  return response;
};
