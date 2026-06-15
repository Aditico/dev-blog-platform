import api from "../services/api";

export const getPosts = async () => {
  const response = await api.get("/posts");

  return response.data;
};

export const getPostById = async (id) => {
  const response = await api.get(`/posts/${id}`);

  return response.data;
};

export const toggleLike = async (id) => {
  const response = await api.put(
    `/posts/${id}/like`
  );

  return response.data;
};

export const updatePost = async (
  id,
  postData
) => {
  const response = await api.put(
    `/posts/${id}`,
    postData
  );

  return response.data;
};

export const deletePost = async (id) => {
  const response = await api.delete(
    `/posts/${id}`
  );

  return response.data;
};