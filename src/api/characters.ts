import api from "./axiosInstance";
import { userId, characterList } from "../stores/userStore";

interface CharacterData {
  name: string;
  clan: string;
}

const getUserIdFromStore = () => {
  let user_id;
  const unsubscribe = userId.subscribe((value) => {
    user_id = value;
  });
  unsubscribe();
  return user_id;
};

const createCharacter = async (data: CharacterData) => {
  try {
    const response = await api.post("/character", {
      character: data,
      userId: getUserIdFromStore(),
    });
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

const deleteCharacterById = async (id: string) => {
  try {
    const response = await api.delete(`/characterById/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error while deleting character wiht id: ${id}`, error);
  }
};

const getAllCharacters = async () => {
  try {
    const response = await api.get("/characters");
    return response.data;
  } catch (error) {
    console.error("Error while geting all characters", error);
  }
};

const refreshCharacterList = async () => {
  try {
    const response = await api.get(
      `/characterListByUserId/${getUserIdFromStore()}`
    );
    console.log(response);
    characterList.set(response.data);
    return response;
  } catch (error) {
    console.log("Error while refreshing character list of user", error);
  }
};

export {
  createCharacter,
  getCharacterById,
  getAllCharacters,
  deleteCharacterById,
  refreshCharacterList,
};
