import API from './axios';

const API_URL = '/ideas';

export const getIdeas = async () => {
  const response = await API.get(API_URL);
  return response.data;
};

export const getIdeaById = async (id) => {
  const response = await API.get(`${API_URL}/${id}`);
  return response.data;
};

export const createIdea = async (idea, token) => {
  const response = await API.post(API_URL, idea, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
}; 