import { setAccessToken, setRefreshToken, getRefreshToken, clearTokens } from '../utils/token';
import { setUserId, setLoginId, setRoles, setUserName, clearUsers } from '../utils/user';
const API_BASE_URL = 'http://localhost:8080';

/**
 * 로그인
 */
export const login = async (loginId, password) => {
  const response = await fetch(`${API_BASE_URL}/api/auth/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      loginId,
      password
    })
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || '로그인 실패');
  }

  const accessToken = data.accessToken ?? data.data?.accessToken;
  const refreshToken = data.refreshToken ?? data.data?.refreshToken;

  const user = data.user ?? data.data?.user;
  const userId = user?.id;
  const userLoginId = user?.loginId;
  const userName = user?.name;
  const userRoles = user?.roles;

  if (accessToken) {
    setAccessToken(accessToken);
  }

  if (refreshToken) {
    setRefreshToken(refreshToken);
  }

  if (userId) {
    setUserId(userId);
  }

  if (userLoginId) {
    setLoginId(userLoginId);
  }

  if (userName) {
    setUserName(userName);
  }

  if (userRoles) {
    setRoles(userRoles);
  }

  return data;
};

/**
 * 토큰 재발급
 */
export const reissueToken = async () => {
  const refreshToken = getRefreshToken();

  if (!refreshToken) {
    throw new Error('refreshToken이 없습니다.');
  }

  const response = await fetch(`${API_BASE_URL}/api/auth/reissue`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Refresh-Token': refreshToken
    }
  });

  const data = await response.json();

  if (!response.ok) {
    clearTokens();
    clearUsers();
    throw new Error('토큰 재발급 실패');
  }

  const newAccessToken = data.accessToken ?? data.data?.accessToken;
  const newRefreshToken = data.refreshToken ?? data.data?.refreshToken;

  if (newAccessToken) {
    setAccessToken(newAccessToken);
  }

  if (newRefreshToken) {
    setRefreshToken(newRefreshToken);
  }

  return newAccessToken;
};

/**
 * 로그아웃
 */
export const logout = () => {
  clearTokens();
  clearUsers();
  window.location.href = '/auth/login';
};
