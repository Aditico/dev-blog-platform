import api from "../services/api";

export const getComments = async (postId) => {
  const response = await api.get(
    `/comments/${postId}`
  );

  return response.data;
};

export const createComment = async (
  postId,
  content
) => {
  const response = await api.post(
    `/comments/${postId}`,
    {
      content,
    }
  );

  return response.data;
};

export const deleteComment = async (
  commentId
) => {
  const response = await api.delete(
    `/comments/${commentId}`
  );

  return response.data;
};