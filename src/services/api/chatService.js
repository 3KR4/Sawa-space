import apiClient from "../apiClient";

export const chatService = {
  startChat: async (userId) => {
    return apiClient.post("/caht/one-one", {
      userid: userId,
    });
  },

  getUserChats: async () => {
    return apiClient.get(`/caht/user`);
  },

  getSingelChat: async (userId) => {
    return apiClient.get(`/messege/chat/${userId}`);
  },

  createMessage: async (userId, paragraph) => {
    return apiClient.post(`/messege/chat/${userId}`, {
      paragraph: paragraph,
    });
  },

  createGroup: async (userId, members) => {
    return apiClient.post(`/caht/group/add/chat/`, {
      userid: userId,
      members: members,
    });
  },

  addGroupImg: async (groupId) => {
    return apiClient.post(`/caht/group/${groupId}/img`);
  },

  removeGroupImg: async (groupId) => {
    return apiClient.delete(`/caht/group/${groupId}/img`);
  },

  addUserToGroup: async (userId) => {
    return apiClient.put(`/caht/group/add/chat/`, {
      userid: userId,
    });
  },

  removeUserFromGroup: async (userId) => {
    return apiClient.put(`/caht/group/pull/chat/`, {
      userid: userId,
    });
  },

  makeGroupAdmin: async (userId) => {
    return apiClient.put(`/caht/group/addadmin/chat/`, {
      userid: userId,
    });
  },

  removeGroupAdmin: async (userId) => {
    return apiClient.put(`/caht/group/pulladmin/chat/`, {
      userid: userId,
    });
  },
};