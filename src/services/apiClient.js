const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

const defaultHeaders = {
  'Content-Type': 'application/json'
};

const handleResponse = async (response) => {
  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    const error = new Error(data.message || 'Richiesta fallita');
    error.status = response.status;
    error.data = data;
    throw error;
  }

  return data;
};

export const apiClient = {
  get: async (path, options = {}) => {
    const response = await fetch(`${API_BASE_URL}${path}`, {
      method: 'GET',
      credentials: 'include',
      headers: options.headers || defaultHeaders,
      ...options
    });
    return handleResponse(response);
  },
  post: async (path, body, options = {}) => {
    const response = await fetch(`${API_BASE_URL}${path}`, {
      method: 'POST',
      credentials: 'include',
      headers: options.headers || defaultHeaders,
      body: JSON.stringify(body),
      ...options
    });
    return handleResponse(response);
  },
  put: async (path, body, options = {}) => {
    const response = await fetch(`${API_BASE_URL}${path}`, {
      method: 'PUT',
      credentials: 'include',
      headers: options.headers || defaultHeaders,
      body: JSON.stringify(body),
      ...options
    });
    return handleResponse(response);
  },
  delete: async (path, options = {}) => {
    const response = await fetch(`${API_BASE_URL}${path}`, {
      method: 'DELETE',
      credentials: 'include',
      headers: options.headers || defaultHeaders,
      ...options
    });
    return handleResponse(response);
  }
};
