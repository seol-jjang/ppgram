import Axios from "axios";

export const registerUser = async (dataToSubmit) => {
  const response = await Axios.post("/api/users/register", dataToSubmit);
  return response.data;
};

export const loginUser = async (dataToSubmit) => {
  const response = await Axios.post("/api/users/login", dataToSubmit);
  return response.data;
};

export const logoutUser = async () => {
  const response = await Axios.get("/api/users/logout");

  return response.data;
};
