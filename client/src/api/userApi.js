import api from "../services/api";

export const updateProfile = async (userData) => {
  const response = await api.put(
    "/users/profile",
    userData
  );

  return response.data;
};
export const getMyPosts = async (userId) => {
  const response = await api.get(
    `/users/${userId}/posts`
  );

  return response.data;
};