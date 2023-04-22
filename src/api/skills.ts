import api from "./axiosInstance";

const getAllSkills = async () => {
  try {
    const response = await api.get("/skills");
    return response.data;
  } catch (error) {
    console.error("Error while getting skills list", error);
  }
};

const createSkill = async (data) => {
  try {
    const response = await api.post(`/skill`, data);
    return response.data;
  } catch (error) {
    console.error(`Error while creating a skill`, error);
  }
};

const updateSkill = async (id, data) => {
  try {
    const response = await api.put(`/skill/${id}`, data);
    return response.data;
  } catch (error) {
    console.error(`Error while updating skill with id:  ${id}`, error);
  }
};

const deleteSkill = async (id) => {
  try {
    const response = await api.delete(`/skill/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error while deleting skill with id: ${id}`, error);
  }
};

export { getAllSkills, updateSkill, deleteSkill, createSkill };
