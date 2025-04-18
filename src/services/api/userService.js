import apiClient from "../apiClient";

export const userService = {
  createUser: async (userData) => {
    return apiClient.post("/user/Create", {
      fristname: userData.firstname,
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
  uploadUserImage: async (userId, imageFile) => {
    return apiClient.post(`/user/img/${userId}`, imageFile, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  },
};
