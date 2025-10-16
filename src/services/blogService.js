import { apiClient } from './apiClient';

const buildQueryString = (params = {}) => {
  const query = new URLSearchParams();

  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== '') {
      query.append(key, value);
    }
  });

  const queryString = query.toString();
  return queryString ? `?${queryString}` : '';
};

export const blogService = {
  getPublicPosts: (params, options) => apiClient.get(`/posts${buildQueryString(params)}`, options),
  getPostBySlug: (slug, options) => apiClient.get(`/posts/${slug}`, options),
  getAdminPosts: (params, options) => apiClient.get(`/admin/posts${buildQueryString(params)}`, options),
  getAdminPost: (id, options) => apiClient.get(`/admin/posts/${id}`, options),
  createPost: (data, options) => apiClient.post('/admin/posts', data, options),
  updatePost: (id, data, options) => apiClient.put(`/admin/posts/${id}`, data, options),
  deletePost: (id, options) => apiClient.delete(`/admin/posts/${id}`, options)
};
