import apiClient from "../apiClient";

export const pageService = {
  createPage: async (body) => {
    return apiClient.post(`/page/create/`, body);
  },
  editPageData: (data) => {
    return apiClient.put(`/page/data`, data);
  },

  getPageData: async (id) => {
    return apiClient.get(`/page/${id}`);
  },

  getCategories: async (id) => {
    return apiClient.get(`/page/${id}/category`);
  },
  updateCategories: async (body) => {
    return apiClient.put(`/page/category`, body);
  },

  page_img_cover: async (type, formData) => {
    return apiClient.post(`/page/${type}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  },
  deletePage_img_cover: async (type) => {
    return apiClient.delete(`/page/${type}`);
  },
};
