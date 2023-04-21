import api from "./axiosInstance";

interface CharacterData {
  name: string;
  clan: string;
}

const createCharacter = async (data: CharacterData) => {
  try {
    const response = await api.post("/character", data);
    return response.data;
  } catch (error) {
    console.error("Error while creating character", error);
  }
};

const getCharacterById = async (id: string) => {
  try {
    const response = await api.get(`/characterById/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error while geting character wiht id: ${id}`, error);
  }
};

export { createCharacter, getCharacterById };
