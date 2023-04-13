import api from "./axiosInstance";
import {
  isLoggedIn,
  username,
  characterList,
  userType,
} from "../stores/userStore";

interface logIn {
  username: string;
  password: string;
}

interface userData {
  username: string;
  characterList: Array<string>;
  userType: string;
}

const logSuccess = (userData: userData) => {
  isLoggedIn.set(true);
  username.set(userData.username);
  characterList.set(userData.characterList);
  userType.set(userData.userType);
  const obj = {
    isLoggedIn: true,
    username: userData.username,
    characterList: userData.characterList,
    userType: userData.userType,
  };
  localStorage.setItem("user", JSON.stringify(obj));
};

const register = async (data: logIn) => {
  const response = await api.post("/register", data);
  console.log(response.data);
  if (response.data.loginValide) logSuccess(response.data.user);
  return response.data.loginValide;
};

const login = async (data: logIn) => {
  const response = await api.post("/login", data);
  console.log(response.data);
  if (response.data.loginValide) logSuccess(response.data.user);
  return response.data.loginValide;
};

export { register, login };
