import apiClient from "../apiClient";

export const pageService = {
  createPage: async (body) => {
    return apiClient.post(`/page/create/`, body);
  },
  editPage: (id, data) => {
    return apiClient.put(`/page/${id}`, data);
  },

  getPageData: async (id) => {
    return apiClient.get(`/page/${id}`);
  },

  page_img_cover: async (type, formData) => {
    return apiClient.post(`/page/${type}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  },
  editPageImg: async (type) => {
    return apiClient.delete(`/page/${type}`);
  },
};
