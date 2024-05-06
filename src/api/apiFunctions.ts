import axios from 'axios';

const baseRemoteUrl = 'https://study-backend-f93592ee2f5e.herokuapp.com'
const baseLocalUrl = 'http://127.0.0.1:5000'
const currentUrl = baseRemoteUrl // change before deploy
export const uploadFile = async (file: File): Promise<string> => {
    const formData = new FormData();
    formData.append('file', file);

    const response = await axios.post(`${currentUrl}/upload`, formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
            'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
        },
    });

    return response.data.task_id;
};

export const checkStatus = async (task_id: string): Promise<any> => {
    const statusUrl = `${currentUrl}/status/${task_id}`;
    const response = await axios.get(statusUrl, {
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
        }
    });
    return response.data;
};

export const loginValidation = async (email: string, password: string): Promise<any> => {
    try {
        const response = await axios.post(`${currentUrl}/login`, {
            email: email,
            password: password
        });
        if (response.status === 200) {
            localStorage.setItem('accessToken', response.data.access_token);
            localStorage.setItem('refreshToken', response.data.refresh_token);
            return {message: response.data.message, status: response.status};
        }
    } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
            return {message: error.response.data.error, status: error.response.status};
        } else {
            return {message: 'Network error or unknown error', status: 500};
        }
    }
}
let refreshPromise: any;

axios.interceptors.response.use(response => response, async error => {
    const originalRequest = error.config;
    const refreshToken = localStorage.getItem('refreshToken');
    if (!refreshToken) {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        if (window.location.pathname !== '/'){
            window.location.href = '/';
        }
        return Promise.reject(error);
    }
    const isRefreshTokenExpired = (refreshToken: string) => Date.now() >= (JSON.parse(atob(refreshToken.split('.')[1]))).exp * 1000
    if (isRefreshTokenExpired(refreshToken)) {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        window.location.href = '/';
        return Promise.reject(error);
    }
    if (error.response.status === 401 && !originalRequest._retry) {
        if (!refreshPromise) {
            if (refreshToken) {
                refreshPromise = axios.post(`${currentUrl}/token_refresh`, {}, {
                    headers: {
                        Authorization: `Bearer ${refreshToken}`
                    }
                })
                    .then(tokenResponse => {
                        console.log('Token Response:', tokenResponse);
                        if (tokenResponse.status === 200) {
                            localStorage.setItem('accessToken', tokenResponse.data.access_token);
                            return tokenResponse.data.access_token;
                        } else {
                            localStorage.removeItem('accessToken');
                            localStorage.removeItem('refreshToken');
                            window.location.href = '/';
                            throw new Error('Invalid token response');
                        }
                    })
                    .catch(refreshError => {
                        console.error('Refresh token invalid:', refreshError);
                        localStorage.removeItem('accessToken');
                        localStorage.removeItem('refreshToken');
                        window.location.href = '/';
                        throw refreshError;
                    })
                    .finally(() => {
                        refreshPromise = null;
                    });
            } else {
                localStorage.removeItem('accessToken');
                localStorage.removeItem('refreshToken');
                window.location.href = '/';
                return Promise.reject(new Error('No refresh token available'));
            }
        }
        const newAccessToken = await refreshPromise;
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        originalRequest._retry = true;
        return axios(originalRequest);
    }
    return Promise.reject(error);
});
