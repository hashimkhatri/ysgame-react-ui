import axios from 'axios';

export const baseUrl = 'https://api.yester.games';
// export const baseUrl = 'https://ygames_server.test';

const apiClient = axios.create({
  baseURL: baseUrl+'/api/v1',
  timeout: 10000,
});

// Request Interceptor
apiClient.interceptors.request.use(
  async (config) => {
    try {
      const authResponse = await localStorage.getItem('authResponse');

      if (authResponse != null) {
        const parsedResponse = JSON.parse(authResponse);
        const token = parsedResponse.access_token;
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
      }
    } catch (error) {
      console.error('Failed to retrieve auth token:', error);
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response Interceptor
apiClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    let message = 'An unexpected error occurred.';

    if (error.response) {
      const { status, data } = error.response;
      switch (status) {
        case 400:
          message = data.message || '400: Bad request. Please check your input.';
          break;
        case 401:
          message = '401: Unauthorized. Please log in again.';
          break;
        case 403:
          message = '403: Forbidden. You do not have permission to access this resource.';
          break;
        case 404:
          message = '404: Not found. The requested resource could not be found.';
          break;
        case 500:
          message = '500: Server error. Please try again later.';
          break;
        case 422:
          message = data.errors 
            ? Object.values(data.errors).flat().join('\n')
            : '422: Unprocessable Entity. Please check your input.';
          break;
        default:
          message = data.message || 'An error occurred. Please try again.';
      }
    } else if (error.request) {
      message = 'Network error. Please check your connection.';
    }

    return Promise.reject(new Error(message));
  }
);

// General API call function
export const apiCall = async (method, url, data = null, config = {}) => {
  try {
    const response = await apiClient.request({
      url,
      method,
      data,
      ...config,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Convenience functions for specific HTTP methods
export const get = (url, config = {}) => apiCall('GET', url, null, config);
export const post = (url, data, config = {}) => apiCall('POST', url, data, config);
export const put = (url, data, config = {}) => apiCall('PUT', url, data, config);
export const del = (url, config = {}) => apiCall('DELETE', url, null, config);
