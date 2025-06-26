import API from './axios';

const API_URL = '/ratings';

export const rateIdea = async (ideaId, value) => {
  await API.post(
    API_URL,
    { ideaId, value }
  );
};

export const getAverageRating = async (ideaId) => {
  const response = await API.get(`${API_URL}/idea/${ideaId}/average`);
  return response.data;
}; 