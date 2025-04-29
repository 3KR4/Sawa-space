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
  
  editUserData: async (userId, body) => {
    return apiClient.put(`/user/${userId}`, body);
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
