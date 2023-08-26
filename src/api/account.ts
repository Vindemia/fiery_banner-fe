import Cookies from "js-cookie";
import api from "./axiosInstance";
import {
  isLoggedIn,
  username,
  characterList,
  userType,
  userId,
} from "../stores/userStore";

interface logIn {
  username: string;
  password: string;
}

type UserType = "ADMIN" | "USER";

interface userData {
  username: string;
  characterList: Array<string>;
  userType: UserType;
  isLoggedIn: boolean;
  _id: string;
}

const logSuccess = (userData: userData) => {
  try {
    isLoggedIn.set(true);
    username.set(userData.username);
    characterList.set(userData.characterList);
    userType.set(userData.userType);
    userId.set(userData._id);
    const updatedUserData = { ...userData, isLoggedIn: true };
    Cookies.set("user", JSON.stringify(updatedUserData));
  } catch (error) {
    console.error(`Error while updating context at loggin sucess`, error);
  }
};

const register = async (data: logIn) => {
  try {
    const response = await api.post("/register", data);
    console.log(response.data);
    if (response.data.loginValide) logSuccess(response.data.user);
    return response.data.loginValide;
  } catch (error) {
    console.error(`Error while register new user`, error);
  }
};

const login = async (data: logIn) => {
  try {
    const response = await api.post("/login", data);
    console.log(response.data);
    if (response.data.loginValide) logSuccess(response.data.user);
    return response.data.loginValide;
  } catch (error) {
    console.error(`Error while loggin user`, error);
  }
};

const logout = () => {
  try {
    // remove cookies
    console.log("delete cookie");
    Cookies.remove("user");
    // clear store values
    isLoggedIn.set(false);
    username.set("");
    characterList.set([]);
    userType.set("");
    userId.set("");
  } catch (error) {
    console.error("Error while logging out user", error);
  }
};

export { register, login, logout };
