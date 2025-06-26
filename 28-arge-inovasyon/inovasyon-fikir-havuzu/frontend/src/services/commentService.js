import API from './axios';

const API_URL = '/comments';

export const getCommentsByIdea = async (ideaId) => {
  const response = await API.get(`${API_URL}/idea/${ideaId}`);
  return response.data;
};

export const addComment = async (comment) => {
  const response = await API.post(API_URL, comment);
  return response.data;
};

export const deleteComment = async (id) => {
  await API.delete(`${API_URL}/${id}`);
};
