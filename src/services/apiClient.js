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

const buildRequestInit = (method, body, options = {}) => {
  const { headers = {}, ...rest } = options;
  const isFormData = typeof FormData !== 'undefined' && body instanceof FormData;
  const resolvedHeaders = isFormData ? headers : { ...defaultHeaders, ...headers };

  return {
    method,
    credentials: 'include',
    headers: resolvedHeaders,
    body: body === undefined ? undefined : (isFormData ? body : JSON.stringify(body)),
    ...rest
  };
};

export const apiClient = {
  get: async (path, options = {}) => {
    const response = await fetch(`${API_BASE_URL}${path}`, buildRequestInit('GET', undefined, options));
    return handleResponse(response);
  },
  post: async (path, body, options = {}) => {
    const response = await fetch(`${API_BASE_URL}${path}`, buildRequestInit('POST', body, options));
    return handleResponse(response);
  },
  put: async (path, body, options = {}) => {
    const response = await fetch(`${API_BASE_URL}${path}`, buildRequestInit('PUT', body, options));
    return handleResponse(response);
  },
  delete: async (path, options = {}) => {
    const response = await fetch(`${API_BASE_URL}${path}`, buildRequestInit('DELETE', undefined, options));
    return handleResponse(response);
  }
};
