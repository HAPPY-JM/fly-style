export const $ = (selector) => {
  return document.querySelector(selector);
};

export const getToken = () => {
  return window.localStorage.getItem("token");
};

export const setToken = ({ token, role }) => {
  window.localStorage.setItem("token", token);
  window.localStorage.setItem("role", role);
};

export const getRole = () => {
  return window.localStorage.getItem("role");
};

export const logout = () => {
  window.localStorage.removeItem("token");
  window.localStorage.removeItem("role");
};
