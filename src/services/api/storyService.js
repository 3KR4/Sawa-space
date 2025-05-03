import apiClient from "../apiClient";

export const storyService = {
  getStories: () => {
    return apiClient.get(`/story`);
  },
  getUserStories: (userId) => {
    return apiClient.get(`/story/user/${userId}`);
  },
  createStory: (data) => {
    return apiClient.post(`/story`, data);
  },
  editStory: (id, data) => {
    return apiClient.put(`/story/${id}`, data);
  },
  uploadStoryImages: async (id, imageFiles) => {
    return apiClient.post(`/story/${id}/img`, imageFiles, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  },
  updateStoryImages: async (id, imgId) => {
    const body = { publicid: imgId };
    return apiClient.put(`/story/${id}/pull/img`, body);
  },
  deleteStory: (id) => {
    return apiClient.delete(`/story/${id}`);
  },
};
