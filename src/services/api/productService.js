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

    // Handle the 'all' products case
    if (type === "all") {
      url = `/product/all`;

      // Add departement if provided
      if (departement) {
        url += `?departement=${departement}`;
      }

      // Handle the query parameters (name, min, max, etc.)
      const params = new URLSearchParams();
      if (name) params.append("name", name);
      if (min) params.append("min", min);
      if (max) params.append("max", max);
      if (page) params.append("page", page);
      if (limit) params.append("limit", limit);

      // Append the query string if there are parameters
      if (params.toString()) {
        url += `${url.includes("?") ? "&" : "?"}${params.toString()}`;
      }
    } else if (type === "page") {
      // Handle the 'page' products case
      url = `/product/page/${pageId}`;

      // Add category and availability if provided
      const params = new URLSearchParams();
      if (category) params.append("category", category);
      if (availability) params.append("availability", availability);
      if (min) params.append("min", min);
      if (max) params.append("max", max);
      if (page) params.append("page", page);
      if (limit) params.append("limit", limit);
      if (name) params.append("name", name);

      // Append the query string if there are parameters
      if (params.toString()) {
        url += `${url.includes("?") ? "&" : "?"}${params.toString()}`;
      }
    }

    return apiClient.get(url);
  },

  createProduct: async (id, body) => {
    return apiClient.post(`/product/create/page/${id}`, body);
  },
  editProduct: (id, data) => {
    return apiClient.put(`/product/${id}`, data);
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
