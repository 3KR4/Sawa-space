import apiClient from "../apiClient";

export const productService = {
  getProducts: async (
    type,
    pageId,
    name,
    departement,
    category,
    availability,
    min,
    max,
    page,
    limit
  ) => {
    let url = "";

    if (type === "all") {
      url = `/product/all`;

      if (departement) {
        url += `?departement=${departement}`;
      }

      const params = new URLSearchParams();
      if (name) params.append("name", name);
      if (min) params.append("min", min);
      if (max) params.append("max", max);
      if (page) params.append("page", page);
      if (limit) params.append("limit", limit);

      if (params.toString()) {
        url += `${url.includes("?") ? "&" : "?"}${params.toString()}`;
      }
    } else if (type === "page") {
      url = `/product/page/${pageId}`;

      const params = new URLSearchParams();
      if (category) params.append("category", category);
      if (availability) params.append("availability", availability);
      if (min) params.append("min", min);
      if (max) params.append("max", max);
      if (page) params.append("page", page);
      if (limit) params.append("limit", limit);
      if (name) params.append("name", name);

      if (params.toString()) {
        url += `${url.includes("?") ? "&" : "?"}${params.toString()}`;
      }
    }

    return apiClient.get(url);
  },

  createProduct: async (id, body) => {
    return apiClient.post(`/product/create/page/${id}`, body);
  },

  editProduct: (id, data, pageId) => {
    return apiClient.put(`/product/${id}/data`, data, {
      headers: {
        pageid: pageId,
      },
    });
  },

  getProduct: async (id) => {
    return apiClient.get(`/product/${id}`);
  },

  deleteProduct: async (id) => {
    return apiClient.delete(`/product/${id}`);
  },

  uploudProductImg: async (id, pageId, formData) => {
    return apiClient.post(`/product/${id}/img`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        pageid: pageId,
      },
    });
  },

  updateProductImg: async (id, pageId, imgId) => {
    const body = { publicid: imgId };
    return apiClient.put(`/product/${id}/pull/img`, body, {
      headers: {
        pageid: pageId,
      },
    });
  },
};
