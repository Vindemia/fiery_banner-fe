import api from "./axiosInstance";

const createCharacter = async (data: object) => {
  const response = await api.post("/character", data);
  return response.data;
};

const getCharacterById = async (id: string) => {
  const response = await api.get(`/characterById/${id}`);
  return response.data;
};

export { createCharacter, getCharacterById };
