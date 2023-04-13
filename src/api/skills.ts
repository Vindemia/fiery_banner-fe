import api from "./axiosInstance";

const getAllSkills = async () => {
  const response = await api.get("/skills");
  return response.data;
};

const updateSkill = async (id, data) => {
  const response = await api.put(`/skill/${id}`, data);
  return response.data;
};

const deleteSkill = async (id) => {
  const response = await api.delete(`/skill/${id}`);
  return response.data;
};

export { getAllSkills, updateSkill, deleteSkill };
