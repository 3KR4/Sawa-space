import apiClient from "../apiClient";

export const userService = {
  createUser: async (userData) => {
    return apiClient.post("/user/Create", {
      firstname: userData.firstname,
      lastname: userData.lastname,
      email: userData.email,
      password: userData.password,
      phone: userData.phone,
      info: userData.info,
    });
  },
  loginUser: async (userData) => {
    return apiClient.post("/user/login", {
      email: userData.email,
      password: userData.password,
    });
  },
  getUserData: async (userId) => {
    return apiClient.get(`/user/${userId}`);
  },

  getAllUsers: async (name) => {
    return apiClient.get(`/user?name=${name}`);
  },

  editUserData: async (userId, body) => {
    return apiClient.put(`/user/${userId}`, body);
  },

  getUserPhotos: async (userId, page = 1, limit = 7) => {
    return apiClient.get(
      `/post/user/${userId}/imgs?page=${page}&limit=${limit}`
    );
  },

  makeFriendRequest: async (id) => {
    const body = { userid: id };
    return apiClient.post(`/user/send/friend`, body);
  },
  interactWithFriendReq: async (id, action) => {
    const body = { userid: id, accept: action };
    return apiClient.post(`/user/friend`, body);
  },

  getUserSendedRequests: async () => {
    return apiClient.post(`/user/get/friendsend`);
  },
  getUserReceivedRequests: async () => {
    return apiClient.post(`/user/get/friendreceived`);
  },
  getUserFriends: async (userId) => {
    return apiClient.post(`/user/get/friend/${userId}`);
  },
  cancelRequest: async (id) => {
    const userId = { userid: id };
    return apiClient.put(`/user/remove/send`, userId);
  },
  removeFriend: async (id) => {
    const userId = { userid: id };
    return apiClient.put(`/user/remove/friend`, userId);
  },

  upload_img_cover: async (userId, type, formData) => {
    return apiClient.post(`/user/${type}/${userId}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data", // This is crucial
      },
    });
  },
  delete_img_cover: async (userId, type) => {
    return apiClient.delete(`/user/${type}/${userId}`);
  },
};
