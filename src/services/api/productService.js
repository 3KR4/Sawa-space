import apiClient from "../apiClient";

export const productService = {
  createProduct: async (page, body) => {
    return apiClient.post(`/product/create/page/${page}`, body);
  },
  editProduct: (id, data) => {
    return apiClient.put(`/product/${id}`, data);
  },

  getProduct: async (id) => {
    return apiClient.get(`/product/${id}`);
  },

  deleteProduct: async (id) => {
    return apiClient.delete(`/product/${id}`);
  },

  postProductImg: async (id, formData) => {
    return apiClient.post(`/product/${id}/img`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  },
  editProductImg: async (id) => {
    return apiClient.put(`/product/${id}/pull/img`);
  },
};