// frontend/src/utils/authHelper.js

export const getAuthToken = () => {
    return localStorage.getItem('token');
};