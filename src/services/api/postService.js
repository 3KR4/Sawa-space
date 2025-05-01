import apiClient from "../apiClient";

export const postService = {
  //! Posts
  getPosts: (page = 1, type = "", id = "") => {
    const url =
      type === "page"
        ? `/page/page/${id}?page=${page}&limit=4`
        : type === "user"
        ? `/post/user/${id}?page=${page}&limit=4`
        : `/post/?page=${page}&limit=${page === 1 ? 7 : 4}`;
    return apiClient.get(url);
  },
  getSinglePost: (type, id) => {
    return apiClient.get(`/${type == "page" ? "page/onepost" : "post"}/${id}`);
  },
  createPost: (type, data) => {
    const url = type === "page" ? "/page/create/post" : "/post";
    return apiClient.post(url, data);
  },
  editPost: (type, id, data) => {
    const url = type === "page" ? "/page/update/" : "/post/";
    return apiClient.put(`${url}${id}`, data);
  },
  uploadPostImages: async (type, postId, imageFiles) => {
    const url = type === "page" ? "/page/post/" : "/post/";
    return apiClient.post(`${url}img/${postId}`, imageFiles, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  },
  deleteImg: (type, postId, publicid) => {
    let body = { publicid };
    const url = type === "page" ? "/page/" : "/post/";
    return apiClient.put(`${url}/pull/img/${postId}`, body);
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
  uploadCommentImg: async (id, imageFile) => {
    return apiClient.post(`/comment/${id}/img`, imageFile, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  },
  deleteCommentImg: (id) => {
    return apiClient.delete(`/comment/${id}/img`);
  },
  //! React
  makeReact: (postId, react) => {
    return apiClient.post(`/post/react/${postId}`, react);
  },
};
