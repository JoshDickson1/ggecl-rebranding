import axios from 'axios';

const BASE_URL = 'https://ggecl-rebranding.onrender.com/api/blog'; // 

// Helper to get auth header 
const getAuthHeader = () => ({
  headers: { Authorization: `Bearer ${localStorage.getItem('admin_token')}` }
});

export const blogApi = {
  // Get all posts (Admins see drafts) [cite: 14, 16]
  getAllPosts: async (params = {}) => {
    const response = await axios.get(`${BASE_URL}/`, {
      ...getAuthHeader(),
      params: { limit: 20, offset: 0, ...params } // 
    });
    return response.data;
  },

  // Create a new post [cite: 47, 48]
  createPost: async (postData: any) => {
    const response = await axios.post(`${BASE_URL}/`, postData, getAuthHeader());
    return response.data;
  },

  // Update an existing post [cite: 73, 74]
  updatePost: async (id: string, postData: any) => {
    const response = await axios.patch(`${BASE_URL}/${id}`, postData, getAuthHeader());
    return response.data;
  },

  // Publish a draft [cite: 88, 89]
  publishPost: async (id: string) => {
    const response = await axios.patch(`${BASE_URL}/${id}/publish`, {}, getAuthHeader());
    return response.data;
  },

  // Soft delete a post [cite: 114, 115]
  deletePost: async (id: string) => {
    const response = await axios.delete(`${BASE_URL}/${id}`, getAuthHeader());
    return response.data;
  },

  // Get admin statistics [cite: 137, 138]
  getStats: async () => {
    const response = await axios.get(`${BASE_URL}/admin/stats`, getAuthHeader());
    return response.data;
  }
};