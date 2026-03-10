import { getAccessToken, getRefreshToken, setAccessToken, setRefreshToken, clearTokens } from '../utils/token';

const API_BASE_URL = 'http://localhost:8080';

export const apiFetch = async (url, options = {}) => {
  let accessToken = getAccessToken();

  console.log('요청 URL', `${API_BASE_URL}${url}`);
  console.log('accessToken', accessToken);

  let response = await fetch(`${API_BASE_URL}${url}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...(accessToken && { Authorization: `Bearer ${accessToken}` }),
      ...options.headers
    }
  });

  // accessToken 정상
  if (response.status !== 401) {
    return response;
  }

  // refreshToken 가져오기
  const refreshToken = getRefreshToken();

  if (!refreshToken) {
    clearTokens();
    window.location.href = '/auth/login';
    throw new Error('refreshToken 없음');
  }

  // reissue 요청
  const reissueResponse = await fetch(`${API_BASE_URL}api/auth/reissue`, {
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

  // 토큰 저장
  setAccessToken(newAccessToken);

  if (newRefreshToken) {
    setRefreshToken(newRefreshToken);
  }

  // 원래 요청 재시도
  response = await fetch(`${API_BASE_URL}${url}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${newAccessToken}`,
      ...options.headers
    }
  });

  return response;
};
