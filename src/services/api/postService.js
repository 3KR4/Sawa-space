import apiClient from "../apiClient";

export const postService = {
  //! Posts
  getPosts: (page = 1, type = "", id = "") => {
    const url =
      type === "page"
        ? `/page/page/${id}?page=${page}&limit=4`
        : type === "user"
        ? `/post/user/${id}?page=${page}&limit=4`
        : `/post/?page=${page}&limit=4`;
    return apiClient.get(url);
  },
  getSinglePost: (id) => {
    return apiClient.get(`/post/${id}`);
  },
  createPost: (data) => {
    return apiClient.post(`/post`, data);
  },
  editPost: (id, data) => {
    return apiClient.put(`/post/${id}`, data);
  },
  uploadPostImages: async (postId, imageFiles) => {
    return apiClient.post(`/post/img/${postId}`, imageFiles, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  },
  deleteImg: (postId, publicid) => {
    let body = { publicid };
    return apiClient.put(`/post/pull/img/${postId}`, body);
  },
  //! Comments
  createComment: (postId, data) => {
    return apiClient.post(`/comment/${postId}`, data);
  },
  editComment: (commentId, body) => {
    return apiClient.put(`/comment/${commentId}`, body);
  },
  deleteComments: (commentId) => {
    return apiClient.delete(`/comment/${commentId}`);
  },
  getComments: (postId, page, combinedLimit = 5) => {
    return apiClient.get(
      `/comment/post/${postId}?limit=${combinedLimit}&page=${page}`
    );
  },
  getReplys: (postId, commentId) => {
    return apiClient.get(`/comment/post/${postId}/replay/${commentId}`);
  },
  //! React
  makeReact: (postId, react) => {
    return apiClient.post(`/post/react/${postId}`, react);
  },
};
