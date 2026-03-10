export const getUserId = () => localStorage.getItem('userId');

export const getLoginId = () => localStorage.getItem('loginId');

export const getRoles = () => localStorage.getItem('roles');

export const getUserName = () => localStorage.getItem('userName');

export const setUserId = (userId) => localStorage.setItem('userId', userId);

export const setLoginId = (loginId) => localStorage.setItem('loginId', loginId);

export const setRoles = (roles) => localStorage.setItem('roles', roles);

export const setUserName = (userName) => localStorage.setItem('userName', userName);

export const clearUsers = () => {
  localStorage.removeItem('userId');
  localStorage.removeItem('loginId');
  localStorage.removeItem('roles');
  localStorage.removeItem('userName');
};
